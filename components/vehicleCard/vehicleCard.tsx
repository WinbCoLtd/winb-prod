'use client';
import React, { useState } from 'react';
import Image from "next/image";
import { useTranslations } from "next-intl";

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
    <div className="relative w-full flex flex-col max-w-[1166px] mx-auto">
      <div className="lg:text-[36px] sm:text-[32px] xs:text-[28px] xxs:text-[28px] font-semibold mt-6 sm:mt-10 xs:mt-10 xxs:mt-10 ml-4">The Most Searched</div>

      <div className="mt-4 flex space-x-6 px-4">
        <button
          onClick={() => toggleCategory('cars')}
          className="lg:text-[20px] sm:text-[18px] xs:text-[18px] xxs:text-[18px] text-gray-600 font-semibold hover:underline"
        >
          Cars
        </button>
        <button
          onClick={() => toggleCategory('vans')}
          className="lg:text-[20px] sm:text-[18px] xs:text-[18px] xxs:text-[18px] text-gray-600 font-semibold hover:underline"
        >
          Vans
        </button>
        <button
          onClick={() => toggleCategory('trucks')}
          className="lg:text-[20px] sm:text-[18px] xs:text-[18px] xxs:text-[18px] text-gray-600 font-semibold hover:underline"
        >
          Trucks
        </button>
      </div>

      {['cars', 'vans', 'trucks'].map((category) => {
        if (showCategory !== category) return null;

        const vehicles = category === 'cars' ? cars : category === 'vans' ? vans : trucks;

        return (
          <div key={category} className="mt-8 px-4">
            <div className="grid lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-3 gap-4">
              {vehicles.map((vehicle) => (
                <div key={vehicle.id} className="border p-4 rounded-lg shadow-lg w-full">
                  <Image
                    src={vehicle.imageUrl}
                    alt={vehicle.name}
                    width={342}
                    height={255}
                    className="lg:w-[342px] lg:h-[255px] object-cover rounded-md"
                  />
                  <h4 className="mt-4 lg:text-[20px] sm:text-[20px] xs:text-[20px] xxs:text-[18px] font-semibold">{vehicle.name}</h4>
                  <p className="lg:text-[16px] sm:text-[16px] xs:text-[16px] xxs:text-[14px]  text-gray-500">{vehicle.condition}</p>
                  <p className="mt-2 lg:text-[36px] sm:text-[28px] xs:text-[28px] xxs:text-[24px] font-semibold text-black">{vehicle.price}</p>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      <h2 className="lg:text-[36px] sm:text-[36px] xs:text-[30px] xxs:text-[28px] font-semibold text-center mt-12">Why Choose Us</h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-8 px-4">
        {[
          {
            icon: "/home/w1.png",
            title: "Reliable Financing Solutions",
            text: "Enjoy stress-free financing with options tailored to your needs, helping you save more on your vehicle.",
          },
          {
            icon: "/home/w2.png",
            title: "Certified Pre-Owned Vehicles",
            text: "Our dealership ensures every vehicle meets the highest standards, providing you with only the best-certified pre-owned vehicles.",
          },
          {
            icon: "/home/w3.png",
            title: "Transparent Deals",
            text: "We offer clear and honest pricing with no hidden fees, so you know exactly what you're getting.",
          },
          {
            icon: "/home/w4.png",
            title: "Expert Customer Service",
            text: "Our dedicated team is here to assist you with any questions and ensure a smooth buying experience.",
          },
        ].map(({ icon, title, text }, index) => (
          <div
            key={index}
            className="border border-black p-4 rounded-lg flex flex-col items-start transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl w-full max-w-[280px] mx-auto"
          >
            <Image src={icon} alt={`Icon ${index + 1}`} width={30} height={30} className="mb-4" />
            <h4 className="lg:text-[16px] sm:text-[14px] xs:text-[14px] xxs:text-[14px]font-semibold mb-4">{title}</h4>
            <p className="lg:text-[14px] sm:text-[12px] xs:text-[14px] xxs:text-[14px] text-gray-600 font:medium">{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VehicleCard;
