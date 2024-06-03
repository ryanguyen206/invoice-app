"use client"
import React, { FC, useState } from 'react'
import type { Invoice } from '@prisma/client'
import InvoiceCard from './InvoiceCard'
import emptyInvoice from '@/public/assets/illustration-empty.svg'
import Image from 'next/image'
import Filter from './Filter'
import Header from './Header'
import Pagination from './Pagination'

interface InvoicesProps {
    invoices: Invoice[]
}

const Invoices : FC<InvoicesProps> = ({invoices}) => {
    const [selected, setSelected] = React.useState("all");
    // Filtered invoices based on the showPaid state
    let filteredInvoices : Invoice[] = []

    if (selected === "all") {
        filteredInvoices = invoices
    } else if (selected === "pending") {
        filteredInvoices = invoices.filter(invoice => invoice.paid === false)
    } else {
        filteredInvoices = invoices.filter(invoice => invoice.paid)
    }

     // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfInvoices] = useState(5);
  const endIndex = currentPage * numberOfInvoices;
  const startIndex = endIndex - numberOfInvoices;
  const currentInvoices = filteredInvoices?.slice(startIndex, endIndex);
  const numberOfPages = Math.ceil((filteredInvoices?.length || 0) / numberOfInvoices); 


  return (
    <>
        <Header invoices={invoices} selected={selected} setSelected={setSelected}/>
       {filteredInvoices?.length === 0  ? 
       <div className=' flex flex-col text-center justify-center mt-20 '>
            <Image className='mx-auto text-center' height={500} width={500}  alt="No invoices" src={emptyInvoice}/> 
            <p className='font-bold text-2xl my-4'>There is nothing here</p>
            <p className='text-text-500 text-lg '>Create an invoice by clicking the New button and get started</p>
       </div>
       :
            <div className='mt-10'>
                <ul>
                    {currentInvoices.map((invoice) => (
                        <div key={invoice.id}>
                            <InvoiceCard invoice={invoice}/>
                        </div>
                
                    ))}
                </ul>
                </div>   
            }
          <Pagination setCurrentPage={setCurrentPage} currentPage={currentPage} numberOfPages={numberOfPages}/>
    </>
  )
}

export default Invoices