import React, { FC } from 'react'
import type { Invoice } from '@prisma/client'
import { GoDotFill } from "react-icons/go";

interface InvoiceProps {
    invoice: Invoice
}

const Invoice : FC<InvoiceProps> = ({invoice}) => {
  return (
    <div className='bg-white mb-6 p-6 px-8 rounded-2xl '>
      <div className='flex justify-between mb-10'>
        <p className='text-[#0C0E16] uppercase font-bold text-lg'><span className='text-text-400 font-semibold'>#</span>{invoice.id.slice(0,5)}</p>
        <p className='text-text-500 text-lg font-semibold'>{invoice.toName}</p>
      </div>
      <div className='flex items-center justify-between'>
        <div>
          <p className='text-text-400 mb-2'>Due <span className='font-bold'>{invoice.issueDate?.toDateString()}</span> </p>
          <p className='font-bold text-xl tracking-wide'>$500.00</p>
        </div>
        <div className='bg-[#fff8f0] px-6 py-3 text-orange-500 rounded-xl '>

          <p className=''><GoDotFill className='inline-block mb-1' height={32} width={20} /> {!invoice.paid && 'Pending'}</p>
        </div>

      </div>
  
    </div>
  )
}

export default Invoice