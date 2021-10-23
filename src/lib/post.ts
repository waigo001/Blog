import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

const postsDir = join(process.cwd(), "posts");

export const getPostSlugs = () => {
  return fs.readdirSync(postsDir);
};

export const getPost = (slug: string): Post => {
  const fullPath = join(postsDir, slug, "index.md");
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    title: data.title,
    slug: slug,
    isDraft: data.isDraft,
    description: data.description || null,
    content: content,
    updatedAt: data.updatedAt,
    createdAt: data.createdAt,
  };
};

export const getAllPosts = (): Post[] => {
  const slugs = getPostSlugs();
  const posts = slugs.map((slug) => getPost(slug));

  return posts.sort((post1, post2) =>
    post1.updatedAt > post2.updatedAt ? -1 : 1
  );
};
