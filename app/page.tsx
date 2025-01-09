// import Image from "next/image";

import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations()

  return (
    <main>
      <h1> {t('Welcome')} </h1>
    </main>
  );
}
