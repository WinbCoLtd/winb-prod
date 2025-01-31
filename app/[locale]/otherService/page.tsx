"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { ChevronRight } from "lucide-react";
import { useLocale } from "next-intl";
import { PulseLoader } from "react-spinners";

const OtherService = () => {
  const locale = useLocale();

  const [loading, setLoading] = useState(true);

  // Simulating loading state for demonstration
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust this timer as needed
    return () => clearTimeout(timer); // Cleanup on component unmount
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <PulseLoader color="#2563eb" size={20} />
      </div>
    );
  }

  return (
    <div className="relative w-full flex flex-col max-w-[1366px] mx-auto px-4 py-2">
      <div className="bg-[#08001C67] w-full flex items-center justify-center border border-[#00CCEE] rounded-[10px] min-h-32 my-auto">
        <Navbar />
      </div>

      <div className="mt-12 relative bg-black overflow-hidden rounded-xl">
        <Image
          src="/otherService/carrier.png"
          alt="Need Assistance"
          width={1166}
          height={777}
          className="w-full h-[450px] lg:h-[677px]  object-cover"
        />

        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between px-4 text-white bg-black bg-opacity-60">
          <div className="text-[30px] lg:text-[60px] font-bold text-center mt-10 transition-transform duration-300 ease-in-out hover:scale-105">
            Stranded? We&rsquo;re Just a Call Away!
          </div>

          <p className="text-[22px] lg:text-[40px] mt-4 mb-3 font-bold text-center">
            助けが必要ですか?私たちがお手伝いできます!
          </p>

          <p className="text-[18px] lg:text-[28px] mt-5 font-semibold text-center max-w-[900px] mx-auto transition-transform duration-300 ease-in-out hover:scale-105">
            {locale === "en"
              ? "Don’t let a breakdown ruin your day! With our fast and reliable towing service, help is just a phone call away. We’re here to get you back on the road safely and quickly."
              : "故障で一日が台無しにならないようにしましょう。当社の迅速で信頼性の高いレッカーサービスなら、電話一本ですぐに助けが届きます。当社は、お客様が安全かつ迅速に道路に戻れるようお手伝いします。"}
          </p>

          <div className="mb-[80px] mt-5 text-right">
            <Link href="/otherInquiry">
              <button className="bg-winb-yellow text-black text-[16px]  px-4 py-3 rounded-[25px] font-semibold hover:bg-yellow-600 w-auto max-w-[280px] flex items-center justify-center gap-2 ml-auto">
                <span>
                  {" "}
                  {locale === "en"
                    ? "Join with Us"
                    : "私たちと一緒に参加しましょう"}
                </span>
                <ChevronRight size={15} />
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-8 px-4 lg:px-0">
        <p className="text-[16px] md:text-[18px] lg:text-[20px] text-gray-800 font-normal leading-relaxed text-center mt-8">
          {locale === "en"
            ? "While traveling by car or visiting your hometown, unexpected situations can arise that might require a towing service. Whether it’s a car breakdown, a flat tire, or damage from an accident, these moments can leave you unable to move your vehicle on your own, making professional towing assistance essential."
            : "車で旅行中や帰省中に、レッカーサービスが必要になるような予期せぬ状況が発生することがあります。車の故障、タイヤのパンク、事故による損傷など、こうした状況では自力で車両を移動できなくなるため、専門家によるレッカーサービスが不可欠です。"}
        </p>
        <p className="mt-4 text-[16px] md:text-[18px] lg:text-[20px] text-gray-800 font-semibold text-center">
          {locale === "en"
            ? "  We are with you...........!"
            : "私たちはあなたと共にあります......!"}
        </p>
        <p className="text-[16px] md:text-[18px] lg:text-[20px] text-red-500 font-bold leading-relaxed mt-24 xxs:mt-10 text-left">
          {locale === "en"
            ? " Please refer to the following fee table for towing fees."
            : "レッカー料金につきましては下記料金表をご参照ください。"}
        </p>

        <div className="mt-8 overflow-x-auto">
          <table className="w-full max-w-[1000px] mx-auto border-collapse border border-gray-300 text-center mb-10">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-gray-300 px-4 lg:py-3 lg:text-[18px] font-semibold"></th>
                <th className="border border-gray-300 px-4 lg:py-3 lg:text-[18px] xxs:text-[14px] xxs:py-2 font-semibold">
                  {locale === "en"
                    ? "Basic fee + work fee"
                    : "基本料金＋作業料金"}
                </th>
                <th className="border border-gray-300 px-4 lg:py-3 lg:text-[18px] xxs:text-[14px] xxs:py-2 font-semibold">
                  {locale === "en" ? "Towing fee" : "牽引料金"}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 lg:py-8 lg:text-[16px] xxs:text-[12px] xxs:py-2 font-semibold">
                  {locale === "en" ? "Normal Road" : "通常の道路"}
                </td>
                <td className="border border-gray-300 px-4 lg:py-8 lg:text-[16px] xxs:text-[12px] xxs:py-2">
                  {locale === "en"
                    ? "8:00-20:00 13,130 yen"
                    : "8:00-20:00 13,130円"}
                </td>
                <td className="border border-gray-300 px-4 lg:py-8 lg:text-[16px] xxs:text-[12px] xxs:py-2">
                  {locale === "en"
                    ? "Additional 730 yen per 1 km"
                    : "1kmごとに730円追加"}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 lg:py-8 lg:text-[16px] xxs:text-[12px] xxs:py-2 font-semibold">
                  {locale === "en" ? "Highway" : "高速道路"}
                </td>
                <td className="border border-gray-300 px-4 lg:py-8 lg:text-[16px] xxs:text-[12px] xxs:py-2">
                  {locale === "en"
                    ? "8:00-20:00 21,520 yen"
                    : "8:00-20:00 21,520円"}
                </td>
                <td className="border border-gray-300 px-4 lg:py-8 lg:text-[16px] xxs:text-[12px] xxs:py-2">
                  {locale === "en"
                    ? "Additional 730 yen per 1 km"
                    : "1kmごとに730円追加"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OtherService;
