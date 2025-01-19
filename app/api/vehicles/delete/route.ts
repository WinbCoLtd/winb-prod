import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { prisma } from "@/prisma/prisma";
import { headers } from "next/headers";
import { Autherize } from "@/helpers/auth";
import { JsonWebTokenError } from "jsonwebtoken";

export async function DELETE(req: NextRequest) {
  const url = new URL(req.url);
  const searchParams = url.searchParams;
  const vehicleId = Number(searchParams.get("id"));

  const headerList = await headers();
  const token = headerList.get("authorization")?.split(" ")[1];

  try {
    const auth = await Autherize(token || "");
    if (!auth) {
      return NextResponse.json({
        success: false,
        error: "Unauthorized access",
      }, { status: 401 });
    }
  } catch (err) {
    if (err instanceof JsonWebTokenError) {
      return NextResponse.json({
        success: false,
        error: err.name === "TOKEN_EXPIRED" ? "Token expired" : err.name,
      }, { status: 401 });
    }
    console.error("Authorization error:", err);
    return NextResponse.json({
      success: false,
      error: "Internal server error during authorization",
    }, { status: 500 });
  }

  try {
    const existingImages = await prisma.vehicleImages.findMany({
      where: { vehicleId },
    });

    const deletePromises = existingImages.map(async (img) => {
      try {
        const imagePath = path.join(process.cwd(), "public", img.url);
        await fs.unlink(imagePath);
      } catch (err) {
        console.warn(`Failed to delete image file: ${img.url}`, err);
      }
    });
    await Promise.all(deletePromises);

    const rootPath = path.join(process.cwd(), 'public', 'uploads', `${vehicleId}`)

    await fs.rmdir(rootPath, {recursive: true})

    await prisma.vehicleImages.deleteMany({
      where: { vehicleId },
    });

    await prisma.vehicle.delete({
      where: { id: vehicleId },
    });

    return NextResponse.json({
      success: true,
      message: `Vehicle with ID ${vehicleId} and its images have been deleted successfully.`,
    });
  } catch (error) {
    console.error("Server error during vehicle deletion:", error);
    return NextResponse.json({
      success: false,
      error: "An error occurred while deleting the vehicle.",
    }, { status: 500 });
  }
}
