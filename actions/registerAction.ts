'use server'
import bcrypt from 'bcrypt'
import prisma from '../libs/prismadb'
import { redirect } from 'next/navigation'



export const registerUser = async (formData: FormData) => {

    const email = formData.get("email")
    const password = formData.get("password")
    const name = formData.get("name")
    
    const hashedPassword = await bcrypt.hash(password as string, 12)


    const existingEmail = await prisma.user.findUnique({
        where: {
            email: email as string,
        },
    });
    
    if (existingEmail) {
        return { error: 'Email has already been taken' };
    }

    const user = await prisma.user.create({
            data: {
                email: email as string,
                hashedPassword,
                name:  name as string
            }
        })
 
    return {success: 'Account has been created'}

  
}