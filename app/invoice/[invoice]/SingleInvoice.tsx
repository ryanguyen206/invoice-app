import { Card, Skeleton, CardBody } from '@nextui-org/react'
import { headers } from 'next/headers'
import React from 'react'
import { GoDotFill } from 'react-icons/go'
import StatusChip from '../../../components/StatusChip'
import { oneState } from '@/libs/get'
import type { Invoice } from '@prisma/client'
import Test from '@/components/Test'
import { dateFormatter } from '@/libs/dateFormatter'
import Button from '@/components/Button'
import { deleteInvoice } from '@/actions/deleteInvoice'
import Buttons from './Buttons'

const SingleInvoice =  async ({id}: {id:string}) => {

     const response = await fetch(`${process.env.NEXTAUTH_URL}/api/invoice?id=${id}`)
     const invoice = await response.json()

     const realInvoice : Invoice = invoice.invoice









  return ( 
    realInvoice &&
      <div className='mt-14'>
        <Card className='rounded-md px-6 py-4'>
            <CardBody className=''>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center justify-between w-full lg:max-w-fit md:space-x-4'>
                    <p className='text-text-500'>Status</p>
                    <StatusChip isPaid={realInvoice.paid}/>
                  </div>

                  <Buttons className="hidden lg:block" realInvoice={realInvoice}/>
                </div>
            </CardBody>
        </Card>

        <Card className='rounded-md px-6 py-4 mt-14'>
            <CardBody className='font-semibold'>
                <div className='text-text-400'>
                <p className='text-[#0C0E16] uppercase font-bold text-xl'><span className='text-text-400 font-semibold'>#</span>{realInvoice.id.slice(0,5)}</p>
                <p>{realInvoice.description}</p>
                </div>
                <div className='grid grid-cols-2'>
                  <div className='text-text-400 mt-6'>
                    <h3 className=''>Bill From</h3>
                    <div className='text-black text-lg'>
                      <p>{realInvoice.street}</p>
                      <p>{realInvoice.city}</p>
                      <p>{realInvoice.postCode}</p>
                      <p>{realInvoice.state}</p>
                    </div>
             
                  </div>
                  <div className='text-text-400 mt-6'>
                    <h3 className=''>Bill To</h3>
                    <div className='text-black text-lg'>
                      <p>{realInvoice.toStreet}</p>
                      <p>{realInvoice.toCity}</p>
                      <p>{realInvoice.toPostCode}</p>
                      <p>{realInvoice.toState}</p>
                    </div>
               
                  </div>
                </div>
           
                <div className='text-text-400 mt-6'>
                  <p>Payment Due</p>
                  <p className='text-black text-xl'>{dateFormatter(realInvoice.issueDate)}</p>
                </div>
                <div className='text-text-400 mt-6'>
                  <p>Sent to</p>
                  <p className='text-black text-xl'>{realInvoice.toEmail}</p>
                </div>
            </CardBody>
        </Card>


        <Buttons realInvoice={realInvoice} className='lg:hidden md:left-[114px] fixed bottom-0 bg-white left-0 right-0 py-4 '/>

       
    </div>
    
    
  )
}

export default SingleInvoice