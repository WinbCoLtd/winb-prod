import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

// Initialize the next-intl plugin
const withNextIntl = createNextIntlPlugin();

/** @type {import ('next').NextConfig} */
const nextConfig: NextConfig = {};

// Wrap nextConfig with the intl plugin
export default withNextIntl(nextConfig);
