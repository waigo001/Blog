import { Link } from "@chakra-ui/layout";
import { IconButton, IconButtonProps } from "@chakra-ui/react";
import React from "react";

interface Props extends IconButtonProps {
  href?: string;
}

const SocialLink: React.FC<Props> = ({ href, ...props }) => {
  return <IconButton as={Link} isExternal href={href} {...props} />;
};

export default SocialLink;
