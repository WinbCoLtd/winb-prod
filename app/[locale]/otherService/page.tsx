import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { ChevronRight } from "lucide-react";

const OtherService = () => {
  return (
    <div className="relative w-full flex flex-col max-w-[1366px] mx-auto px-4 py-2">
      <div className="bg-[#08001C67] w-full flex items-center justify-center border border-[#00CCEE] rounded-[10px] min-h-32 my-auto">
        <Navbar />
      </div>

        <div className="mt-12 relative bg-black lg:h-[677px]">
          <Image
            src="/otherService/carrier.png"
            alt="Need Assistance"
            width={1166}
            height={777}
            className="w-full h-[450px] lg:h-[677px] object-cover"
          />

          <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between px-4 text-white bg-black bg-opacity-60">
            <div className="text-[30px] lg:text-[60px] font-bold text-center mt-10 transition-transform duration-300 ease-in-out hover:scale-105">
              Stranded? We&rsquo;re Just a Call Away!
            </div>

            <p className="text-[22px] lg:text-[40px] mt-4 mb-3 font-bold text-center">
              助けが必要ですか?私たちがお手伝いできます!
            </p>

            <p className="text-[18px] lg:text-[28px] mt-5 font-semibold text-center max-w-[900px] mx-auto transition-transform duration-300 ease-in-out hover:scale-105">
              &quot;Don&rsquo;t let a breakdown ruin your day! With our fast and
              reliable towing service, help is just a phone call away.
              We&rsquo;re here to get you back on the road safely and
              quickly.&quot;
            </p>

            <div className="mb-[80px] mt-5 text-right">
              <Link href="/otherInquiry">
                <button className="bg-winb-yellow text-black text-[18px]  px-4 py-2 rounded-[25px] font-semibold hover:bg-yellow-600 w-auto max-w-[200px] flex items-center justify-center gap-2 ml-auto">
                  <span>Join with Us</span>
                  <ChevronRight size={15} />
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 px-4 lg:px-0">
          <p className="text-[16px] md:text-[18px] lg:text-[20px] text-gray-800 font-normal leading-relaxed text-center mt-8">
            While traveling by car or visiting your hometown, unexpected
            situations can arise that might require a towing service. Whether
            it&rsquo;s a car breakdown, a flat tire, or damage from an accident,
            these moments can leave you unable to move your vehicle on your own,
            making professional towing assistance essential.
          </p>
          <p className="mt-4 text-[16px] md:text-[18px] lg:text-[20px] text-gray-800 font-semibold text-center">
            We are with you...........!
          </p>
          <p className="text-[16px] md:text-[18px] lg:text-[20px] text-red-500 font-bold leading-relaxed mt-24 xxs:mt-10 text-left">
            Please refer to the following fee table for towing fees.
          </p>

          <div className="mt-8 overflow-x-auto">
            <table className="w-full max-w-[1000px] mx-auto border-collapse border border-gray-300 text-center mb-10">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border border-gray-300 px-4 lg:py-3 lg:text-[18px] font-semibold"></th>
                  <th className="border border-gray-300 px-4 lg:py-3 lg:text-[18px] xxs:text-[14px] xxs:py-2 font-semibold">
                    Basic fee + work fee
                  </th>
                  <th className="border border-gray-300 px-4 lg:py-3 lg:text-[18px] xxs:text-[14px] xxs:py-2 font-semibold">
                    Towing fee
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 lg:py-8 lg:text-[16px] xxs:text-[12px] xxs:py-2 font-semibold">
                    Normal Road
                  </td>
                  <td className="border border-gray-300 px-4 lg:py-8 lg:text-[16px] xxs:text-[12px] xxs:py-2">
                    8:00-20:00 13,130 yen
                  </td>
                  <td className="border border-gray-300 px-4 lg:py-8 lg:text-[16px] xxs:text-[12px] xxs:py-2">
                    Additional 730 yen per 1 km
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 lg:py-8 lg:text-[16px] xxs:text-[12px] xxs:py-2 font-semibold">
                    Highway
                  </td>
                  <td className="border border-gray-300 px-4 lg:py-8 lg:text-[16px] xxs:text-[12px] xxs:py-2">
                    8:00-20:00 21,520 yen
                  </td>
                  <td className="border border-gray-300 px-4 lg:py-8 lg:text-[16px] xxs:text-[12px] xxs:py-2">
                    Additional 730 yen per 1 km
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
