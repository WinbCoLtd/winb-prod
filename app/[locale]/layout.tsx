import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
//import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "株式会社WIN-B | Japan's Premier Vehicle Selling Platform",
  description:
    "Discover vehicles with 株式会社WIN-B, Japan's top car sales platform. Connect with trusted sellers and find your perfect car today.",
  keywords: [
    "Japan car sales",
    "Buy cars Japan",
    "Used cars Japan",
    "New cars Japan",
    "Japanese car marketplace",
    "Vehicle sales Japan",
    "Car dealership Japan",
    "Car export Japan",
    "Best cars in Japan",
    "Japan auto trading",
    "株式会社WIN-B",
    "WIN-B Japan",
    "WIN-B car sales",
    "WIN-B vehicle marketplace",
    "Used cars Tokyo",
    "JDM cars for sale",
    "Japanese luxury cars",
    "Kei cars Japan",
    "Hybrid cars Japan",
    "Electric cars Japan",
    "Buy used cars Japan",
    "Sell your car Japan",
    "Japanese car auctions",
    "Japan car export service",
    "Car financing Japan",
    "Online car sales Japan",
    "Japanese used cars for sale",
    "Buy cars online Japan",
    "Japan car dealership",
    "Japan car shop",
    "Car sale websites Japan",
    "Used Japanese cars",
    "New Japanese cars",
    "JDM cars Japan",
    "Japanese sports cars",
    "Japan luxury cars",
    "Japan SUV sales",
    "Kei cars for sale",
    "Family cars Japan",
    "Japanese electric vehicles",
    "Hybrid vehicles Japan",
    "Toyota cars Japan",
    "Nissan cars Japan",
    "Honda cars Japan",
    "Subaru cars Japan",
    "Mitsubishi cars Japan",
    "Lexus cars Japan",
    "Suzuki cars Japan",
    "Mazda cars Japan",
    "Daihatsu cars Japan",
    "Buy and sell cars Japan",
    "Sell my car Japan",
    "Car auction Japan",
    "Japan car export services",
    "Affordable cars Japan",
    "Best car deals Japan",
    "Car leasing Japan",
    "Buy cars in Tokyo",
    "Used cars Osaka",
    "Car sales Yokohama",
    "Sapporo car market",
    "Fukuoka used cars",
    "Nagoya car dealership",
    "Kyoto car sales",
  ],
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  const messages = await getMessages();
  return (
    <html lang={locale}>
      <head>
        <link rel="canonical" href="https://www.win-b.jp/" />
        <meta name="robots" content="index, follow" />
        <meta
          property="og:title"
          content="株式会社WIN-B | Japan's Premier Vehicle Selling Platform"
        />
        <meta
          property="og:description"
          content="Discover a wide range of vehicles with 株式会社WIN-B, Japan's leading platform for buying and selling cars."
        />
        <meta property="og:image" content="https://www.win-b.jp/og-image.jpg" />
        <meta property="og:url" content="https://www.win-b.jp/" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="株式会社WIN-B | Japan's Premier Vehicle Selling Platform"
        />
        <meta
          name="twitter:description"
          content="Discover a wide range of vehicles with 株式会社WIN-B, Japan's leading platform for buying and selling cars."
        />
        <meta
          name="twitter:image"
          content="https://www.win-b.jp/twitter-image.jpg"
        />
        
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* <div><Navbar/></div> */}
        <NextIntlClientProvider messages={messages}>
          <div>{children}</div>
        </NextIntlClientProvider>
        <Footer />
      </body>
    </html>
  );
}
