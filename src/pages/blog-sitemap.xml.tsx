import { getServerSideSitemap } from "next-sitemap";
import { GetServerSideProps } from "next";
import { getAllPosts } from "src/lib/post";
import { parseISO } from "date-fns";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const posts = getAllPosts();

  const fields = posts.map((post) => {
    return {
      loc: process.env.SITE_URL + "/blog/" + post.slug,
      lastmod: parseISO(post.updatedAt).toISOString(),
    };
  });
  return getServerSideSitemap(ctx, fields);
};

const Page = () => null;

export default Page;
