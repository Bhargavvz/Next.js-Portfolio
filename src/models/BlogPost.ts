import mongoose from 'mongoose';

const BlogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  excerpt: {
    type: String,
    required: [true, 'Excerpt is required'],
    trim: true,
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
  },
  coverImage: {
    type: String,
    default: '/images/default-cover.jpg',
  },
  tags: {
    type: [String],
    default: [],
  },
  author: {
    name: {
      type: String,
      default: 'Anonymous',
    },
    image: {
      type: String,
      default: '/images/default-avatar.jpg',
    },
  },
  published: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt timestamp before saving
BlogPostSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Create text index for search
BlogPostSchema.index(
  { title: 'text', content: 'text', excerpt: 'text' },
  { weights: { title: 10, excerpt: 5, content: 1 } }
);

export const BlogPost = mongoose.models.BlogPost || mongoose.model('BlogPost', BlogPostSchema);
