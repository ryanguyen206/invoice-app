import LoginForm from '@/components/Forms/LoginForm'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react'


const SignIn = async () => {
  const session = await getServerSession()
  if (session) {
    redirect('/')
  }
  
  return (
    <div>
        <LoginForm/>
    </div>
  )
}

export default SignIn