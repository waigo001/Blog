import Highlight, { defaultProps, Language } from "prism-react-renderer";
import React, { useState } from "react";

import DarkTheme from "prism-react-renderer/themes/nightOwl";
import { Box } from "@mui/system";
import type { TypographyOptions } from "@mui/material/styles/createTypography";
import { Element } from "hast";
import { alpha } from "@mui/material/styles";

type Props = {
  children: React.ReactNode;
  className?: string;
  inline?: boolean;
  node?: Element;
};
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

const CodeBlock: React.VFC<Props> = ({
  children,
  className,
  inline,
  node,
  ...props
}) => {
  const [language, title] = getParams(className);
  const [editorCode] = useState(String(children).trim());
  const prismTheme = DarkTheme;

  if (inline)
    return (
      <Box
        component="code"
        className={className}
        {...props}
        px={0.75}
        py={0.25}
        mx={0.25}
        fontFamily={(theme) =>
          (theme.typography as TypographyOptions).fontFamilyCode
        }
        color="text.primary"
        bgcolor={(theme) => alpha(theme.palette.primary.light, 0.2)}
        borderRadius={1.5}
      >
        {children}
      </Box>
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
          bgcolor={prismTheme.plain.color}
          color={prismTheme.plain.backgroundColor}
          fontFamily={(theme) =>
            (theme.typography as TypographyOptions).fontFamilyCode
          }
          borderRadius={2}
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
            component="pre"
            className={className}
            style={style}
            data-language={language}
            m={0}
            sx={{
              overflowX: "auto",
              borderRadius: 2,
            }}
          >
            <Box
              component="code"
              className={className}
              py={3}
              sx={{ float: "left", minWidth: "100%" }}
            >
              {tokens.map((line, i) => (
                <Box
                  key={i}
                  {...getLineProps({ line, key: i })}
                  px={3}
                  sx={{
                    bgcolor: shouldHighlightLine(i)
                      ? highlightColor
                      : undefined,
                    fontFamily: (theme) =>
                      (theme.typography as TypographyOptions).fontFamilyCode,
                  }}
                >
                  {line.map((token, key) => (
                    <Box
                      component="span"
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
