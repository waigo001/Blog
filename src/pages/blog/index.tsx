import { Container } from "@mui/material";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import BlogLayout from "src/components/layout/blog";
import { getAllPosts } from "src/lib/post";

type Props = {
  allPosts: Post[];
};

const BlogPage: NextPage<Props> = ({ allPosts }) => {
  return (
    <BlogLayout>
      <Head>
        <title>Blog | K.W.info</title>
      </Head>
      <Container sx={{ pt: { xs: 9, sm: 10 }, pb: 8 }}>
        <h1>Blog Posts</h1>
        {allPosts.map((post) => (
          <div key={post.slug}>
            <Link href={"/blog/" + post.slug}>{post.title}</Link>
          </div>
        ))}
      </Container>
    </BlogLayout>
  );
};

export default BlogPage;

export const getStaticProps = async () => {
  const allPosts = getAllPosts();

  return {
    props: { allPosts },
  };
};
