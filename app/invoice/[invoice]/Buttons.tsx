"use client"
import { updateInvoice } from '@/actions/updateInvoice'
import React from 'react'
import { cn } from '@/libs/cn'
import { Invoice } from '@prisma/client'
import DeleteModal from './DeleteModal';
import EditModal from './EditModal'


interface ButtonsProps {
  invoice: Invoice
  className: string
}

const Buttons = ({invoice, className}: ButtonsProps) => {


  return (
    <div className={cn("space-x-5 flex justify-center", className)}>
        <EditModal invoice={invoice} />
        <DeleteModal id={invoice.id}/>
        <button onClick={() => updateInvoice(invoice.id)}className='py-3 px-5 text-white bg-purple hover:bg-purple_light rounded-full'>Mark as paid </button>
    </div>
  )
}

export default Buttons