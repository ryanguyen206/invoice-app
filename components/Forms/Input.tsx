import React, { FC } from 'react'

interface InputProps {
    text?:string
    placeholder?:string
    name:string 
    label:string
}

const Input : FC<InputProps> = ({name, label}) => {
  return (
    <div className='flex flex-col'>
        <label className='text-text-400 font-semibold mb-2' htmlFor={name}>{label}</label>
        <input 
            id={name}
            name={name}
            type='text'
            className='py-2 px-2 rounded-lg border border-text-500'
        />
    </div>
  )
}

export default Input