'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { BlogPostType } from '@/types/blog';
import { useToastContext } from '@/contexts/ToastContext';

interface AddPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (post: Partial<BlogPostType>) => void;
}

const AddPostModal = ({ isOpen, onClose, onSubmit }: AddPostModalProps) => {
  const { showToast } = useToastContext();
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    coverImage: '',
    tags: '',
    authorName: '',
    authorImage: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const tagsArray = formData.tags.split(',').map(tag => tag.trim());
      
      if (tagsArray.some(tag => tag.length > 20)) {
        throw new Error('Tags must be 20 characters or less');
      }

      if (!formData.title.trim()) {
        showToast('Title is required', 'error');
        return;
      }
      if (!formData.content.trim()) {
        showToast('Content is required', 'error');
        return;
      }
      if (!formData.excerpt.trim()) {
        showToast('Excerpt is required', 'error');
        return;
      }

      const post: Partial<BlogPostType> = {
        title: formData.title,
        excerpt: formData.excerpt,
        content: formData.content,
        coverImage: formData.coverImage || '/images/default-cover.jpg',
        tags: tagsArray,
        author: {
          name: formData.authorName || 'Anonymous',
          image: formData.authorImage || '/images/default-avatar.jpg',
        },
        published: true,
      };

      await onSubmit(post);
      showToast('Post added successfully!', 'success');
      setFormData({
        title: '',
        excerpt: '',
        content: '',
        coverImage: '',
        tags: '',
        authorName: '',
        authorImage: '',
      });
      onClose();
    } catch (error) {
      showToast(error instanceof Error ? error.message : 'Failed to add post', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-2xl p-8 bg-black/90 border border-purple-500/20 rounded-2xl shadow-xl"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-2xl font-bold text-white mb-6">Add New Blog Post</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  maxLength={100}
                  className="w-full px-4 py-2 bg-black/50 border border-purple-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="Post title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Excerpt *
                </label>
                <textarea
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleChange}
                  required
                  maxLength={200}
                  rows={2}
                  className="w-full h-12 px-4 py-2 bg-black/50 border border-purple-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors resize-none"
                  placeholder="Brief description of the post"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Content *
                </label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full h-32 px-4 py-2 bg-black/50 border border-purple-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors resize-none"
                  placeholder="Post content..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Cover Image URL
                </label>
                <input
                  type="url"
                  name="coverImage"
                  value={formData.coverImage}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-black/50 border border-purple-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="/images/default-cover.jpg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Tags
                </label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-black/50 border border-purple-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="Comma-separated tags (e.g., nextjs, react, typescript)"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Author Name
                  </label>
                  <input
                    type="text"
                    name="authorName"
                    value={formData.authorName}
                    onChange={handleChange}
                    required
                    maxLength={50}
                    className="w-full px-4 py-2 bg-black/50 border border-purple-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
                    placeholder="Author name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Author Image URL
                  </label>
                  <input
                    type="url"
                    name="authorImage"
                    value={formData.authorImage}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-black/50 border border-purple-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 ${
                    isLoading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isLoading ? 'Adding...' : 'Add Post'}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddPostModal;
