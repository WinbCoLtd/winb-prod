import { Autherize } from "@/helpers/auth";
import { prisma } from "@/prisma/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    const headerList = await headers();
    const token = headerList.get("authorization")?.split(" ")[1];

    const auth = await Autherize(token as string);

    if (!auth) {
      redirect("/auth");
    }

    const url = new URL(req.url);
    const searchParams = url.searchParams;
    const id = searchParams.get('id');

    const deletedAdmin = await prisma.subAdmin.delete({
        where: { id: Number(id)}
    })

    return NextResponse.json(deletedAdmin, {status: 201});
  } catch (error) {
    if ( error instanceof Error) {
        if ( error.message === "JWT token expired" ) {
            return NextResponse.json("Token expired. Please log in again.", {
                status: 401,
              });
        }
        
      console.error(error);
      return NextResponse.json("Internal Server Error", { status: 500 });
    }
    
    console.error(error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
