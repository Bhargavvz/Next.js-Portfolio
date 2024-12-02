import mongoose, { Schema } from 'mongoose';

const BlogSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  slug: {
    type: String,
    required: [true, 'Slug is required'],
    unique: true,
    trim: true
  },
  content: {
    type: String,
    required: [true, 'Content is required']
  },
  excerpt: {
    type: String,
    required: [true, 'Excerpt is required'],
    trim: true
  },
  coverImage: {
    type: String,
    required: [true, 'Cover image is required']
  },
  tags: [{
    type: String,
    trim: true
  }],
  author: {
    name: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    }
  },
  published: {
    type: Boolean,
    default: false
  },
  publishedAt: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt timestamp before saving
BlogSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  if (this.published && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  next();
});

const Blog = mongoose.models.Blog || mongoose.model('Blog', BlogSchema);

export default Blog;
