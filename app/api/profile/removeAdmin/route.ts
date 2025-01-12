import { Autherize } from "@/helpers/auth";
import { prisma } from "@/prisma/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function DELETE(req: Request ) {
    try {
        const headerList = await headers();
    const token = headerList.get('authorization')?.split(' ')[1]

    const auth = await Autherize(token as string);

    if ( !auth ) {
        redirect('/auth')
    }

    const body = await req.json();
    const { id } = body;

    const deletedAdmin = await prisma.admin.delete({
        where: {id: Number(id)}
    })

    return NextResponse.json(deletedAdmin, {status: 203})
    } catch (error) {
        if ( error instanceof Error ) {
            if (error.message === 'JWT token expired') {
                return NextResponse.json('Token expired. Please log in again.', { status: 401 });
            }

            console.error(error);
            return NextResponse.json('Internal Server Error', { status: 500 });
        }
        console.error(error);
        return NextResponse.json('Internal Server Error', { status: 500 });
    }
}