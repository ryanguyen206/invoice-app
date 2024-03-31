"use server"
import { getServerSession } from 'next-auth'
import prisma from '../libs/prismadb'
import { authOptions } from '../libs/auth'
import { revalidatePath } from 'next/cache'

export const createInvoice = async (formData: FormData) => {
    const session = await getServerSession(authOptions)

    const street = formData.get("street")
    const city = formData.get("city")
    const postCode = formData.get("postCode")
    const country = formData.get("country")

    const toStreet = formData.get("toStreet")
    const toName = formData.get("toName")
    const toEmail =  formData.get("toEmail")
    const toCity = formData.get("toCity")
    const toPostCode = formData.get("toPostCode")
    const toCountry = formData.get("toCountry")

    const description = formData.get("description")

    const issueDate = formData.get("issueDate") as string

    const formattedDate = new Date(issueDate)

    console.log(formattedDate)


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
            city: city as string,
            postCode: postCode as string,
            country: country as string,
            toStreet: toStreet as string,
            toName: toName as string,
            toEmail: toEmail as string,
            toCity: toCity as string,
            toPostCode: toPostCode as string,
            toCountry: toCountry as string,
            issueDate: formattedDate,
            user: {
                connect: { id: user?.id } 
            }
        }
    });

    revalidatePath('/')
    
    return {message:"Invoice created"}
    
}