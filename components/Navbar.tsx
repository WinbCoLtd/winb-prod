// components/Navbar.tsx
'use client'
import { useLocale } from "next-intl";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const handleLocaleChange = (newLocale: string) => {
    const path = pathname.split("/").slice(2).join("/")
    router.push(
      `/${newLocale}/${path}`
    );
  };

  return (
    <nav className="p-4 bg-gray-100 flex justify-between items-center"> {/* Added styling */}
      <Link href="/" locale={locale} className="font-bold text-xl">My App</Link> {/* Added a title/link */}
      <div>
        <button
          onClick={() => handleLocaleChange(locale === "en" ? "ja" : "en")}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" // Added styling
        >
          {locale === "en" ? "日本語" : "English"}
        </button>

        {/* Alternative using Link components (more robust for SEO) */}
        {/* <Link href="/" locale={locale === "en" ? "ja" : "en"}>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2">
           {locale === "en" ? "日本語" : "English"}
          </button>
        </Link> */}
      </div>
    </nav>
  );
}