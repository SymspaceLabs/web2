/** @type {import('next').NextConfig} */
const nextConfig = {
  env: { theme: "DEFAULT", currency: "USD" },
  publicRuntimeConfig: { theme: "DEFAULT", currency: "USD" },
  images: {
    remotePatterns: [{ protocol: "https", hostname: "ui-lib.com" }],
    domains: [
      '154.53.63.170',
      'media.symspacelabs.com'
    ],
  },
};

module.exports = nextConfig;
