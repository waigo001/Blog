import React from "react";
import { getAllPosts, getPost } from "src/lib/post";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Head from "next/head";

import { NextPage } from "next";

import { CommonLayout } from "src/components/layout";
import { PostTime, Tags, PostPageRenderer } from "src/components/uiParts";
import { Divider, Flex, Text } from "@chakra-ui/react";

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
        <Flex direction="column" px={{ base: "0", sm: "4", md: "6" }} py="2">
          <Head>
            <title>{post.title} | K.W.info</title>
          </Head>
          <PostTime
            createdAt={post.createdAt}
            updatedAt={post.updatedAt}
            enableItemProp
          />
          <Text as="h1" fontSize="xl" fontWeight="bold" my="4">
            {post.title}
          </Text>

          <Tags tags={post.tags} />
          <Divider my="4" />
          <div>
            <PostPageRenderer post={post} />
          </div>
        </Flex>
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
