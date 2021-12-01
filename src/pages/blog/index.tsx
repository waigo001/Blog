import { Container, Grid } from "@mui/material";
import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import BlogCard from "src/components/uiParts/BlogCard";
import { CommonLayout } from "src/components/Layout";
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
      <Container sx={{ pt: { xs: 9, sm: 10 }, pb: 8 }}>
        <Grid container spacing={2}>
          {allPosts.map((post) => (
            <Grid item xs={12} sm={12} md={6} lg={4} key={post.slug}>
              <BlogCard post={post} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </CommonLayout>
  );
};

export default BlogPage;

export const getStaticProps = async () => {
  const allPosts = getAllPosts();

  return {
    props: { allPosts },
  };
};
