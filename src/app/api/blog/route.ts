import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { BlogPost, getBlogPosts, createBlogPost } from '@/lib/blog';
import slugify from 'slugify';

export async function POST(req: NextRequest) {
  console.log('Received POST request to /api/blog');
  try {
    const body = await req.json();
    
    if (!body.title || !body.content || !body.excerpt || !body.tags || !body.author) {
      console.log('Validation failed: Missing required fields');
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Generate slug from title
    const slug = slugify(body.title, { lower: true, strict: true });
    console.log('Generated slug:', slug);

    // Check if slug already exists
    const existingPost = await BlogPost.findOne({ slug });
    if (existingPost) {
      console.log('Slug already exists:', slug);
      return NextResponse.json(
        { error: 'A post with this title already exists' },
        { status: 400 }
      );
    }

    await connectToDatabase();
    const post = await createBlogPost(body);

    console.log('Created blog post:', post);
    return NextResponse.json(
      { post, message: 'Post created successfully' },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating blog post:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create blog post' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  console.log('Received GET request to /api/blog');
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '6', 10);

    await connectToDatabase();
    const { posts, hasMore, total } = await getBlogPosts(page, limit);

    console.log('Retrieved posts:', posts.length);
    return NextResponse.json(
      { posts, hasMore, total },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  console.log('Received DELETE request to /api/blog');
  try {
    const { pathname } = new URL(req.url);
    const id = pathname.split('/').pop();
    console.log('Post ID to delete:', id);

    if (!id) {
      console.log('No post ID provided');
      return NextResponse.json(
        { error: 'Post ID is required' },
        { status: 400 }
      );
    }

    // Connect to database
    await connectToDatabase();
    console.log('Connected to database');

    // Find and delete the post
    const post = await BlogPost.findByIdAndDelete(id);
    if (!post) {
      console.log('Post not found:', id);
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }

    console.log('Deleted post:', post);
    return NextResponse.json({ message: 'Blog post deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to delete blog post' },
      { status: 500 }
    );
  }
}
