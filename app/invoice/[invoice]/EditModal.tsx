"use client";
import { Invoice } from "@prisma/client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Input,
  Select,
  dataFocusVisibleClasses,
} from "@nextui-org/react";
import React, { ChangeEvent, useEffect, useState } from "react";
import { LuAsterisk } from "react-icons/lu";
import Button from "@/components/Button";
import deleteIcon from "@/public/assets/icon-delete.svg";
import { FieldValues, useFieldArray, useForm } from "react-hook-form";
import Image from "next/image";
import { cityAPIResponse, oneState } from "@/libs/get";
import { items } from "@/libs/get";
import toast from "react-hot-toast";
import router from "next/navigation";
import { useRouter } from "next/navigation";
import DynamicModal from "@/components/Forms/DynamicModal";
import { FormData } from "@/libs/get";
import { useGetStates } from "@/hooks/useGetStates";

interface EditModalProps {
  id: string
}



const EditModal = ({ id }: EditModalProps) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const [cities, setCities] = useState<cityAPIResponse[] >([]);
  const [toCities, setToCities] = useState<cityAPIResponse[]>([]);

  const router = useRouter()
  const form = useForm<FormData>()
  
    

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors, isSubmitting},
  } = form;

  const { fields, append, remove } = useFieldArray({
    name: "items",
    control,
    rules: {
      required: { value: true, message: "Please have at least one item" },
      minLength: 1
    },
  });

  const {states} = useGetStates()

  useEffect(() => {
    const getInvoice = async () => {
      const updatedInvoiceResponse = await fetch(
        `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/invoice?id=${id}`,
        { cache: 'no-cache' }
      );
      const updatedInvoiceData = await updatedInvoiceResponse.json();
      const updatedInvoice = updatedInvoiceData.invoice;

      

      const data = await fetch(`/api/cities?stateCode=${updatedInvoice.state}`);
      const response = await data.json();

      const toCitydata = await fetch(`/api/cities?stateCode=${updatedInvoice.toState}`);
      const toCityResponse = await toCitydata.json();
      setCities(response)
      setToCities(toCityResponse)
      
    form.reset(updatedInvoice)
    };
    getInvoice();
  }, [reset]);


  const onSubmit = async (data: FieldValues) => {
    console.log(data)
    const response = await fetch(
      `/api/invoice`,
      {
        method: "PATCH",
        body: JSON.stringify({data, id}),
        cache: "no-store",
      }
    );
    const responseData = await response.json();
    if (responseData.success) {
      onClose();
      router.refresh();
      console.log(form, "before")
      toast.success("Invoice updated!");
  
      const updatedInvoiceResponse = await fetch(
        `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/invoice?id=${id}`,
        { cache: 'no-cache' }
      );
      const updatedInvoiceData = await updatedInvoiceResponse.json();
      const updatedInvoice = updatedInvoiceData.invoice;
  
      form.reset({
        ...data, 
        ...updatedInvoice,
      });
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <div>
      <button
        onClick={() => onOpen()}
        className="bg-slate-200 text-text-400 py-3 px-6 rounded-full hover:bg-text-300"
      >
        Edit
      </button>
    <DynamicModal
      append={append}
      errors={errors}
      fields={fields}
      handleSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      modalHeader="Edit Invoice"
      onSubmit={onSubmit}
      register={register}
      remove={remove}
      setValue={setValue}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      type='edit'
      states={states}
      cities={cities}
      toCities={toCities}
      setCities={setCities}
      setToCities={setToCities}
   
    />
    
   
    </div>
  );
};

export default EditModal;
