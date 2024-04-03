"use client"
import React, { ButtonHTMLAttributes, FC } from 'react'
import { useFormStatus } from 'react-dom'


interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    onClick? : (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
    defaultText: string
    pendingText:string
    className?:string
}

const Button : FC<ButtonProps> = ({pendingText, defaultText, ...props}) => {
  const {pending} = useFormStatus()
  return (
    <div>
        <button 
          type='submit' 
          disabled={pending}  
          {...props}
          className="uppercase flex mt-10 w-1/2 mx-auto text-center justify-center rounded-md bg-purple p-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {pending ? pendingText : defaultText}
        </button>
    </div>
  )
}

export default Button