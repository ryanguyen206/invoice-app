'use client'
import { signOut } from 'next-auth/react'
import React from 'react'
import logo from '@/public/assets/logo.svg'
import Image from 'next/image'


const Navbar = () => {
  return (
    <div className='bg-[#252945] h-screen w-[160px] flex flex-col '>
      <div className='flex-1'>
        <div className='w-full h-[80px] bg-purple'></div>
          <div className='w-full  flex justify-center items-center relative'>
            <div className='absolute'>
              <Image  className='' alt="Invoice Logo" src={logo} />
            </div>
          </div>
        <div className='w-full h-[80px] bg-purple_light rounded-br-3xl'></div>
      </div>

    <div className='mx-auto text-center w-full'>
      <hr className='opacity-45'/>
      <button className='text-white my-10 ' onClick={() => signOut({callbackUrl:'/sign-in'})}>Sign out</button>
    </div>
    
  </div>

  
  
  )
}

export default Navbar