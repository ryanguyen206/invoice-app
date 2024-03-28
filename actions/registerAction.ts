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

    const exist = await prisma.user.findUnique({
        where:{
            email:email as string
        }
    })

    if (exist) {
        throw new Error("Email has already been taken")
    }

    const user = await prisma.user.create({
            data: {
                email: email as string,
                username: username as string,
                name: name as string,
                hashedPassword
            }
        })
    
    redirect('/')
}