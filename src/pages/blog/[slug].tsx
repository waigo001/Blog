import React from "react";
import { getAllPosts, getPost } from "src/lib/post";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Head from "next/head";

import { NextPage } from "next";

import { CommonLayout } from "src/components/layout";
import { PostTime, Tags, PostPageRenderer } from "src/components/uiParts";

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
    <CommonLayout>
      {router.isFallback ? (
        <h1>Loading…</h1>
      ) : (
        <>
          <Head>
            <title>{post.title} | K.W.info</title>
          </Head>
          <PostTime
            createdAt={post.createdAt}
            updatedAt={post.updatedAt}
            enableItemProp
          />
          {post.title}
          タグ
          <Tags tags={post.tags} />
          <PostPageRenderer post={post} />
        </>
      )}
    </CommonLayout>
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
