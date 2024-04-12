import { Card, Skeleton, CardBody } from "@nextui-org/react";
import React from "react";
import StatusChip from "../../../components/StatusChip";
import { dateFormatter } from "@/libs/dateFormatter";
import Buttons from "./Buttons";
import { Invoice, Item } from "@prisma/client";

const SingleInvoice = async ({ id }: { id: string }) => {
  const response = await fetch(
    `${process.env.NEXTAUTH_URL}/api/invoice?id=${id}`
  );
  const data = await response.json();
  const realInvoice = data.invoice;

  const calculateTotal = () => {
    let total = 0;
    realInvoice.items.forEach((item: Item) => {
      total += item.price * item.quantity;
    });
    return total;
  };

  return (
    <div className="mt-14">
      <Card className="rounded-md px-6 py-4">
        <CardBody className="">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-between w-full lg:max-w-fit md:space-x-6 lg:justify-start md:max-w-min">
              <p className="text-text-500">Status</p>
              <StatusChip isPaid={realInvoice.paid} />
            </div>

            <Buttons className="hidden md:flex" invoice={realInvoice} />
          </div>
        </CardBody>
      </Card>

      <Card className="rounded-md px-6 py-4 my-14 ">
        <CardBody className="font-semibold">
          <div className="text-text-400">
            <p className="text-[#0C0E16] uppercase font-bold text-xl">
              <span className="text-text-400 font-semibold">#</span>
              {realInvoice.id.slice(0, 5)}
            </p>
            <p>{realInvoice.description}</p>
          </div>
          <div className="grid grid-cols-2">
            <div className="text-text-400 mt-6">
              <h3 className="">Bill From</h3>
              <div className="text-black text-lg">
                <p>{realInvoice.street}</p>
                <p>{realInvoice.city}</p>
                <p>{realInvoice.postCode}</p>
                <p>{realInvoice.state}</p>
              </div>
            </div>
            <div className="text-text-400 mt-6">
              <h3 className="">Bill To</h3>
              <div className="text-black text-lg">
                <p>{realInvoice.toStreet}</p>
                <p>{realInvoice.toCity}</p>
                <p>{realInvoice.toPostCode}</p>
                <p>{realInvoice.toState}</p>
              </div>
            </div>
          </div>

          <div className="text-text-400 mt-6">
            <p>Payment Due</p>
            <p className="text-black text-xl">
              {dateFormatter(realInvoice.issueDate)}
            </p>
          </div>
          <div className="text-text-400 mt-6">
            <p>Sent to</p>
            <p className="text-black text-xl">{realInvoice.toEmail}</p>
          </div>

          <div className="">
            {/* large */}
            <table className="hidden md:block w-full  table-auto mt-10 bg-[#f9fafe]">
              <thead className="w-full -2 ">
                <tr className="text-text-400 w-full">
                  <th className="w-1/3  p-6 ">Name</th>
                  <th className="w-1/3 p-6 ">QTY.</th>
                  <th className="w-1/3 p-6 ">Price</th>
                  <th className="w-1/3 p-6 text-end">Total</th>
                </tr>
              </thead>
              <tbody className="w-full mb-4 pb-4">
                {realInvoice.items.map((item: Item) => (
                  <tr key={item.id} className="">
                    <td className="px-6 pb-6">{item.name}</td>
                    <td className="px-6 pb-6">{item.quantity}</td>
                    <td className="px-6 pb-6">${item.price}</td>
                    <td className="text-end px-6 pb-6">
                      ${item.price * item.quantity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* small */}
            <div className="md:hidden mt-10 bg-[#f9fafe]">
              {realInvoice.items.map((item: Item) => (
                <div className="p-6" key={item.id}>
                  <div className="flex items-center justify-between ">
                    <div>
                      <p className="font-bold">{item.name}</p>
                      <p className="text-text-400">
                        {item.quantity} x ${item.price}
                      </p>
                    </div>
                    <p className="font-bold">${item.quantity * item.price}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between bg-[#373b53] w-full text-white rounded-b-lg">
              <p className="p-6">Amount Due</p>
              <p className="p-6 font-bold">${calculateTotal()}</p>
            </div>
          </div>
        </CardBody>
      </Card>

      <Buttons
        invoice={realInvoice}
        className="md:hidden md:left-[114px] w-full mt-10 fixed bottom-0 left-0  border-black bg-white right-0 py-4 "
      />
    </div>
  );
};

export default SingleInvoice;
