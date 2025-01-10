// import Image from "next/image";

import Buttons from "@/components/common/Buttons";
import Navbar from "@/components/Navbar";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("HomePage")
  return (
    <main>
      <Navbar />
      <h1>
        {t("title")}
      </h1>
      <Buttons />
    </main>
  );
}
