import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { getBlogPosts } from '@/lib/blog';
import type { BlogPostType } from '@/app/blog/page';
import { ArrowRight } from 'lucide-react';

export default function Blog() {
  const [posts, setPosts] = useState<BlogPostType[]>([]);

  useEffect(() => {
    const loadPosts = () => {
      try {
        const allPosts = getBlogPosts();
        // Show only the latest 3 posts
        setPosts(allPosts.slice(0, 3));
      } catch (err) {
        console.error('Failed to load blog posts:', err);
      }
    };

    loadPosts();
  }, []);

  return (
    <section id="blog" className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Latest Blog Posts</h2>
          <p className="text-gray-400">Check out my latest thoughts and insights</p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-lg rounded-xl overflow-hidden 
                       border border-white/10 hover:border-purple-500/50 
                       transition-colors group"
            >
              <div className="relative h-48">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-white">{post.title}</h3>
                <p className="text-gray-400 mb-4 line-clamp-2">{post.description}</p>
                <div className="text-sm text-gray-500">
                  {new Date(post.createdAt).toLocaleDateString()}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 
                     bg-gradient-to-r from-purple-500 to-cyan-500 
                     rounded-lg text-white font-medium 
                     hover:opacity-90 transition-opacity group"
          >
            View All Posts
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
