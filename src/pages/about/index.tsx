import { Container } from "@mui/material";
import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { CommonLayout } from "src/components/Layout";
import { AboutPageRenderer } from "src/components/MarkdownRenderer";
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
      <Container sx={{ pt: { xs: 9, sm: 10 }, pb: 8 }} maxWidth="md">
        <AboutPageRenderer content={aboutPage.content} />
      </Container>
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
