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
    "Discover a wide range of vehicles with 株式会社WIN-B, Japan's leading platform for buying and selling cars. Connect with trusted sellers and find your perfect vehicle today.",
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
