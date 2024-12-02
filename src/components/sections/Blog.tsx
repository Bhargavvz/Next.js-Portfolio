'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { ArrowRight, Trophy } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';

interface BlogPost {
  _id: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  slug: string;
  date: string;
  tags: string[];
  author: {
    name: string;
    image: string;
  };
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/blog');
        if (!response.ok) throw new Error('Failed to fetch posts');
        const data = await response.json();
        setPosts(data.posts.slice(0, 3)); // Only show latest 3 posts from the posts array
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError('Failed to load blog posts');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <section id="blog" className="py-20">
      <div className="container mx-auto px-4">
        <SectionHeading icon={<Trophy className="w-6 h-6" />}>
          <span className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#9333EA] to-[#EC4899]">
            Blog
          </span>
        </SectionHeading>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-black/40 backdrop-blur-sm border border-purple-500/20 rounded-xl overflow-hidden animate-pulse"
              >
                <div className="h-48 bg-purple-500/10" />
                <div className="p-6 space-y-4">
                  <div className="h-4 bg-purple-500/10 rounded w-3/4" />
                  <div className="h-4 bg-purple-500/10 rounded w-1/2" />
                  <div className="h-4 bg-purple-500/10 rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-400 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 rounded-full transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12 bg-black/40 backdrop-blur-sm border border-purple-500/20 rounded-xl">
            <h3 className="text-xl font-bold text-white mb-4">No Blog Posts Yet</h3>
            <p className="text-gray-400 mb-6">
              Check back soon for new articles and insights!
            </p>
            {process.env.NODE_ENV === 'development' && (
              <Link
                href="/blog/new"
                className="inline-flex items-center gap-2 px-6 py-3 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 rounded-full transition-colors"
              >
                Create First Post
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <motion.article
                key={post._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group bg-black/40 backdrop-blur-sm border border-purple-500/20 rounded-xl overflow-hidden hover:border-purple-500/40 transition-colors"
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.coverImage || '/images/default-cover.jpg'}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="p-6">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags.slice(0, 2).map((tag, i) => (
                        <span
                          key={`${tag}-${i}`}
                          className="px-2 py-1 text-xs bg-purple-500/20 text-purple-300 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                      {post.title}
                    </h3>

                    <p className="text-gray-400 mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>

                    {post.date && (
                      <time className="text-sm text-gray-500">
                        {format(new Date(post.date), 'MMMM d, yyyy')}
                      </time>
                    )}

                    <div className="mt-4 flex items-center text-purple-400 group-hover:text-purple-300 transition-colors">
                      Read More
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        )}

        {posts.length > 0 && (
          <div className="text-center mt-12">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 rounded-full transition-colors"
            >
              View All Posts
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
