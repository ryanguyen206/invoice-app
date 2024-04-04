import { createInvoice } from '@/actions/createInvoice'
import React, { FC, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import "react-datepicker/dist/react-datepicker.css";
import {Modal, ModalContent, ModalHeader, ModalBody, Select, SelectSection, SelectItem, Input} from "@nextui-org/react";
import Button from '../Button';
import { getStates, getCities } from '@/libs/get';
import { oneCountry, cityAPIResponse } from '@/libs/get';


interface CreateInvoiceProps {
    isOpen : boolean
    onOpenChange : () => void
    onClose: () => void
}

const CreateInvoice =  ({isOpen, onOpenChange, onClose} : CreateInvoiceProps) => {
 
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const [scrollBehavior, setScrollBehavior] = React.useState<"outside" | "normal" | "inside" | undefined>("inside");
    
    const [states, setStates] = useState<oneCountry[]>([])

    const [cities, setCities] = useState<cityAPIResponse[]>([])
    const [toCities, setToCities] = useState<cityAPIResponse[]>([])

    const [fromCity, setFromCity] = useState('');
    const [fromState, setFromState] = useState('');

    const [toCity, setToCity] = useState('');
    const [toState, setToState] = useState('');





    const handleStateChange = async (e: React.ChangeEvent<HTMLSelectElement>, type : 'to' | 'from') => {

      const value = e.target.value
      if (type === 'from') {
        setFromState(value)
      } else {
        setToState(value)
      }
      // Fetch cities for the selected state
      await fetchCities(e.target.value, type);
    };


    const handleCityChange = async (e: React.ChangeEvent<HTMLSelectElement>, type : 'to' | 'from') => {
      const value = e.target.value
      if (type === 'from') {
        setFromCity(value)
      } else {
        setToCity(value)
      }
    };

    useEffect(() => {
      console.log(toCity, 'to')
      console.log(fromCity, 'from')
  
    }, [toCity, fromCity])
    
    
  
    const fetchCities = async (stateCode : string, type : 'to' | 'from') => {
      const data = await getCities(stateCode)
      console.log(data)
      if (type === 'from') {
        setCities(data)
      } else {
        setToCities(data)
      }
    
    };

    useEffect(() => {
      const fetchData = async () => {
        const data = await getStates();
        setStates(data)
      };
      fetchData();
    }, []);
    
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
                    const response = await createInvoice(formData, fromState, fromCity, toState, toCity)
                    onClose()
                    toast.success(response.message)
            }
        }>
                <h2 className='text-purple text-xl font-semibold mb-6'>Bill From</h2>
                <Input name={'street'} label={'Street Address'} />
                
                <div className='mt-6 grid grid-cols-2 '>
                    <Select
                      items={cities}
                      label="City"
                      placeholder="Select a city (state first)"
                      className=""
                      onChange={(e) => handleCityChange(e, 'from')}
                   
                    >
                      {(city) => <SelectItem key={city.value}>{city.value}</SelectItem>}
                    </Select>
                    <div className='ml-10'><Input name={'postCode'} label={'Post Code'}/></div>    
                    <Select
                        label="State"
                        placeholder="Select a state"
                        defaultSelectedKeys=""
                        className="col-span-2 mt-6"
                        onChange={(e) => handleStateChange(e, 'from')}
                      >
                        {states.map((state) => (
                          <SelectItem key={state.key} value={state.key}>
                            {state.value}
                          </SelectItem>
                        ))}
                      </Select>


                </div>
                <h2 className='text-purple text-xl font-semibold mb-6 mt-10'>Bill To</h2>
           
                <div className='flex flex-col space-y-6 -z-10'>  
                    <Input name={'toName'} label={`Client's Name`}/>
                    <Input name={'toEmail'} label={`Client's Email`}/>
                    <Input name={'toStreet'} label={'Street Address'} />
                </div>

                <div className='mt-6 grid grid-cols-2 mb-6 '>
                <Select
                      items={toCities}
                      label="City"
                      placeholder="Select a city (state first)"
                      className=""
                      onChange={(e) => handleCityChange(e, 'to')}
                   
                    >
                      {(city) => <SelectItem key={city.value}>{city.value}</SelectItem>}
                    </Select>
                    <div className='ml-10'><Input name={'toPostCode'} label={'Post Code'}/></div>    
                    <Select
                        label="State"
                        placeholder="Select a state"
                        defaultSelectedKeys=""
                        className="col-span-2 mt-6"
                        onChange={(e) => handleStateChange(e, 'to')}
                      >
                        {states.map((state) => (
                          <SelectItem key={state.key} value={state.key}>
                            {state.value}
                          </SelectItem>
                        ))}
                      </Select>
                </div>
                <Input name={'description'} label={'Project Description'}/>
                <div className='mt-6 flex flex-col z-40'>
                    <label className='text-text-400 font-semibold mb-2 ' htmlFor='issueDate'>Invoice Date</label>
                    <DatePicker  showIcon className='px-2 py-2 rounded-lg border border-text-500' id="issueDate" name="issueDate" selected={startDate} onChange={(date) => setStartDate(date)} />    
                </div>   
                <Button className="bg-purple text-white px-6 py-3 my-10 rounded-full" defaultText='Create' pendingText='Creating...'/>
                {/* <h2 className='text-text-500 text-xl font-semibold my-6'>Items List</h2> */}
      
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