import Image from "next/image";

import { chakra } from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkUnwrapImages from "remark-unwrap-images";

import { isURL } from "src/utils";

import { MdComponents } from "./MdComponents";

type Props = {
  post: Post;
};

const PostPageRenderer: React.FC<Props> = ({ post }) => {
  const ImgRenderer: React.FC<{ alt?: string; src?: string }> = (props) => {
    const { alt = "", src } = props;

    if (!src) return <></>;
    if (isURL(src)) return <chakra.img my="4" src={src} alt={alt} />;

    const imgSrc = require(`posts/${post.slug}/${src}`);
    return <chakra.img as={Image} my="4" src={imgSrc} alt={alt} />;
  };

  return (
    <ReactMarkdown
      components={{ img: ImgRenderer, ...MdComponents }}
      remarkPlugins={[remarkUnwrapImages, remarkGfm]}
      rehypePlugins={[rehypeSlug]}
    >
      {post.content}
    </ReactMarkdown>
  );
};

export default PostPageRenderer;
