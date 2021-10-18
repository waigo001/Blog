import Head from "next/head";
import Link from "next/link";
import React from "react";
import { getAllPosts } from "src/lib/api";

type Props = {
  allPosts: Post[];
};

const BlogPage: React.VFC<Props> = ({ allPosts }) => {
  return (
    <div>
      <Head>
        <title>Blog | K.W.info</title>
      </Head>
      <main>
        <h1>Blog Posts</h1>
        {allPosts.map((post) => (
          <div key={post.slug}>
            <Link href={"/blog/" + post.slug}>{post.title}</Link>
          </div>
        ))}
      </main>
    </div>
  );
};

export default BlogPage;

export const getStaticProps = async () => {
  const allPosts = getAllPosts(["title", "updatedAt", "slug"]);

  return {
    props: { allPosts },
  };
};
