"use client"
import React, { useState } from 'react'
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, modal} from "@nextui-org/react";
import {CheckboxGroup, Checkbox} from "@nextui-org/react";
import arrowDown from '@/public/assets/icon-arrow-down.svg'
import arrowUp from '@/public/assets/icon-up.svg'
import Image from 'next/image';
import {RadioGroup, Radio} from "@nextui-org/react";


interface Filter {
    setSelected: React.Dispatch<React.SetStateAction<string>>
    selected: string
}
const Filter = ({selected, setSelected}: Filter) => {
    const [modalOpen, setmodalOpen] = useState(false)


    return (
        <div className='relative'>
        <div className='flex items-center gap-x-2 cursor-pointer' onClick={() => setmodalOpen(prevState => !prevState)}>
         <p className='font-bold text-xl'>Filter <span className='hidden md:inline-block'>by Status</span></p>
         {modalOpen?   <Image className='object-contain w-4 h-4' src={arrowUp} alt="close dropdown"/> : <Image className='object-contain w-4 h-4' src={arrowDown} alt="open dropdown"/>}
        </div>
        {modalOpen && 
        <div className={`absolute w-min md:w-full transition-all duration-300 overflow-hidden ${modalOpen ? 'h-32' : 'h-0'}'}`}>
            <div className="flex flex-col mt-2 gap-3 border  p-6 bg-white rounded-xl">
                <RadioGroup
                  color="secondary"
                  value={selected}
                  onValueChange={setSelected}
                >
                  <Radio className='font-bold hover:border-purple' value="all">All</Radio>
                  <Radio className='font-bold' value="paid">Paid</Radio>
                  <Radio className='font-bold hover:border-purple' value="pending">Pending</Radio>     
                </RadioGroup>
              </div>
        </div>
                
        }
        </div>

        
    
   
         

      );
}

export default Filter