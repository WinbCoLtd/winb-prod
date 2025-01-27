import { Autherize } from "@/helpers/auth";
import { prisma } from "@/prisma/prisma";
import fs from "fs";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { Ifields } from "../add/route";

export async function PUT(req: NextRequest) {
  const headerList = await headers();
  const token = headerList.get("authorization")?.split(" ")[1];

  // Authorization check
  const auth = await Autherize(token || "");
  if (!auth) {
    return redirect("/auth");
  }

  try {
    const formdata = await req.formData();
    const vehicleId = Number(formdata.get("id"));

    // Ensure vehicleId is provided
    if (!vehicleId) {
      return NextResponse.json({
        success: false,
        error: "Vehicle ID is required for updating.",
      });
    }

    // Fetch existing vehicle details
    const existingVehicle = await prisma.vehicle.findUnique({ where: { id: vehicleId } });
    if (!existingVehicle) {
      return NextResponse.json({
        success: false,
        error: "Vehicle not found.",
      });
    }

    // Handle retained image URLs
    const retainedUrls = JSON.parse(
      formdata.get("retainedUrls")?.toString() || "[]"
    ) as string[];

    const existingImages = await prisma.vehicleImages.findMany({ where: { vehicleId } });
    const imagesToDelete = existingImages.filter(
      (img) => !retainedUrls.includes(img.url) && img.url !== existingVehicle.previewUrl
    );

    // Delete unused images from filesystem and database
    for (const img of imagesToDelete) {
      const imgPath = path.join(process.cwd(), "public", img.url);
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    }

    await prisma.vehicleImages.deleteMany({
      where: {
        vehicleId,
        url: { notIn: retainedUrls },
      },
    });

    // Handle the new primary image (preview image)
    const previewImageFile = formdata.get("screenShot") as File | null;
    let previewUrl = existingVehicle.previewUrl;

    if (previewImageFile) {
      const previewPath = path.join(process.cwd(), "public", "uploads", `${vehicleId}`);
      if (!fs.existsSync(previewPath)) fs.mkdirSync(previewPath, { recursive: true });

      const oldPreviewPath = path.join(process.cwd(), "public", previewUrl);
      if (fs.existsSync(oldPreviewPath)) fs.unlinkSync(oldPreviewPath);

      const previewFilePath = path.join(previewPath, previewImageFile.name);
      fs.writeFileSync(previewFilePath, Buffer.from(await previewImageFile.arrayBuffer()));

      previewUrl = `/uploads/${vehicleId}/${previewImageFile.name}`;
    }

    // Handle new carousel images
    const files = formdata.getAll("file") as File[];
    const uploadPath = path.join(process.cwd(), "public", "uploads", `${vehicleId}`, "carouselImg");
    if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath, { recursive: true });

    const newFileUrls: string[] = [];
    for (const file of files) {
      const filePath = path.join(uploadPath, file.name);
      fs.writeFileSync(filePath, Buffer.from(await file.arrayBuffer()));
      newFileUrls.push(`/uploads/${vehicleId}/carouselImg/${file.name}`);
    }

    // Save new image URLs to the database
    for (const fileUrl of newFileUrls) {
      await prisma.vehicleImages.create({ data: { url: fileUrl, vehicleId } });
    }

    // Update or create primary image record
    const primaryImageRecord = existingImages.find((img) => img.url === existingVehicle.previewUrl);
    if (primaryImageRecord) {
      await prisma.vehicleImages.update({
        where: { id: primaryImageRecord.id },
        data: { url: previewUrl },
      });
    } else if (previewUrl !== existingVehicle.previewUrl) {
      await prisma.vehicleImages.create({
        data: { url: previewUrl, vehicleId },
      });
    }

    // Combine all image URLs
    const finalImageUrls = [...retainedUrls, ...newFileUrls, previewUrl];

    // Extract updated data from form
    const updatedData: Partial<Ifields> = {
      title: formdata.get("title")?.toString() || existingVehicle.title,
      description: formdata.get("description")?.toString() || existingVehicle.description,
      price: Number(formdata.get("price")) || existingVehicle.price,
      model: formdata.get("model")?.toString() || existingVehicle.model,
      vehicleType: formdata.get("vehicleType")?.toString() || existingVehicle.vehicleType,
      maker: formdata.get("maker")?.toString() || existingVehicle.maker,
      fuel: formdata.get("fuel")?.toString() || existingVehicle.fuel,
      drive: formdata.get("drive")?.toString() || existingVehicle.drive,
      condition: formdata.get("condition")?.toString() || existingVehicle.condition,
      color: formdata.get("color")?.toString() || existingVehicle.color,
      grade: formdata.get("grade")?.toString() || existingVehicle.grade,
      chassieNumber: formdata.get("chassieNumber")?.toString() || existingVehicle.chassieNumber,
      Shaken: formdata.get("Shaken")?.toString() || existingVehicle.Shaken,
      manufactureYear: formdata.get("manufactureYear")
        ? new Date(formdata.get("manufactureYear")!.toString())
        : existingVehicle.manufactureYear,
      mileage: Number(formdata.get("mileage")) || existingVehicle.mileage,
      maxPassengers: Number(formdata.get("maxPassengers")) || existingVehicle.maxPassengers,
    };

    // Update vehicle record in the database
    const updatedVehicle = await prisma.vehicle.update({
      where: { id: vehicleId },
      data: {
        ...updatedData,
        previewUrl,
        imageCount: finalImageUrls.length,
      },
    });

    return NextResponse.json({
      success: true,
      vehicle: updatedVehicle,
      files: finalImageUrls,
    });
  } catch (error) {
    console.error("Update vehicle error:", error);
    return NextResponse.json({
      success: false,
      error: "An error occurred while updating the vehicle.",
    });
  }
}
