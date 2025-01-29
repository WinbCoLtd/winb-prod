import Image from "next/image";
import React from "react";
import { useLocale } from "next-intl";

const WhyToChooseUs = () => {
  const local = useLocale();

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
      title: "Reliable Financing Solutions/信頼できるファイナンシングソリューション",
      description:
        "Enjoy stress-free financing with options tailored to your needs, helping you save more on your vehicle./ニーズに合わせたオプションでストレスフリーなファイナンシングをお楽しみいただき、車両購入においてさらに節約できます。",
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
      title: "Certified Pre-Owned Vehicles/認定中古車",
      description:
        "Our dealership ensures every vehicle meets the highest standards, providing you with only the best-certified pre-owned vehicles./当社のディーラーはすべての車両が最高基準を満たしていることを保証し、最良の認定中古車のみを提供します。",
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
      title: "Transparent Deals/透明な取引",
      description:
        "We offer clear and honest pricing with no hidden fees, so you know exactly what you&apos;re getting./隠れた手数料なしで明確で誠実な価格を提供し、何を得るのか正確に把握できます。",
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
      title: "Expert Customer Service/専門的なカスタマーサービス",
      description:
        "Our dedicated team is here to assist you with any questions and ensure a smooth buying experience./専任チームがあらゆる質問に対応し、スムーズな購入体験を提供します。",
    },
  ];

  return (
    <div className="max-w-winb-max-1366 w-full mx-auto py-16 px-6 flex flex-col items-center justify-center">
      <h2 className="font-semibold text-4xl text-center mb-2">Why Choose Us</h2>
      <p className="font-medium text-2xl text-center">なぜ私たちを選ぶのか</p>

      <div className="mt-12 py-1 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-11">
        {cards.map((card, index) => (
          <div
            key={index}
            className="border p-3 border-black rounded-lg w-72 h-60 mx-auto flex flex-col items-start"
          >
            {card.icon}
            <h3 className="text-2xl font-semibold">
              {/* Split by comma (',') for title */}
              {local === "en"
                ? card.title.split("/")[0] // English title (first part)
                : card.title.split("/")[1] || card.title.split("/")[0]}{" "}
              {/* Fallback to first part (English) if Japanese is missing */}
            </h3>
            <p className="text-lg font-medium text-justify mt-4">
              {/* Split by '/' for description */}
              {local === "en"
                ? card.description.split("/")[0] // English description (first part)
                : card.description.split("/")[1] || card.description.split("/")[0]}{" "}
              {/* Fallback to English if Japanese is missing */}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyToChooseUs;
