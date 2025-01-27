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
    router.push(`/${newLocale}/${path}`);
  };

  return (
    <nav className="z-50 p-4  bg-gray-100 w-full flex justify-between items-center bg-transparent text-xl text-white">
      <Link href="/" locale={locale} className="font-extrabold text-3xl">
        WINB
        <Image
          src="/home/logo.png"
          alt="Logo"
          width={96}
          height={96}
          className="w-28 h-auto mx-auto mb-6"
        />
      </Link>
      {!isMobile && (
        <nav className="flex items-center justify-center gap-4">
          <Link href="/" className="hover:underline">
            ホーム
          </Link>
          <Link href="/companyProfile" className="hover:underline">
            会社概要
          </Link>
          <Link href="/vehicleList" className="hover:underline">
            車両一覧
          </Link>
          <Link href="/otherService" className="hover:underline">
            その他のサービス
          </Link>
          <Link href="/contact" className="hover:underline">
            お問い合わせ
          </Link>
        </nav>
      )}
      {isMobile && (
        <nav
          className={`absolute top-20 bg-[#0000009c] rounded-2xl p-5 right-5 flex-col items-center justify-center gap-4 ${
            toggle ? "flex" : "hidden"
          }`}
        >
          <Link href="/" className="hover:underline">
            ホーム
          </Link>
          <Link href="/compantProfile" className="hover:underline">
            会社概要
          </Link>
          <Link href="/vehicleList" className="hover:underline">
            車両一覧
          </Link>
          <Link href="/otherService" className="hover:underline">
            その他のサービス
          </Link>
          <Link href="/contact" className="hover:underline">
            お問い合わせ
          </Link>
        </nav>
      )}
      <div className="flex items-center">
        <button
          onClick={() => handleLocaleChange(locale === "en" ? "ja" : "en")}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {locale === "en" ? "日本語" : "English"}
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
