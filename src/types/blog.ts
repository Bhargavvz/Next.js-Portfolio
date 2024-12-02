export interface BlogPostType {
  _id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  tags: string[];
  author: {
    name: string;
    image: string;
  };
  published: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface BlogPaginationType {
  posts: BlogPostType[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}
