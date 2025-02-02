import Link from "next/link";
import React from "react";
import { useLocale } from "next-intl";

const CTA = () => {
  const locale = useLocale();
  return (
    <div className="max-w-winb-max-1366 flex items-center justify-center w-full text-white ">
      <div className="p-6 relative bg-home-vehicle bg-cover bg-center bg-no-repeat rounded-[15px] w-full h-[473px]">
        <h2 className="text-[32px] md:text-[40px] font-bold text-left">
          Need Assistance? We&apos;re Here to Help!
        </h2>
        <p className="text-xl mt-4 font-bold text-left">
          助けが必要ですか?私たちがお手伝いできます!
        </p>
        <div className=" w-full mt-6 min-h-[144px] flex items-center justify-center">
          <p className="mt-4 text-[16px] lg:text-[24px] md:text-[24px] font-semibold text-left max-w-[793px]">
          {locale === "en"
              ? `Have any questions about our services or would like more information? Our team is here to help. WIN-B If you would like to learn more or have a specific question, please feel free to contact us. Your satisfaction is our number one priority.`
              : ` 当社のサービスについてご質問がある場合、またはさらに詳しい情報が必要ですか?私たちのチームがお手伝いいたします。WIN-B についてさらに詳しく知りたい場合、または具体的な質問がある場合は、お気軽にお問い合わせください。お客様の満足が私たちの最優先事項です。`}
           
          </p>
          <div className="mt-6 text-center"></div>
        </div>
        <Link href="/contact" className="absolute bottom-3 right-6">
          <button className="bg-winb-yellow text-black text-[18px] w-44 h-14 px-8 py-3 rounded-[25px] font-bold hover:bg-yellow-600">
            {locale === "en" ? "Contact Us" : "お問い合わせ"}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CTA;
