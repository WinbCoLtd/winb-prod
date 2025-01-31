/* eslint-disable @typescript-eslint/no-explicit-any */
import { Autherize } from "@/helpers/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma";
import  { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
})
export interface Ifields {
  title: string;
  description: string;
  price: number;
  model: string;
  vehicleType: string;
  maker: string;
  fuel: string;
  drive: string;
  condition: string;
  color: string;
  grade: string;
  chassieNumber: string;
  Shaken: string;
  manufactureYear: Date;
  mileage: number;
  maxPassengers: number;
}

export async function POST(req: NextRequest) {
  const headerList = await headers();
  const token = headerList.get("authorization")?.split(" ")[1];

  // Authorization check
  try {
    const auth = await Autherize(token as string);
    if (!auth) {
      return redirect("/auth");
    }
  } catch (error) {
    console.error("Authorization error:", error);
    return NextResponse.json({ success: false, error: "Authorization failed" });
  }

  try {
    const formdata = await req.formData();
    const formDataObject: Partial<Ifields> = {
      title: formdata.get("title")?.toString() || "",
      description: formdata.get("description")?.toString() || "",
      price: Number(formdata.get("price") || 0),
      model: formdata.get("model")?.toString() || "",
      vehicleType: formdata.get("vehicleType")?.toString() || "",
      maker: formdata.get("maker")?.toString() || "",
      fuel: formdata.get("fuel")?.toString() || "",
      drive: formdata.get("drive")?.toString() || "",
      condition: formdata.get("condition")?.toString() || "",
      color: formdata.get("color")?.toString() || "",
      grade: formdata.get("grade")?.toString() || "",
      chassieNumber: formdata.get("chassieNumber")?.toString() || "",
      Shaken: formdata.get("Shaken")?.toString() || "",
      manufactureYear: formdata.get("manufactureYear")
        ? new Date(formdata.get("manufactureYear")!.toString())
        : new Date(),
      mileage: Number(formdata.get("mileage") || 0),
      maxPassengers: Number(formdata.get("maxPassengers") || 0),
    };

    const screenShot = formdata.get("screenShot") as File;
    const files = formdata.getAll("file") as File[];

    if (!screenShot) {
      return NextResponse.json({ success: false, error: "No primary image provided" });
    }

    if (!files || files.length === 0) {
      return NextResponse.json({
        success: false,
        error: "No file provided or incorrect file format",
      });
    }

    // Upload images to Cloudinary
    const uploadImageToCloudinary = async (file: File) => {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      
      return new Promise<any>((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { resource_type: 'auto' },
          (error, result) => {
            if (error) reject(error);
            if (result) resolve(result);
          }
        ).end(buffer);
      });
    };

    // Upload primary screenshot
    const screenShotResult = await uploadImageToCloudinary(screenShot);
    const screenShotUrl = screenShotResult.secure_url;

    // Upload additional images
    const additionalImagesResults = await Promise.all(
      files.map(file => uploadImageToCloudinary(file))
    );
    const additionalImageUrls = additionalImagesResults.map(res => res.secure_url);

    // Start a transaction
    const transaction = await prisma.$transaction(async (prismaTransaction) => {
      const insertVehicle = await prismaTransaction.vehicle.create({
        data: {
          title: formDataObject.title as string,
          description: formDataObject.description as string,
          price: formDataObject.price as number,
          model: formDataObject.model as string,
          vehicleType: formDataObject.vehicleType,
          maker: formDataObject.maker as string,
          fuel: formDataObject.fuel as string,
          drive: formDataObject.drive as string,
          condition: formDataObject.condition as string,
          color: formDataObject.color as string,
          grade: formDataObject.grade as string,
          chassieNumber: formDataObject.chassieNumber as string,
          Shaken: formDataObject.Shaken as string,
          manufactureYear: formDataObject.manufactureYear as Date,
          mileage: formDataObject.mileage as number,
          maxPassengers: formDataObject.maxPassengers as number,
          imageCount: additionalImageUrls.length + 1,
          isAvailable: true,
          isPublished: true,
          previewUrl: screenShotUrl,
        },
      });

      // Create image records
      await prismaTransaction.vehicleImages.create({
        data: {
          url: screenShotUrl,
          vehicleId: insertVehicle.id,
          isPrimary: true
        }
      });

      await Promise.all(
        additionalImageUrls.map(url => 
          prismaTransaction.vehicleImages.create({
            data: {
              url,
              vehicleId: insertVehicle.id,
              isPrimary: false
            }
          })
        )
      );

      return { insertVehicle, imageUrls: [screenShotUrl, ...additionalImageUrls] };
    });

    return NextResponse.json({ 
      success: true, 
      vehicleId: transaction.insertVehicle.id,
      imageUrls: transaction.imageUrls
    });
  } catch (error) {
    console.error("Error occurred:", error);

    return NextResponse.json({ success: false, error: "An unexpected error occurred" });
  }
}
