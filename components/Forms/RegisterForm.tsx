'use client'
import { signIn } from 'next-auth/react'
import React, { useRef } from 'react'
import toast from 'react-hot-toast'
import AuthForm from './AuthForm'

const RegisterForm = () => {

    const onSuccess = async (obj: any, formData: FormData) => {
      if (obj.error) {
        toast.error(obj.error)
      } else {
        toast.success(obj.success) 
        const data = await signIn('credentials', {
          email:formData.get("email"),
          password:formData.get("password"),
          redirect:true,
          callbackUrl:'/'
        })
      }
    }


  return (
    <AuthForm
      formType={`register`}
      onSuccess={onSuccess}
    />
  )
}

export default RegisterForm