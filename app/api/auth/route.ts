import { comparePassword } from "@/helpers/comparePassword";
import { getToken } from "@/helpers/getToken";
import { prisma } from "@/prisma/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { username , password } = body;

        const admin = await prisma.admin.findUnique({
            where: {username: username}
        })

        const matchPassword = await comparePassword(password, admin?.password as string);

        if ( !matchPassword ) {
            return NextResponse.json(
                {message: 'username or password is wrong'},
                {status: 400},
            )
        }

        const token = await getToken(admin?.id as number);
        return NextResponse.json({token: token, id: admin?.id }, { status: 200 });

    } catch (error) {
        console.error('Error occured while interacting with database : ',error);
        return NextResponse.json('Internal server error', {status: 500})
    }
}