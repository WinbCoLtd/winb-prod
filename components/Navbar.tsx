/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Menu } from "lucide-react";
import { useLocale } from "next-intl";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

function debounce(func: (...args: any[]) => void, wait: number) {
  let timeout: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export default function Navbar() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [toggle, setIsToggled] = useState(false);

  const navbarLinks = {
    home: locale === "en" ? "Home" : "ホーム",
    about: locale === "en" ? "Company Profile" : "会社概要",
    vehicleList: locale === "en" ? "Vehicle List" : "車両一覧",
    otherService: locale === "en" ? "Other Service" : "その他サービス",
    contact: locale === "en" ? "Contact" : "お問い合わせ",
  };

  const localeToggleText = locale === "en" ? "日本語" : "English";

  useEffect(() => {
    setIsMobile(() => window.innerWidth <= 768);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    const debounceResize = debounce(handleResize, 200);

    window.addEventListener("resize", debounceResize);
    return () => {
      window.removeEventListener("resize", debounceResize);
    };
  }, []);

  useEffect(() => {
    if (!isMobile) {
      setIsToggled(false);
    }
  }, [isMobile]);

  const handleToggle = () => {
    setIsToggled(!toggle);
  };

  const handleLocaleChange = (newLocale: string) => {
    const path = pathname.split("/").slice(2).join("/");
    router.push(`/${newLocale}/${path || ''}`);
  };

  return (
    <nav className="z-50 p-4 bg-gray-100 w-full flex justify-between items-center bg-transparent text-[21px] text-white ">
      <Link
        href="/"
        locale={locale}
        className="font-extrabold text-2xl flex flex-col items-center"
      >
        <Image
          src="/home/logo.jpg"
          alt="winb_company_logo"
          width={60}
          height={60}
          className="w-24 h-auto mx-auto mb-2"
        />

        <p>
        <span className="text-white text-[20px]">株式会社 </span>
          <span className="text-[#FCDB02] text-[20px]">W</span>
          <span className="text-white text-[20px]">IN-</span>
          <span className="text-[#FCDB02] text-[20px]">B</span>
        </p>
      </Link>

      {!isMobile && (
        <nav className="flex items-center justify-center gap-4 text-white font-bold">
          <Link href="/" className="transition-transform duration-300 ease-in-out hover:scale-110 hover:text-yellow-200">
            {navbarLinks.home}
          </Link>
          <Link href="/companyProfile" className="transition-transform duration-300 ease-in-out hover:scale-110 hover:text-yellow-200">
            {navbarLinks.about}
          </Link>
          <Link href="/vehicleList" className=" transition-transform duration-300 ease-in-out hover:scale-110 hover:text-yellow-200">
            {navbarLinks.vehicleList}
          </Link>
          <Link href="/otherService" className="transition-transform duration-300 ease-in-out hover:scale-110 hover:text-yellow-200">
            {navbarLinks.otherService}
          </Link>
          <Link href="/contact" className="transition-transform duration-300 ease-in-out hover:scale-110 hover:text-yellow-200">
            {navbarLinks.contact}
          </Link>
        </nav>
      )}
      {isMobile && (
        <nav
          className={`absolute top-32 bg-[#000000de] rounded-2xl p-5 right-5 flex-col items-center justify-center gap-4 ${
            toggle ? "flex" : "hidden"
          }`}
        >
          <Link href="/" className="hover:underline">
            {navbarLinks.home}
          </Link>
          <Link href="/companyProfile" className="hover:underline">
            {navbarLinks.about}
          </Link>
          <Link href="/vehicleList" className="hover:underline">
            {navbarLinks.vehicleList}
          </Link>
          <Link href="/otherService" className="hover:underline">
            {navbarLinks.otherService}
          </Link>
          <Link href="/contact" className="hover:underline">
            {navbarLinks.contact}
          </Link>
        </nav>
      )}
      <div className="flex items-center">
        <button
          onClick={() => handleLocaleChange(locale === "en" ? "ja" : "en")}
          className="bg-yellow-200 hover:bg-yellow-400 text-black font-bold py-2 px-2 rounded"
        >
          {localeToggleText}
        </button>
        {isMobile && (
          <Menu
            size={40}
            onClick={handleToggle}
            className="mx-2 cursor-pointer"
          />
        )}
      </div>
    </nav>
  );
}
