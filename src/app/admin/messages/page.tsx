'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Message {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

export default function AdminMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch('/api/messages');
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch messages');
        }

        setMessages(data.messages);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMessages();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading messages...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8">Contact Messages</h1>
      
      <div className="grid gap-6">
        {messages.map((message) => (
          <motion.div
            key={message._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#1a1a1a] p-6 rounded-lg border border-[#333]"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold">{message.name}</h3>
                <a href={`mailto:${message.email}`} className="text-blue-400 hover:text-blue-300">
                  {message.email}
                </a>
              </div>
              <div className="text-gray-400 text-sm">
                {new Date(message.createdAt).toLocaleString()}
              </div>
            </div>
            
            <p className="text-gray-300 whitespace-pre-wrap">{message.message}</p>
          </motion.div>
        ))}

        {messages.length === 0 && (
          <div className="text-center text-gray-400">
            No messages yet.
          </div>
        )}
      </div>
    </div>
  );
}
