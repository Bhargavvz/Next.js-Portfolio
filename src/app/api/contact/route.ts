import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Message from '@/models/Message';
import { validateForm } from '@/utils/validation';

// Simple in-memory rate limiting
const WINDOW_SIZE = 60 * 60 * 1000; // 1 hour in milliseconds
const MAX_REQUESTS = 5; // 5 requests per hour

interface RateLimit {
  timestamp: number;
  count: number;
}

const rateLimits = new Map<string, RateLimit>();

const getRateLimit = (ip: string): RateLimit => {
  const now = Date.now();
  const limit = rateLimits.get(ip);

  if (!limit || now - limit.timestamp > WINDOW_SIZE) {
    return { timestamp: now, count: 0 };
  }

  return limit;
};

export async function POST(request: Request) {
  try {
    // Get client IP
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    
    // Check rate limit
    const rateLimit = getRateLimit(ip);
    if (rateLimit.count >= MAX_REQUESTS) {
      return new NextResponse(
        JSON.stringify({ 
          error: 'Too many requests. Please try again later.' 
        }),
        { 
          status: 429,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    }

    // Update rate limit
    rateLimits.set(ip, {
      timestamp: rateLimit.timestamp,
      count: rateLimit.count + 1
    });

    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate form data
    const validationErrors = validateForm(body);
    if (validationErrors.length > 0) {
      console.log('Validation errors:', validationErrors);
      return NextResponse.json(
        { errors: validationErrors },
        { status: 400 }
      );
    }

    // Connect to database
    await connectToDatabase();
    console.log('Connected to database');

    // Create message
    const messageDoc = await Message.create({
      name,
      email,
      message,
      createdAt: new Date(),
    });
    console.log('Created message:', messageDoc);

    return NextResponse.json(
      { message: 'Message sent successfully' },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error sending message:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to send message' },
      { status: 500 }
    );
  }
}
