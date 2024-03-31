"use client"
import React, { FC } from 'react'

interface ButtonProps {
    onClick? : () => void
    text: string
}

const Button : FC<ButtonProps> = ({text}) => {
  return (
    <div>
        <button className='bg-purple hover:bg-purple_light py-3 rounded-full text-white font-semibold px-6'>
            {text}
        </button>
    </div>
  )
}

export default Button