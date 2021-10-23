import React from "react";
import Head from "next/head";
import Link from "next/link";

const HomePage: React.VFC = () => {
  return (
    <div>
      <Head>
        <title>K.W. info</title>
      </Head>
      <main>
        <h1>K.W. info</h1>
        <Link href="/about">
          <a>About</a>
        </Link>
        <Link href="/blog">
          <a>Blog</a>
        </Link>
      </main>
      <footer> Copyright © 2021 K.W. info All rights reserved.</footer>
    </div>
  );
};

export default HomePage;
