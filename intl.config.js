import enMessages from './messages/en.json';
import jaMessages from './messages/ja.json';

export default getRequestConfig(() => {
    const defaultLocale = 'en'; // Change this as needed
    return {
        locale: defaultLocale,
        messages: defaultLocale === 'ja' ? jaMessages : enMessages,
    };
});
