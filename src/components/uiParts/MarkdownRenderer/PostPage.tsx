import Image from "next/image";

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
      rehypePlugins={[rehypeSlug]}
    >
      {post.content}
    </ReactMarkdown>
  );
};

export default PostPageRenderer;
