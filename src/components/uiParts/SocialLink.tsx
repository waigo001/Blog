import { Link } from "@chakra-ui/layout";
import { IconButton } from "@chakra-ui/react";

import type { IconButtonProps } from "@chakra-ui/react";

interface Props extends IconButtonProps {
  href?: string;
}

const SocialLink: React.FC<Props> = ({ href, ...props }) => {
  return <IconButton as={Link} isExternal href={href} {...props} />;
};

export default SocialLink;
