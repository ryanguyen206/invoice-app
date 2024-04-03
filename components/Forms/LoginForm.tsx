"use client"
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useRef } from 'react'
import toast from 'react-hot-toast'
import AuthForm from './AuthForm'



const LoginForm = () => {
  

  return (
    <AuthForm
      formType={`login`}
    />

  )
}

export default LoginForm