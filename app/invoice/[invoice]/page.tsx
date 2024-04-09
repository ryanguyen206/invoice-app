import { Suspense, } from "react";

import Loading from "./loading";
import SingleInvoice from "@/app/invoice/[invoice]/SingleInvoice";
import GoBack from "@/components/GoBack";


export default function Page({ params }: { params: { invoice: string } }) {

    return (

        <Suspense fallback={<Loading />}>
            <div className="mt-20 mx-10 md:mx-20">
            <GoBack/>
            <SingleInvoice id={params.invoice} />
            </div>
   
        </Suspense>
    )
  
}