import Image from 'next/image'
import React from 'react'

const WhyToChooseUs = () => {
  return (
    <div className='max-w-winb-max-1366 w-full mx-auto py-16 px-6 space-y-2 flex flex-col items-center justify-center'>
        <h2 className='font-semibold text-4xl text-center'>Why Choose Us</h2>
        <p className='font-medium text-2xl text-center'>なぜ私たちを選ぶのか</p>

      <div className="mt-12 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="border p-4 rounded-lg shadow-lg w-[280px] h-[250px] mx-auto flex flex-col items-center transition-transform duration-300 ease-in-out hover:transform hover:scale-105 hover:shadow-2xl">
            <Image
              src="/home/w1.png"
              alt="Icon 1"
              width={30}
              height={30}
              className="mb-4"
            />
            <h4 className="text-[20px] font-semibold">Reliable Financing Solutions</h4>
            <p className="text-[16px] font-medium text-justify mt-4 sm:mt-6 md:mt-8">Enjoy hassle-free financing with tailored options to save more on your vehicle.</p>
          </div>

          <div className="border p-4 rounded-lg shadow-lg w-[280px] h-[250px] mx-auto flex flex-col items-center transition-transform duration-300 ease-in-out hover:transform hover:scale-105 hover:shadow-2xl">
            <Image
              src="/home/w2.png"
              alt="Icon 2"
              width={30}
              height={30}
              className="mb-4"
            />
            <h4 className="text-[20px] font-semibold">Certified Pre-Owned Vehicles</h4>
            <p className="text-[16px] font-medium text-justify mt-4 sm:mt-6 md:mt-8">We guarantee top-certified pre-owned vehicles meeting the highest standards.</p>
          </div>

          <div className="border p-4 rounded-lg shadow-lg w-[280px] h-[250px] mx-auto flex flex-col items-center transition-transform duration-300 ease-in-out hover:transform hover:scale-105 hover:shadow-2xl">
            <Image
              src="/home/w3.png"
              alt="Icon 3"
              width={30}
              height={30}
              className="mb-4"
            />
            <h4 className="text-[20px] font-semibold">Transparent Deals</h4>
            <p className="text-[16px] font-medium text-justify mt-4 sm:mt-6 md:mt-8">
              We offer clear and honest pricing with no hidden fees, so you know exactly what you&aposre getting.
            </p>
          </div>


          <div className="border p-4 rounded-lg shadow-lg w-[280px] h-[250px] mx-auto flex flex-col items-center transition-transform duration-300 ease-in-out hover:transform hover:scale-105 hover:shadow-2xl">
            <Image
              src="/home/w4.png"
              alt="Icon 4"
              width={30}
              height={30}
              className="mb-4"
            />
            <h4 className="text-[20px] font-semibold">Expert Customer Service</h4>
            <p className="text-[16px] font-medium text-justify mt-4 sm:mt-6 md:mt-8">Our team is committed to helping you with any questions and ensuring a seamless buying experience.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WhyToChooseUs