module.exports = {
  siteUrl: process.env.SITE_URL,
  changefreq: undefined,
  generateRobotsTxt: true,
  priority: undefined,
  autoLastmod: false,
  exclude: ["/server-sitemap.xml", "/blog/*"],
  robotsTxtOptions: {
    additionalSitemaps: [process.env.SITE_URL + "/blog-sitemap.xml"],
  },
};
