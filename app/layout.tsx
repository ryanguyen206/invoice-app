import type { Metadata } from "next";
import { League_Spartan } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { getServerSession } from "next-auth";
import SessionProvider  from "../components/SessionProvider"
import Navbar from "@/components/Navbar";

const leage_spartan = League_Spartan({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Invoice App",
  description: "Create and manage invoices efficently!",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  const session = await getServerSession()
  return (



    <html lang="en">
  <body className={`${leage_spartan.className} h-screen bg-bg_light`}>
        <Toaster position="top-center" />
        <div className="flex">
          <Navbar/>
          <SessionProvider session={session}>
            <div className="container h-full mx-auto xl:px-30 max-w-6xl">
              {children}
            </div>
          </SessionProvider>
        </div>
   
    </body>
    </html>
  );
}
