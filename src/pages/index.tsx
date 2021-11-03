import Head from "next/head";
import React from "react";
import HomeLayout from "src/components/layout/home";

const HomePage: React.VFC = () => {
  return (
    <HomeLayout>
      <Head>
        <title>K.W. info</title>
      </Head>
    </HomeLayout>
  );
};

export default HomePage;
