/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import Navbar from "@/components/Navbar";
import axios from "axios";
import { Mail } from "lucide-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useLocale } from "next-intl";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

interface FormData {
  name: string;
  email: string;
  phone: string;
  countryCode?: string;
  message: string;
  vehicleId?: number;
  title?: string;
}

export default function Inquiry() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    countryCode: "+94",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const searchParam = useSearchParams();
  const locale = useLocale();

  const handlePhoneChange = (value: string, country: any) => {
    setFormData((prev) => ({
      ...prev,
      phone: value, // The full phone number with country code
      countryCode: `+${country.dialCode}`, // Extract country code
    }));
  };
  

  useEffect(() => {
    const id = searchParam.get("id");
    const title = searchParam.get("title");

    setFormData((prev) => ({
      ...prev,
      vehicleId: id ? Number(id) : undefined,
      title: title || undefined,
    }));
  }, [searchParam]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("/api/contact", formData);

      if (res.status === 200) {
        toast.success("Inquiry submitted successfully!");
        setFormData({ name: "", email: "", phone: "", message: "" });
      }
    } catch (err) {
      console.log(err);
      
      toast.error("Failed to submit the inquiry. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-[87vh] w-full max-w-[1366px] mx-auto px-2 pb-10">
      <ToastContainer position="top-right" autoClose={3000} />
      
      <div className="bg-[#08001C67] w-full flex items-center justify-center border border-[#00CCEE] rounded-[10px] min-h-32 mt-2 my-auto">
        <Navbar />
      </div>

      <h2 className="text-3xl flex items-center text-black font-bold mt-[36px] mb-[36px] gap-2">
        {locale === "en" ? "Inquiry" : "お問い合わせ"} <Mail size={40} />
      </h2>

      <div className="max-w-winb-max-1366 p-[1px] bg-gradient-to-b from-[#1119B4] to-[#58056B] rounded-2xl mb-10">
        <div className="w-full bg-[#fefefe] border rounded-2xl flex justify-between items-center p-5">
          <Image
            src="/inquiry/contact.png"
            width={250}
            height={350}
            alt="contact image"
            className="hidden lg:block lg:w-[400px]"
          />
          <form onSubmit={handleSubmit} className="w-full lg:w-2/3 space-y-6">
            <div className="flex flex-col">
              <label className="lg:text-[18px] text-black font-semibold mb-2" htmlFor="name">
                {locale === "en" ? "Name" : "名前"}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="p-3 border border-gray-300 rounded-[15px] focus:outline-none focus:ring-2"
              />
            </div>

            {formData.title && (
              <div className="flex flex-col">
                <label className="lg:text-[18px] text-black font-semibold mb-2" htmlFor="title">
                  {locale === "en" ? "Vehicle Name" : "車両名"}
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  readOnly
                  className="p-3 border border-gray-300 rounded-[15px] focus:outline-none focus:ring-2"
                />
              </div>
            )}

            <div className="flex flex-col md:flex-row md:space-x-6">
              <div className="flex flex-col w-full md:w-1/2">
                <label className="lg:text-[18px] text-black font-semibold mb-2" htmlFor="email">
                  {locale === "en" ? "Email Address" : "電子メールアドレス"}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="p-3 border border-gray-300 rounded-[15px] focus:outline-none focus:ring-2"
                />
              </div>
                <div>
                <label className="lg:text-[18px] text-black font-semibold mb-2">
                  {locale === "en" ? "Phone Number" : "電話番号"}
                </label>
                <PhoneInput
                  country={"jp"} // Default country (Sri Lanka)
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  inputClass="p-7 border border-gray-300 rounded-[15px]"
                  containerClass="w-full"
                  inputStyle={{borderRadius:'15px', width:'400px'}}
                  buttonStyle={{borderTopLeftRadius: '15px', borderBottomLeftRadius: '15px'}}
                  enableSearch={true} // Enable search for countries
                
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="lg:text-[18px] text-black font-semibold mb-2" htmlFor="message">
                {locale === "en" ? "Message" : "メッセージ"}
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="p-3 border border-gray-300 rounded-[15px] focus:outline-none focus:ring-2"
              />
            </div>

            <div className="flex justify-center w-full">
              <button
                type="submit"
                disabled={loading}
                className="bg-yellow-400 text-lg md:text-base text-[#1b1b1b] cursor-pointer font-bold px-6 py-3 rounded-xl hover:bg-yellow-300 transition duration-300"
              >
                {locale === "en"
                  ? loading
                    ? "Submitting..."
                    : "Submit Inquiry"
                  : locale === "ja"
                  ? loading
                    ? "送信中..."
                    : "お問い合わせを送信"
                  : "お問い合わせを送信"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
