'use client'
import CreateInvoice  from '@/components/InvoiceForms/CreateInvoice'
import { Invoice } from '@prisma/client'
import React, { FC, useState } from 'react'
import plusIcon from '@/public/assets/icon-plus.svg'
import Image from 'next/image'
import {Button, useDisclosure} from "@nextui-org/react";
import { oneCountry } from '@/libs/get'

interface HeaderProps {
  invoices: Invoice[] | undefined
  states: oneCountry[]
}
const Header : FC<HeaderProps> = ({invoices, states}) => {
    const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();


  return (
    <>
    <div className='flex justify-between items-center'>
         <div> 
          <h1 className="text-3xl font-bold tracking-tighter">Invoices</h1>
          {invoices?.length === 0 ? <p className='text-text-500'>No invoices</p> : <p className="text-text-500">There are {invoices?.length}  invoices</p>}
        </div>
        <div>
          <div  className='cursor-pointer bg-purple  text-white py-2 px-6 rounded-full flex gap-x-4  items-center'>
            <div className='bg-white border rounded-full p-3'>
              <Image  className='' alt='Plus Icon meant for adding invoice' src={plusIcon}/>
            </div>
            <Button onPress={onOpen} className='bg-purple text-white text-2xl'>New <span className='hidden md:block'>Invoice</span></Button>
          </div>
        </div>
    </div>

    {isOpen && <CreateInvoice states={states} onClose={onClose} isOpen={isOpen} onOpenChange={onOpenChange}/>}
 
    </>
 
  )
}

export default Header