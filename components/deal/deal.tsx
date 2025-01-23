import React from "react";
import Image from "next/image";

function Deal() {
  return (
    <div className="relative w-full flex flex-col mx-auto bg-[#D9D9D9] mt-[66px] px-6 sm:pl-[77px] pt-[40px] sm:pt-[86px] pb-[40px]">
      <div className="flex flex-col-reverse lg:flex-row sm:flex-row items-center sm:justify-between gap-6 ">
        <div className="w-full sm:w-1/2 flex justify-center">
          <Image
            src="/vehicledummy.png"
            alt="Vehicle"
            width={591}
            height={557}
            className="object-cover w-full max-w-[400px] sm:max-w-none h-auto sm:h-[380px] mb-[66px]"
          />
        </div>

        <div className="flex flex-col justify-center text-center sm:text-left sm:w-1/2">
          <h3 className="lg:text-[40px] sm:text-[30px] xs:text-[25px] xxs:text-[20px] font-semibold text-black">
            Get the Best Deal for Your Vehicle Today
          </h3>
          <p className="mt-3 sm:mt-2 lg:text-[20px] sm:text-[18px] xs:text-[18px] font-medium text-[#333333]">
            Join thousands of satisfied customers who found their perfect car with us. We offer exclusive benefits and 24/7 support.
          </p>
          <ul className="mt-3 sm:mt-1 lg:text-[24px] sm:text-[19px] xs:text-[19px] font-medium text-[#333333] list-disc pl-5 sm:pl-10">
            <li className="mt-1">Largest network of certified cars.</li>
            <li className="mt-1">Round-the-clock customer assistance.</li>
            <li className="mt-1">Unmatched roadside assistance for all our vehicles.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Deal;
