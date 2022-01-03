import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkUnwrapImages from "remark-unwrap-images";
import { MdComponents } from "./MdComponents";

type Props = {
  content: string;
};

const AboutPageRenderer: React.VFC<Props> = ({ content }) => {
  return (
    <ReactMarkdown
      components={MdComponents}
      remarkPlugins={[remarkUnwrapImages, remarkGfm]}
    >
      {content}
    </ReactMarkdown>
  );
};

export default AboutPageRenderer;
