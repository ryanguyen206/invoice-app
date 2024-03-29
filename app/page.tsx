import Image from "next/image";
import { registerUser } from "@/actions/registerAction";
import RegisterForm from "@/components/Forms/RegisterForm";
import { getServerSession } from "next-auth";
import { redirect} from "next/navigation";


export default async function Home() {
  const session = await getServerSession()


  if (!session || !session.user){
    redirect('/sign-in')
  }


  return (
    <main className="border mt-20 flex justify-between items-center">
        <div> 
          <h1 className="text-3xl font-bold tracking-tighter">Invoices</h1>
          <p className="text-text-500">There are 8 invoices</p>
        </div>
        <div>
          <button>New invoice</button>
        </div>
        <p>Hi {session?.user?.email}</p>
    </main>
  );
}
