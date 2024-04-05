import { Card, Skeleton, CardBody } from '@nextui-org/react'
import { headers } from 'next/headers'
import React from 'react'
import { GoDotFill } from 'react-icons/go'
import StatusChip from './StatusChip'
import { oneState } from '@/libs/get'
import type { Invoice } from '@prisma/client'

const Test =  async ({id}: {id:string}) => {

     const response = await fetch(`${process.env.NEXTAUTH_URL}/api/invoice?id=${id}`,
        { cache: "no-cache", method: "GET", headers: headers() }
        )

        const invoice : Invoice = await response.json()
    console.log(invoice)


    
  // const response = await fetch(`${process.env.NEXTAUTH_URL}/api/invoices`,
  // { cache: "no-cache", method: "GET", headers: headers() }
  // )

  // const invoices : Invoice[] = await response.json()


  return (
    <div className='mt-20 mx-10 md:mx-20'>
        <Card>
            <CardBody>
                <div className=''>
                   <StatusChip isPaid={invoice.paid}/>
                </div>
            
            </CardBody>
        </Card>
    </div>
  )
}

export default Test