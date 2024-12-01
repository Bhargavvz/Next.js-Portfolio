import { BlogPostType } from "@/app/blog/page";

const BLOG_POSTS_KEY = 'blog_posts';

export const getBlogPosts = (): BlogPostType[] => {
  if (typeof window === 'undefined') return [];
  
  const posts = localStorage.getItem(BLOG_POSTS_KEY);
  return posts ? JSON.parse(posts) : [];
};

export const saveBlogPosts = (posts: BlogPostType[]): void => {
  if (typeof window === 'undefined') return;
  
  localStorage.setItem(BLOG_POSTS_KEY, JSON.stringify(posts));
};

export const addBlogPost = (post: Omit<BlogPostType, 'id' | 'createdAt'>): BlogPostType => {
  const newPost: BlogPostType = {
    ...post,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };

  const posts = getBlogPosts();
  const updatedPosts = [newPost, ...posts];
  saveBlogPosts(updatedPosts);

  return newPost;
};

export const deleteBlogPost = (postId: string): void => {
  const posts = getBlogPosts();
  const updatedPosts = posts.filter(post => post.id !== postId);
  saveBlogPosts(updatedPosts);
};
