import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faLinkedin,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import { useLocale } from "next-intl";

const Footer = () => {
  const locale = useLocale();
  return (
    <footer className="mt-7 bg-[#c9d2e9]  text-white w-full py-8 flex flex-col items-center justify-center">
      <div className="flex gap-10 mb-4 sm:gap-6 xs:gap-4">
        <a
          href="#"
          className="text-white text-2xl lg:text-2xl md:text-2xl hover:text-blue-400"
        >
          <FontAwesomeIcon icon={faTwitter} />
        </a>
        <a
          href="#"
          className="text-white text-2xl lg:text-2xl md:text-2xl  hover:text-blue-400"
        >
          <FontAwesomeIcon icon={faFacebook} />
        </a>
        <a
          href="#"
          className="text-white text-2xl lg:text-2xl md:text-2xl hover:text-blue-400"
        >
          <FontAwesomeIcon icon={faLinkedin} />
        </a>
        <a
          href="#"
          className="text-white text-2xl lg:text-2xl md:text-2xl hover:text-blue-400"
        >
          <FontAwesomeIcon icon={faInstagram} />
        </a>
      </div>

      <p className="text-winb-ash font-semibold lg:text-[16px] sm:text-[14px] xs:text-[12px] xxs:text-[12px] text-center mb-4">
        {locale === "en"
          ? "1314-1010 Toyama, Yachimata, Chiba 289-1141, Japan | +81-80-5442-4596 | winb.coltd@gmail.com"
          : "〒289-1141 千葉県八街市富山1314-1010 | +81-80-5442-4596 | winb.coltd@gmail.com"}
      </p>

      <p className="text-winb-ash font-semibold lg:text-[18px] sm:text-[16px] xs:text-[14px] xxs:text-[14px] text-center">
        &copy;{" "}
        {locale === "en"
          ? "2025 WIN-B Company. All rights reserved."
          : "2025 WIN-B株式会社。全著作権所有。"}
      </p>
      <p className="text-slate-700 font-semibold lg:text-[18px] sm:text-[16px] xs:text-[14px] xxs:text-[14px] text-center">
        <Link href={"https://www.equolabs.com/"}>
          {" "}
          {locale === "en" ? "Powered by EquoLabs" : "EquoLabs 提供"}{" "}
        </Link>
      </p>
    </footer>
  );
};

export default Footer;
