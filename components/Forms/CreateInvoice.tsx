import { createInvoice } from '@/actions/createInvoice'
import React, { FC, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import "react-datepicker/dist/react-datepicker.css";
import {Modal, ModalContent, ModalHeader, ModalBody, Select, SelectSection, SelectItem, Input} from "@nextui-org/react";
import Button from '../Button';
import { oneState, cityAPIResponse } from '@/libs/get';
import { LuAsterisk } from "react-icons/lu";

interface CreateInvoiceProps {
    isOpen : boolean
    onOpenChange : () => void
    onClose: () => void
    states: oneState[]
}

export interface items {
  name: string
  quantity: number
  price: number
}

const CreateInvoice =  ({isOpen, onOpenChange, onClose, states} : CreateInvoiceProps) => {
 
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const [scrollBehavior, setScrollBehavior] = React.useState<"outside" | "normal" | "inside" | undefined>("inside");
  
    const [cities, setCities] = useState<cityAPIResponse[]>([])
    const [toCities, setToCities] = useState<cityAPIResponse[]>([])

    const [fromLocation, setFromLocation] = useState({ city: '', state: '' });
    const [toLocation, setToLocation] = useState({ city: '', state: '' });


    const [name, setName] = useState<string>("")
    const [price, setPrice] = useState(0)
    const [quantity, setQuantity] = useState(0)
    const [formList, setFormList] = useState<items[]>([])

    const handleAddItem = () => {
      if (isNaN(price) || isNaN(quantity)) {
        toast.error("Price and quantity must be a number!")
        return
      }
      setFormList(prevState => [...prevState, {
        name: name,
        price: price,
        quantity: quantity
      }]);

      setName("")
      setPrice(0)
      setQuantity(0)
    }

    const handleLocationChange = async (e: React.ChangeEvent<HTMLSelectElement>, type: 'to' | 'from', field: 'city' | 'state') => {
      const value = e.target.value;
      if (type === 'from') {
        setFromLocation(prevState => ({ ...prevState, [field]: value }));
      } else {
        setToLocation(prevState => ({ ...prevState, [field]: value }));
      }
      // Fetch cities for the selected state
      if (field === 'state') {
        await fetchCities(value, type);
      }
    };
  
    const fetchCities = async (stateCode : string, type : 'to' | 'from') => {
      const data = await fetch(`/api/cities?stateCode=${stateCode}`)
      const response = await data.json()
      if (type === 'from') {
        setCities(response)
      } else {
        setToCities(response)
      }
    
    };   

 
    
  return (

        <>
        <Modal size='xl' isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior={scrollBehavior}>
          <ModalContent>
            {(onClose) => (
              <>
            <ModalHeader className="flex flex-col gap-1 text-3xl pt-10">New Invoice</ModalHeader>
                <ModalBody>
                <form action={
                    async (formData) => {
                    const response = await createInvoice(formData, fromLocation.state, fromLocation.city, toLocation.state, toLocation.city, formList)
                    if (response.error) {
                      toast.error(response.message)
                    } else {
                      onClose()
                      toast.success(response.message)
                    }                
            }
        }>
             
                <h2 className='text-purple text-xl font-semibold mb-6'>Bill From</h2>
                <div className='flex gap-x-1'>
                  <LuAsterisk className='text-red mb-6'/>
                  <p>= required</p>
                </div>

                <Input size='lg' isRequired name={'street'} label={'Street Address'} placeholder='2039 Swag St' />


                
                <div className='mt-6 grid grid-cols-2 '>
                      <Select
                      items={cities}
                      label="City"
                      size='lg' 
                      placeholder="Select a city (state first)"
                      className=""
                      isRequired
                      onChange={(e) => handleLocationChange(e, 'from', 'city')}
                   
                    >
                      {(city) => <SelectItem key={city.value}>{city.value}</SelectItem>}
                    </Select>
                
                    <div className='ml-10'><Input isRequired size='lg' name={'postCode'} placeholder='98112' label={'Post Code'}/></div>    
                    <Select
                      items={states}
                      label="State"
                      placeholder="Select a state"
                      className="mt-6 col-span-2"
                      isRequired
                      size='lg'
                      onChange={(e) => handleLocationChange(e, 'from', 'state')}
                    >
                      {(state) => <SelectItem key={state.key}>{state.value}</SelectItem>}
                    </Select>



                </div>
                <h2 className='text-purple text-xl font-semibold mb-6 mt-10'>Bill To</h2>
           
                <div className='flex flex-col space-y-6 -z-10'>  
                    <Input size='lg'       isRequired name={'toName'} placeholder='John Doe' label={`Client's Name`}/>
                    <Input size='lg'     isRequired name={'toEmail'} placeholder='johndoe@gmail.com' label={`Client's Email`}/>
                    <Input  size='lg'    isRequired name={'toStreet'} placeholder='2039 Happy Place' label={'Street Address'} />
                </div>

                <div className='mt-6 grid grid-cols-2 mb-6 '>
                <Select
                      items={toCities}
                      label="City"
                      placeholder="Select a city (state first)"
                      className=""
                      isRequired
                      size='lg'
                      onChange={(e) => handleLocationChange(e, 'to', 'city')}
                   
                    >
                      {(city) => <SelectItem key={city.value}>{city.value}</SelectItem>}
                    </Select>
                    <div className='ml-10'><Input size='lg' isRequired name={'toPostCode'} placeholder='23021' label={'Post Code'}/></div>    
                    <Select
                      items={states}
                      label="State"
                      isRequired
                      size='lg'
                      placeholder="Select a state"
                      className="mt-6 col-span-2"
                      onChange={(e) => handleLocationChange(e, 'to', 'state')}
                    >
                      {(state) => <SelectItem key={state.key}>{state.value}</SelectItem>}
                    </Select>
                 
                </div>
                <Input size='lg' isRequired placeholder='Dumbbells' name={'description'} label={'Project Description'}/>
                <div className='mt-6 flex flex-col z-40'>
                    <label className='text-text-400 font-semibold mb-2 ' htmlFor='issueDate'>Invoice Date</label>
                    <DatePicker  showIcon className='px-2 py-2 rounded-lg border border-text-500' id="issueDate" name="issueDate" selected={startDate} onChange={(date) => setStartDate(date)} />    
                </div>   

                <div className="w-full">
                    <div className="">
                      <h2 className='text-text-500 text-xl font-semibold my-6'>Items List</h2>
                      <table className='w-full'>
                        <thead className='w-full'>
                          <tr className=''>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                          </tr>
                        </thead>
                        <tbody className='w-full border'>
                          {formList.map(swag => (
                            <tr className='' key={swag.name}>
                              <td>{swag.name}</td>
                              <td>{swag.quantity}</td>
                              <td>{swag.price}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                </div>
                              

                <div className='flex space-x-6'>
                  <Input value={name} onValueChange={setName} size='lg' name={'itemName'} placeholder='Dumbells' label={`Item`}/>
                  <Input value={quantity.toString()} onValueChange={(value: string) => setQuantity(parseInt(value))} className='w-1/3' size='lg'  name={'itemQuantity'} placeholder='2' label={`Qty`}/>
                  <Input value={price.toString()} onValueChange={(value: string) => setPrice(parseFloat(value))} size='lg'  name={'itemPrice'} placeholder='156' label={`Price`}/>
                </div>

                <div onClick={() => handleAddItem()} className='mt-8 cursor-pointer py-3 px-6 text-text-400 bg-bg_light hover:bg-text-300 rounded-full items-center flex justify-center'>
                  <svg width="11" height="11" xmlns="http://www.w3.org/2000/svg"><path d="M6.313 10.023v-3.71h3.71v-2.58h-3.71V.023h-2.58v3.71H.023v2.58h3.71v3.71z" fill="#7E88C3" fill-rule="nonzero"/></svg>
                  <p className='text-center' >Add New Item</p>
                </div>
     
                <Button className="bg-purple text-white px-6 py-3 my-10 rounded-full" defaultText='Create' pendingText='Creating...'/> 
               
               
            </form>
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
        </>
  )
}

export default CreateInvoice