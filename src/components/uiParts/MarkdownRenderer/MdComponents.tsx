import {
  chakra,
  Box,
  Kbd,
  useColorModeValue,
  HTMLChakraProps,
} from "@chakra-ui/react";
import React from "react";
import { SpecialComponents } from "react-markdown/lib/ast-to-react";
import { NormalComponents } from "react-markdown/lib/complex-types";
import CodeBlock from "../CodeBlock";
import Anchor from "./Anchor";

const Table = (props: HTMLChakraProps<"table">) => (
  <chakra.div overflowX="auto">
    <chakra.table textAlign="left" mt="32px" width="full" {...props} />
  </chakra.div>
);

const THead = (props: HTMLChakraProps<"th">) => (
  <chakra.th
    bg={useColorModeValue("gray.50", "whiteAlpha.100")}
    fontWeight="bold"
    p={2}
    fontSize="sm"
    {...props}
  />
);

const TData = (props: HTMLChakraProps<"td">) => (
  <chakra.td
    p={2}
    borderTopWidth="1px"
    borderColor="inherit"
    fontSize="sm"
    whiteSpace="normal"
    {...props}
  />
);

const isFootnote = (id?: string) => {
  if (id === "footnote-label") return true;
  else return false;
};

const LinkedHeading = (props: HTMLChakraProps<"h2">) => {
  const color = useColorModeValue("cyan.600", "cyan.400");

  return (
    <chakra.h2 data-group borderColor={color} scrollMarginTop="5rem" {...props}>
      <span className="content">{props.children}</span>
      {props.id && (
        <chakra.a
          aria-label="anchor"
          color={color}
          fontWeight="normal"
          outline="none"
          _focus={{ opacity: 1, boxShadow: "outline" }}
          opacity={0}
          _groupHover={{ opacity: 1 }}
          ml="0.375rem"
          href={`#${props.id}`}
        >
          #
        </chakra.a>
      )}
    </chakra.h2>
  );
};

const CustomStrong = (props: HTMLChakraProps<"strong">) => {
  const bg = useColorModeValue("cyan.200", "cyan.900");

  return (
    <chakra.strong
      bgGradient={"linear(transparent 75%, " + bg + " 75%)"}
      fontWeight="bold"
      {...props}
    />
  );
};

const BlockQuote = (props: HTMLChakraProps<"blockquote">) => {
  const bg = useColorModeValue("orange.100", "rgba(251, 211, 141, 0.16)");
  const borderColor = useColorModeValue("orange.500", "orange.200");
  return (
    <chakra.blockquote
      display="flex"
      alignItems="center"
      width="full"
      py="2"
      rounded="4px"
      my="3"
      borderInlineStartWidth="4px"
      borderInlineStartColor={borderColor}
      bg={bg}
      paddingInlineStart="3"
      paddingInlineEnd="4"
      {...props}
    />
  );
};

export const MdComponents: Partial<
  Omit<NormalComponents, keyof SpecialComponents> & SpecialComponents
> = {
  h1: ({ node, ...props }) => <chakra.h1 apply="mdx.h1" {...props} />,
  h2: ({ node, id, ...props }) => {
    if (isFootnote(id)) return <chakra.hr apply="mdx.hr" mt="4" />;
    else return <LinkedHeading apply="mdx.h2" id={id} {...props} />;
  },
  h3: ({ node, ...props }) => (
    <LinkedHeading as="h3" apply="mdx.h3" {...props} />
  ),
  h4: ({ node, ...props }) => (
    <LinkedHeading as="h4" apply="mdx.h4" {...props} />
  ),
  p: ({ node, ...props }) => <chakra.p apply="mdx.p" {...props} />,
  blockquote: ({ node, ...props }) => <BlockQuote {...props} />,
  hr: ({ node, ...props }) => <chakra.hr apply="mdx.hr" {...props} />,
  a: Anchor,
  strong: ({ node, ...props }) => <CustomStrong {...props} />,
  pre: ({ node, ...props }) => {
    if (typeof props.children === "string")
      return <chakra.pre my="2em" borderRadius="sm" {...props} />;
    return <>{props.children}</>;
  },
  code: CodeBlock,
  kbd: Kbd,
  ul: ({ node, ordered, ...props }) => <chakra.ul apply="mdx.ul" {...props} />,
  ol: ({ node, ordered, ...props }) => <chakra.ol apply="mdx.ul" {...props} />,
  li: ({ node, ordered, ...props }) => (
    <chakra.li lineHeight="1.7" {...props} />
  ),
  table: Table,
  th: ({ children }) => <THead>{children}</THead>,
  td: ({ children }) => <TData>{children}</TData>,
};
