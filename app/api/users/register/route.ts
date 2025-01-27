import { encryptPassword } from "@/helpers/encryptPassword";
import { prisma } from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST (req: NextRequest) {
    try {
        const body = await req.json(); 
        const { username, stringPassword, nameEn, nameJa } = body;

        if (!username || !stringPassword || !nameEn || !nameJa) {
            console.log(username, stringPassword, nameEn, nameJa);
            
            return NextResponse.json('Missing required fields', { status: 400 });
        }

        console.log(username, stringPassword, nameEn, nameJa)

        const adminInit = await prisma.subAdmin.findUnique({
            where: {username: username}
        })

        if ( adminInit ) {
            return NextResponse.json('This username is taken please another ', {status: 400})
        }

        const password = await encryptPassword(stringPassword);

        const newAdmin = await prisma.subAdmin.create({
            data: {
                username,
                password,
                nameEn,
                nameJa
            }
        })

        return NextResponse.json(newAdmin, {status: 200})
    } catch (error) { // No need for : any here
        console.error("Error creating admin:", error);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return NextResponse.json({ error: 'Internal Server Error', details: (error as any)?.message || "Unknown error" }, { status: 500 }); // Safe error message handling
    }
} 