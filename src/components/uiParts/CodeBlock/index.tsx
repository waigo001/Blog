import Highlight, { defaultProps, Language } from "prism-react-renderer";
import React, { useState } from "react";

import DarkTheme from "prism-react-renderer/themes/nightOwl";
import { Element } from "hast";

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
      <div
        className={className}
        {...props}
      >
        {children}
      </div>
    );

  const highlightColor = prismTheme.plain.color + "22";
  const shouldHighlightLine = calculateLinesToHighlight(
    node?.data?.meta as string
  );

  return (
    <>
      {title && (
        <div
        >
          {title}
        </div>
      )}
      <Highlight
        {...defaultProps}
        code={editorCode}
        language={language as Language}
        theme={prismTheme}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={className}
            style={style}
            data-language={language}
            
          >
            <code
              className={className}
            >
              {tokens.map((line, i) => (
                <div
                  key={i}
                  {...getLineProps({ line, key: i })}

                >
                  {line.map((token, key) => (
                    <span
                   
                      key={key}
                      {...getTokenProps({ token, key })}
                    />
                  ))}
                </div>
              ))}
            </code>
          </pre>
        )}
      </Highlight>
    </>
  );
};

export default CodeBlock;
