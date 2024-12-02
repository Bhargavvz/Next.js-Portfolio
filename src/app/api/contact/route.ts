import { NextResponse } from 'next/server';
import { validateForm } from '@/utils/validation';

// Simple in-memory storage for development
const messages: any[] = [];

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
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // Update rate limit
    rateLimits.set(ip, {
      timestamp: rateLimit.timestamp,
      count: rateLimit.count + 1
    });

    // Get request body
    const body = await request.json();
    
    // Basic validation
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { 
          errors: [
            { field: 'name', message: 'Name is required' },
            { field: 'email', message: 'Email is required' },
            { field: 'message', message: 'Message is required' }
          ].filter(error => !body[error.field])
        },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { 
          errors: [
            { field: 'email', message: 'Please enter a valid email' }
          ]
        },
        { status: 400 }
      );
    }

    // Store message in memory (temporary solution)
    messages.push({
      name: body.name,
      email: body.email,
      message: body.message,
      createdAt: new Date()
    });

    // Send email notification (you can implement this later)
    console.log('New message received:', body);

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
