/** @type {import('next').NextConfig} */
MONGODB_URI="mongodb://sonodev:A112233a@docdb-2024-04-21-16-03-50.cv0fm8uykorh.us-east-1.docdb.amazonaws.com:27017/?tls=true&tlsCAFile=global-bundle.pem&retryWrites=false"

const nextConfig = {}

module.exports = nextConfig

module.exports = {
    env: {
        MONGODB_URI: "mongodb://sonodev:A112233a@docdb-2024-04-21-16-03-50.cv0fm8uykorh.us-east-1.docdb.amazonaws.com:27017/?tls=true&tlsCAFile=global-bundle.pem&retryWrites=false",
      },
  }

  module.exports = {
    reactStrictMode: false,
    webpack: (config) => {
      config.resolve.fallback = { fs: false, net: false };
      return config;
    },
  };