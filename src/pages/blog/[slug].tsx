import React from "react";
import { getAllPosts, getPost } from "src/lib/post";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Head from "next/head";

import { NextPage } from "next";
import Image from "next/image";

import BlogLayout from "src/components/layout/blog";
import { Container } from "@mui/material";
import BlogCard from "src/components/BlogCard";

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

  const ImgRenderer: React.VFC<{ alt?: string; src?: string }> = (props) => {
    const { alt, src } = props;

    if (!src) return <></>;

    const imgSrc = isURL(src) ? src : require(`posts/${post.slug}/${src}`);
    return <Image src={imgSrc} alt={alt} />;
  };

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
            <BlogCard
              title={post.title}
              slug={post.slug}
              createdAt={post.createdAt}
              updatedAt={post.updatedAt}
              tags={post.tags}
              content={post.content}
            />
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

const isURL = (url: string) => {
  try {
    new URL(url);
  } catch (e) {
    return false;
  }
  return true;
};
