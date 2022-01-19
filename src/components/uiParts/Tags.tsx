import { Tag, TagLabel, TagLeftIcon, Wrap, WrapItem } from "@chakra-ui/react";
import React from "react";
import { FaHashtag } from "react-icons/fa";

type Props = {
  tags?: string[];
};

const Tags: React.VFC<Props> = ({ tags }) => {
  return (
    <Wrap spacing="2" my="1" align="center">
      {tags &&
        tags.map((tag) => (
          <WrapItem key={tag}>
            <Tag size="md" borderRadius="full" pr="2.5" variant="solid">
              <TagLeftIcon as={FaHashtag} />
              <TagLabel lineHeight="normal"> {tag}</TagLabel>
            </Tag>
          </WrapItem>
        ))}
    </Wrap>
  );
};

export default Tags;
