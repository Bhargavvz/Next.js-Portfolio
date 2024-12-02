import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { BlogPost } from '@/models/BlogPost';

interface Params {
  slug: string;
}

// Get single blog post
export async function GET(request: Request, { params }: { params: Params }) {
  try {
    const { slug } = params;

    await connectToDatabase();

    const post = await BlogPost.findOne({ slug, published: true });
    if (!post) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ post }, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch blog post' },
      { status: 500 }
    );
  }
}

// Update blog post (protected route)
export async function PUT(request: Request, { params }: { params: Params }) {
  try {
    const { slug } = params;
    const body = await request.json();

    await connectToDatabase();

    // TODO: Add authentication check here

    const post = await BlogPost.findOneAndUpdate(
      { slug },
      { ...body, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!post) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ post }, { status: 200 });
  } catch (error: any) {
    console.error('Error updating blog post:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update blog post' },
      { status: 500 }
    );
  }
}

// Delete blog post (protected route)
export async function DELETE(request: Request, { params }: { params: Params }) {
  try {
    const { slug } = params;

    await connectToDatabase();

    // TODO: Add authentication check here

    const post = await BlogPost.findOneAndDelete({ slug });
    if (!post) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Blog post deleted successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to delete blog post' },
      { status: 500 }
    );
  }
}
