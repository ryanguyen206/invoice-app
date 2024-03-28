'use client'
import { signOut } from 'next-auth/react'
import React from 'react'


const Navbar = () => {
  return (
    <div>
      <button onClick={() => signOut({callbackUrl:'/sign-in'})}>Sign out</button>
    </div>
  )
}

export default Navbar