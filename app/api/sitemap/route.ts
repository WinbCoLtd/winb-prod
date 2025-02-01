import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = "https://www.xn--win-b-rt2h866g1hpki0b.com/";
  const pages = ["", "companyProfile", "vehicleList", "otherService","otherInquiry","contact","admin"];
  const languages = ["en", "ja"];

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n`;

  pages.forEach((page) => {
    sitemap += `<url>\n  <loc>${baseUrl}/${page}</loc>\n`;
    languages.forEach((lang) => {
      sitemap += `  <xhtml:link rel="alternate" hreflang="${lang}" href="${baseUrl}/${lang}/${page}" />\n`;
    });
    sitemap += `</url>\n`;
  });

  sitemap += `</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
