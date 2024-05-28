"use client";
import { registerUser } from "@/actions/registerAction";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FC, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import toast from "react-hot-toast";
import Button from "../Button";
import Input from "../Input";
import google from "@/public/assets/google.svg"
import { cn } from "@/libs/cn";
import Image from "next/image";

interface AuthFormProps {
  formType: string;
  onSuccess?: (data: any, formData: FormData) => void;
}

const AuthForm: FC<AuthFormProps> = ({ formType, onSuccess }) => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const ref = useRef<HTMLFormElement>(null);
  const { pending } = useFormStatus();

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const data = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    });

    if (data?.error) {
      toast.error(data.error);
    } else {
      router.push("/");
    }
  };

  const formAction = async (formData: FormData) => {
    if (formType === "register") {
      const data = await registerUser(formData);
      if (onSuccess) {
        onSuccess(data, formData);
      }
    }
  };

  return (

      <div
        className={cn(
          "flex flex-col min-h-screen  lg:flex-row  justify-center   shadow-2xl   bg-white "
        )}
      >
        <div className="w-full pt-6  border-4 flex flex-col flex-grow md:justify-center md:items-center  mx-auto order-last lg:order-first ">
          <div className=" ">
            <h2 className=" my-6 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
              {formType === "register" ? "Register" : "Sign In"}
            </h2>
          </div>
          <form
            ref={ref}
            action={async (formData) => formAction(formData)}
            className="space-y-6 w-1/2 md:w-3/4 mx-auto"
          >
            {formType === "register" &&    
            <Input
              label="Name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            /> }
            <Input
              label="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              label="Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {formType === "register" ? (
              <Button pendingText={"Registering..."} defaultText={"Register"} />
            ) : (
              <Button
                pendingText={"Signing in..."}
                defaultText={"Sign In"}
                onClick={(e) => handleSubmit(e)}
              />
            )}
              <p className="my-6 text-center mx-auto">OR</p>
          <div className="w-full max-w-[350px] mx-auto  md:w-2/3 lg:w-3/4 text-center  bg-blue-500 text-white py-3 rounded-md flex items-center hover:cursor-pointer">
            <Image src={google} alt="google icon" className="ml-4 h-7 w-7 bg-white" />
            <p className="w-full"  onClick={() => signIn('google', {callbackUrl:'/'})}>{formType === "register" ? 'Register' : 'Login'} with google</p>
          </div>
          </form>
          <div>
        
          </div>
      
        </div>

        {/* register */}
        <div className="order-1 pt-10 md:pt-20 bg-gradient-to-r from-violet-400 w-full to-purple text-center text-white lg:order-last flex flex-col justify-center items-center pb-10 gap-y-6 lg:gap-y-10   ">
          <p className="text-4xl lg:text-5xl font-bold">
            {formType === "login" ? "Not a member?" : "Welcome Back!"}
          </p>

          <p className="lg:text-xl">
            {formType === "login" ? (
              <>
                Register with your personal credentials <br /> to get started
                creating invoices!
              </>
            ) : (
              <>
                Enter your personal details <br /> to use all of the site
                features
        

              </>
            )}
          </p>

          {formType === "login" ? (
            <>
              <Link href="/register" className="font-semibold text-center">
                <button className="hover:text-gray-200 border px-9 py-2 uppercase rounded-full">
                  {" "}
                  Sign up
                </button>
              </Link>
            </>
          ) : (
            <Link href="/sign-in" className="font-semibold text-center">
              <button className="hover:text-gray-200 border px-9 py-2 uppercase rounded-full">
                {" "}
                Sign in
              </button>
            </Link>
          )}
        </div>
      </div>

  );
};

export default AuthForm;
