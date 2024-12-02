export interface BlogPostType {
  _id?: string;
  title: string;
  content: string;
  excerpt: string;
  coverImage: string;
  tags: string[];
  author: {
    name: string;
    image: string;
  };
  published: boolean;
  slug: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
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
