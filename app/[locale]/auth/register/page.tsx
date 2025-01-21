'use client'

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface FormData {
  name: string;
  email: string;
  password: string;
  address: string;
  district: string;
  phoneNumber: string;
}

const Register = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    address: '',
    district: '',
    phoneNumber: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="mt-12 mb-12 w-full max-w-md p-6 bg-white shadow-md border-2 border-[#c3d173]  rounded-lg text-center">
        <Image
            src="/home/logo.png"
            alt="Logo"
            width={96} 
            height={96} 
            className="w-24 h-auto mx-auto mb-6"
        />
        <h2 className="mb-6 text-2xl font-bold text-gray-800">Register</h2>
        <form  className="flex flex-col">
          <div className="mb-4 text-left">
            <label className="block mb-2 font-semibold text-gray-700">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg focus:ring-2  focus:outline-none"
            />
          </div>
          <div className="mb-4 text-left">
            <label className="block mb-2 font-semibold text-gray-700">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg focus:ring-2  focus:outline-none"
            />
          </div>
          <div className="mb-4 text-left">
            <label className="block mb-2 font-semibold text-gray-700">Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg focus:ring-2  focus:outline-none"
            />
          </div>
          <div className="mb-4 text-left">
            <label className="block mb-2 font-semibold text-gray-700">Address:</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg focus:ring-2  focus:outline-none"
            />
          </div>
          <div className="mb-6 text-left">
            <label className="block mb-2 font-semibold text-gray-700">Phone Number:</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-2/3 mx-auto px-4 py-2 bg-[#cce449] text-white rounded-lg hover:bg-[#96a830] focus:outline-none"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-gray-600">
          Already have an account?{' '}
          <Link 
            href={'/auth/login'} className="text-[#617bc2] font-semibold hover:underline">
            Login Here
        </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;


