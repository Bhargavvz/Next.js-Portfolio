import mongoose, { Connection } from 'mongoose';

interface GlobalMongoose {
  conn: Connection | null;
  promise: Promise<Connection> | null;
}

declare global {
  var mongoose: GlobalMongoose | undefined;
}

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

let cached = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

export async function connectToDatabase(): Promise<Connection> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: true,
      dbName: 'code-cosmos',
      maxPoolSize: 10,
      minPoolSize: 5,
      socketTimeoutMS: 45000,
      serverSelectionTimeoutMS: 5000,
      family: 4,
    };

    cached.promise = (async () => {
      try {
        const mongoose = await import('mongoose');
        await mongoose.default.connect(MONGODB_URI, opts);
        return mongoose.default.connection;
      } catch (error) {
        console.error('MongoDB connection error:', error);
        cached.promise = null;
        throw error;
      }
    })();
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    console.error('Failed to resolve MongoDB connection:', error);
    cached.promise = null;
    throw error;
  }

  mongoose.connection.on('error', (error) => {
    console.error('MongoDB connection error:', error);
    cached.conn = null;
    cached.promise = null;
  });

  mongoose.connection.on('disconnected', () => {
    console.warn('MongoDB disconnected');
    cached.conn = null;
    cached.promise = null;
  });

  process.on('SIGTERM', async () => {
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
      console.log('MongoDB connection closed through app termination');
    }
    process.exit(0);
  });

  return cached.conn;
}
