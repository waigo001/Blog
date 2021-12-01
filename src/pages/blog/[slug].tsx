import React from "react";
import { getAllPosts, getPost } from "src/lib/post";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Head from "next/head";

import { NextPage } from "next";

import CommonLayout from "src/components/layout/common";
import { Box, Container, Divider, Stack, Typography } from "@mui/material";
import { PostPageRenderer } from "src/components/MarkdownRenderer";
import PostTime from "src/components/PostTime";
import { LocalOffer } from "@mui/icons-material";
import Tags from "src/components/Tags";

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
      <Container sx={{ pt: { xs: 9, sm: 10 }, pb: 8 }} maxWidth="md">
        {router.isFallback ? (
          <h1>Loading…</h1>
        ) : (
          <>
            <Head>
              <title>{post.title} | K.W.info</title>
            </Head>
            <Stack spacing={1.25}>
              <PostTime
                createdAt={post.createdAt}
                updatedAt={post.updatedAt}
                enableItemProp
              />
              <Typography
                sx={{
                  textDecoration: "none",
                  fontSize: "1.875rem",
                  letterSpacing: "-0.025rem",
                  fontWeight: 700,
                }}
                component="h1"
              >
                {post.title}
              </Typography>
              <Box display="flex" alignItems="center" fontSize="small">
                <LocalOffer sx={{ fontSize: "1rem", mr: 0.5 }} />
                タグ
              </Box>
              <Tags tags={post.tags} />
              <Divider sx={{ pt: 2 }} />
              <div>
                <PostPageRenderer post={post} />
              </div>
            </Stack>
          </>
        )}
      </Container>
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
