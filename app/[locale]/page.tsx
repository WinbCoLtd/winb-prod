'use client';

import { useState } from "react";
//import Navbar from "@/components/Navbar";
//import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link"; 
import HerosSection from "@/components/home/HerosSection";

export default function Home() {
  const [showCategory, setShowCategory] = useState<string | null>('cars');
//  const t = useTranslations("HomePage");

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
    <main>
      <HerosSection/>
      <div className="relative bg-black">
        <div className="absolute top-0 left-0 w-full flex justify-center items-center z-20 px-4 py-6">
          <h1 className="text-white text-[64px] sm:text-[48px] md:text-[64px] lg:text-[80px] font-extrabold animate-fadeIn text-center">
            Your Trusted Vehicle Marketplace
          </h1>
        </div>

        <Image
          src="/home/homepic.png"
          alt="Vehicle Marketplace"
          layout="responsive"
          width={1166}
          height={847}
          className="opacity-50"
        />


        <div className="absolute top-[50%] left-0 w-full px-4 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg w-full sm:w-3/4 lg:w-[1090px] h-[96px] flex items-center space-x-4">
            <select className="border p-2 rounded-lg w-1/4 text-gray-700">
              <option value="">All Marks</option>
              <option value="ford">Ford</option>
              <option value="chevy">Chevrolet</option>
              <option value="toyota">Toyota</option>
              <option value="bmw">BMW</option>
            </select>

            <select className="border p-2 rounded-lg w-1/4 text-gray-700">
              <option value="">All Models</option>
              <option value="sedan">Sedan</option>
              <option value="suv">SUV</option>
              <option value="truck">Truck</option>
            </select>

            <select className="border p-2 rounded-lg w-1/4 text-gray-700">
              <option value="">Pricing</option>
              <option value="low">Low to High</option>
              <option value="high">High to Low</option>
            </select>

            <button className="bg-yellow-500 text-black p-2 rounded-lg hover:bg-yellow-600 w-[135px] h-[49px] sm:w-[120px] sm:h-[45px]">
              Search
            </button>
          </div>
        </div>
      </div>


      {/* "The Most Searched" section */}
      <div className="mt-8 px-4">
        <h2 className="text-[24px] sm:text-[28px] md:text-[36px] font-semibold">
          The Most Searched
        </h2>

        {/* Links for Cars, Trucks, and Machinery */}
        <div className="mt-4 space-x-6">
          <button
            onClick={() => toggleCategory('cars')}
            className="text-[20px] text-[#6e6e6e] font-semibold hover:underline"
          >
            Cars
          </button>
          <button
            onClick={() => toggleCategory('vans')}
            className="text-[20px] text-[#6e6e6e] font-semibold hover:underline"
          >
            Vans
          </button>
          <button
            onClick={() => toggleCategory('trucks')}
            className="text-[20px] text-[#6e6e6e] font-semibold hover:underline"
          >
            Trucks
          </button>
        </div>
      </div>

      {/* Car Details Section */}
      {showCategory === 'cars' && (
        <div className="mt-8 px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {cars.map((car) => (
              <div key={car.id} className="border p-4 rounded-lg shadow-lg max-w-xs mx-auto">
                <Image
                  src={car.imageUrl}
                  alt={car.name}
                  width={342}
                  height={255}
                  className="w-full h-[255px] object-cover rounded-md"
                />
                <h4 className="mt-4 text-lg font-semibold">{car.name}</h4>
                <p className="text-sm text-[#6e6d70] font-medium">{car.condition}</p>
                <p className="mt-2 text-[20px] sm:text-[24px] md:text-[26px] lg:text-[30px] font-semibold text-black">{car.price}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Van Details Section */}
      {showCategory === 'vans' && (
        <div className="mt-8 px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {vans.map((van) => (
              <div key={van.id} className="border p-4 rounded-lg shadow-lg max-w-xs mx-auto">
                <Image
                  src={van.imageUrl}
                  alt={van.name}
                  width={342}
                  height={255}
                  className="w-full h-[255px] object-cover rounded-md"
                />
                <h4 className="mt-4 text-lg font-semibold">{van.name}</h4>
                <p className="text-sm text-[#6e6d70] font-medium">{van.condition}</p>
                <p className="mt-2 text-[20px] sm:text-[24px] md:text-[26px] lg:text-[30px] font-semibold text-black">{van.price}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Truck Details Section */}
      {showCategory === 'trucks' && (
        <div className="mt-8 px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {trucks.map((truck) => (
              <div key={truck.id} className="border p-4 rounded-lg shadow-lg max-w-xs mx-auto">
                <Image
                  src={truck.imageUrl}
                  alt={truck.name}
                  width={342}
                  height={255}
                  className="w-full h-[255px] object-cover rounded-md"
                />
                <h4 className="mt-4 text-lg font-semibold">{truck.name}</h4>
                <p className="text-sm text-[#6e6d70] font-medium">{truck.condition}</p>
                <p className="mt-2 text-[20px] sm:text-[24px] md:text-[26px] lg:text-[30px] font-semibold text-black">{truck.price}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Why Choose Us Section */}
      <div className="mt-12 px-4">
        <h2 className="text-[28px] sm:text-[32px] md:text-[36px] font-semibold text-black text-center">
          Why Choose Us
        </h2>
      </div>

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

      {/* New Section */}
      <div className="mt-12 bg-[#D9D9D9] px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
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
            <h3 className="text-[24px] sm:text-[28px] md:text-[32px] font-semibold text-black">
              Get the Best Deal for Your Vehicle Today
            </h3>
            <p className="mt-4 text-[16px] sm:text-[18px] font-medium text-[#333333]">
              Join thousands of satisfied customers who found their perfect car with us. We offer exclusive benefits and 24/7 support.
            </p>

            <ul className="mt-4 text-[16px] sm:text-[18px] font-medium text-[#333333] list-disc pl-5">
              <li className="mt-2">Largest network of certified cars.</li>
              <li className="mt-2">Round-the-clock customer assistance.</li>
              <li className="mt-2">Unmatched roadside assistance for all our vehicles.</li>
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
          className="w-full h-[473px] object-cover rounded-[10px]"
        />
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center px-4 text-white bg-black bg-opacity-60">
          <h2 className="text-[32px] md:text-[40px] font-bold text-left">
            Need Assistance? We&aposre Here to Help!
          </h2>
          <p className="mt-4 text-[18px] md:text-[24px] font-semibold text-center md:text-justify">
            Have questions about our services or need more information? Our team is here to help. If you&aposd like to learn more about WIN-B or have any specific questions, feel free to contact us. Your satisfaction is our number one priority.
          </p>
          <div className="mt-6 text-center">
            <Link href="/contact">
            <button className="bg-winb-yellow text-black text-[18px] px-8 py-3 rounded-[25px] font-semibold hover:bg-yellow-600 float-right mt-6 mb-4 sm:mb-6 md:mb-8">
        Contact Us
      </button>

            </Link>
          </div>
        </div>
      </div>

      <div className="mb-12 bg-[#D9D9D9] "></div>
    </main>
  );
}