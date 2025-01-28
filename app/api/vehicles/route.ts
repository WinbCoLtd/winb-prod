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

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const searchParams = url.searchParams;

    const search = searchParams.get("search") || undefined;
    const filters: QueryType["filters"] = JSON.parse(
      searchParams.get("filters") || "{}"
    );

    console.log('search', search);
    console.log('search', filters);
    
    const currentPage = parseInt(searchParams.get("currentPage") || "1", 10) || 1;

    const itemsPerPage = 50;
    const skip = (currentPage - 1) * itemsPerPage;

    const andConditions: Prisma.VehicleWhereInput[] = [];

    // Handle search conditions (title OR description)
    if (search && search.trim() !== "") {
      andConditions.push({
        OR: [
          { title: { contains: search } },
          { description: { contains: search } },
        ],
      });
    }

    // Handle filter conditions
    if (filters && Object.keys(filters).length > 0) {
      for (const [key, value] of Object.entries(filters)) {
        if (value === undefined || value === null || (Array.isArray(value) && value.length === 0)) continue;

        let filterCondition: Prisma.VehicleWhereInput;

        // Handle range filters
        if (key === "price" && Array.isArray(value) && value.length === 2) {
          filterCondition = { price: applyPriceFilter(value as number[]) };
        } 
        else if (key === "mileage" && Array.isArray(value) && value.length === 2) {
          filterCondition = { mileage: applyMileageFilter(value as number[]) };
        } 
        else if (key === "manufactureYear" && Array.isArray(value) && value.length === 2) {
          filterCondition = { manufactureYear: applyManufactureYearFilter(value as Date[]) };
        }
        // Handle array filters (OR within group)
        else if (Array.isArray(value)) {
          filterCondition = {
            OR: value.map((val) => ({ [key]: { contains: val } })),
          };
        }
        // Handle single-value filters
        else {
          filterCondition = { [key]: { contains: value } };
        }

        andConditions.push(filterCondition);
      }
    }


    const whereClause: Prisma.VehicleWhereInput = 
      andConditions.length > 0 ? { OR: andConditions } : {};

    console.log("Final Where Clause:", JSON.stringify(whereClause, null, 2));

    const [vehicles, totalVehicles] = await Promise.all([
      prisma.vehicle.findMany({
        where: whereClause,
        take: itemsPerPage,
        skip,
      }),
      prisma.vehicle.count({ where: whereClause }),
    ]);

    const totalPages = Math.ceil(totalVehicles / itemsPerPage) || 1;

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
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching vehicles." },
      { status: 500 }
    );
  }
}