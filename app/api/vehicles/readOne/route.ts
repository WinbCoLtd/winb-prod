import { prisma } from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const url = new URL(req.url)
    const searchParams = url.searchParams

    const id = Number(searchParams.get('id'))

    if (isNaN(id)) {
        return NextResponse.json({ error: "Invalid vehicle ID" }, { status: 400 });
    }

    try {
        const vehicleData = await prisma.vehicle.findUnique({
            where: { id },
        });

        if (!vehicleData) {
            return NextResponse.json({ error: "Vehicle not found" }, { status: 404 }); // Correct status code
        }

        const vehicleImages = await prisma.vehicleImages.findMany({
            where: { vehicleId: id },
        });

        const newImages = vehicleImages.filter((img) => img.url !== vehicleData.previewUrl )

        const vehicleObject = {
            ...vehicleData,
            images: newImages, 
        };

        return NextResponse.json(vehicleObject, { status: 200 });
    } catch (error) {
        console.error("Error fetching vehicle:", error); // Use console.error for errors
        return NextResponse.json({ error: "Failed to fetch vehicle" }, { status: 500 });
    }
}