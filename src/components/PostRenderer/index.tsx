import { Alert, AlertTitle, Box, Divider, Typography } from "@mui/material";
import React from "react";
import { SpecialComponents } from "react-markdown/lib/ast-to-react";
import { NormalComponents } from "react-markdown/lib/complex-types";
import CodeBlock from "../CodeBlock";

const PostRenderer: Partial<
  Omit<NormalComponents, keyof SpecialComponents> & SpecialComponents
> = {
  h1: ({ children }) => (
    <Typography
      component="h1"
      mt="2rem"
      mb="0.25rem"
      lineHeight={1.2}
      fontWeight={700}
      fontSize="1.875rem"
      letterSpacing="-0.025rem"
    >
      {children}
    </Typography>
  ),
  h2: ({ children }) => (
    <Typography
      component="h2"
      mt="3rem"
      mb="0.5rem"
      lineHeight={1.3}
      fontWeight={700}
      fontSize="1.5rem"
      sx={{
        "& + h3": {
          mt: "1.5rem",
        },
      }}
    >
      {children}
    </Typography>
  ),
  h3: ({ children }) => (
    <Typography
      component="h3"
      mt="3rem"
      mb="0.25rem"
      lineHeight={1.25}
      fontWeight={700}
      fontSize="1.25rem"
    >
      {children}
    </Typography>
  ),
  h4: ({ children }) => (
    <Typography
      component="h4"
      mt="3rem"
      lineHeight={1.375}
      fontWeight={700}
      fontSize="1.125rem"
    >
      {children}
    </Typography>
  ),
  p: ({ children }) => (
    <Typography
      component="p"
      mt="1.25rem"
      mb={1}
      lineHeight={1.7}
      sx={{
        "blockquote &": {
          mt: 0,
        },
      }}
    >
      {children}
    </Typography>
  ),
  blockquote: ({ children }) => (
    <Typography
      component="blockquote"
      py={1}
      pl={1.5}
      color="text.secondary"
      sx={{
        borderLeft: "0.25rem solid",
      }}
    >
      {children}
    </Typography>
  ),
  hr: () => <Divider sx={{ my: 1 }} />,
  code: CodeBlock,
};

export default PostRenderer;
