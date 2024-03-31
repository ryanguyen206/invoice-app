import { getServerSession } from "next-auth";
import { redirect} from "next/navigation";
import Button from "@/components/Button";
import Header from "@/components/Header";
import { authOptions } from "@/libs/auth";
import prisma from '@/libs/prismadb'
import { getInvoice } from "@/libs/get";
import Invoices from "@/components/Invoices";
import { headers } from "next/headers";

export default async function Home() {
  const session = await getServerSession(authOptions)
  
  if (!session || !session.user){
    redirect('/sign-in')
  }

  const invoices = await getInvoice(session)

  // const response = await fetch(`${process.env.NEXTAUTH_URL}/api/invoices`,
  // { cache: "no-cache", method: "GET", headers: headers() }
  // )

  // const invoices : Invoice[] = await response.json()

  return (
    <main className="mt-20 mx-10 md:mx-20">
      
        <Header invoices={invoices}/>
        <Invoices invoices={invoices}/>
    </main>
  );
}
