
import { createInvoice } from '@/actions/createInvoice'
import Input from '../Forms/Input'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import "react-datepicker/dist/react-datepicker.css";

const CreateInvoice =  () => {
    const [startDate, setStartDate] = useState<Date | null>(new Date());
  return (
    <div className=''>
        <form action={
            async (formData) => {
                const response = await createInvoice(formData)
                toast.success(response.message)
            }
        } className=''>
                <h1 className='font-bold text-2xl mb-10'>New Invoice</h1>
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
                    <label className='text-text-400 font-semibold mb-2' htmlFor='issueDate'>Invoice Date</label>
                    <DatePicker  showIcon className='px-2 py-2 rounded-lg' id="issueDate" name="issueDate" selected={startDate} onChange={(date) => setStartDate(date)} />    
                </div>
          
                <Input name={'description'} label={'Project Description'}/>
                {/* <h2 className='text-text-500 text-xl font-semibold my-6'>Items List</h2> */}
      
                <button className='ml-auto block text-white bg-purple py-3 px-6 rounded-full border' type='submit'>Create</button>
            </form>
    </div>
   
     
  )
}

export default CreateInvoice