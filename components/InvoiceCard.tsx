import React, { FC } from 'react'
import type { Invoice } from '@prisma/client'
import { GoDotFill } from "react-icons/go";
import Link from 'next/link';
import Image from 'next/image';
import rightArrow from '@/public/assets/icon-arrow-right.svg'
import {Chip} from "@nextui-org/react";
import StatusChip from './StatusChip';

interface InvoiceProps {
    invoice: Invoice
}

const Invoice : FC<InvoiceProps> = ({invoice}) => {
  return (
    <Link className='' href={`/invoice/${invoice.id}`}>
    <div className='bg-white mb-6 p-6 px-8 rounded-2xl lg:flex lg:justify-between hover:border-purple border hover:cursor- '>
      <div className='flex justify-between mb-10 lg:mb-0 lg:items-center lg:w-[30%] '>
        <p className='text-[#0C0E16] uppercase font-bold text-lg'><span className='text-text-400 font-semibold'>#</span>{invoice.id.slice(0,5)}</p>
        <p className='text-text-500 text-lg font-semibold '>{invoice.toName}</p>
      </div>
      <div className='flex items-center justify-between lg:w-[70%]   '>
        <div className='lg:flex lg:items-center lg:w-2/3 lg:justify-between'>
          <p className='text-text-400 mb-2 lg:mb-0 lg:ml-20'>Due <span className='font-bold'>{invoice.issueDate?.toDateString()}</span> </p>
          <p className='font-bold text-xl tracking-wide'>$500.00</p>
        </div>
        <StatusChip isPaid={invoice.paid}/>
        <Image className='hidden xl:block' src={rightArrow} alt='Click to view invoice'/> 
      </div>



    </div>
    </Link>
  )
}

export default Invoice