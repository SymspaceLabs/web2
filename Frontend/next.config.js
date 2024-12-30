/** @type {import('next').NextConfig} */
const nextConfig = {
  env: { theme: "DEFAULT", currency: "USD" },
  publicRuntimeConfig: { theme: "DEFAULT", currency: "USD" },
  images: {
    remotePatterns: [{ protocol: "https", hostname: "ui-lib.com" }],
    domains: [
      'waveworld.io',
      'static.vecteezy.com',
      'cdn-images-1.medium.com',
      'i.shgcdn.com',
      '154.53.63.170',
      'example.com'
    ],
  },
};

module.exports = nextConfig;
