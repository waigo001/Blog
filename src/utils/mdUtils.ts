import { remark } from "remark";
import { visit } from "unist-util-visit";
import { toString, Node } from "hast-util-to-string";
import slugger from "github-slugger";

export const extractToc = (mdBody: string) => {
  const result: Toc[] = [];
  const ast = remark().parse(mdBody);
  visit(ast, "heading", (child) => {
    const text = toString(child as unknown as Node);
    const id = slugger.slug(text);
    const depth = child.depth;
    result.push({
      text,
      id,
      depth,
    });
  });

  return result;
};
