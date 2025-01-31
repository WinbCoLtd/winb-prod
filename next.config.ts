import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
    images: {
        domains: ['localhost', 'example.com'],
        remotePatterns: [
          {
            protocol: "https",
            hostname: "res.cloudinary.com",
          },
        ],
      },
};

export default withNextIntl(nextConfig);
