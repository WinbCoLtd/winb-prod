
import { prisma } from "@/prisma/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {

        const users = await prisma.subAdmin.findMany()
        return NextResponse.json({ users}, { status: 200 });

    } catch (error) {
        console.error('Error occured while interacting with database : ',error);
        return NextResponse.json('Internal server error', {status: 500})
    }
}