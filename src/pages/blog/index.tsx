import { GetStaticProps, NextPage } from "next";
import React from "react";
import { BlogCard } from "src/components/uiParts";
import { CommonLayout } from "src/components/layout";
import { getAllPosts } from "src/lib/post";
import { SimpleGrid } from "@chakra-ui/react";
import { NextSeo } from "next-seo";

type Props = {
  allPosts: Post[];
};

const BlogPage: NextPage<Props> = ({ allPosts }) => {
  return (
    <CommonLayout>
      <NextSeo title="Blog" />
      <SimpleGrid as="section" columns={{ base: 1, md: 2, xl: 3 }} spacing={4}>
        {allPosts.map((post) => (
          <BlogCard post={post} key={post.slug} />
        ))}
      </SimpleGrid>
    </CommonLayout>
  );
};

export default BlogPage;

export const getStaticProps: GetStaticProps = async () => {
  const allPosts = getAllPosts();

  return {
    props: { allPosts },
  };
};
