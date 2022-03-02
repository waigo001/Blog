type Post = {
  slug: string;

  title: string;
  isDraft: boolean;
  updatedAt: string;
  createdAt: string;
  description?: string;

  ogpTitle: string | null;

  content: string;
  tags?: string[];
  toc?: Toc[];
};
