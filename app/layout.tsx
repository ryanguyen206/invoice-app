import type { Metadata } from "next";
import { League_Spartan } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { getServerSession } from "next-auth";
import SessionProvider  from "../components/SessionProvider"
import Navbar from "@/components/Navbar";
import Providers from "./providers";

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
  <body className={`${leage_spartan.className} bg-bg_light `}>
        <Providers>
        <Toaster position="top-center" />
        <div className="flex flex-col lg:flex-row">
        
          <SessionProvider session={session}>
        
            <Navbar/>
            <div className="w-full h-full">
              {children}
            </div>
    
          </SessionProvider>
        </div>
        </Providers>
    </body>
    </html>
  );
}
