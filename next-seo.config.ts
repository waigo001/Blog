import { NextSeoProps } from "next-seo";

const nextSeoConfig: NextSeoProps = {
  title: "K.W.info",
  titleTemplate: "%s | K.W.info",
  description: "K.W.のメモ用のブログです",
  twitter: {
    handle: "@" + process.env.ID_TWITTER,
    site: "@" + process.env.ID_TWITTER,
    cardType: "summary",
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: "https://k-w.info",
    title: "K.W.info",
    description: "K.W.のメモ用のブログです",
    site_name: "K.W.info",
    images: [
      {
        url: "https://k-w.info/og-image.jpg",
        width: 2026,
        height: 2026,
        alt: "K.W.のアイコン",
      },
    ],
  },
};

export default nextSeoConfig;
