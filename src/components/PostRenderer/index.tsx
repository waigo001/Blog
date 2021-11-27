import { Divider, Link, Typography } from "@mui/material";
import React from "react";
import ReactMarkdown from "react-markdown";
import { SpecialComponents } from "react-markdown/lib/ast-to-react";
import { NormalComponents } from "react-markdown/lib/complex-types";
import remarkGfm from "remark-gfm";
import remarkUnwrapImages from "remark-unwrap-images";
import CodeBlock from "../CodeBlock";
import Image from "next/image";
import { alpha, Box } from "@mui/system";

const Components: Partial<
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
};

type Props = {
  post: Post;
};

const PostRenderer: React.VFC<Props> = ({ post }) => {
  const ImgRenderer: React.VFC<{ alt?: string; src?: string }> = (props) => {
    const { alt, src } = props;

    if (!src) return <></>;
    // eslint-disable-next-line @next/next/no-img-element
    if (isURL(src)) return <img src={src} alt={alt} />;

    const imgSrc = require(`posts/${post.slug}/${src}`);
    return <Image src={imgSrc} alt={alt} />;
  };

  return (
    <ReactMarkdown
      components={{ img: ImgRenderer, ...Components }}
      remarkPlugins={[remarkUnwrapImages, remarkGfm]}
    >
      {post.content}
    </ReactMarkdown>
  );
};

export default PostRenderer;

const isURL = (url?: string) => {
  if (!url) return false;
  try {
    new URL(url);
  } catch (e) {
    return false;
  }
  return true;
};
