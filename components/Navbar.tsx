"use client";
import { signOut, useSession } from "next-auth/react";
import React from "react";
import logo from "@/public/assets/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {User} from "@nextui-org/react";


const Navbar = () => {
  const { data: session } = useSession();
  const pathname = usePathname()

  console.log(session)

  if (pathname === '/sign-in' || pathname === '/register') {
    return null
  }


  return (

    <>
      {/* large */}
      <div className="hidden bg-[#252945] w-[150px] min-h-screen  lg:flex flex-col ">
        <div className="flex-1">
          <div className="w-full h-[70px] bg-purple"></div>
          <div className="w-full  flex justify-center items-center relative">
            <div className="absolute">
              <Image
                height={70}
                width={40}
                className=""
                alt="Invoice Logo"
                src={logo}
              />
            </div>
          </div>
      
          <div className="w-full h-[70px] bg-purple_light rounded-br-3xl"></div>
        </div>

        <div className="mx-auto text-center w-full">
          <User 
            className="text-white flex flex-col mx-auto text-center mb-4"  
              name={session?.user?.name}
            />
          <hr className="opacity-45" />
          {session ? (
            <button
              className="text-white my-10 "
              onClick={() => signOut({ callbackUrl: "/sign-in" })}
            >
              Sign out
            </button>
          ) : (
            <Link href={"/sign-in"}>
              <button className="text-white my-10">Sign In</button>
            </Link>
          )}
        </div>
      </div>

      {/* small */}
      <div className="lg:hidden bg-[#252945] h-[70px] flex  ">
        <div className="flex-1">
        <div className="w-[70px] h-[35px]">
          <div className="w-[70px] h-[35px] bg-purple rounded-tr-xl"></div>
          <div className="relative w-full ">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <Image
                height={70}
                width={40}
                className=""
                alt="Invoice Logo"
                src={logo}
              />
            </div>
          </div>
          <div className="w-[70px] h-[35px] bg-purple_light rounded-br-xl "></div>
        </div>
        </div>
       

        <div className="flex items-center mr-6 ">
        <User 
            className="text-white flex mx-auto text-center mr-6"  
              name={session?.user?.name}
            />
          <div className="border h-full mr-6 opacity-45"></div>
          
          {session ? (
            <button
              className="text-white   "
              onClick={() => signOut({ callbackUrl: "/sign-in" })}
            >
              Sign out
            </button>
          ) : (
            <Link href={"/sign-in"}>
              <button className="text-white ">Sign In</button>
            </Link>
          )}
     
        </div>


        
      </div>
    </>
  );
};

export default Navbar;
