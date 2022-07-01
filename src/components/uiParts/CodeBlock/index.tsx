import Highlight, { defaultProps, Language } from "prism-react-renderer";
import React, { useState } from "react";

import DarkTheme from "prism-react-renderer/themes/nightOwl";
import LightTheme from "prism-react-renderer/themes/github";

import { Box, chakra, useColorModeValue } from "@chakra-ui/react";
import { CodeProps } from "react-markdown/lib/ast-to-react";

const RE = /{([\d,-]+)}/;

const calculateLinesToHighlight = (meta = "") => {
  if (!RE.test(meta)) {
    return () => false;
  }

  //@ts-ignore
  const lineNumbers = RE.exec(meta)[1]
    .split(`,`)
    .map((v) => v.split(`-`).map((x) => parseInt(x, 10)));

  return (index: number) => {
    const lineNumber = index + 1;
    const inRange = lineNumbers.some(([start, end]) =>
      end ? lineNumber >= start && lineNumber <= end : lineNumber === start
    );
    return inRange;
  };
};

const getParams = (className = "") => {
  const [language = "", title = ""] = className.split(":");

  return [language.replace(/language-/, ""), title];
};

const CodeBlock: React.FC<CodeProps> = ({
  children,
  className,
  inline,
  node,
  ...props
}) => {
  const [language, title] = getParams(className);
  const [editorCode] = useState(String(children).trim());
  const prismTheme = useColorModeValue(LightTheme, DarkTheme);
  const inlineCodeColor = useColorModeValue("cyan.700", "cyan.200");
  const bgCodeColor = useColorModeValue("gray.100", "gray.900");

  if (inline)
    return (
      <chakra.code
        apply="mdx.code"
        color={inlineCodeColor}
        bg={bgCodeColor}
        fontFamily="mono"
        {...props}
      >
        {children}
      </chakra.code>
    );

  const highlightColor = prismTheme.plain.color + "22";
  const shouldHighlightLine = calculateLinesToHighlight(
    node?.data?.meta as string
  );

  return (
    <>
      {title && (
        <Box
          py={0.5}
          px={2}
          display="inline-block"
          position="relative"
          top="1rem"
          left="1rem"
          fontFamily="mono"
          fontWeight="bold"
          fontSize="sm"
          bg={prismTheme.plain.color}
          color={prismTheme.plain.backgroundColor}
          borderRadius="md"
        >
          {title}
        </Box>
      )}
      <Highlight
        {...defaultProps}
        code={editorCode}
        language={language as Language}
        theme={prismTheme}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <Box
            as="pre"
            overflowX="auto"
            borderRadius="md"
            my="2"
            className={className}
            style={style}
            data-language={language}
          >
            <Box
              as="code"
              className={className}
              py={3}
              float="left"
              minW="full"
            >
              {tokens.map((line, i) => (
                <Box
                  key={i}
                  {...getLineProps({ line, key: i })}
                  bg={shouldHighlightLine(i) ? highlightColor : undefined}
                  px={3}
                >
                  {line.map((token, key) => (
                    <Box
                      as="span"
                      sx={{
                        wordWrap: "normal",
                      }}
                      key={key}
                      {...getTokenProps({ token, key })}
                    />
                  ))}
                </Box>
              ))}
            </Box>
          </Box>
        )}
      </Highlight>
    </>
  );
};

export default CodeBlock;
