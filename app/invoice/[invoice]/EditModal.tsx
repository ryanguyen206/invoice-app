"use client";
import { Invoice } from "@prisma/client";
import React from "react";

interface EditModalProps {
  invoice: Invoice;
}

const EditModal = ({ invoice }: EditModalProps) => {
  return (
    <div>
      <button className="bg-slate-200 text-text-400 py-3 px-6 rounded-full hover:bg-text-300" >
        Edit
      </button>
    </div>
  );
};

export default EditModal;
