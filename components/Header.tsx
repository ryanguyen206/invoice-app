'use client'
import CreateInvoice  from '@/components/Forms/CreateInvoice'
import { Invoice } from '@prisma/client'
import React, { FC, useState } from 'react'
import plusIcon from '@/public/assets/icon-plus.svg'
import Image from 'next/image'
import {Button, useDisclosure} from "@nextui-org/react";
import Filter from './Filter'

interface HeaderProps {
  invoices: Invoice[] | undefined
    setSelected: React.Dispatch<React.SetStateAction<string>>
    selected: string

}

const Header : FC<HeaderProps> = ({invoices, setSelected, selected}) => {
    const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();


  return (
    <>
    <div className='flex justify-between items-center'>
         <div> 
          <h1 className="text-3xl font-bold tracking-tighter">Invoices</h1>
          {invoices?.length === 0 ? <p className='text-text-500'>No invoices</p> : <p className="text-text-500">There are {invoices?.length}  invoices</p>}
        </div>
        <div className='hidden md:block'>
          <Filter selected={selected} setSelected={setSelected}/>
        </div>

        <div>
          <div  className='cursor-pointer bg-purple  text-white py-2 px-6 rounded-full flex gap-x-4  items-center'>
            <div className='bg-white border rounded-full p-3 hidden lg:block'>
              <Image  className='' alt='Plus Icon meant for adding invoice' src={plusIcon}/>
            </div>
            <Button onPress={onOpen} className='bg-purple text-white text-2xl'>New <span className='hidden md:block'>Invoice</span></Button>
          </div>
        </div>
    </div>
    <div className='md:hidden mt-6'>
          <Filter selected={selected} setSelected={setSelected}/>
    </div>
    {isOpen && <CreateInvoice onClose={onClose} isOpen={isOpen} onOpenChange={onOpenChange}/>}
 
    </>
 
  )
}

export default Header