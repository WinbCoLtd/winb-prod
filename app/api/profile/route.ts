import { Autherize } from "@/helpers/auth";
import { prisma } from "@/prisma/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET() {
    const headersList = await headers();
    const token = headersList.get('authorization')?.split(' ')[1];

    try {
        // Authenticate the user using the token
        const auth = await Autherize(token as string);

        if (!auth) {
            redirect('/auth');
        }

        // Fetch the admin profile using the authenticated user ID
        const adminProfile = await prisma.admin.findUnique({
            where: { id: Number(auth.id) }
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
