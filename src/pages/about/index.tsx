import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { CommonLayout } from "src/components/layout";
import { AboutPageRenderer } from "src/components/uiParts";
import { getAboutPage } from "src/lib/about";

type Props = {
  aboutPage: AboutPage;
};

const AboutPage: NextPage<Props> = ({ aboutPage }) => {
  return (
    <CommonLayout>
      <Head>
        <title>About | K.W.info</title>
      </Head>
      <AboutPageRenderer content={aboutPage.content} />
    </CommonLayout>
  );
};

export default AboutPage;

export const getStaticProps = async () => {
  const aboutPage = getAboutPage();

  return {
    props: { aboutPage },
  };
};
