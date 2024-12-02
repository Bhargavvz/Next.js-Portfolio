import { NextResponse } from 'next/server';

const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes
const CORRECT_PASSWORD = "070605";

interface AttemptRecord {
  count: number;
  lastAttempt: number;
  lockedUntil?: number;
}

const attempts = new Map<string, AttemptRecord>();

function cleanupAttempts() {
  const now = Date.now();
  for (const [ip, record] of attempts.entries()) {
    if (record.lockedUntil && record.lockedUntil < now) {
      attempts.delete(ip);
    }
  }
}

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    const { password } = await request.json();

    if (!password) {
      return NextResponse.json(
        { error: 'Password is required' },
        { status: 400 }
      );
    }

    cleanupAttempts();

    const record = attempts.get(ip) || { count: 0, lastAttempt: 0 };
    const now = Date.now();

    // Check if locked out
    if (record.lockedUntil && record.lockedUntil > now) {
      const remainingTime = Math.ceil((record.lockedUntil - now) / 1000 / 60);
      return NextResponse.json(
        {
          error: `Too many attempts. Please try again in ${remainingTime} minutes.`,
          locked: true,
        },
        { status: 429 }
      );
    }

    // Reset attempts if last attempt was more than lockout duration ago
    if (now - record.lastAttempt > LOCKOUT_DURATION) {
      record.count = 0;
    }

    record.lastAttempt = now;
    record.count++;

    if (password === CORRECT_PASSWORD) {
      attempts.delete(ip);
      return NextResponse.json(
        { message: 'Password verified successfully' },
        { status: 200 }
      );
    }

    // Lock out after max attempts
    if (record.count >= MAX_ATTEMPTS) {
      record.lockedUntil = now + LOCKOUT_DURATION;
      attempts.set(ip, record);
      return NextResponse.json(
        {
          error: 'Too many attempts. Please try again in 15 minutes.',
          locked: true,
        },
        { status: 429 }
      );
    }

    attempts.set(ip, record);
    const remainingAttempts = MAX_ATTEMPTS - record.count;

    return NextResponse.json(
      {
        error: `Invalid password. ${remainingAttempts} attempts remaining.`,
        remainingAttempts,
      },
      { status: 401 }
    );
  } catch (error) {
    console.error('Password verification error:', error);
    return NextResponse.json(
      { error: 'Failed to verify password' },
      { status: 500 }
    );
  }
}
