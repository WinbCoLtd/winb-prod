import { prisma } from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const url = new URL(req.url)
    const searchParams = url.searchParams
    const category = searchParams.get("category") as string;

    let latestVehicles;
    if ( category === 'all') {
        latestVehicles = await prisma.vehicle.findMany({
            take: 6,
            orderBy: {
                createdAt: "desc"
            }
        })
        return NextResponse.json(latestVehicles, {status: 200})
    }else{
         latestVehicles = await prisma.vehicle.findMany({
            take: 6,
            orderBy: {
                createdAt: "desc"
            },
           where:{
                vehicleType: category
           }
        })
        return NextResponse.json(latestVehicles, {status: 200})
    }
    

    
}