import React from "react";
import { getAllPosts, getPost } from "src/lib/post";
import { useRouter } from "next/router";
import ErrorPage from "next/error";

import { NextPage } from "next";

import { CommonLayout } from "src/components/layout";
import {
  PostTime,
  Tags,
  PostPageRenderer,
  TableOfContent,
} from "src/components/uiParts";
import { Badge, Box, chakra, Divider, Flex, Text } from "@chakra-ui/react";
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

  const ogp = new URL(
    "/" +
      encodeURIComponent(post.ogpTitle === null ? post.title : post.ogpTitle) +
      ".png",
    process.env.OGP_URL
  );
  ogp.searchParams.set("md", "1");
  if (post.ogpFontSize !== null)
    ogp.searchParams.set("fontSize", post.ogpFontSize);

  return (
    <CommonLayout>
      {router.isFallback ? (
        <h1>Loading…</h1>
      ) : (
        <Flex flexGrow="1">
          <chakra.article
            px={{ base: "0", sm: "4", md: "6" }}
            width={{ base: "full", lg: "calc(100% - 16rem)" }}
          >
            <NextSeo
              title={post.title}
              description={post.description}
              twitter={{ cardType: "summary_large_image" }}
              openGraph={{
                images: [{ url: ogp.toString() }],
              }}
            />
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
          </chakra.article>
          <chakra.aside
            width="16rem"
            display={{ base: "none", lg: "block" }}
            position="sticky"
            top="5rem"
            right="0"
            alignSelf="start"
            flexShrink={0}
          >
            {post.toc && (
              <Box
                as="nav"
                p="4"
                maxHeight="calc(100vh - 9rem)"
                overflowY="auto"
                sx={{ overscrollBehavior: "contain" }}
              >
                <Text fontWeight="bold" fontSize="md" letterSpacing="wide">
                  目次
                </Text>
                <TableOfContent toc={post.toc}></TableOfContent>
              </Box>
            )}
          </chakra.aside>
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
