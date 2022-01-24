import React from "react";
import { getAllPosts, getPost } from "src/lib/post";
import { useRouter } from "next/router";
import ErrorPage from "next/error";

import { NextPage } from "next";

import { CommonLayout } from "src/components/layout";
import { PostTime, Tags, PostPageRenderer } from "src/components/uiParts";
import { Badge, Divider, Flex, Text } from "@chakra-ui/react";
import { NextSeo } from "next-seo";

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
        <Flex
          as="article"
          direction="column"
          px={{ base: "0", sm: "4", md: "6" }}
          py="2"
        >
          <NextSeo title={post.title} description={post.description} />
          <Flex justify="flex-start" align="center">
            <PostTime
              createdAt={post.createdAt}
              updatedAt={post.updatedAt}
              enableItemProp
            />
            {post.isDraft && (
              <Badge ml="2" colorScheme={"orange"}>
                Draft
              </Badge>
            )}
          </Flex>
          <Text as="h1" fontSize="xl" fontWeight="bold" my="4">
            {post.title}
          </Text>

          <Tags tags={post.tags} />
          <Divider my="4" />
          <section>
            <PostPageRenderer post={post} />
          </section>
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
