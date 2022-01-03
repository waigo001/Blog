import Link from "next/link";
import React from "react";
import { useDialog } from "src/hooks/useDialog";
import PostTime from "./PostTime";
import ShareDialog from "./ShareDialog";
import Tags from "./Tags";

type Props = {
  post: Post;
};

const BlogCard: React.VFC<Props> = ({ post }) => {
  const { isOpen, onClose } = useDialog(false);

  return (
    <div>
      {post.createdAt && (
        <PostTime createdAt={post.createdAt} updatedAt={post.updatedAt} />
      )}
      <Link href={`/blog/${post.slug}`} passHref>
        {post.title}
      </Link>
      タグ
      <Tags tags={post.tags} />
      <ShareDialog
        title={post.title}
        slug={post.slug}
        isOpen={isOpen}
        onClose={onClose}
      />
    </div>
  );
};

export default BlogCard;
