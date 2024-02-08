/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["encrypted-tbn0.gstatic.com"], // ここに許可したいドメインを追加
  },
};

module.exports = nextConfig;
