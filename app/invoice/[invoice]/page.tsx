import { Suspense } from "react";
import Loading from "./loading";
import Test from "@/components/Test";


export default function Page({ params }: { params: { invoice: string } }) {

    return (
        <Suspense fallback={<Loading />}>
            <Test id={params.invoice} />
        </Suspense>
    )
  
}