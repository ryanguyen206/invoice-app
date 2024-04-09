"use server"
import { getServerSession } from 'next-auth'
import prisma from '../libs/prismadb'
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';


export const updateInvoice = async (id :string) => {


    try {
        const invoice = await prisma.invoice.update({
            where: {
                id: id
            },
            data: {
                paid: true
            }
        });

      
       
    } catch (error) {
        return { success: false, message: "An error occurred while deleting the invoice." };
    }
    revalidatePath(`/invoice/${id}`);
    redirect(`/invoice/${id}`)

}