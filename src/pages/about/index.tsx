import { NextPage } from "next";

import { NextSeo } from "next-seo";

import { CommonLayout } from "src/components/layout";
import { AboutPageRenderer } from "src/components/uiParts";
import { getAboutPage } from "src/lib/about";

type Props = {
  aboutPage: AboutPage;
};

const AboutPage: NextPage<Props> = ({ aboutPage }) => {
  return (
    <CommonLayout>
      <NextSeo title="About" description="K.W. infoについて" />
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
