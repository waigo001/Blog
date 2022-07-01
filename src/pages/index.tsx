import { NextSeo } from "next-seo";
import React from "react";
import { HomeLayout } from "src/components/layout";

const HomePage: React.FC = () => {
  return (
    <HomeLayout>
      <NextSeo title="K.W.info" titleTemplate="%s" />
    </HomeLayout>
  );
};

export default HomePage;
