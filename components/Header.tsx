'use client'
import CreateInvoice  from '@/components/InvoiceForms/CreateInvoice'
import { Invoice } from '@prisma/client'
import React, { FC, useState } from 'react'

interface HeaderProps {
  invoices: Invoice[] | undefined
}
const Header : FC<HeaderProps> = ({invoices}) => {
    const [modal, isOpen] = useState(false)



  return (
    <>
    <div className='flex justify-between items-center'>
         <div> 
          <h1 className="text-3xl font-bold tracking-tighter">Invoices</h1>
          <p className="text-text-500">There are  invoices</p>
        </div>
        <div>
          <button onClick={() => isOpen(true)}>New Invoice</button>
          <button onClick={() => isOpen(false)}>Close</button>
        </div>
    </div>
    {modal && <CreateInvoice/>}
 
    </>
 
  )
}

export default Header