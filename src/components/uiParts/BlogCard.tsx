import Link from "next/link";

import { Flex, useColorModeValue, Text, Badge } from "@chakra-ui/react";

import PostTime from "./PostTime";
import Tags from "./Tags";

type Props = {
  post: Post;
};

const BlogCard: React.FC<Props> = ({ post }) => {
  return (
    <Flex
      as="article"
      direction="column"
      bg={useColorModeValue("white", "gray.800")}
      boxShadow={useColorModeValue("md", "2xl")}
      p="4"
      rounded="lg"
      h="100%"
    >
      <Flex justify="flex-start" align="center">
        <PostTime createdAt={post.createdAt} updatedAt={post.updatedAt} />
        {post.isDraft && (
          <Badge ml="2" colorScheme={"orange"}>
            Draft
          </Badge>
        )}
      </Flex>

      <Link href={`/blog/${post.slug}`} passHref legacyBehavior>
        <Text as="a" fontSize="xl" fontWeight="bold" my="2">
          <h2>{post.title}</h2>
        </Text>
      </Link>
      <Flex flex="1" />
      <Tags tags={post.tags} />
    </Flex>
  );
};

export default BlogCard;
