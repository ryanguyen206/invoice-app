import React, { FC } from 'react'
import type { Invoice } from '@prisma/client'
import InvoiceCard from './InvoiceCard'

interface InvoicesProps {
    invoices: Invoice[]
}

const Invoices : FC<InvoicesProps> = ({invoices}) => {
  
  return (
    <div className=''>
        <ul>
            {invoices.map((invoice) => (
                <div key={invoice.id}>
                    <InvoiceCard invoice={invoice}/>
                </div>
           
            ))}
        </ul> 
  
    </div>
  )
}

export default Invoices