// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  pageExtensions: ["tsx", "ts", "jsx", "js", "mdx"],
  poweredByHeader: false,
  reactStrictMode: true,
  env: {
    VERSION: require("./package.json").version,
    ID_GITHUB: process.env.ID_GITHUB,
    ID_TWITTER: process.env.ID_TWITTER,
    ID_INSTAGRAM: process.env.ID_INSTAGRAM,
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
