import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { BlogPost } from '@/models/BlogPost';
import { getBlogPost, updateBlogPost, deleteBlogPost } from '@/lib/blog';

interface Params {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, { params }: Params) {
  try {
    await connectToDatabase();
    const post = await getBlogPost(params.id);

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch blog post:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch blog post' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const authToken = request.headers.get('Authorization');
    if (!authToken || authToken !== 'true') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    console.log('Update request body:', body);
    
    // Validate required fields
    if (!body.title || !body.content || !body.excerpt || !body.tags) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    await connectToDatabase();
    const updatedPost = await updateBlogPost(params.id, {
      title: body.title,
      content: body.content,
      excerpt: body.excerpt,
      tags: body.tags,
      date: body.date || new Date(),
      author: body.author || {
        name: 'Admin',
        image: '/images/default-avatar.jpg'
      },
      image: body.image || '/images/default-cover.jpg'
    });

    if (!updatedPost) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    console.log('Updated post:', updatedPost);

    return NextResponse.json(
      { post: updatedPost, message: 'Post updated successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Failed to update blog post:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update blog post' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const authToken = request.headers.get('Authorization');
    if (!authToken || authToken !== 'true') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = params;
    console.log('Deleting blog post with ID:', id);

    await connectToDatabase();

    const post = await BlogPost.findByIdAndDelete(id);
    if (!post) {
      console.log('Blog post not found:', id);
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }

    console.log('Successfully deleted blog post:', id);
    return NextResponse.json({ message: 'Blog post deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to delete blog post' },
      { status: 500 }
    );
  }
}
