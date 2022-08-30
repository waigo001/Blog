import fs from "fs";
import { join } from "path";

import matter from "gray-matter";

const filePath = join(process.cwd(), "src/pages/about", "index.md");

export const getAboutPage = (): AboutPage => {
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    title: data.title,
    isDraft: data.isDraft,
    description: data.description || null,
    content: content,
    updatedAt: data.updatedAt,
    createdAt: data.createdAt,
  };
};
