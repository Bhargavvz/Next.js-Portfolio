"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BlogPost from '@/components/blog/BlogPost';
import AddPostModal from '@/components/blog/AddPostModal';
import PasswordModal from '@/components/blog/PasswordModal';
import LoadingPost from '@/components/blog/LoadingPost';
import { getBlogPosts, addBlogPost, deleteBlogPost } from '@/lib/blog';
import Taskbar from '@/components/layout/Taskbar';

export interface BlogPostType {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: string;
}

export default function BlogPage() {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isAddPostModalOpen, setIsAddPostModalOpen] = useState(false);
  const [posts, setPosts] = useState<BlogPostType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPosts = () => {
      try {
        const loadedPosts = getBlogPosts();
        setPosts(loadedPosts);
        setError(null);
      } catch (err) {
        setError('Failed to load blog posts. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    loadPosts();
  }, []);

  const handlePasswordSubmit = (password: string) => {
    if (password === "123456") {
      setIsPasswordModalOpen(false);
      setIsAddPostModalOpen(true);
    } else {
      alert("Incorrect password!");
    }
  };

  const handleAddPost = async (post: Omit<BlogPostType, 'id' | 'createdAt'>) => {
    try {
      const newPost = addBlogPost(post);
      setPosts([newPost, ...posts]);
      setIsAddPostModalOpen(false);
    } catch (err) {
      alert('Failed to create post. Please try again.');
    }
  };

  const handleDeletePost = (postId: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        deleteBlogPost(postId);
        setPosts(posts.filter(post => post.id !== postId));
      } catch (err) {
        alert('Failed to delete post. Please try again.');
      }
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-b from-black to-purple-950/20 px-4 py-16"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <motion.h1
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              className="text-4xl font-bold text-white"
            >
              Blog
            </motion.h1>
            <motion.button
              initial={{ x: 20 }}
              animate={{ x: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsPasswordModalOpen(true)}
              className="px-4 py-2 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg 
                     text-white font-medium hover:opacity-90 transition-opacity"
            >
              Add Post
            </motion.button>
          </div>

          {/* Error state */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <p className="text-red-400">{error}</p>
            </motion.div>
          )}

          {/* Loading state */}
          {isLoading ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <LoadingPost key={i} />
              ))}
            </div>
          ) : (
            <>
              {/* Empty state */}
              {posts.length === 0 && !error && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-12"
                >
                  <p className="text-gray-400">No blog posts yet. Create your first post!</p>
                </motion.div>
              )}

              {/* Blog posts grid */}
              <AnimatePresence mode="popLayout">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {posts.map((post) => (
                    <BlogPost 
                      key={post.id} 
                      post={post} 
                      onDelete={handleDeletePost}
                    />
                  ))}
                </div>
              </AnimatePresence>
            </>
          )}

          {/* Modals */}
          <PasswordModal
            isOpen={isPasswordModalOpen}
            onClose={() => setIsPasswordModalOpen(false)}
            onSubmit={handlePasswordSubmit}
          />
          <AddPostModal
            isOpen={isAddPostModalOpen}
            onClose={() => setIsAddPostModalOpen(false)}
            onSubmit={handleAddPost}
          />
        </div>
      </motion.div>
      <Taskbar />
    </>
  );
}
