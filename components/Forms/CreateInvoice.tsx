import React, { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import "react-datepicker/dist/react-datepicker.css";
import { oneState, cityAPIResponse } from "@/libs/types";
import { FieldValues, useFieldArray, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { FormData } from "@/libs/types";
import DynamicModal from "./DynamicModal";
import { useGetStates } from "@/hooks/useGetStates";
import { useGetCities } from "@/hooks/useGetCities";

interface CreateInvoiceProps {
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
}

const CreateInvoice = ({isOpen, onOpenChange,onClose}: CreateInvoiceProps) => {



  const {states} = useGetStates()
  const {cities, toCities, refetchCities } = useGetCities();

  const router = useRouter();
  const form = useForm<FormData>({
    defaultValues: async () => {
      return {
        street: "",
        city: "Adamsville",
        state: "US-AL",
        postCode: "",
        toStreet: "",
        toCity: "Adamsville",
        toState: "US-AL",
        toPostCode: "",
        description: "",
        issueDate: new Date(),
        toName: "",
        toEmail: "",
        items: [{ name: "", price: 0, quantity: 0 }],
      };
    },
  });

  const { register,handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors, isSubmitting}
  } = form;

  const { fields, append, remove } = useFieldArray({
    name: "items",
    control,
    rules: {
      required: { value: true, message: "Please have at least one item" },
      minLength: 1
    },
  });
;

  const onSubmit = async (data: FieldValues) => {
    const response = await fetch(
      `/api/invoice`,
      {
        method: "POST",
        body: JSON.stringify(data),
        cache: "no-store",
      }
    );
    const datam = await response.json();
    if (datam.success) {
      reset();
      onClose();
      router.refresh()
      toast.success("Invoice created!");
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <DynamicModal
        modalHeader="New Invoice"
        onSubmit={onSubmit}
        setValue={setValue}
        register={register}
        errors={errors}
        isSubmitting={isSubmitting}
        states={states}
        handleSubmit={handleSubmit}
        fields={fields}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        append={append}
        remove={remove}
        toCities={toCities}
        cities={cities}
        refetchCities={refetchCities}
        // setCities={setCities}
        // setToCities={setToCities}

      />        
    </>
  );
};

export default CreateInvoice;
