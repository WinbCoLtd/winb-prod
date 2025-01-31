/* eslint-disable @typescript-eslint/no-explicit-any */
import { Autherize } from "@/helpers/auth";
import { prisma } from "@/prisma/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
})

// Helper function for Cloudinary uploads
const uploadToCloudinary = async (file: File, folder: string) => {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  
  return new Promise<any>((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder, resource_type: 'auto' },
      (error, result) => {
        if (error) reject(error);
        if (result) resolve(result);
      }
    ).end(buffer);
  });
};

// Helper function to delete Cloudinary assets
const deleteFromCloudinary = async (url: string) => {
  const publicId = url.split('/').slice(-2).join('/').split('.')[0];
  if (publicId) {
    await cloudinary.uploader.destroy(publicId);
  }
};

export async function PUT(req: NextRequest) {
  const headerList = await headers();
  const token = headerList.get("authorization")?.split(" ")[1] || "";

  try {
    // Authorization check
    const auth = await Autherize(token);
    if (!auth) return redirect("/auth");

    const formdata = await req.formData();
    const vehicleId = Number(formdata.get("id"));

    if (!vehicleId) {
      return NextResponse.json({
        success: false,
        error: "Vehicle ID is required for updating.",
      });
    }

    // Fetch existing data
    const [existingVehicle, existingImages] = await Promise.all([
      prisma.vehicle.findUnique({ where: { id: vehicleId } }),
      prisma.vehicleImages.findMany({ where: { vehicleId } })
    ]);

    if (!existingVehicle) {
      return NextResponse.json({
        success: false,
        error: "Vehicle not found.",
      });
    }

    // Handle image updates
    const retainedUrls = JSON.parse(
      formdata.get("retainedUrls")?.toString() || "[]"
    ) as string[];

    // Identify images to remove
    const imagesToDelete = existingImages.filter(
      img => !retainedUrls.includes(img.url) && img.url !== existingVehicle.previewUrl
    );

    // Clean up deleted images
    await Promise.all([
      ...imagesToDelete.map(img => deleteFromCloudinary(img.url)),
      prisma.vehicleImages.deleteMany({
        where: { id: { in: imagesToDelete.map(img => img.id) } }
      })
    ]);

    // Handle primary image update
    const previewImageFile = formdata.get("screenShot") as File | null;
    let previewUrl = existingVehicle.previewUrl;

    if (previewImageFile) {
      // Upload new primary image
      const screenShotResult = await uploadToCloudinary(
        previewImageFile,
        `vehicles/${vehicleId}`
      );
      previewUrl = screenShotResult.secure_url;

      // Delete old primary image if it changed
      if (existingVehicle.previewUrl !== previewUrl) {
        await deleteFromCloudinary(existingVehicle.previewUrl);
      }
    }

    // Handle new carousel images
    const files = formdata.getAll("file") as File[];
    const newFileUrls = await Promise.all(
      files.map(file => 
        uploadToCloudinary(file, `vehicles/${vehicleId}/carousel`)
          .then(res => res.secure_url)
      )
    );

    // Prepare updated vehicle data
    const formFields = [
      'title', 'description', 'price', 'model', 'vehicleType',
      'maker', 'fuel', 'drive', 'condition', 'color', 'grade',
      'chassieNumber', 'Shaken', 'manufactureYear', 'mileage', 'maxPassengers'
    ];
    
    const updatedData = formFields.reduce((acc: Record<string, any>, field) => {
      const value = formdata.get(field);
      if (value !== null) {
        acc[field] = field === 'manufactureYear' && value 
          ? new Date(value.toString())
          : Number(value) || value.toString();
      }
      return acc;
    }, {});

    // Database transaction
    const [updatedVehicle] = await prisma.$transaction([
      prisma.vehicle.update({
        where: { id: vehicleId },
        data: {
          ...updatedData,
          previewUrl,
          imageCount: retainedUrls.length + newFileUrls.length + 1
        },
      }),
      ...(previewUrl !== existingVehicle.previewUrl ? [
        prisma.vehicleImages.updateMany({
          where: { vehicleId, isPrimary: true },
          data: { url: previewUrl }
        })
      ] : []),
      prisma.vehicleImages.createMany({
        data: newFileUrls.map(url => ({
          url,
          vehicleId,
          isPrimary: false
        }))
      })
    ]);

    return NextResponse.json({
      success: true,
      vehicle: updatedVehicle,
      images: {
        primary: previewUrl,
        carousel: [...retainedUrls, ...newFileUrls]
      }
    });

  } catch (error) {
    console.error("Update vehicle error:", error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "An unexpected error occurred",
    });
  }
}