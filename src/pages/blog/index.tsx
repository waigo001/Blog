import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import React from "react";
import { BlogCard } from "src/components/uiParts";
import { CommonLayout } from "src/components/layout";
import { getAllPosts } from "src/lib/post";

type Props = {
  allPosts: Post[];
};

const BlogPage: NextPage<Props> = ({ allPosts }) => {
  return (
    <CommonLayout>
      <Head>
        <title>Blog | K.W.info</title>
      </Head>
      {allPosts.map((post) => (
        <BlogCard post={post} key={post.slug} />
      ))}
    </CommonLayout>
  );
};

export default BlogPage;

export const getStaticProps: GetStaticProps = async () => {
  const allPosts = getAllPosts();

  return {
    props: { allPosts },
  };
};
