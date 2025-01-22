import { prisma } from "@/prisma/prisma";
import {  NextResponse } from "next/server";

export async function GET() {
    const categories = await prisma.vehicle.findMany({
        select: {
            vehicleType: true
        },
    })

    return NextResponse.json(categories, {status: 200})
}