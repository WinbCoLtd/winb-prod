import { prisma } from "@/prisma/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    const res = await prisma.vehicle.findMany({
        select: {
            maker: true,
            model: true,
        }
    })

    const makers = res.map((item) => item.maker)
    const models = res.map((item) => item.model)
    return NextResponse.json({makers, models}, {status: 200})
}