'use server'
import bcrypt from 'bcrypt'
import prisma from '../libs/prismadb'
import { redirect } from 'next/navigation'



export const registerUser = async (formData: FormData) => {

    const email = formData.get("email")
    const username = formData.get("username")
    const name = formData.get("name")
    const password = formData.get("password")
    
    const hashedPassword = await bcrypt.hash(password as string, 12)

    const existingUsername = await prisma.user.findUnique({
        where: {
            username: username as string,
        },
    });
    
    if (existingUsername) {
        return { error: 'Username already exists' };
    }
    
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
                username: username as string,
                name: name as string,
                hashedPassword
            }
        })
 
    return {success: 'Account has been created'}

  
}