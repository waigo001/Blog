import {
  Typography,
  Box,
  alpha,
  Divider,
  Link,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import React from "react";
import { SpecialComponents } from "react-markdown/lib/ast-to-react";
import { NormalComponents } from "react-markdown/lib/complex-types";
import { isURL } from "src/utils";
import CodeBlock from "../CodeBlock";

export const MdComponents: Partial<
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
      mt="2.5rem"
      mb="0.5rem"
      lineHeight={1.2}
      fontWeight={700}
      fontSize="1.5rem"
      borderLeft={4}
      borderColor="primary.main"
      pl={1}
      py={0.5}
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
      mb="0.5rem"
      lineHeight={1.7}
      sx={{
        "blockquote &": {
          my: 1,
        },
        "li &": {
          my: 0,
        },
      }}
    >
      {children}
    </Typography>
  ),
  blockquote: ({ children }) => (
    <Box
      component="blockquote"
      p={1}
      mx={0.5}
      my={2}
      bgcolor={(theme) => alpha(theme.palette.secondary.main, 0.1)}
      borderLeft={4}
      borderRadius={1}
      borderColor="secondary.main"
    >
      {children}
    </Box>
  ),
  hr: () => <Divider sx={{ my: 1 }} />,
  a: ({ children, href, id }) =>
    isURL(href) ? (
      <Link href={href} target="_blank" rel="noopener" id={id}>
        {children}
      </Link>
    ) : (
      <Link href={href} underline="hover" id={id}>
        {children}
      </Link>
    ),
  code: CodeBlock,
  table: ({ children }) => (
    <TableContainer>
      <Table size="small">{children}</Table>
    </TableContainer>
  ),
  thead: ({ children }) => <TableHead>{children}</TableHead>,
  tbody: ({ children }) => <TableBody>{children}</TableBody>,
  tr: ({ children }) => <TableRow>{children}</TableRow>,
  th: ({ children, style }) => {
    let align;
    if (
      style?.textAlign === "left" ||
      style?.textAlign === "center" ||
      style?.textAlign === "right" ||
      style?.textAlign === "justify" ||
      style?.textAlign === "inherit"
    )
      align = style?.textAlign;
    return <TableCell align={align}>{children}</TableCell>;
  },
  td: ({ children, style }) => {
    let align;
    if (
      style?.textAlign === "left" ||
      style?.textAlign === "center" ||
      style?.textAlign === "right" ||
      style?.textAlign === "justify" ||
      style?.textAlign === "inherit"
    )
      align = style?.textAlign;
    return <TableCell align={align}>{children}</TableCell>;
  },
};
