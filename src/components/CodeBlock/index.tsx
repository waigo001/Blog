import Highlight, { defaultProps, Language } from "prism-react-renderer";
import React, { useState } from "react";

import lightTheme from "prism-react-renderer/themes/github";
import { Box } from "@mui/system";

type Props = {
  children: React.ReactNode;
  className?: string;
  metastring?: string;
  inline?: boolean;
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
  metastring,
  inline,
  ...props
}) => {
  const [language, title] = getParams(className);
  const [editorCode] = useState(String(children).trim());
  const theme = lightTheme;
  if (inline)
    return (
      <code className={className} {...props}>
        {children}
      </code>
    );

  const highlightColor = theme.plain.color + "22";
  const shouldHighlightLine = calculateLinesToHighlight(metastring);

  return (
    <div>
      {title && (
        <Box py={0.5} px={3} display="inline-block">
          {title}
        </Box>
      )}
      <Highlight
        {...defaultProps}
        code={editorCode}
        language={language as Language}
        theme={theme}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <Box
            component="pre"
            className={className}
            style={style}
            data-language={language}
            sx={{
              overflowX: "auto",
            }}
          >
            <Box
              component="code"
              className={className}
              py={4}
              sx={{ float: "left", minWidth: "full" }}
            >
              {tokens.map((line, i) => (
                <Box
                  key={i}
                  {...getLineProps({ line, key: i })}
                  px={4}
                  sx={{
                    bgcolor: shouldHighlightLine(i)
                      ? highlightColor
                      : undefined,
                  }}
                >
                  {line.map((token, key) => (
                    <Box
                      component="span"
                      sx={{ wordWrap: "normal" }}
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
    </div>
  );
};

export default CodeBlock;
