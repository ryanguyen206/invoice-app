import React, { FC } from 'react'

interface InputProps {
    name:string 
    label:string
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string;
}

const Input : FC<InputProps> = ({name, label, value, onChange}) => {
  return (
    <div>
        <label htmlFor={name} className="block font-medium leading-6 text-gray-900">
            {label}
        </label>
        <div className="mt-2">
            <input
                onChange={onChange}
                value={value}
                id={name}
                name={name}
                type={name}
                autoComplete={name}
                required
                className="block w-full text-lg  rounded-md border-2 py-1.5 px-2 text-gray-900 shadow-sm border-gray-300 "
            />
        </div>
    </div>
  )
}

export default Input