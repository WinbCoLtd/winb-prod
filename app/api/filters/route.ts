/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/prisma/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    const filters = ['model', 'maker', 'vehicleType', 'fuel', 'drive', 'condition', 'color', 'grade', 'manufactureYear', 'maxPassengers']

    const filterItems: any = {}
    for ( const filter of filters) {
        filterItems[filter] = await prisma.vehicle.findMany({
            distinct: filter as any,
            select: {
                [filter]: true
            }
        })
    }

    return NextResponse.json(filterItems, {status: 200})
}