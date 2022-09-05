import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading:
      'Inter,"Zen Kaku Gothic New",-apple-system,"BlinkMacSystemFont","Hiragino Kaku Gothic ProN","Hiragino Sans","Segoe UI","Yu Gothic UI",Meiryo,sans-serif,"Segoe UI Emoji"',
    body: 'Inter,"Zen Kaku Gothic New",-apple-system,"BlinkMacSystemFont","Hiragino Kaku Gothic ProN","Hiragino Sans","Segoe UI","Yu Gothic UI",Meiryo,sans-serif,"Segoe UI Emoji"',
    mono: 'SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace',
  },
  config: {
    initialColorMode: "system",
    useSystemColorMode: true,
  },
  styles: {
    global: () => ({
      body: {
        textRendering: "optimizeLegibility",
      },
      "*, *::before, &::after": {
        overflowWrap: "break-word",
      },
    }),
  },
  mdx: {
    h1: {
      mt: "2rem",
      mb: ".25rem",
      lineHeight: 1.2,
      fontWeight: "bold",
      fontSize: "1.875rem",
      letterSpacing: "-0.025rem",
    },
    h2: {
      mt: "2.5rem",
      mb: "0.5rem",
      lineHeight: 1.2,
      fontWeight: "bold",
      fontSize: "1.5rem",
      borderLeftWidth: 4,
      pl: "1.5",
      pt: "1",
      pb: "0.5",
      "& + h3": {
        mt: "1.5rem",
      },
    },
    h3: {
      mt: "3rem",
      mb: "0.25rem",
      lineHeight: 1.25,
      fontWeight: "bold",
      fontSize: "1.25rem",
    },
    h4: {
      mt: "3rem",
      lineHeight: 1.375,
      fontWeight: "bold",
      fontSize: "1.125rem",
    },
    a: {
      textDecoration: "underline",
      color: "cyan.500",
      fontWeight: "semibold",
      transition: "color 2s",
      transitionTimingFunction: "ease-out",
      _hover: {
        color: "cyan.600",
        textDecoration: "underline",
      },
    },
    p: {
      mt: "1.25rem",
      mb: "0.5rem",
      lineHeight: 1.7,
      "blockquote &": {
        my: 1,
      },
      "li &": {
        my: 0,
      },
    },
    hr: {
      my: "1",
    },
    blockquote: {
      bg: "cyan.100",
      borderWidth: "1px",
      borderColor: "cyan.200",
      rounded: "lg",
      px: "1.25rem",
      py: "1rem",
      my: "1.5rem",
    },
    ul: {
      mt: "1.5rem",
      ml: "1.25rem",
      "blockquote &": { mt: 0 },
      "& > * + *": {
        mt: "0.25rem",
      },
      "li &": { mt: 0 },
    },
    code: {
      rounded: "md",
      px: "1",
      fontSize: "0.875em",
      py: "0.5",
      lineHeight: "normal",
      mx: "0.5",
    },
  },
});

export default theme;
