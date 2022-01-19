import { Flex, useColorModeValue, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { FaTags } from "react-icons/fa";
import PostTime from "./PostTime";
import Tags from "./Tags";

type Props = {
  post: Post;
};

const BlogCard: React.VFC<Props> = ({ post }) => {
  return (
    <Flex
      as="article"
      direction="column"
      bg={useColorModeValue("white", "gray.800")}
      boxShadow={useColorModeValue("md", "xl")}
      p="4"
      rounded="lg"
      h="100%"
    >
      {post.createdAt && (
        <PostTime createdAt={post.createdAt} updatedAt={post.updatedAt} />
      )}
      <Link href={`/blog/${post.slug}`} passHref>
        <Text as="a" fontSize="xl" fontWeight="bold" my="2">
          <h2>{post.title}</h2>
        </Text>
      </Link>
      <Flex flex="1" />
      <Flex align="center" gridGap="2" mt="2" mb="1">
        <FaTags />
        <Text fontSize="sm">タグ</Text>
      </Flex>
      <Tags tags={post.tags} />
    </Flex>
  );
};

export default BlogCard;
