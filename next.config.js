/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "kcd-strapi-aws-s3-images-bucket.s3.ap-southeast-2.amazonaws.com",
    ],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname:
          "kcd-strapi-aws-s3-images-bucket.s3.ap-southeast-2.amazonaws.com",
        port: "",
        pathname: "**/**",
      },
      {
        protocol: "https",
        hostname: "kcd-strapi-bucket-testing.s3.ap-southeast-2.amazonaws.com",
        port: "",
        pathname: "**/**",
      },
    ],
  },
};

module.exports = nextConfig;
