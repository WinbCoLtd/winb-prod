/* eslint-disable @typescript-eslint/no-explicit-any */
import { Autherize } from "@/helpers/auth";
import { prisma } from "@/prisma/prisma";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

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
    const auth = await Autherize(token);
    if (!auth) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const formdata = await req.formData();
    const vehicleId = Number(new URL(req.url).searchParams.get("id"));

    if (!vehicleId) {
      return NextResponse.json(
        { success: false, error: "Vehicle ID is required" },
        { status: 400 }
      );
    }

    // Fetch existing data
    const [existingVehicle, existingImages] = await Promise.all([
      prisma.vehicle.findUnique({ where: { id: vehicleId } }),
      prisma.vehicleImages.findMany({ where: { vehicleId } })
    ]);

    if (!existingImages) {
      return NextResponse.json({
        success: false,
        error: "Images not found.",
      });
    }

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

    if ( !retainedUrls ) {
      return NextResponse.json({
        success: false,
        error: "Retain url not found",
      });
    }

    // Identify images to remove
    const imagesToDelete = existingImages.filter(
      img => !retainedUrls.includes(img.url) && img.url !== existingVehicle.previewUrl
    );

    // Clean up deleted images
    if ( imagesToDelete && imagesToDelete.length > 0 ) {
      await Promise.all([
        ...imagesToDelete.map(img => deleteFromCloudinary(img.url)),
        prisma.vehicleImages.deleteMany({
          where: { id: { in: imagesToDelete.map(img => img.id) } }
        })
      ]);
    }

    // Handle primary image update
    const previewImageFile = formdata.get("screenShot") as File | null;
    let previewUrl;

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

    let newFileUrls: any[] = [];
    // Handle new carousel images
    const files = formdata.getAll("file") as File[];
    if (files && files.length > 0) {
      try {
        newFileUrls = await Promise.all(
          files.map(async (file) => {
            const result = await uploadToCloudinary(file, `vehicles/${vehicleId}/carousel`);
            return result.secure_url;
          })
        );
      } catch (uploadError) {
        console.error("File upload failed:", uploadError);
        return NextResponse.json(
          { success: false, error: "Failed to upload carousel images" },
          { status: 500 }
        );
      }
    }

    // Prepare updated vehicle data
    const formFields = [
      'title', 'description', 'price', 'model', 'vehicleType',
      'maker', 'fuel', 'drive', 'condition', 'color', 'grade',
      'chassieNumber', 'Shaken', 'manufactureYear', 'mileage', 'maxPassengers'
    ];
    
    const updatedData = formFields.reduce((acc: Record<string, any>, field) => {
      const value = formdata.get(field);
      if (value !== null) {
        // Handle numeric fields explicitly
        const numericFields = ['price', 'mileage', 'maxPassengers'];
        if (numericFields.includes(field)) {
          acc[field] = Number(value) || 0;
        }
        // Handle date field
        else if (field === 'manufactureYear') {
          acc[field] = new Date(value.toString());
        }
        // All other fields
        else {
          acc[field] = value.toString();
        }
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

  } catch (error: any) {
    console.error("Update vehicle error:", error);
    return NextResponse.json(
      { 
        success: false,
        error: error?.message || "An unexpected error occurred"
      },
      { status: 500 }
    );
  }
}