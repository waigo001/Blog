import React from "react";
import { getAllPosts, getPost } from "src/lib/post";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Head from "next/head";

import { NextPage } from "next";

import BlogLayout from "src/components/layout/blog";
import { Container } from "@mui/material";
import PostRenderer from "src/components/PostRenderer";

type Props = {
  post: Post;
  morePosts: Post[];
  preview?: boolean;
};

const BlogPostPage: NextPage<Props> = ({ post }) => {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <BlogLayout>
      <Container sx={{ pt: { xs: 9, sm: 10 }, pb: 8 }}>
        {router.isFallback ? (
          <h1>Loading…</h1>
        ) : (
          <>
            <Head>
              <title>{post.title} | K.W.info</title>
            </Head>
            <PostRenderer post={post} />
          </>
        )}
      </Container>
    </BlogLayout>
  );
};

export default BlogPostPage;

type Params = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const post = getPost(params.slug);

  return {
    props: {
      post: {
        ...post,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts();

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}
