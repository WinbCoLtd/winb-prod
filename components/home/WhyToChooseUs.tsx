import Image from "next/image";
import React from "react";

const WhyToChooseUs = () => {
  const cards = [
    {
      icon: (
        <Image
          src={"/home/w1.png"}
          alt="icon"
          width={30}
          height={30}
          className="object-cover object-center"
        />
      ),
      title: "Reliable Financing Solutions",
      description:
        "Enjoy stress-free financing with options tailored to your needs, helping you save more on your vehicle.",
    },
    {
      icon: (
        <Image
          src={"/home/w2.png"}
          alt="icon"
          width={30}
          height={30}
          className="object-cover object-center"
        />
      ),
      title: "Certified Pre-Owned Vehicles",
      description:
        "Our dealership ensures every vehicle meets the highest standards, providing you with only the best-certified pre-owned vehicles.",
    },
    {
      icon: (
        <Image
          src={"/home/w3.png"}
          alt="icon"
          width={30}
          height={30}
          className="object-cover object-center"
        />
      ),
      title: "Transparent Deals",
      description:
        "We offer clear and honest pricing with no hidden fees, so you know exactly what you&aposre getting.",
    },
    {
      icon: (
        <Image
          src={"/home/w4.png"}
          alt="icon"
          width={30}
          height={30}
          className="object-cover object-center"
        />
      ),
      title: "Expert Customer Service",
      description:
        "Our dedicated team is here to assist you with any questions and ensure a smooth buying experience.",
    },
  ];
  return (
    <div className="max-w-winb-max-1366 w-full mx-auto py-i px-1 flex flex-col items-center justify-center">
      <h2 className="font-semibold text-4xl text-center mb-2">Why Choose Us</h2>
      <p className="font-medium text-2xl text-center">なぜ私たちを選ぶのか</p>

      <div className="mt-12 py-1 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0 px-2">
        {cards.map((card, index) => (
          
            <div
            key={index} className="border p-3 border-black rounded-lg w-72 h-60 mx-auto flex flex-col items-start">
              {card.icon}
              <h3 className="mt-5 mb-2 text-[16px] font-semibold">{card.title}</h3>
              <p className="text-sm font-medium text-justify mt-4">
                {card.description}
              </p>
            </div>
        ))}
      </div>
    </div>
  );
};

export default WhyToChooseUs;
