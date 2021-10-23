import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getAboutPage } from "src/lib/about";

type Props = {
  aboutPage: AboutPage;
};

const AboutPage: NextPage<Props> = ({ aboutPage }) => {
  return (
    <div>
      <Head>
        <title>About | K.W.info</title>
      </Head>
      <main>
        <h1>{aboutPage.title}</h1>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {aboutPage.content}
        </ReactMarkdown>
      </main>
    </div>
  );
};

export default AboutPage;

export const getStaticProps = async () => {
  const aboutPage = getAboutPage();

  return {
    props: { aboutPage },
  };
};
