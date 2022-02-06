import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import { extractToc } from "src/utils/mdUtils";


const postsDir = join(process.cwd(), "posts");

export const getPostSlugs = () => {
  return fs.readdirSync(postsDir);
};

export const getPost = (slug: string): Post => {
  const fullPath = join(postsDir, slug, "index.md");
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const toc = extractToc(content);
  return {
    title: data.title,
    slug: slug,
    isDraft: data.isDraft,
    description: data.description || null,
    content: content,
    updatedAt: data.updatedAt,
    createdAt: data.createdAt,
    tags: data.tags || null,
    toc: toc,
  };
};

export const getAllPosts = (): Post[] => {
  const slugs = getPostSlugs();
  let posts = slugs.map((slug) => getPost(slug));
  if (process.env.NODE_ENV === "production")
    posts = posts.filter((post) => !post.isDraft);
  return posts.sort((post1, post2) =>
    post1.updatedAt > post2.updatedAt ? -1 : 1
  );
};
