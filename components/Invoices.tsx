import React, { FC } from 'react'
import type { Invoice } from '@prisma/client'
import InvoiceCard from './InvoiceCard'
import emptyInvoice from '@/public/assets/illustration-empty.svg'
import Image from 'next/image'
Image

interface InvoicesProps {
    invoices: Invoice[]
}

const Invoices : FC<InvoicesProps> = ({invoices}) => {
  
  return (
    <>
       {invoices?.length === 0  ? 
       <div className=' flex flex-col text-center justify-center mt-20 '>
            <Image className='mx-auto text-center' height={500} width={500}  alt="No invoices" src={emptyInvoice}/> 
            <p className='font-bold text-2xl my-4'>There is nothing here</p>
            <p className='text-text-500 text-lg '>Create an invoice by clicking the New button and get started</p>
       </div>

       :
            <div className='mt-10 border'>
                <ul>
                    {invoices.map((invoice) => (
                        <div key={invoice.id}>
                            <InvoiceCard invoice={invoice}/>
                        </div>
                
                    ))}
                </ul>
                </div>   
            }
    </>
  )
}

export default Invoices