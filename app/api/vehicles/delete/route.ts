import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma";
import { headers } from "next/headers";
import { Autherize } from "@/helpers/auth";
import { JsonWebTokenError } from "jsonwebtoken";
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
})

// Helper function to delete Cloudinary assets
const deleteFromCloudinary = async (url: string) => {
  try {
    const publicId = url.split('/').slice(-2).join('/').split('.')[0];
    if (publicId) {
      await cloudinary.uploader.destroy(publicId);
    }
  } catch (error) {
    console.error(`Error deleting Cloudinary asset ${url}:`, error);
    throw error;
  }
};

export async function DELETE(req: NextRequest) {
  const url = new URL(req.url);
  const vehicleId = Number(url.searchParams.get("id"));
  const headerList = await headers();
  const token = headerList.get("authorization")?.split(" ")[1] || "";

  try {
    // Authorization check
    const auth = await Autherize(token);
    if (!auth) {
      return NextResponse.json(
        { success: false, error: "Unauthorized access" },
        { status: 401 }
      );
    }

    if (!vehicleId || isNaN(vehicleId)) {
      return NextResponse.json(
        { success: false, error: "Invalid vehicle ID" },
        { status: 400 }
      );
    }

    // Fetch existing images and vehicle data
    const [existingVehicle, existingImages] = await Promise.all([
      prisma.vehicle.findUnique({ where: { id: vehicleId } }),
      prisma.vehicleImages.findMany({ where: { vehicleId } })
    ]);

    if (!existingVehicle) {
      return NextResponse.json(
        { success: false, error: "Vehicle not found" },
        { status: 404 }
      );
    }

    // Delete all associated images from Cloudinary
    const deletePromises = existingImages.map(async (img) => {
      try {
        await deleteFromCloudinary(img.url);
      } catch (error) {
        console.warn(`Failed to delete image: ${img.url}`, error);
      }
    });

    // Add primary image deletion if exists
    if (existingVehicle.previewUrl) {
      deletePromises.push(deleteFromCloudinary(existingVehicle.previewUrl));
    }

    await Promise.all(deletePromises);

    // Delete database records in transaction
    await prisma.$transaction([
      prisma.vehicleImages.deleteMany({ where: { vehicleId } }),
      prisma.vehicle.delete({ where: { id: vehicleId } })
    ]);

    return NextResponse.json({
      success: true,
      message: `Vehicle ${vehicleId} and associated images deleted successfully`
    });

  } catch (error) {
    console.error("Vehicle deletion error:", error);
    
    if (error instanceof JsonWebTokenError) {
      return NextResponse.json(
        { success: false, error: "Invalid authentication token" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : "Failed to delete vehicle" 
      },
      { status: 500 }
    );
  }
}