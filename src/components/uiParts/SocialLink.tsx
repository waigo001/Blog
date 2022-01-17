import { Link } from "@chakra-ui/layout";
import { IconButton, IconButtonProps } from "@chakra-ui/react";
import React from "react";

interface Props extends IconButtonProps {
  href?: string;
}

const SocialLink: React.VFC<Props> = ({ href, ...props }) => {
  return (
    <Link href={href} isExternal>
      <IconButton {...props} />
    </Link>
  );
};

export default SocialLink;
