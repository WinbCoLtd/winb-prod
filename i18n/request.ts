import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";
type Locale = (typeof locales)[number];


const locales = ["en", "ja"]

export default getRequestConfig(
    async ({requestLocale }) => {
        const locale = await requestLocale
        if ( !locales.includes(locale as Locale)) notFound();

        return {
            messages: (
                await import(`../messages/${locale}.json`)
            ).default,
            locale
        }
    }
)