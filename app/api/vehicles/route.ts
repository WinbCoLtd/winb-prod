/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

export type QueryType = {
  search?: string;
  filters?: {
    title?: string;
    description?: string;
    price?: number[];
    model?: string | string[];
    maker?: string | string[];
    vehicleType?: string | string[];
    fuel?: string | string[];
    drive?: string | string[];
    condition?: string | string[];
    color?: string | string[];
    manufactureYear?: Date[];
    mileage?: number[];
    maxPassengers?: number[];
  };
  currentPage?: number;
};

const applyPriceFilter = (value: number[]) => ({
  gte: value[0],
  lte: value[1],
});

const applyMileageFilter = (value: number[]) => ({
  gte: value[0],
  lte: value[1],
});

const applyManufactureYearFilter = (value: Date[]) => ({
  gte: new Date(value[0]),
  lte: new Date(value[1]),
});

const applyStringArrayFilter = (value: string[] | number[] | unknown) => ({ in: value });

const applyStringFilter = (value: string) => ({ equals: value });

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const searchParams = url.searchParams;

    const search = searchParams.get("search") || undefined;
    const filters: QueryType["filters"] = JSON.parse(
      searchParams.get("filters") || "{}"
    );
    const currentPage = parseInt(searchParams.get("currentPage") || "1", 10) || 1;

    const itemsPerPage = 50;
    const skip = (currentPage - 1) * itemsPerPage;

    const whereClause: any = {};
    if (search && search.trim() !== "") {
      whereClause.OR = [
        { title: { contains: search } },
        { description: { contains: search} },
      ];
    }

    if (filters && Object.keys(filters).length > 0) {
      // Iterate over valid `VehicleWhereInput` keys
      for (const [key, value] of Object.entries(filters) as [keyof Prisma.VehicleWhereInput, any][]) {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            if (key === "price") {
              whereClause[key] = applyPriceFilter(value as number[]);
            } else if (key === "mileage") {
              whereClause[key] = applyMileageFilter(value as number[]);
            } else if (key === "manufactureYear") {
              whereClause[key] = applyManufactureYearFilter(value as Date[]);
            } else {
              whereClause[key] = applyStringArrayFilter(value);
            }
          } else {
            whereClause[key] = applyStringFilter(value as string);
          }
        }
      }
    }

    console.log(whereClause);
    
    const [vehicles, totalVehicles] = await Promise.all([
      prisma.vehicle.findMany({
        where: whereClause,
        take: itemsPerPage,
        skip,
      }),
      prisma.vehicle.count({ where: whereClause }),
    ]);

    const totalPages = totalVehicles > 0 ? Math.ceil(totalVehicles / itemsPerPage) : 1; 

    return NextResponse.json(
      {
        vehicles,
        pagination: {
          currentPage,
          totalPages,
          itemsPerPage,
          totalVehicles,
        },
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error Fetching vehicles:", error);
    return NextResponse.json(
      {
        error: "An error occurred while fetching vehicles.",
      },
      { status: 500 }
    );
  }
}
