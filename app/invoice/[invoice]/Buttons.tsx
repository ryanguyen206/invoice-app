"use client"
import { deleteInvoice } from '@/actions/deleteInvoice'
import { updateInvoice } from '@/actions/updateInvoice'
import React from 'react'
import toast from 'react-hot-toast'
import {Modal, ModalContent, ModalHeader, ModalBody, useDisclosure} from "@nextui-org/react";
import { cn } from '@/libs/cn'


const Buttons = ({realInvoice, className}: any) => {

  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <div className={cn("space-x-5 flex justify-center", className)}>
        <button className='py-3 px-6 text-text-400 bg-bg_light hover:bg-text-300 rounded-full '>Edit</button>
        <button onClick={() => onOpen() } className='py-3 px-6 text-white bg-red hover:bg-red_light rounded-full'>Delete</button>
        <button onClick={() => updateInvoice(realInvoice.id)}className='py-3 px-5 text-white bg-purple hover:bg-purple_light rounded-full'>Mark as paid </button>
        

        <Modal className='py-6' isOpen={isOpen} onOpenChange={onOpenChange} placement='center'>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-xl">Confirm Deletion</ModalHeader>
              <ModalBody>
                <p className='text-text-500'> 
                  Are you sure you want to delete invoice #{realInvoice.id.slice(0,5)}? This action cannot be undone
                </p>
                <div className='mt-6 space-x-2 ml-auto'>
                  <button className='py-3 px-6 text-text-400 bg-bg_light hover:bg-text-300 rounded-full ' onClick={onClose}>Cancel</button>
                  <button className='py-3 px-6 text-white bg-red hover:bg-red_light rounded-full' onClick={async () => {
                      const response = await deleteInvoice(realInvoice.id)
                      if (response) {
                        toast.error(response?.message)
                      }
                  }}>Delete</button>
                </div>
       
    
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}

export default Buttons