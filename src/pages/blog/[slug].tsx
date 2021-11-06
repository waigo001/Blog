import React from "react";
import { getAllPosts, getPost } from "src/lib/post";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Head from "next/head";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkUnwrapImages from "remark-unwrap-images";

import { NextPage } from "next";
import Image from "next/image";

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
            <h1>{post.title}</h1>
            <ReactMarkdown
              components={{ img: ImgRenderer, ...PostRenderer }}
              remarkPlugins={[remarkUnwrapImages, remarkGfm]}
            >
              {post.content}
            </ReactMarkdown>
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
