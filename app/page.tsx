import { getServerSession } from "next-auth";
import { redirect} from "next/navigation";
import Header from "@/components/Header";
import { authOptions } from "@/libs/auth";
import { getInvoice } from "@/libs/get";
import Invoices from "@/components/Invoices";
import { Suspense } from "react";
import Loading from "./loading";

export default async function Home() {
  const session = await getServerSession(authOptions)
  
  if (!session || !session.user){
    redirect('/sign-in')
  }

  const invoices = await getInvoice(session)


  const data = await fetch(`${process.env.NEXTAUTH_URL}/api/states`)
  const states = await data.json()

  // const response = await fetch(`${process.env.NEXTAUTH_URL}/api/invoices`,
  // { cache: "no-cache", method: "GET", headers: headers() }
  // )

  // const invoices : Invoice[] = await response.json()

  return (
    <main className="mt-20 mx-10 lg:mx-20">
        <Header invoices={invoices} states={states}/>
        <Suspense fallback={<Loading/>}>
          <Invoices invoices={invoices}/>
        </Suspense>
   
    </main>
  );
}
