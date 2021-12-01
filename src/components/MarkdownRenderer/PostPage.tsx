import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkUnwrapImages from "remark-unwrap-images";
import Image from "next/image";
import { MdComponents } from "./MdComponents";
import { isURL } from "src/utils";

type Props = {
  post: Post;
};

export const PostPageRenderer: React.VFC<Props> = ({ post }) => {
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
      components={{ img: ImgRenderer, ...MdComponents }}
      remarkPlugins={[remarkUnwrapImages, remarkGfm]}
    >
      {post.content}
    </ReactMarkdown>
  );
};

