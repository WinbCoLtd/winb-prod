import { Autherize } from "@/helpers/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { prisma } from "@/prisma/prisma";

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

  let transaction;
  const createdFiles: string[] = [];
  const createdDirectories: string[] = [];

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

    // Start a transaction
    transaction = await prisma.$transaction(async (prismaTransaction) => {
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
          imageCount: 0,
          isAvailable: true,
          isPublished: true,
          previewUrl: "",
        },
      });

      const rootUploadPath = path.join(process.cwd(), "public", "uploads", `${insertVehicle.id}`);
      if (!fs.existsSync(rootUploadPath)) {
        fs.mkdirSync(rootUploadPath, { recursive: true });
        createdDirectories.push(rootUploadPath);
      }

      const primaryImageFilePath = path.join(rootUploadPath, screenShot.name);
      const primaryBuffer = Buffer.from(await screenShot.arrayBuffer());

      fs.writeFileSync(primaryImageFilePath, primaryBuffer);
      createdFiles.push(primaryImageFilePath);

      const finalScreenPathToSave = `/uploads/${insertVehicle.id}/${screenShot.name}`;

      const uploadPath = path.join(process.cwd(), "public", "uploads", `${insertVehicle.id}`, "carouselImg");
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
        createdDirectories.push(uploadPath);
      }

      const fileUrls: string[] = [];

      for (const file of files) {
        const filePath = path.join(uploadPath, file.name);
        const buffer = Buffer.from(await file.arrayBuffer());
        fs.writeFileSync(filePath, buffer);
        fileUrls.push(`/uploads/${insertVehicle.id}/carouselImg/${file.name}`);
        createdFiles.push(filePath);
      }

      fileUrls.unshift(finalScreenPathToSave);

      for (const file of fileUrls) {
        await prismaTransaction.vehicleImages.create({
          data: { url: file, vehicleId: insertVehicle.id },
        });
      }

      await prismaTransaction.vehicle.update({
        where: { id: insertVehicle.id },
        data: {
          imageCount: fileUrls.length,
          previewUrl: fileUrls[0],
        },
      });

      return { insertVehicle, fileUrls };
    });

    return NextResponse.json({ success: true, files: transaction.fileUrls });
  } catch (error) {
    console.error("Error occurred:", error);

    // Rollback file system changes
    for (const file of createdFiles) {
      if (fs.existsSync(file)) {
        fs.unlinkSync(file);
      }
    }

    for (const dir of createdDirectories.reverse()) {
      if (fs.existsSync(dir)) {
        fs.rmdirSync(dir, { recursive: true });
      }
    }

    return NextResponse.json({ success: false, error: "An unexpected error occurred" });
  }
}
