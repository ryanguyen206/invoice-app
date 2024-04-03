'use client'
import { signOut, useSession } from 'next-auth/react'
import React from 'react'
import logo from '@/public/assets/logo.svg'
import Image from 'next/image'
import Link from 'next/link'



const Navbar = () => {
  const {data: session} = useSession()
  return (
    <div className='hidden bg-[#252945] w-[130px] min-h-screen  md:flex flex-col '>
      <div className='flex-1'>
        <div className='w-full h-[70px] bg-purple'></div>
          <div className='w-full  flex justify-center items-center relative'>
            <div className='absolute'>
              <Image height={70} width={40}  className='' alt="Invoice Logo" src={logo} />
            </div>
          </div>
        <div className='w-full h-[70px] bg-purple_light rounded-br-3xl'></div>
      </div>

    <div className='mx-auto text-center w-full'>
      <hr className='opacity-45'/>
      {session && <p className='text-white'>Hi {session?.user?.email}</p>}
      {session ? <button className='text-white my-10 ' onClick={() => signOut({callbackUrl:'/sign-in'})}>Sign out</button> : <Link href={'/sign-in'}><button  className='text-white my-10'>Sign In</button></Link>}
    </div>
    
  </div>

  
  
  )
}

export default Navbar