import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faLinkedin, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="bg-[#c9d2e9] mt-[69px] text-white w-full py-8 flex flex-col items-center justify-center">
      <div className="flex gap-10 mb-4 sm:gap-6 xs:gap-4">
        <a href="#" className="text-white lg:text-2xl sm:text-xl xs:text-xl xxs:text-lg hover:text-gray-300">
          <FontAwesomeIcon icon={faTwitter} />
        </a>
        <a href="#" className="text-white lg:text-2xl sm:text-xl xs:text-xl xxs:text-lg hover:text-gray-300">
          <FontAwesomeIcon icon={faFacebook} />
        </a>
        <a href="#" className="text-white lg:text-2xl sm:text-xl xs:text-xl xxs:text-lg hover:text-gray-300">
          <FontAwesomeIcon icon={faLinkedin} />
        </a>
        <a href="#" className="text-white lg:text-2xl sm:text-xl xs:text-xl xxs:text-lg hover:text-gray-300">
          <FontAwesomeIcon icon={faInstagram} />
        </a>
      </div>

      <p className="text-winb-ash font-semibold lg:text-[16px] sm:text-[14px] xs:text-[12px] xxs:text-[12px] text-center mb-4">
        1314-1010 Toyama, Yachimata, Chiba 289-1141, Japan | +81-80-5442-4596 | winb.coltd@gmail.com
      </p>
      
      <p className="text-winb-ash font-semibold lg:text-[18px] sm:text-[16px] xs:text-[14px] xxs:text-[14px] text-center">
        &copy; 2025 WIN-B Company. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;

