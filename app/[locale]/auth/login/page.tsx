/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Login = () => {
  const [username, setusername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const res = await response.json();
         localStorage.setItem('token', res.token)
         localStorage.setItem('id', res.id)
         if(res.role){
          localStorage.setItem('role',res.role)
         }
        router.push('/admin'); // Redirect to the dashboard or home
      } else {
        const { error } = await response.json();
        setError(error || 'Invalid login credentials');
      }
    } catch (err) {
      setError('Something went wrong. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200 p-2">
      <div className="w-full max-w-md p-6 bg-white border border-yellow-400 rounded-lg shadow-md text-center">
        <Image
          src="/home/logo.png"
          alt="Logo"
          width={96}
          height={96}
          className="w-24 h-auto mx-auto mb-6"
        />
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Login</h2>

        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label htmlFor="username" className="text-left font-medium mb-1">
              username:
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setusername(e.target.value)}
              required
              placeholder="Enter your username"
              className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="text-left font-medium mb-1">
              Password:
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={` mx-auto px-4 py-2 w-full bg-yellow-400 text-white font-semibold rounded-md hover:bg-[#96a830] transition ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-600">
          Don’t have an account?{' '}
          <Link href={'/auth/register'} className="text-[#617bc2] hover:text-[#3c5ebb] font-medium">
            Register Here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
