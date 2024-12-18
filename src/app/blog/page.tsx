'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import BlogPost from '@/components/blog/BlogPost';
import AddPostModal from '@/components/blog/AddPostModal';
import EditPostModal from '@/components/blog/EditPostModal';
import PasswordModal from '@/components/blog/PasswordModal';
import SpaceBackground from '@/components/SpaceBackground';
import { PlusCircle, ArrowLeft, LogOut } from 'lucide-react';
import { useToastContext } from '@/contexts/ToastContext';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { BlogPostType } from '@/types/blog';

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPostType[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [selectedPost, setSelectedPost] = useState<BlogPostType | null>(null);
  const { showToast } = useToastContext();
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = useCallback(() => {
    setIsAuthenticated(false);
    localStorage.removeItem('blog_auth');
    showToast('Logged out successfully', 'success');
  }, [showToast]);

  // Auto logout when navigating away
  useEffect(() => {
    const handleRouteChange = () => {
      if (pathname !== '/blog') {
        handleLogout();
      }
    };

    handleRouteChange();

    window.addEventListener('popstate', handleLogout);
    return () => {
      window.removeEventListener('popstate', handleLogout);
    };
  }, [pathname, handleLogout]);

  // Session timeout after 30 minutes of inactivity
  useEffect(() => {
    let inactivityTimeout: NodeJS.Timeout;

    const resetInactivityTimer = () => {
      clearTimeout(inactivityTimeout);
      inactivityTimeout = setTimeout(() => {
        if (isAuthenticated) {
          handleLogout();
          showToast('Session expired due to inactivity', 'info');
        }
      }, 5 * 60 * 1000); // 10 minutes
    };

    const handleActivity = () => {
      resetInactivityTimer();
    };

    if (isAuthenticated) {
      resetInactivityTimer();
      window.addEventListener('mousemove', handleActivity);
      window.addEventListener('keypress', handleActivity);
      window.addEventListener('click', handleActivity);
      window.addEventListener('scroll', handleActivity);
    }

    return () => {
      clearTimeout(inactivityTimeout);
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keypress', handleActivity);
      window.removeEventListener('click', handleActivity);
      window.removeEventListener('scroll', handleActivity);
    };
  }, [isAuthenticated, handleLogout, showToast]);

  const fetchPosts = useCallback(async (pageNum: number = 1) => {
    try {
      const response = await fetch(`/api/blog?page=${pageNum}`);
      if (!response.ok) throw new Error('Failed to fetch posts');
      const data = await response.json();
      
      if (pageNum === 1) {
        setPosts(data.posts);
      } else {
        setPosts(prev => [...prev, ...data.posts]);
      }
      setHasMore(data.hasMore);
      setIsLoading(false);
    } catch (error) {
      showToast('Failed to fetch posts', 'error');
      setIsLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchPosts();
    const isAuth = localStorage.getItem('blog_auth') === 'true';
    setIsAuthenticated(isAuth);
  }, [fetchPosts]);

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
    fetchPosts(page + 1);
  };

  const handleEditPost = async (post: BlogPostType) => {
    if (!isAuthenticated) {
      setIsPasswordModalOpen(true);
      return;
    }
    setSelectedPost(post);
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = async (editedPost: Omit<BlogPostType, '_id'>) => {
    try {
      if (!selectedPost) {
        showToast('No post selected for editing', 'error');
        return;
      }

      // Prepare the post data, preserving existing fields if not provided
      const postData = {
        title: editedPost.title || selectedPost.title,
        content: editedPost.content || selectedPost.content,
        excerpt: editedPost.excerpt || selectedPost.excerpt,
        tags: editedPost.tags || selectedPost.tags || [],
        coverImage: editedPost.coverImage || selectedPost.coverImage || '/images/default-cover.jpg',
        author: selectedPost.author || {
          name: 'Admin',
          image: '/images/default-avatar.jpg'
        },
        published: editedPost.published !== undefined ? editedPost.published : selectedPost.published,
        slug: editedPost.slug || selectedPost.slug,
      };

      console.log('Sending post data:', postData);

      const response = await fetch(`/api/blog/${selectedPost._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('blog_auth') || ''
        },
        body: JSON.stringify(postData),
      });

      const data = await response.json();
      console.log('Received response:', data);
      
      if (!response.ok) {
        console.error('Update failed:', data);
        throw new Error(data.message || 'Failed to update post');
      }

      // Only update if we have valid data
      if (data && data.post) {
        setPosts(prev => prev.map(post => 
          post._id === selectedPost._id ? { 
            ...post,
            ...data.post,
            author: data.post.author || post.author, // Preserve author if not in response
            tags: data.post.tags || post.tags || [], // Preserve tags if not in response
            coverImage: data.post.coverImage || post.coverImage || '/images/default-cover.jpg' // Preserve coverImage if not in response
          } : post
        ));
        showToast('Post updated successfully!', 'success');
        setIsEditModalOpen(false);
        setSelectedPost(null);
      } else {
        throw new Error('Invalid response data from server');
      }
    } catch (error: any) {
      console.error('Error updating post:', error);
      if (error.message === 'Unauthorized') {
        setIsAuthenticated(false);
        localStorage.removeItem('blog_auth');
        setIsPasswordModalOpen(true);
      }
      showToast(error.message || 'Failed to update post', 'error');
    }
  };

  const handleDeletePost = async (post: BlogPostType) => {
    if (!isAuthenticated) {
      setIsPasswordModalOpen(true);
      return;
    }
    if (!post._id) return;
    
    try {
      const response = await fetch(`/api/blog/${post._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': localStorage.getItem('blog_auth') || ''
        }
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to delete post');
      }

      setPosts(prev => prev.filter(p => p._id !== post._id));
      showToast('Post deleted successfully!', 'success');
    } catch (error: any) {
      console.error('Error deleting post:', error);
      if (error.message === 'Unauthorized') {
        setIsAuthenticated(false);
        localStorage.removeItem('blog_auth');
        setIsPasswordModalOpen(true);
      }
      showToast(error.message || 'Failed to delete post', 'error');
    }
  };

  const handleAddPost = async (newPost: Partial<BlogPostType>) => {
    try {
      const response = await fetch('/api/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('blog_auth') || ''
        },
        body: JSON.stringify({
          ...newPost,
          published: true
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to add post');
      }

      const data = await response.json();
      setPosts(prev => [data.post, ...prev]);
      showToast('Post added successfully!', 'success');
      setIsAddModalOpen(false);
    } catch (error: any) {
      console.error('Error adding post:', error);
      if (error.message === 'Unauthorized') {
        setIsAuthenticated(false);
        localStorage.removeItem('blog_auth');
        setIsPasswordModalOpen(true);
      }
      showToast(error.message || 'Failed to add post', 'error');
    }
  };

  const handlePasswordSubmit = async (password: string) => {
    try {
      const response = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Invalid password');
      }

      setIsAuthenticated(true);
      localStorage.setItem('blog_auth', 'true');
      setIsPasswordModalOpen(false);
      showToast('Access granted!', 'success');
    } catch (error: any) {
      console.error('Password verification error:', error);
      showToast(error.message || 'Invalid password', 'error');
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden">
      <SpaceBackground className="fixed inset-0" />
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col space-y-8">
            <Link 
              href="/" 
              className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors w-fit"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>

            <div className="flex justify-between items-center">
              <h1 className="text-4xl font-bold text-white">Blog Posts</h1>
              <div className="flex items-center gap-4">
                {isAuthenticated && (
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 rounded-lg text-white shadow-lg shadow-gray-800/25 transition-all hover:scale-105"
                  >
                    <LogOut className="w-5 h-5" />
                    Logout
                  </button>
                )}
                <button
                  onClick={() => isAuthenticated ? setIsAddModalOpen(true) : setIsPasswordModalOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 rounded-lg text-white shadow-lg shadow-purple-500/25 transition-all hover:scale-105"
                >
                  <PlusCircle className="w-5 h-5" />
                  Add Post
                </button>
              </div>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-96 bg-purple-500/10 rounded-xl animate-pulse" />
                ))}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {posts.map(post => (
                    <motion.div
                      key={post._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <BlogPost 
                        post={post} 
                        isAuthenticated={isAuthenticated}
                        onEdit={handleEditPost}
                        onDelete={handleDeletePost}
                      />
                    </motion.div>
                  ))}
                </div>

                {hasMore && (
                  <div className="text-center mt-8">
                    <button
                      onClick={handleLoadMore}
                      className="px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 rounded-lg text-white shadow-lg shadow-purple-500/25 transition-all hover:scale-105"
                    >
                      Load More
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          <AddPostModal
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
            onSubmit={handleAddPost}
          />

          <EditPostModal
            isOpen={isEditModalOpen}
            onClose={() => {
              setIsEditModalOpen(false);
              setSelectedPost(null);
            }}
            onSubmit={handleEditSubmit}
            post={selectedPost || {
              _id: '',
              title: '',
              content: '',
              excerpt: '',
              tags: [],
              coverImage: '',
              author: {
                name: '',
                image: ''
              },
              published: false,
              createdAt: '',
              updatedAt: '',
              slug: ''
            }}
          />

          <PasswordModal
            isOpen={isPasswordModalOpen}
            onClose={() => setIsPasswordModalOpen(false)}
            onSubmit={handlePasswordSubmit}
          />
        </div>
      </div>
    </main>
  );
}
