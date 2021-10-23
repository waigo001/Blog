// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  target: "serverless",
  pageExtensions: ["tsx", "ts", "jsx", "js", "mdx"],
  poweredByHeader: false,
  reactStrictMode: true,
  env: {
    VERSION: require("./package.json").version,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      type: "asset/source",
    });
    return config;
  },
};

module.exports = nextConfig;
