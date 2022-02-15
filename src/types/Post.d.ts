type Post = {
  slug: string;

  title: string;
  isDraft: boolean;
  updatedAt: string;
  createdAt: string;
  description?: string;

  content: string;
  tags?: string[];
  toc?: Toc[];
};
