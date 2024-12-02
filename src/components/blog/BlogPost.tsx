'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { Edit2, Trash2 } from 'lucide-react';
import { BlogPostType } from '@/types/blog';

interface BlogPostProps {
  post: BlogPostType;
  isAuthenticated?: boolean;
  onEdit?: (post: BlogPostType) => void;
  onDelete?: (post: BlogPostType) => void;
}

const BlogPost = ({ post, isAuthenticated, onEdit, onDelete }: BlogPostProps) => {
  return (
    <div className="relative">
      <motion.article
        layout
        className="group bg-black/40 backdrop-blur-sm border border-purple-500/20 rounded-xl overflow-hidden hover:border-purple-500/40 transition-colors"
      >
        <Link href={`/blog/${post.slug}`} className="block">
          {/* Cover Image */}
          <div className="relative h-64 w-full overflow-hidden rounded-t-xl">
            <Image
              src={post.coverImage || '/images/default-cover.jpg'}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs bg-purple-500/20 text-purple-300 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h2 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors">
              {post.title}
            </h2>

            <p className="text-gray-400 text-sm mb-4 line-clamp-2">
              {post.excerpt}
            </p>

            <div className="flex items-center gap-3">
              <Image
                src={post.author?.image || '/images/default-avatar.jpg'}
                alt={post.author?.name || 'Anonymous'}
                width={32}
                height={32}
                className="rounded-full"
              />
              <div>
                <p className="text-sm text-white">{post.author?.name || 'Anonymous'}</p>
                <p className="text-xs text-gray-400">
                  {format(new Date(post.createdAt), 'MMM d, yyyy')}
                </p>
              </div>
            </div>
          </div>
        </Link>
      </motion.article>

      {isAuthenticated && (
        <div className="absolute bottom-4 right-4 flex gap-2 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit?.(post);
            }}
            className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-lg text-white text-sm font-medium shadow-lg shadow-blue-500/25 transition-all hover:scale-105"
            title="Edit post"
          >
            <Edit2 className="w-4 h-4" />
            Edit
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.(post);
            }}
            className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-lg text-white text-sm font-medium shadow-lg shadow-red-500/25 transition-all hover:scale-105"
            title="Delete post"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogPost;
