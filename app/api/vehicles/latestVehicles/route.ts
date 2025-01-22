import { prisma } from "@/prisma/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    const latestVehicles = await prisma.vehicle.findMany({
        take: 9,
        orderBy: {
            createdAt: "desc"
        }
    })

    return NextResponse.json(latestVehicles, {status: 200})
}