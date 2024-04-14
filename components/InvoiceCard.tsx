import React, { FC } from "react";
import type { Invoice, Item } from "@prisma/client";
import { GoDotFill } from "react-icons/go";
import Link from "next/link";
import Image from "next/image";
import rightArrow from "@/public/assets/icon-arrow-right.svg";
import { Chip } from "@nextui-org/react";
import StatusChip from "./StatusChip";
import { dateFormatter } from "@/libs/dateFormatter";

interface InvoiceProps {
  invoice: any;
}

const Invoice: FC<InvoiceProps> = ({ invoice }) => {



  const calculateTotal = () => {
    let total = 0;
    invoice.items.forEach((item: Item) => {
      total += item.price * item.quantity;
    });
    return total;
  };

  return (
    <Link className="" href={`/invoice/${invoice.id}`}>
      {/* small */}
      <div className="bg-white mb-6 p-6 px-8 rounded-2xl lg:flex lg:justify-between hover:border-purple border hover:cursor-pointer ">
        <div className="md:hidden">
          <div className="flex justify-between mb-10 lg:mb-0 lg:items-center lg:w-[30%] ">
            <p className="text-[#0C0E16] uppercase font-bold text-lg">
              <span className="text-text-400 font-semibold">#</span>
              {invoice.id.slice(0, 5)}
            </p>
            <p className="text-text-500 text-lg font-semibold ">
              {invoice.toName}
            </p>
          </div>
          <div className="flex items-center justify-between lg:w-[70%]   ">
            <div className="lg:flex lg:items-center lg:w-2/3 lg:justify-between">
              <p className="text-text-400 mb-2 lg:mb-0 lg:ml-20">
                Due{" "}
                <span className="font-bold">
                  {dateFormatter(invoice.issueDate)}
                </span>{" "}
              </p>
              <p className="font-bold text-xl tracking-wide">$500.00</p>
            </div>
            <StatusChip isPaid={invoice.paid} />
      
          </div>
        </div>
        {/* {large} */}
        <div className="hidden md:flex items-center justify-around w-full  ">
          <p className="text-[#0C0E16] uppercase font-bold text-lg  w-[13%]">
            <span className="text-text-400 font-semibold">#</span>
            {invoice.id.slice(0, 5)}
          </p>
          <p className="text-text-400 ml-4 w-1/5">
            Due{" "}
            <span className="font-bold">
              {dateFormatter(invoice.issueDate)}
            </span>{" "}
          </p>
          <p className="text-text-500 text-lg font-semibold   w-1/5">
            {invoice.toName}
          </p>
          <p className="font-bold text-xl tracking-wide  w-1/5">${calculateTotal()}</p>
          <StatusChip className="w-[17%] flex justify-center" isPaid={invoice.paid} />
          <Image
              className="ml-6"
              width={9}
              height={9}
              src={rightArrow}
              alt="Click to view invoice"
            />
        </div>
      </div>

    </Link>
  );
};

export default Invoice;
