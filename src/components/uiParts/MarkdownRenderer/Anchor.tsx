import NextLink from "next/link";

import { Link, useColorModeValue } from "@chakra-ui/react";

import { isURL } from "src/utils";

type Props = {
  children: React.ReactNode & React.ReactNode[];
  href?: string;
  id?: string;
};

const Anchor: React.FC<Props> = ({ children, href, id }) => {
  const color = useColorModeValue("cyan.600", "cyan.400");
  if (!href) return <></>;
  if (isURL(href)) {
    return (
      <Link href={href} color={color} isExternal id={id} fontWeight="bold">
        {children}
      </Link>
    );
  } else {
    return (
      <NextLink href={href} passHref legacyBehavior>
        <Link color={color} id={id} scrollMarginTop={id ? "5rem" : undefined}>
          {children}
        </Link>
      </NextLink>
    );
  }
};

export default Anchor;
