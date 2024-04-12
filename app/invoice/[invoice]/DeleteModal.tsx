import React from 'react'
import {Modal, ModalContent, ModalHeader, ModalBody, useDisclosure} from "@nextui-org/react";
import { deleteInvoice } from '@/actions/deleteInvoice';

const DeleteModal = ({id} : {id: string}) => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <>
    
    <button onClick={() => onOpen() } className='py-3 px-6 text-white bg-red hover:bg-red_light rounded-full'>Delete</button>   
    <Modal className='py-6' isOpen={isOpen} onOpenChange={onOpenChange} placement='center'>
        <ModalContent>
          {(onClose) => (
            <>
            <form action={async () => {
                console.log('clicked')
                const response = await deleteInvoice(id)
                console.log(response)
            }}>
            <ModalHeader className="flex flex-col gap-1 text-xl">Confirm Deletion</ModalHeader>
              <ModalBody>
                <p className='text-text-500'> 
                  Are you sure you want to delete invoice #<span className='font-bold uppercase text-black'>{id.slice(0,5)}</span>? This action cannot be undone.
                </p>
                <div className='mt-6'>
                  <button className='py-3 px-6 text-white bg-red hover:bg-red_light rounded-full'>Delete</button>
                </div>
              </ModalBody>
            </form>
              
            </>
          )}
        </ModalContent>
      </Modal>
      </>
  )
}

export default DeleteModal