import type { Metadata } from "next";
import { League_Spartan } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const leage_spartan = League_Spartan({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Invoice App",
  description: "Create and manage invoices efficently!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
 
      <body className={leage_spartan.className}>
        <Toaster position="top-center" />
        {children}
      </body>
    </html>
  );
}
