'use client'

import { useState, ChangeEvent, FormEvent } from 'react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export default function Inquiry() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const phoneNumber = formData.phone ? parseInt(formData.phone, 10) : null;

    console.log('Form submitted:', { ...formData, phone: phoneNumber });
  };

  return (
    <div className="relative w-full flex flex-col max-w-[1166px] mx-auto">
      <div className="mt-6 h-[127px] bg-gray-200 flex items-center justify-between px-4 md:px-8">
        Nav
      </div>

      <h2 className="lg:text-[30px]  text-black font-bold mt-[36px] mb-[36px] px-2">Inquiry Form</h2>
      
      <div className="mt-[50px] w-full  bg-white border border-winb-formblue rounded-[15px] flex flex-col items-center p-6 shadow-md">
        <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-6">
          <div className="flex flex-col">
            <label className="lg:text-[18px] text-black font-semibold mb-2" htmlFor="name">Name</label>
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
              <label className="lg:text-[18px] text-black font-semibold mb-2" htmlFor="email">Email Address</label>
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
              <label className="lg:text-[18px] text-black font-semibold mb-2" htmlFor="phone">Phone Number</label>
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
            <label className="lg:text-[18px] text-black font-semibold mb-2" htmlFor="message">Message</label>
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
  );
}
