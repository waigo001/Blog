import ReactDOM from "react-dom/server";
import { NextApiRequest, NextApiResponse } from "next";
import * as playwright from "playwright-aws-lambda";

const styles = `
  html, body {
    height: 100%;
    display: grid;
  }

  h1 { margin: auto }
`;

const Content = () => (
  <html>
    <head>
      <style>{styles}</style>
    </head>
    <body>
      <h1>{"test OGP"}</h1>
    </body>
  </html>
);

const OgImageApi = async (req: NextApiRequest, res: NextApiResponse) => {
  // サイズの設定
  const viewport = { width: 1200, height: 630 };

  // ブラウザインスタンスの生成
  const browser = await playwright.launchChromium();
  const page = await browser.newPage({ viewport });

  const id = req.query.id as string;

  const markup = ReactDOM.renderToStaticMarkup(<Content />);
  const html = `<!doctype html>${markup}`;
  await page.setContent(html, { waitUntil: "domcontentloaded" });

  // スクリーンショットを取得する
  const image = await page.screenshot({ type: "png" });
  await browser.close();
  // Content Type を設定
  res.setHeader("Content-Type", "image/png");

  // レスポンスを返す
  res.end(image);
};

export default OgImageApi;
