import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { BlogPost } from '@/models/BlogPost';

// Get all published blogs
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const tag = searchParams.get('tag');
    const search = searchParams.get('search');

    console.log('Query params:', { page, limit, tag, search });

    await connectToDatabase();
    console.log('Connected to database');

    // Build query
    const query: any = { published: true };
    if (tag) {
      query.tags = tag;
    }
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } }
      ];
    }

    // Get total count for pagination
    const total = await BlogPost.countDocuments(query);
    console.log('Total posts:', total);

    // Get paginated posts
    const posts = await BlogPost.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
    console.log(`Retrieved ${posts.length} posts`);

    return NextResponse.json({
      posts,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
        hasMore: page * limit < total
      }
    });
  } catch (error: any) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}

// Create new blog post (protected route)
export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const data = await req.json();

    // TODO: Add authentication check here
    
    const blog = await BlogPost.create(data);
    
    return NextResponse.json({ blog }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating blog:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create blog' },
      { status: 500 }
    );
  }
}
