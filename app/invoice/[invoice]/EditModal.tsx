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
import { items } from "@/components/Forms/CreateInvoice";
import toast from "react-hot-toast";
import router from "next/navigation";
import { useRouter } from "next/navigation";

interface EditModalProps {
  invoice: any;
  id: string
}

type FormData = {
  street: string;
  city: string;
  state: string;
  postCode: string;
  toStreet: string;
  toCity: string;
  toState: string;
  toPostCode: string;
  description: string;
  issueDate: Date;
  toName: string;
  toEmail: string;
  items: items[];
};

const EditModal = ({ invoice, id }: EditModalProps) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [scrollBehavior, setScrollBehavior] = React.useState<
  "outside" | "normal" | "inside" | undefined
>("inside");
  const [states, setStates] = useState<oneState[] | undefined>(undefined);
  const [cities, setCities] = useState<cityAPIResponse[] | undefined>(undefined);
  const [toCities, setToCities] = useState<cityAPIResponse[] | undefined>(
    undefined
  );

  const router = useRouter()
  const form = useForm<FormData>()
    

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
    control,
    watch,
    formState: { errors, isSubmitting, isSubmitSuccessful,  },
  } = form;

  const { fields, append, prepend, remove } = useFieldArray({
    name: "items",
    control,
    rules: {
      required: { value: true, message: "Please have at least one item" },
      minLength: 1
    },
  });

  useEffect(() => {
    const getStates = async () => {
      const data = await fetch(
        `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/states`
      );
      const response = await data.json();
      setStates(response);
    };
    getStates();
    
  }, []);

  useEffect(() => {
    const getInvoice = async () => {
      const updatedInvoiceResponse = await fetch(
        `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/invoice?id=${id}`,
        { cache: 'no-cache' }
      );
      const updatedInvoiceData = await updatedInvoiceResponse.json();
      const updatedInvoice = updatedInvoiceData.invoice;
      console.log(updatedInvoice, 'rnm')

      const data = await fetch(`/api/cities?stateCode=${updatedInvoice.state}`);
      const response = await data.json();

      
      const toCitydata = await fetch(`/api/cities?stateCode=${updatedInvoice.toState}`);
      const toCityResponse = await toCitydata.json();
      console.log(toCityResponse)

      setCities(response)
      setToCities(toCityResponse)
      
    form.reset(updatedInvoice)
    };
    getInvoice();
  }, [reset]);


  const handleCityChange = async (city: string, where: "to" | "from") => {
    if (where === "from") {
      setValue("city", city);
    } else {
      setValue("toCity", city);
    }
  };

  const handleStateChange = async (state: string, where: "to" | "from") => {
    const data = await fetch(`/api/cities?stateCode=${state}`);
    const response = await data.json();
    if (where === "from") {
      setValue("state", state);
      setCities(response);
      setValue("city", response[0].value)
    } else {
      setValue("toState", state);
      setToCities(response);
      setValue("toCity", response[0].value)
    }
  };

  const onSubmit = async (data: FieldValues) => {
    console.log(data)
    const response = await fetch(
      `/api/invoice`,
      {
        method: "PATCH",
        body: JSON.stringify({data, invoice}),
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

      <Modal
         size="xl"
         isOpen={isOpen}
         onOpenChange={onOpenChange}
         scrollBehavior={scrollBehavior}
      >
        <ModalContent>
          {(onClose) => (
            <>
               <ModalHeader className="flex flex-col gap-1 text-3xl pt-10">
                Edit Invoice
              </ModalHeader>
                <ModalBody>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <h2 className="text-purple text-xl font-semibold mb-6 px-3">
                    Bill From
                  </h2>
                  <div className="px-3 mb-6 ">
                    <label className="block uppercase tracking-wide text-text-500 text-sm font-bold mb-2">
                      street
                    </label>
                    <input
                      className="appearance-none block w-full font-bold text-black border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      type="text"
                      {...register("street", {
                        required: `Street is required`,
                      })}
                    />
                    {errors.street && (
                      <p className="text-red">{errors.street.message}</p>
                    )}
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-3 mb-6 ">
                      <label className="block uppercase tracking-wide text-text-500 text-sm font-bold mb-2">
                        City
                      </label>
                      <select
                        className="appearance-none block w-full font-bold text-black  border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        {...register("city", {
                          required: `City is required`,
                        })}
                        onChange={(e) =>
                          handleCityChange(e.target.value, "from")
                        }
                      >
                        {cities &&
                          cities?.map((city) => (
                            <option key={city.key} value={city.value}>
                              {city.value}
                            </option>
                          ))}
                      </select>
                      {errors.city && (
                        <p className="text-red">{errors.city.message}</p>
                      )}
                    </div>
                    <div className="px-3 mb-6">
                      <label className="block uppercase tracking-wide text-text-500 text-sm font-bold mb-2">
                        Zip Code
                      </label>
                      <input
                        type="text"
                        className="appearance-none block w-full font-bold text-black border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        {...register("postCode", {
                          required: "Zip code is required",
                          minLength: {
                            value: 5,
                            message: "Length cannot be less than 5 characters",
                          },
                          maxLength: {
                            value: 5,
                            message: "Length cannot exceed 5 characters",
                          },
                        })}
                      />
                      {errors.postCode && (
                        <p className="text-red">{errors.postCode.message}</p>
                      )}
                    </div>
                  </div>
                  <div className="px-3 mb-6 ">
                    <label className="block uppercase tracking-wide text-text-500 text-sm font-bold mb-2">
                      State
                    </label>
                    <select
                      className="appearance-none block w-full font-bold text-black border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      {...register("state", {
                        required: `State is required`,
                      })}
                      onChange={(e) => {
                        handleStateChange(e.target.value, "from");
                      }}
                    >
                      {states &&
                        states?.map((state) => (
                          <option key={state.key} value={state.key}>
                            {state.value}
                          </option>
                        ))}
                    </select>
                    {errors.state && (
                      <p className="text-red">{errors.state.message}</p>
                    )}
                  </div>
                  {/* Bill To */}
                  <h2 className="text-purple text-xl font-semibold mb-6 px-3">
                    Bill To
                  </h2>
                  <div className="px-3 mb-6 ">
                    <label className="block uppercase tracking-wide text-text-500 text-sm font-bold mb-2">
                      Name
                    </label>
                    <input
                      className="appearance-none block w-full font-bold text-black border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      type="text"
                      {...register("toName", {
                        required: `Name is required`,
                      })}
                    />
                    {errors.toName && (
                      <p className="text-red">{errors.toName.message}</p>
                    )}
                  </div>
                  <div className="px-3 mb-6 ">
                    <label className="block uppercase tracking-wide text-text-500 text-sm font-bold mb-2">
                      Email
                    </label>
                    <input
                      className="appearance-none block w-full font-bold text-black border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      type="email"
                      {...register("toEmail", {
                        required: `Email is required`,
                        pattern: {
                          value:
                            /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                          message: "Invalid email address",
                        },
                      })}
                    />
                    {errors.toEmail && (
                      <p className="text-red">{errors.toEmail.message}</p>
                    )}
                  </div>
                  <div className="px-3 mb-6 ">
                    <label className="block uppercase tracking-wide text-text-500 text-sm font-bold mb-2">
                      street
                    </label>
                    <input
                      className="appearance-none block w-full font-bold text-black border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      type="text"
                      {...register("toStreet", {
                        required: `Street is required`,
                      })}
                    />
                    {errors.toStreet && (
                      <p className="text-red">{errors.toStreet.message}</p>
                    )}
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-3 mb-6 ">
                      <label className="block uppercase tracking-wide text-text-500 text-sm font-bold mb-2">
                        City
                      </label>
                      <select
                        className="appearance-none block w-full font-bold text-black border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        {...register("toCity", {
                          required: `City is required`,
                        })}
                        onChange={(e) => handleCityChange(e.target.value, "to")}
                      >
                        {toCities &&
                          toCities?.map((city) => (
                            <option key={city.key} value={city.value}>
                              {city.value}
                            </option>
                          ))}
                      </select>
                      {errors.toCity && (
                        <p className="text-red">{errors.toCity.message}</p>
                      )}
                    </div>
                    <div className="px-3 mb-6  ">
                      <label className="block uppercase tracking-wide text-text-500 text-sm font-bold mb-2">
                        Zip Code
                      </label>
                      <input
                        className="appearance-none block w-full font-bold text-black border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        type="text"
                        {...register("toPostCode", {
                          required: "Zip code is required",
                          minLength: {
                            value: 5,
                            message: "Length cannot be less than 5 characters",
                          },
                          maxLength: {
                            value: 5,
                            message: "Length cannot exceed 5 characters",
                          },
                        })}
                      />
                      {errors.toPostCode && (
                        <p className="text-red">{errors.toPostCode.message}</p>
                      )}
                    </div>
                  </div>
                  <div className="px-3 mb-6 ">
                    <label className="block uppercase tracking-wide text-text-500 text-sm font-bold mb-2">
                      State
                    </label>
                    <select
                      className="appearance-none block w-full font-bold text-black border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      {...register("toState", {
                        required: `State is required`,
                      })}
                      onChange={(e) => {
                        handleStateChange(e.target.value, "to");
                      }}
                    >
                      {states &&
                        states?.map((state) => (
                          <option key={state.key} value={state.key}>
                            {state.value}
                          </option>
                        ))}
                    </select>
                    {errors.toState && (
                      <p className="text-red">{errors.toState.message}</p>
                    )}
                  </div>
                  <div className="px-3 mb-6">
                    <label className="block uppercase tracking-wide text-text-500 text-sm font-bold mb-2">
                      Issue Date
                    </label>
                    <input
                      className="border-2 px-2 py-1"
                      type="date"
                      {...register("issueDate", {
                        required: "Date is required",
                        valueAsDate: true,
                        validate: {
                          pastDate: (v) =>
                            new Date(v) >= new Date() || "Cannot be in past",
                        },
                      })}
                      
                    />
                    {errors.issueDate && (
                      <p className="text-red">{errors.issueDate.message}</p>
                    )}
                  </div>
                  <div className="px-3 mb-6 ">
                    <label className="block uppercase tracking-wide text-text-500 text-sm font-bold mb-2">
                      Description
                    </label>
                    <input
                      className="appearance-none block w-full font-bold text-black0 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      type="text"
                      {...register("description", {
                        required: `Description is required`,
                      })}
                    />
                    {errors.description && (
                      <p className="text-red">{errors.description.message}</p>
                    )}
                  </div>
                  <h2 className="text-purple text-xl font-semibold mb-6 px-3">
                    Items List
                  </h2>
                  {errors.items?.root?.message && <p className="text-red px-3">{errors.items?.root?.message}</p>}
                  {fields.map((item, i) => (
                    <div
                      className="flex px-3 gap-3 mb-6 items-center"
                      key={item.id}
                    >
                      <div>
                    
                          <label className="block uppercase tracking-wide text-text-500 text-sm font-bold mb-2">
                            Name
                          </label>
                      
                        <input
                          className="appearance-none block w-full font-bold text-black border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          type="text"
                          {...register(`items.${i}.name`, {
                            required: "Item name required",
                          })}
                        />
                        {errors.items &&
                          errors.items[i] &&
                          errors?.items[i]?.name && (
                            <p className="text-red">
                              {errors.items[i]?.name?.message}
                            </p>
                          )}
                      </div>
                      <div>
                       
                          <label className="block uppercase tracking-wide text-text-500 text-sm font-bold mb-2 ml-1">
                            Price
                          </label>
                       
                        <input
                          className="appearance-none block w-full font-bold text-black border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          type="number"
                          {...register(`items.${i}.price`, {
                            valueAsNumber: true,
                            required: "Price required",
                            min: {
                              value: 1,
                              message: "Must be > than 0",
                            },
                          })}
                        />
                        {errors.items &&
                          errors.items[i] &&
                          errors?.items[i]?.price && (
                            <p className="text-red">
                              {errors.items[i]?.price?.message}
                            </p>
                          )}
                      </div>
                      <div>
                         
                          <label className="block uppercase tracking-wide text-text-500 text-sm font-bold mb-2 ml-1">
                            Quantity
                          </label>
                        
                        <input
                          className="appearance-none block w-full font-bold text-black border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          type="number"
                          {...register(`items.${i}.quantity`, {
                            valueAsNumber: true,
                            required: "Quantity required",
                            min: {
                              value: 1,
                              message: "Must be > than 0",
                            },
                          })}
                        />
                        {errors.items &&
                          errors.items[i] &&
                          errors?.items[i]?.quantity && (
                            <p className="text-red">
                              {errors.items[i]?.quantity?.message}
                            </p>
                          )}
                      </div>
                      <Image
                        className=" border h-full"
                        onClick={() => remove(i)}
                        src={deleteIcon}
                        alt="Delete item"
                      />
                    </div>
                  ))} 
                  <div className="px-3">
                    <button
                      className="bg-bg_light text-text-400 font-bold px-3 w-full rounded-full my-6 py-2 hover:bg-text-300"
                      type="button"
                      onClick={() =>
                        append({ name: "", price: 0, quantity: 0 })
                      }
                    >
                      + Add Item
                    </button>
                  </div>
                  <div className="px-3 mb-10">
                    <button
                      disabled={isSubmitting}
                      className="disabled:bg-purple_light px-6 py-3 bg-purple hover:bg-purple_light rounded-full text-white"
                    >
                      {isSubmitting ? "Submitting..." : "Submit"}
                    </button>
                  </div>
                </form>
              </ModalBody>
            </>

          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default EditModal;
