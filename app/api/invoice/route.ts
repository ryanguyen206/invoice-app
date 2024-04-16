import { NextRequest, NextResponse } from "next/server";
import prisma from '@/libs/prismadb'
import { getSession } from "@/libs/serverSession";
import { items } from "@/components/Forms/CreateInvoice";

export async function GET(req: NextRequest, res : NextResponse) {

    const id = req.nextUrl.searchParams.get("id")

    try {
        const invoice = await prisma.invoice.findUnique({
            where:{
                id:id as string
            },
            include:{
                items:true
            }
        })
        return NextResponse.json({invoice})
    } catch (error) {
        return NextResponse.json({error})
    }
}

export async function POST(request: NextRequest) {
    const data = await request.json()
    const session = await getSession()
    console.log(data, 'sent in')
    const user = await prisma.user.findUnique({
        where:{
            email:session?.user?.email as string
        }
    })

    if (!user) {
        return {message: 'User not found'}
    }

    try {
        const newInvoice = await prisma.invoice.create({
            data: {
                city: data.city as string,
                street: data.street as string,
                state: data.state as string,
                postCode: data.postCode,
                toCity: data.toCity as string,
                toStreet: data.toStreet as string,
                toState: data.toState as string,
                toPostCode: data.toPostCode as string,
                description: data.description as string,
                issueDate: data.issueDate as string,
                toEmail: data.toEmail as string,
                toName: data.toName as string,
                user: {
                    connect: { id: user?.id } 
                },
                items: {
                    create: data.items.map((item : items) => ({
                        name: item.name,
                        quantity: item.quantity as number ,
                        price: item.price as number
                    }))
                }
            },
            include: {
                items: true
            },
            })
            console.log(newInvoice)

        return NextResponse.json({success:true})

    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: error, success: false});
    }


   
  }