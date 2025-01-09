import { getRequestConfig } from 'next-intl/server';
import enMessages from './messages/en.json';
import jaMessages from './messages/ja.json';

export default getRequestConfig(async () => {
    const locale = 'ja'; // Or determine dynamically
    const messages = locale === 'ja' ? jaMessages : enMessages;

    return { locale, messages };
});
