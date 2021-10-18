import React from "react";
import { getAllPosts, getPostBySlug } from "src/lib/api";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Head from "next/head";

type Props = {
  post: Post;
  morePosts: Post[];
  preview?: boolean;
};

const BlogPostPage: React.VFC<Props> = ({ post }: Props) => {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <div>
      {router.isFallback ? (
        <h1>Loading…</h1>
      ) : (
        <>
          <article className="mb-32">
            <Head>
              <title>{post.title} | K.W.info</title>
            </Head>
            <h1>{post.title}</h1>
            {post.content}
          </article>
        </>
      )}
    </div>
  );
};

export default BlogPostPage;

type Params = {
  params: {
    slug: string;
  };
};


export async function getStaticProps({ params }: Params) {
  const post = getPostBySlug(params.slug, ["title", "slug", "content"]);

  return {
    props: {
      post: {
        ...post,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug"]);

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
