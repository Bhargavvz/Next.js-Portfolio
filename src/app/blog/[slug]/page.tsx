'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { useToastContext } from '@/contexts/ToastContext';
import SpaceBackground from '@/components/SpaceBackground';

interface Post {
  _id: string;
  title: string;
  content: string;
  excerpt: string;
  coverImage?: string;
  tags: string[];
  author?: {
    name: string;
    image: string;
  };
  date?: string;
  slug: string;
}

export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const { showToast } = useToastContext();
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/blog/slug/${params.slug}`);
        if (!response.ok) {
          throw new Error('Failed to fetch post');
        }
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error('Error fetching post:', error);
        showToast('Failed to load blog post', 'error');
        router.push('/blog');
      } finally {
        setIsLoading(false);
      }
    };

    if (params.slug) {
      fetchPost();
    }
  }, [params.slug, router, showToast]);

  if (isLoading) {
    return (
      <main className="relative min-h-screen">
        <SpaceBackground className="fixed inset-0" />
        <div className="relative z-10 container mx-auto px-4 py-16">
          <div className="animate-pulse">
            <div className="h-96 bg-purple-500/10 rounded-xl mb-8" />
            <div className="space-y-4">
              <div className="h-8 bg-purple-500/10 rounded w-3/4" />
              <div className="h-4 bg-purple-500/10 rounded w-1/4" />
              <div className="h-4 bg-purple-500/10 rounded w-full" />
              <div className="h-4 bg-purple-500/10 rounded w-full" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!post) {
    return (
      <main className="relative min-h-screen">
        <SpaceBackground className="fixed inset-0" />
        <div className="relative z-10 container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-4">Post not found</h1>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Blog
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen">
      <SpaceBackground className="fixed inset-0" />
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-16">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Blog
          </Link>

          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-black/40 backdrop-blur-sm border border-purple-500/20 rounded-xl overflow-hidden"
          >
            {/* Cover Image */}
            <div className="relative w-full h-64 md:h-96 mb-8 overflow-hidden rounded-xl">
              <Image
                src={post.coverImage || '/images/default-cover.jpg'}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
              />
            </div>

            <div className="p-8">
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag, index) => (
                  <span
                    key={`${tag}-${index}`}
                    className="px-3 py-1 text-sm bg-purple-500/20 text-purple-300 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h1 className="text-4xl font-bold text-white mb-4">
                {post.title}
              </h1>

              {/* Author and Date */}
              <div className="flex items-center gap-4 mb-8 text-gray-300">
                {post.author && (
                  <div className="flex items-center gap-2">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden">
                      <Image
                        src={post.author.image || '/images/default-avatar.jpg'}
                        alt={post.author.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="font-medium">{post.author.name}</span>
                  </div>
                )}
                {post.date && (
                  <time className="text-gray-400">
                    {format(new Date(post.date), 'MMMM d, yyyy')}
                  </time>
                )}
              </div>

              {/* Content */}
              <div className="prose prose-invert prose-purple max-w-none">
                {post.content.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 text-gray-300">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </motion.article>
        </div>
      </div>
    </main>
  );
}
