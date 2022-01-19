import { Tag, TagLabel, TagLeftIcon, Wrap, WrapItem } from "@chakra-ui/react";
import React from "react";
import { FaHashtag } from "react-icons/fa";

type Props = {
  tags?: string[];
};

const Tags: React.VFC<Props> = ({ tags }) => {
  return (
    <Wrap spacing="2" my="1">
      {tags &&
        tags.map((tag) => (
          <WrapItem key={tag}>
            <Tag borderRadius="full" variant="solid">
              <TagLeftIcon as={FaHashtag} />
              <TagLabel> {tag}</TagLabel>
            </Tag>
          </WrapItem>
        ))}
    </Wrap>
  );
};

export default Tags;
