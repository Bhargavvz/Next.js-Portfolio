import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Message from '@/models/Message';

export async function GET(req: Request) {
  try {
    await connectToDatabase();
    console.log('Connected to database');

    // Get messages sorted by creation date (newest first)
    const messages = await Message.find({})
      .sort({ createdAt: -1 })
      .limit(50); // Limit to last 50 messages for performance
    console.log(`Retrieved ${messages.length} messages`);

    return NextResponse.json(
      { messages },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error fetching messages:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch messages' },
      { status: 500 }
    );
  }
}
