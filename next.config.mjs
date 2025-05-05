/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  env: {
    GOOGLE_CAPTCHA: process.env.GOOGLE_CAPTCHA,
  },
};

export default nextConfig;
