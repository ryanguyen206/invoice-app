'use client'
import { registerUser } from '@/actions/registerAction';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { FC, useEffect, useRef, useState } from 'react'
import { useFormStatus } from 'react-dom';
import toast from 'react-hot-toast';
import Button from '../Button';
import Input from '../Input';
import { cn } from '@/libs/cn';




interface AuthFormProps {
    formType: string
    onSuccess?: (data : any, formData: FormData) => void
}

const AuthForm : FC<AuthFormProps> = ({formType, onSuccess}) => {
    const router = useRouter()
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const ref = useRef<HTMLFormElement>(null)
    const {pending} = useFormStatus()


    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        const data = await signIn('credentials', {
          email:email,
          password:password,
          redirect:false,
        })
    
        if (data?.error) {
            toast.error(data.error)
        } else {
            router.push('/')
        }
      }


    const formAction = async (formData : FormData) => {
        if (formType === 'register') {
            const data = await registerUser(formData)
            if(onSuccess) {
                onSuccess(data, formData)
            }
        }
    }
      
  return (
    <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full lg:w-[80%] xl:w-[70%] '>
         <div className={cn("flex flex-col mx-10 md:flex-row min-h-full flex-1 justify-center   bg-white rounded-3xl")
      }>
    <div className="w-full md:w-1/2 2xl:w-1/3 mx-auto py-20  order-last md:order-first">
    <div className=" ">
      <h2 className="mb-10 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
            {formType === 'register' ? 'Register' : 'Sign In'}
      </h2>
    </div>
      <form ref={ref} action={async (formData) => formAction(formData)} className="space-y-6 w-1/2 md:w-3/4 mx-auto">
            <Input label='Email' name='email'   value={email} onChange={(e) => setEmail(e.target.value)} />   
            <Input label='Password' name='password'   value={password} onChange={(e) => setPassword(e.target.value)} />  


            {formType === 'register' ? <Button  pendingText={'Registering...'} defaultText={'Register'}/> :       
              <Button pendingText={'Signing in...'} defaultText={'Sign In'} onClick={(e) => handleSubmit(e)}/>
            }
      
      </form>



    </div>
        
    {/* register */}
    <div className='order-1 pt-10 bg-gradient-to-r from-violet-400 w-full to-purple text-center text-white  md:w-1/2 rounded-3xl md:order-last md:rounded-l-[120px] flex flex-col justify-center items-center pb-10 gap-y-6 '>
          <p className="text-3xl font-bold">
            {formType ==='login' ? 'Not a member?' : 'Welcome Back!'}
          </p>

          <p className='lg:text-lg'>
            {formType ==='login' ? <>Register with your personal credentials <br/> to get started creating invoices!</> :     <>Enter your personal details <br /> to use all of the site features</>}
          </p>


          {formType === 'login' ? 
          <>
            <Link href="/register" className="font-semibold text-center">
              <button className='hover:text-gray-200 border px-9 py-2 uppercase rounded-full'> Sign up</button>
            </Link>
          </> :       
            <Link href="/sign-in" className="font-semibold text-center">
              <button  className='hover:text-gray-200 border px-9 py-2 uppercase rounded-full'> Sign in</button>
            </Link>
            }
    </div>
  </div>
    </div>
   
  )

}

export default AuthForm