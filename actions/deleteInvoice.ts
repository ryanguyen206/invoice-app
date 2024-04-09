"use server"
import { getServerSession } from 'next-auth'
import prisma from '../libs/prismadb'
import { redirect } from 'next/navigation';


export const deleteInvoice = async (id :string) => {


    try {
        const invoice = await prisma.invoice.delete({
            where: {
                id: id
         }
        });
       
    } catch (error) {
        return { success: false, message: "An error occurred while deleting the invoice." };
    }
    redirect('/')

}