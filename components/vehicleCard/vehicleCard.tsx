'use client';
import React, { useState } from 'react';
import Image from "next/image";
import { useTranslations } from "next-intl";
import Link from "next/link"; 


function VehicleCard() {
  const [showCategory, setShowCategory] = useState<string | null>('cars');
  const t = useTranslations("HomePage");

  const cars = [
    { id: 1, name: "Toyota Corolla", condition: "New", price: "$20,000", imageUrl: "/vehicledummy.png" },
    { id: 2, name: "Honda Civic", condition: "Used", price: "$18,500", imageUrl: "/vehicledummy.png" },
    { id: 3, name: "Ford Mustang", condition: "New", price: "$30,000", imageUrl: "/vehicledummy.png" },
  ];

  const vans = [
    { id: 1, name: "Ford Transit", condition: "New", price: "$25,000", imageUrl: "/vehicledummy.png" },
    { id: 2, name: "Mercedes Sprinter", condition: "Used", price: "$27,000", imageUrl: "/vehicledummy.png" },
    { id: 3, name: "Ram ProMaster", condition: "New", price: "$22,000", imageUrl: "/vehicledummy.png" },
  ];

  const trucks = [
    { id: 1, name: "Ford F-150", condition: "Used", price: "$35,000", imageUrl: "/vehicledummy.png" },
    { id: 2, name: "Chevrolet Silverado", condition: "New", price: "$40,000", imageUrl: "/vehicledummy.png" },
    { id: 3, name: "Dodge RAM 2500", condition: "Used", price: "$45,000", imageUrl: "/vehicledummy.png" },
  ];

  const toggleCategory = (category: string) => {
    setShowCategory((prevCategory) => (prevCategory === category ? null : category));
  };

  return (
   
    <div className="relative w-full h-screen flex flex-col max-w-[1166px] mx-auto mt-[64px] sm:mt-[96px] lg:mt-[250px]">
      <h2 className="text-[20px] sm:text-[24px] md:text-[28px] lg:text-[36px] font-semibold ml-[10px] sm:ml-[15px] lg:ml-[15px]">
        The Most Searched
      </h2>

      <div className="mt-4 space-x-6">
        <button
          onClick={() => toggleCategory('cars')}
          className="text-[16px] sm:text-[18px] md:text-[20px] text-[#6e6e6e] font-semibold hover:underline ml-[10px] sm:ml-[15px] lg:ml-[15px]"
        >
          Cars
        </button>
        <button
          onClick={() => toggleCategory('vans')}
          className="text-[16px] sm:text-[18px] md:text-[20px] text-[#6e6e6e] font-semibold hover:underline"
        >
          Vans
        </button>
        <button
          onClick={() => toggleCategory('trucks')}
          className="text-[16px] sm:text-[18px] md:text-[20px] text-[#6e6e6e] font-semibold hover:underline"
        >
          Trucks
        </button>
      </div>

      {['cars', 'vans', 'trucks'].map((category) => {
        if (showCategory !== category) return null;

        const vehicles = category === 'cars' ? cars : category === 'vans' ? vans : trucks;

        return (
          <div key={category} className="mt-8 px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {vehicles.map((vehicle) => (
                <div key={vehicle.id} className="border p-4 rounded-lg shadow-lg max-w-xs mx-auto">
                  <Image
                    src={vehicle.imageUrl}
                    alt={vehicle.name}
                    width={342}
                    height={255}
                    className="w-full h-[255px] object-cover rounded-md"
                  />
                  <h4 className="mt-4 text-[16px] sm:text-[18px] md:text-[20px] font-semibold">{vehicle.name}</h4>
                  <p className="text-[14px] sm:text-[16px] text-[#6e6d70] font-medium">{vehicle.condition}</p>
                  <p className="mt-2 text-[18px] sm:text-[20px] md:text-[24px] lg:text-[26px] font-semibold text-black">{vehicle.price}</p>
                </div>
              ))}
            </div>
          </div>
        );
      })}
  
    <h2 className="text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] font-semibold text-black text-center mt-[32px] sm:mt-[64px] lg:mt-[96px]">
        Why Choose Us
    </h2>

          
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
           <div className="border border-black p-4 rounded-lg  w-[280px] h-[250px] mx-auto flex flex-col justify-start transition-transform duration-300 ease-in-out hover:transform hover:scale-105 hover:shadow-2xl">
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

          <div className="border border-black p-4 rounded-lg w-[280px] h-[250px] mx-auto flex flex-col justify-start transition-transform duration-300 ease-in-out hover:transform hover:scale-105 hover:shadow-2xl">
            <Image
              src="/home/w2.png"
              alt="Icon 2"
              width={30}
              height={30}
              className="mb-4 "
            />
            <h4 className="text-[20px] font-semibold">Certified Pre-Owned Vehicles</h4>
            <p className="text-[16px] font-medium text-justify mt-4 sm:mt-6 md:mt-8">We guarantee top-certified pre-owned vehicles meeting the highest standards.</p>
          </div>

          <div className="border border-black p-4 rounded-lg w-[280px] h-[250px] mx-auto flex flex-col justify-start transition-transform duration-300 ease-in-out hover:transform hover:scale-105 hover:shadow-2xl">
            <Image
              src="/home/w3.png"
              alt="Icon 3"
              width={30}
              height={30}
              className="mb-4"
            />
            <h4 className="text-[20px] font-semibold">Transparent Deals</h4>
            <p className="text-[16px] font-medium text-justify mt-4 sm:mt-6 md:mt-8">
              We offer clear and honest pricing with no hidden fees, so you know exactly what you're getting.
            </p>
          </div>


          <div className="border border-black p-4 rounded-lg w-[280px] h-[250px] mx-auto flex flex-col justify-start transition-transform duration-300 ease-in-out hover:transform hover:scale-105 hover:shadow-2xl">
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
        
    <div className="mt-8 sm:mt-12 bg-[#D9D9D9] px-4 py-8 sm:py-12">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex justify-center">
        <Image
            src="/vehicledummy.png"
            alt="New Section Image"
            width={591}
            height={557}
            className="object-cover"
        />
        </div>
        <div className="flex flex-col justify-center">
        <h3 className="text-[20px] sm:text-[24px] md:text-[28px] font-semibold text-black">
            Get the Best Deal for Your Vehicle Today
        </h3>
        <p className="mt-3 sm:mt-4 text-[14px] sm:text-[16px] md:text-[18px] font-medium text-[#333333]">
            Join thousands of satisfied customers who found their perfect car with us. We offer exclusive benefits and 24/7 support.
        </p>
        
        <ul className="mt-3 sm:mt-4 text-[14px] sm:text-[16px] md:text-[18px] font-medium text-[#333333] list-disc pl-10">
    <li className="mt-1">Largest network of certified cars.</li>
    <li className="mt-1">Round-the-clock customer assistance.</li>
    <li className="mt-1">Unmatched roadside assistance for all our vehicles.</li>
</ul>

        </div>
    </div>
    </div>


    <div className="mt-12 relative bg-black">
    <Image
    src="/home/vehicle.png"
    alt="Need Assistance"
    width={1153}
    height={473}
    className="w-full h-[300px] sm:h-[400px] md:h-[473px] object-cover rounded-[15px]"
/>

    <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center px-4 text-white bg-black bg-opacity-60">
        <h2 className="text-[20px] sm:text-[24px] md:text-[32px] lg:text-[40px] font-bold text-left">
        Need Assistance? We're Here to Help!
        </h2>
        <p className="mt-4 text-[14px] sm:text-[16px] md:text-[18px] lg:text-[24px] font-semibold text-center md:text-justify">
        Have questions about our services or need more information? Our team is here to help. If you'd like to learn more about WIN-B or have any specific questions, feel free to contact us. Your satisfaction is our number one priority.
        </p>
        <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 lg:bottom-10 lg:right-10">
        <Link href="/contact">
            <button className="bg-winb-yellow text-black text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-[25px] font-semibold hover:bg-yellow-600 w-[100px] sm:w-[120px] md:w-[150px] lg:w-[180px] h-[36px] sm:h-[40px] md:h-[48px] lg:h-[56px]">
            Contact Us
            </button>
        </Link>
        </div>
    </div>
    </div>
    <div className="mb-12 bg-[#D9D9D9]"></div>
    </div>
  );
}

export default VehicleCard;

