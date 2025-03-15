/** @type {import('next').NextConfig} */
const nextConfig = {
  env: { theme: "DEFAULT", currency: "USD" },
  publicRuntimeConfig: { theme: "DEFAULT", currency: "USD" },
  images: {
    remotePatterns: [{ protocol: "https", hostname: "ui-lib.com" }],
    domains: ['waveworld.io'],
    domains: ['static.vecteezy.com'],
    domains: ['cdn-images-1.medium.com']
  }
};

module.exports = nextConfig;
