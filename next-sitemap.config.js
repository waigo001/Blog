/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: process.env.SITE_URL || "https://k-w.info",
  generateRobotsTxt: true,
  priority: undefined,
  changefreq: "monthly",
};
