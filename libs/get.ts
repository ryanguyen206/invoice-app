import prisma from '@/libs/prismadb'
import { Session } from 'next-auth'
import type { Invoice } from '@prisma/client'

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
            }
        })
        return invoices
    } 

    return []

}

