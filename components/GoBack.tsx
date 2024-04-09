'use client'
import React from 'react'
import { useRouter } from "next/navigation";
import goBackArrow from "@/public/assets/icon-arrow-left.svg"
import Image from 'next/image';

const GoBack = () => {
 const router = useRouter()
  return (
    <div className='flex items-center gap-x-9'>
        <Image width={9} height={9} className='object-contain' alt="Go back" src={goBackArrow}/>
        <button className='font-bold text-xl hover:text-text-500' type="button" onClick={() => router.back()}>
            Go Back
        </button>
    </div>

  )
}

export default GoBack