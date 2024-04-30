"use server"
import { getServerSession } from 'next-auth'
import prisma from '../libs/prismadb'
import { authOptions } from '../libs/auth'
import { revalidatePath } from 'next/cache'
import { items } from '@/libs/types'

export const createInvoice = async (formData: FormData, fromState : string, fromCity : string, toState : string, toCity : string, items : items[] ) => {
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

    if (postCode && toPostCode) {
        const postCodeRegex = /^\d{5}$/;
        if (!postCodeRegex.test(postCode as string) || !postCodeRegex.test(toPostCode as string)) {
            return { error: true, message: "Post Code must be exactly 5 digits and contain only numbers" }
        }
    }



    const user = await prisma.user.findUnique({
        where:{
            email:session?.user?.email as string
        }
    })

    if (!user) {
        return {message: 'User not found'}
    }

    try{
        const newInvoice = await prisma.invoice.create({
            data: {
                description: description as string,
                street: street as string,
                city: fromCity as string,
                postCode: postCode as string,
                state: fromState as string,
                toStreet: toStreet as string,
                toName: toName as string,
                toEmail: toEmail as string,
                toCity: toCity as string,
                toPostCode: toPostCode as string,
                toState: toState as string,
                issueDate: formattedDate,
                user: {
                    connect: { id: user?.id } 
                },
                items: {
                    create: items.map(item => ({
                        name: item.name,
                        quantity: item.quantity,
                        price: item.price
                    }))
                }
            },
            include: {
                items: true
            },
            
            }
        );

    } catch(e) {
        return {message: 'Error creating invoice'}
    }
  


    revalidatePath('/')
    
    return {message:"Invoice created"}
    
}