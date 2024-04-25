import { NextRequest, NextResponse } from "next/server";
import prisma from '@/libs/prismadb'
import { getSession } from "@/libs/serverSession";
import { items } from "@/libs/get";

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

export async function POST(request: NextRequest, res : NextResponse) {
    const data = await request.json()
    const session = await getSession()

    const user = await prisma.user.findUnique({
        where:{
            email:session?.user?.email as string
        }
    })

    if (!user) {
        return NextResponse.json({message:"Error not found", success:false})
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
        return NextResponse.json({success:false});
    } 
  }



  export async function PATCH(request: NextRequest, res : NextResponse) {
    const data = await request.json()
    const updatedInvoice = data.data
    const session = await getSession()

    const invoiceId = data.id

    const user = await prisma.user.findUnique({
        where:{
            email:session?.user?.email as string
        }
    })

    if (!user) {
        return NextResponse.json({message:"Error not found", success:false})
    }

    await prisma.item.deleteMany({ where: { invoiceId } })

    try {
        const newInvoice = await prisma.invoice.update({
            where: {
                id: invoiceId,        
            },
            data: {
                city: updatedInvoice.city as string,
                street: updatedInvoice.street as string,
                state: updatedInvoice.state as string,
                postCode: updatedInvoice.postCode,
                toCity: updatedInvoice.toCity as string,
                toStreet: updatedInvoice.toStreet as string,
                toState: updatedInvoice.toState as string,
                toPostCode: updatedInvoice.toPostCode as string,
                description: updatedInvoice.description as string,
                issueDate: updatedInvoice.issueDate as string,
                toEmail: updatedInvoice.toEmail as string,
                toName: updatedInvoice.toName as string,
                user: {
                    connect: { id: user?.id } 
                },
                items: {
                    create: updatedInvoice.items.map((item : items) => ({
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
            console.log(newInvoice, "UPDATED" )

        return NextResponse.json({success:true})

    } catch (error) {
        console.log(error)
        return NextResponse.json({success:false});
    } 
  }