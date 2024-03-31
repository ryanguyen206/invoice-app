import React, { FC } from 'react'
import type { Invoice } from '@prisma/client'

interface InvoiceProps {
    invoice: Invoice
}

const Invoice : FC<InvoiceProps> = ({invoice}) => {
  return (
    <div className='bg-white mb-2 p-6 '>
      <div className='flex justify-between'>
        <p>{invoice.id}</p>
        <p className=''>{invoice.toName}</p>
      </div>
      <div>
        <p>{invoice.issueDate?.toDateString()}</p>
        <p>{!invoice.paid && 'Pending'}</p>
      </div>
  
    </div>
  )
}

export default Invoice