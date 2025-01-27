import { prisma } from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET( req: NextRequest) {

    try {
        const url = new URL(req.url);
        const searchParams = url.searchParams;
        const id = Number(searchParams.get("id"));

        // Fetch the admin profile using the authenticated user ID
        const adminProfile = await prisma.admin.findUnique({
            where: { id: Number(id) }
        });

        if (!adminProfile) {
            return NextResponse.json("Your account is unavailable", { status: 403 });
        }

        return NextResponse.json(adminProfile, { status: 200 });
    } catch (error: unknown) {
        // Type narrowing: Check if the error is an instance of Error
        if (error instanceof Error) {
            if (error.message === 'JWT token expired') {
                return NextResponse.json('Token expired. Please log in again.', { status: 401 });
            }

            console.error(error);
            return NextResponse.json('Internal Server Error', { status: 500 });
        }
        return NextResponse.json('Internal Server Error', { status: 500 });
    }
}
