/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
   
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <div className="w-full max-w-md p-6 bg-white border border-[#c3d173] rounded-lg shadow-md text-center">
      <Image
        src="/home/logo.png"
        alt="Logo"
        width={96} 
        height={96} 
        className="w-24 h-auto mx-auto mb-6"
        />
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Login</h2>

        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        <form  className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label htmlFor="email" className="text-left font-medium mb-1">Username:</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              className="px-3 py-2 border  rounded-md focus:outline-none focus:ring-2 "
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="text-left font-medium mb-1">Password:</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              className="px-3 py-2 border  rounded-md focus:outline-none focus:ring-2"
            />
          </div>

          <button
            type="submit"
            className="w-3/5 mx-auto px-4 py-2 bg-[#cce449] text-white font-semibold rounded-md hover:bg-[#96a830] transition"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-600">
          Don’t have an account? 
          <Link href={'/auth/register'} className="text-[#617bc2] hover:text-[#3c5ebb] font-medium">Register Here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
