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

export const getStates = async () => {
    try {
      const statesResponse = await fetch(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/states`);
      const statesData = await statesResponse.json();
      return statesData
    } catch (error) {
      console.error("Error fetching states and cities:", error);
    }
} 













