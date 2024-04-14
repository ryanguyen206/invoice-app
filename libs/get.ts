import prisma from '@/libs/prismadb'
import { Session } from 'next-auth'
import axios from 'axios'

export const getInvoice = async (session: Session | null)  => {
    const user = await prisma.user.findFirst({
        where: {
            email: session?.user?.email as string
        }
    })
    
    if (user?.id) {
        const invoices = await prisma.invoice.findMany({
            where: {
                userId: user.id
            },
            orderBy: {
                createdAt:'desc'
            },
            include:  {
                items:true
            }
        })
        return invoices
    } 

    return []
}



export type oneState = {
    key:string
    value: string
}

export type cityAPIResponse = {
    iso_a2: string;
    key: string;
    state_code: string;
    state_hasc: string;
    timezone: string;
    value: string;
}










