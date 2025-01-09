// middleware.ts
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['ja', 'en'],
  defaultLocale: 'ja'
});

export const config = {
  matcher: ['/((?!api|static|.*\\..*|_next).*)'] // Exclude static files, _next, and files with extensions
};