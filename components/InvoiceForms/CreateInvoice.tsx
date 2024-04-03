import { createInvoice } from '@/actions/createInvoice'
import Input from '../Forms/Input'
import React, { FC, useState } from 'react'
import toast from 'react-hot-toast'
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import "react-datepicker/dist/react-datepicker.css";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
  
interface CreateInvoiceProps {
    isOpen : boolean
    onOpenChange : () => void
}

const CreateInvoice : FC<CreateInvoiceProps> =  ({isOpen, onOpenChange}) => {
 
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const [scrollBehavior, setScrollBehavior] = React.useState<"outside" | "normal" | "inside" | undefined>("inside");

  return (

        <>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior={scrollBehavior}>
          <ModalContent>
            {(onClose) => (
              <>
                   <ModalHeader className="flex flex-col gap-1 text-3xl pt-10">New Invoice</ModalHeader>
                <ModalBody>
                <form action={
                    async (formData) => {
                    const response = await createInvoice(formData)
                    toast.success(response.message)
            }
        }>
                <h2 className='text-purple text-xl font-semibold mb-6'>Bill From</h2>
                <Input name={'address'} label={'Street Address'} />
                <div className='mt-6 grid grid-cols-2 '>
                    <div className='mr-10'><Input name={'city'} label={'City'}/></div>
                    <div className=''><Input name={'postalCode'} label={'Post Code'}/></div>    
                    <div className='mt-6 col-span-2'><Input name={'country'} label={'Country'}/> </div>
                </div>
                <h2 className='text-purple text-xl font-semibold mb-6 mt-10'>Bill To</h2>
                <div className='flex flex-col space-y-6'>  
                    <Input name={'toName'} label={`Client's Name`}/>
                    <Input name={'toEmail'} label={`Client's Email`}/>
                    <Input name={'toAddress'} label={'Street Address'} />
                </div>

                <div className='mt-6 grid grid-cols-2 mb-6 '>
                    <div className='mr-10'><Input name={'toCity'} label={'City'}/></div>
                    <div className=''><Input name={'toPostCode'} label={'Post Code'}/></div>    
                    <div className='mt-6 col-span-2'><Input name={'toCountry'} label={'Country'}/> </div>
                </div>

                <div className='mb-6 flex flex-col'>
                    <label className='text-text-400 font-semibold mb-2 ' htmlFor='issueDate'>Invoice Date</label>
                    <DatePicker  showIcon className='px-2 py-2 rounded-lg border border-text-500' id="issueDate" name="issueDate" selected={startDate} onChange={(date) => setStartDate(date)} />    
                </div>
          
                <Input name={'description'} label={'Project Description'}/>
                {/* <h2 className='text-text-500 text-xl font-semibold my-6'>Items List</h2> */}
      
            </form>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="default" className='bg-purple text-white' >
                        <button className='' type='submit'>Create</button>
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
        </>
  )
}

export default CreateInvoice