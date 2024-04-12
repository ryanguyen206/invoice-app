import { NextRequest, NextResponse } from "next/server";
import prisma from '@/libs/prismadb'

export async function GET(req: NextRequest, res : NextResponse) {

    const id = req.nextUrl.searchParams.get("id")

    const invoice = await prisma.invoice.findUnique({
        where:{
            id:id as string
        },
        include:{
            items:true
        }
    })

    return NextResponse.json({invoice})


}