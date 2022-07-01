import { Button, Wrap, WrapItem } from "@chakra-ui/react";
import React from "react";
import { FaHashtag } from "react-icons/fa";

type Props = {
  tags?: string[];
};

const Tags: React.FC<Props> = ({ tags }) => {
  return (
    <Wrap spacing="2" mt="3" align="center">
      {tags &&
        tags.map((tag) => (
          <WrapItem key={tag}>
            <Button
              variant="link"
              size="xs"
              leftIcon={<FaHashtag />}
              iconSpacing={0.5}
            >
              {tag}
            </Button>
          </WrapItem>
        ))}
    </Wrap>
  );
};

export default Tags;
