"use client"
import React, { FC } from 'react'
import { useFormStatus } from 'react-dom'


interface ButtonProps {
    onClick? : (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
    defaultText: string
    pendingText:string
    className?:string
}

const Button : FC<ButtonProps> = ({pendingText, defaultText, className}) => {
  const {pending} = useFormStatus()
  return (
    <div>
        <button 
          type='submit' 
          disabled={pending}  
          className={className}
          >
            {pending ? pendingText : defaultText}
        </button>
    </div>
  )
}

export default Button