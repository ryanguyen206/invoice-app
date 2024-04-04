"use server"
import { getServerSession } from 'next-auth'
import prisma from '../libs/prismadb'
import { authOptions } from '../libs/auth'
import { revalidatePath } from 'next/cache'

export const createInvoice = async (formData: FormData, fromState : string, fromCity : string, toState : string, toCity : string ) => {
    const session = await getServerSession(authOptions)

    const street = formData.get("street")
    const postCode = formData.get("postCode")


    const toStreet = formData.get("toStreet")
    const toName = formData.get("toName")
    const toEmail =  formData.get("toEmail")
    const toPostCode = formData.get("toPostCode")

    const description = formData.get("description")

    const issueDate = formData.get("issueDate") as string

    const formattedDate = new Date(issueDate)


    const user = await prisma.user.findUnique({
        where:{
            email:session?.user?.email as string
        }
    })

    if (!user) {
        return {message: 'User not found'}
    }

    const newInvoice = await prisma.invoice.create({
        data: {
            description: description as string,
            street: street as string,
            city: fromCity as string,
            postCode: postCode as string,
            country: fromState as string,
            toStreet: toStreet as string,
            toName: toName as string,
            toEmail: toEmail as string,
            toCity: toCity as string,
            toPostCode: toPostCode as string,
            toCountry: toState as string,
            issueDate: formattedDate,
            user: {
                connect: { id: user?.id } 
            }
        }
    });

    revalidatePath('/')
    
    return {message:"Invoice created"}
    
}