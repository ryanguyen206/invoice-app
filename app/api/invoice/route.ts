import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";
import prisma from '@/libs/prismadb'

export async function GET(req: NextRequest, res : NextResponse) {
    const session = await getServerSession(authOptions)

    const id = req.nextUrl.searchParams.get("id")


    const invoice = await prisma.invoice.findUnique({
        where:{
            id:id as string
        }
    })

    return NextResponse.json({invoice})


}