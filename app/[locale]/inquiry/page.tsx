"use client";

import Navbar from "@/components/Navbar";
import axios from "axios";
import { Mail } from "lucide-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  vehicleId?: number;
  title?: string;
}

export default function Inquiry() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const searchParam = useSearchParams();

  useEffect(() => {
    const id = searchParam.get("id");
    const title = searchParam.get("title");
    if (id?.trim() !== "" || id !== undefined || id !== null) {
      formData.vehicleId = Number(id);
    }
    if (title?.trim() !== "" || title !== undefined || title !== null) {
      formData.title = title?.toString();
    }
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit =async (e: FormEvent) => {
    e.preventDefault();

    const phoneNumber = formData.phone ? parseInt(formData.phone, 10) : null;

    try {
      const res = await axios.post('api/contact', formData)
      if ( res.status == 200 ) {
        formData.name = "";
        formData.email = "";
        formData.phone = "";
        formData.message = "";

        if (formData.vehicleId !== 0 || formData.vehicleId !== undefined || formData.vehicleId !== null) {
          formData.vehicleId = undefined;
        }

        if (formData.title?.trim() !== "" || formData.title !== undefined || formData.title !== null) {
          formData.title = "";
        }

      }
    } catch (error) {
      console.log(error);
      
    }


    console.log("Form submitted:", { ...formData, phone: phoneNumber });
  };

  return (
    <div className="relative min-h-[87vh] w-full  max-w-[1366px] mx-auto px-2">
      <div className="bg-[#08001C67] w-full flex items-center justify-center border border-[#00CCEE] rounded-[10px] min-h-32 mt-2 my-auto">
        <Navbar />
      </div>
      <h2 className="text-3xl flex items-center  text-black font-bold mt-[36px] mb-[36px] gap-2">
        お問い合わせ <Mail size={40} />
      </h2>

      <div className="max-w-winb-max-1366 p-[1px] bg-gradient-to-b from-[#1119B4] to-[#58056B] rounded-2xl ">
        <div className=" w-full  bg-[#fefefe] border rounded-2xl flex justify-between items-center p-5">
          <Image
            src={"/inquiry/contact.png"}
            width={250}
            height={350}
            alt="contact image"
            className="hidden lg:block lg:w-[400px] "
          />
          <form onSubmit={handleSubmit} className="w-full lg:w-2/3 space-y-6">
            <div className="flex flex-col">
              <label
                className="lg:text-[18px] text-black font-semibold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="p-3 border border-gray-300 rounded-[15px] focus:outline-none focus:ring-2 "
              />
            </div>

            <div className="flex flex-col md:flex-row md:space-x-6">
              <div className="flex flex-col w-full md:w-1/2">
                <input
                  type="number"
                  id="number"
                  name="number"
                  value={formData.vehicleId}
                  required
                  hidden
                  className="p-3 border border-gray-300 rounded-[15px] focus:outline-none focus:ring-2 "
                />
              </div>

              {formData.title !== "" ||
                formData.title !== undefined ||
                (formData.title !== null && (
                  <div className="flex flex-col w-full md:w-1/2">
                    <label
                      className="lg:text-[18px] text-black font-semibold mb-2"
                      htmlFor="phone"
                    >
                      Vehicle Name
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.title}
                      onChange={handleChange}
                      required
                      readOnly
                      className="p-3 border border-gray-300 rounded-[15px] focus:outline-none focus:ring-2 "
                    />
                  </div>
                ))}
            </div>

            <div className="flex flex-col md:flex-row md:space-x-6">
              <div className="flex flex-col w-full md:w-1/2">
                <label
                  className="lg:text-[18px] text-black font-semibold mb-2"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="p-3 border border-gray-300 rounded-[15px] focus:outline-none focus:ring-2 "
                />
              </div>

              <div className="flex flex-col w-full md:w-1/2">
                <label
                  className="lg:text-[18px] text-black font-semibold mb-2"
                  htmlFor="phone"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="p-3 border border-gray-300 rounded-[15px] focus:outline-none focus:ring-2 "
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label
                className="lg:text-[18px] text-black font-semibold mb-2"
                htmlFor="message"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="p-3 border border-gray-300 rounded-[15px] focus:outline-none focus:ring-2 "
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-yellow-400 text-sm md:text-base text-black font-medium px-6 py-2 rounded-full hover:bg-yellow-300 transition duration-300"
              >
                Submit Inquiry
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
