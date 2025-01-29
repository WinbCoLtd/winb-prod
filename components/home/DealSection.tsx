import Image from "next/image";
import React from "react";
import { useLocale } from "next-intl";

const DealSection = () => {
  const locale = useLocale();

  return (
    <section className="mt-10 bg-[#D9D9D930] px-4 py-20 w-full">
      <div className="max-w-winb-max-1366 mx-auto flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0">
        {/* Image Section */}
        <Image
          src="/home/deal.jpg"
          alt="Vehicle Deal"
          width={591}
          height={557}
          className="object-cover max-w-[400px] w-full h-[300px] md:h-[400px] lg:max-w-[591px] lg:max-h-[557px] rounded-[20px]"
          priority
        />

        {/* Content Section */}
        <div className="flex flex-col items-start md:pl-8">
          <h3 className="text-[24px] sm:text-[28px] md:text-[40px] font-bold text-black max-w-[531px]">
            {locale === "en"
              ? "Get the Best Deal for Your Vehicle Today"
              : "今すぐあなたの車に最適な取引を手に入れましょう"} {/* Fallback to Japanese if available */}
          </h3>
          <p className="mt-4 font-medium text-[18px] sm:text-[20px] text-[#000000]">
            {locale === "en"
              ? "Join thousands of satisfied customers who found their perfect car with us. We offer exclusive benefits and 24/7 support."
              : "私たちと一緒に完璧な車を見つけた何千人もの満足したお客様に参加しましょう。独占的な特典と24時間年中無休のサポートを提供します。"}
          </p>

          <ul className="mt-4 text-[16px] flex items-center justify-center sm:text-[18px] w-full text-[#000000] list-disc pl-5 space-y-2">
            <div className="w-fit-content mx-auto max-w-[478px]">
              <li>
                {locale === "en"
                  ? "Largest network of certified cars."
                  : "認定車両の最大ネットワーク。"}
              </li>
              <li>
                {locale === "en"
                  ? "Round-the-clock customer assistance."
                  : "24時間対応のカスタマーサポート。"}
              </li>
              <li>
                {locale === "en"
                  ? "Unmatched roadside assistance for all our vehicles."
                  : "すべての車両に対する比類のないロードサイドアシスタンス。"}
              </li>
            </div>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default DealSection;
