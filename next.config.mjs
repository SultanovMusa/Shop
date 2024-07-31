/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      middleware: true
    },
    images: {
      domains: [
        "tandemall.s3.eu-central-1.amazonaws.com",
      ],
    },
  };
  
  export default nextConfig;
