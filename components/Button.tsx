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
          className="uppercase flex w-full max-w-[350px] mx-auto  md:w-2/3 lg:w-3/4   mt-10 border text-center justify-center rounded-md bg-purple p-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {pending ? pendingText : defaultText}
        </button>
    </div>
  )
}

export default Button