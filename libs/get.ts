import prisma from '@/libs/prismadb'
import { Session } from 'next-auth'
import axios from 'axios'
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


export type countryAPIResponse = {
    data: oneCountry[]
    
}

export type oneCountry = {
    key:string
    value: string
}



export const getStates = async () => {

    const options = {
        method: 'GET',
        url: 'https://referential.p.rapidapi.com/v1/state',
        params: {
          iso_a2: 'us',
          lang: 'en',
          limit: '250'
        },
        headers: {
          'X-RapidAPI-Key': process.env.NEXT_PUBLIC_API_KEY,
          'X-RapidAPI-Host': process.env.NEXT_PUBLIC_API_HOST
        }
      };

      const response : countryAPIResponse = await axios.request(options);
      return response.data
}


export type cityAPIResponse = {
    iso_a2: string;
    key: string;
    state_code: string;
    state_hasc: string;
    timezone: string;
    value: string;
}

export const getCities = async (state_code : string) => {
    const options = {
        method: 'GET',
        url: 'https://referential.p.rapidapi.com/v1/city',
        params: {
          fields: 'iso_a2,state_code,state_hasc,timezone,timezone_offset',
          iso_a2: 'us',
          lang: 'en',
          state_code: state_code
        },
        headers: {
            'X-RapidAPI-Key': process.env.NEXT_PUBLIC_API_KEY,
            'X-RapidAPI-Host': process.env.NEXT_PUBLIC_API_HOST
          }
      }
      const response = await axios.request<cityAPIResponse[]>(options);
      return response.data
}









