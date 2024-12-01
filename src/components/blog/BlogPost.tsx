import { BlogPostType } from '@/app/blog/page';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';

interface BlogPostProps {
  post: BlogPostType;
  onDelete?: (id: string) => void;
}

export default function BlogPost({ post, onDelete }: BlogPostProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group bg-gray-900/50 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 
                 hover:border-white/20 transition-all duration-300"
    >
      {/* Image container */}
      <div className="relative w-full h-48 overflow-hidden">
        <Image
          src={post.imageUrl}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Delete button */}
        {onDelete && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onDelete(post.id)}
            className="absolute top-2 right-2 p-2 bg-red-500/80 rounded-full 
                     hover:bg-red-600/80 transition-colors"
          >
            <Trash2 className="w-4 h-4 text-white" />
          </motion.button>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <motion.h2 
          layout="position"
          className="text-xl font-semibold text-white mb-2"
        >
          {post.title}
        </motion.h2>
        <motion.p 
          layout="position"
          className="text-gray-400 mb-4 line-clamp-3"
        >
          {post.description}
        </motion.p>
        <motion.time 
          layout="position"
          className="text-sm text-gray-500"
          dateTime={post.createdAt}
        >
          {new Date(post.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </motion.time>
      </div>
    </motion.article>
  );
}
