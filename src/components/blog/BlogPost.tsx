import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { Edit2, Trash2 } from 'lucide-react';

interface Post {
    _id: string;
    title: string;
    excerpt: string;
    content: string;
    image?: string;
    tags: string[];
    author?: {
      name: string;
      image: string;
    };
    date?: string;
    slug: string;
}

interface BlogPostProps {
    post: Post;
    isAuthenticated?: boolean;
    onEdit?: (id: string) => void;
    onDelete?: (id: string) => void;
}

const BlogPost: FC<BlogPostProps> = ({ post, isAuthenticated, onEdit, onDelete }) => {
  return (
    <motion.article 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="group bg-black/40 backdrop-blur-sm border border-purple-500/20 rounded-xl overflow-hidden hover:border-purple-500/40 transition-colors"
    >
      <Link href={`/blog/${post.slug}`} className="block">
        {/* Cover Image */}
        <div className="relative w-full h-48 mb-4 overflow-hidden">
          <Image
            src={post.image || '/images/default-cover.jpg'}
            alt={post.title}
            fill
            className="object-cover transform group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
          />
        </div>

        <div className="p-6">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {post.tags.map((tag, index) => (
              <span
                key={`${tag}-${index}`}
                className="px-2 py-1 text-xs bg-purple-500/20 text-purple-300 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h2 className="text-xl font-bold mb-2 text-white group-hover:text-purple-400 transition-colors">
            {post.title}
          </h2>

          {/* Excerpt */}
          <p className="text-gray-300 mb-4 line-clamp-3">
            {post.excerpt}
          </p>

          {/* Author and Date */}
          <div className="flex items-center justify-between text-sm text-gray-400">
            {post.author && (
              <div className="flex items-center gap-2">
                <div className="relative w-6 h-6 rounded-full overflow-hidden">
                  <Image
                    src={post.author.image || '/images/default-avatar.jpg'}
                    alt={post.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <span>{post.author.name}</span>
              </div>
            )}
            <span>
              {post.date && format(new Date(post.date), 'MMM d, yyyy')}
            </span>
          </div>
        </div>
      </Link>

      {/* Edit and Delete buttons */}
      {isAuthenticated && (
        <div className="flex justify-end gap-2 p-4 border-t border-purple-500/20">
          {onEdit && (
            <button
              onClick={(e) => {
                e.preventDefault();
                onEdit(post._id);
              }}
              className="p-2 text-purple-400 hover:text-purple-300 transition-colors"
              aria-label="Edit post"
            >
              <Edit2 className="w-5 h-5" />
            </button>
          )}
          {onDelete && (
            <button
              onClick={(e) => {
                e.preventDefault();
                if (window.confirm('Are you sure you want to delete this post?')) {
                  onDelete(post._id);
                }
              }}
              className="p-2 text-red-400 hover:text-red-300 transition-colors"
              aria-label="Delete post"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          )}
        </div>
      )}
    </motion.article>
  );
};

export default BlogPost;
