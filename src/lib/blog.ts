import { Schema, model, models, Document } from 'mongoose';

export interface BlogPostType extends Document {
  title: string;
  content: string;
  excerpt: string;
  tags: string[];
  date: Date;
  author: {
    name: string;
    image: string;
  };
}

const blogPostSchema = new Schema<BlogPostType>({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters'],
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
    trim: true,
  },
  excerpt: {
    type: String,
    required: [true, 'Excerpt is required'],
    trim: true,
    maxlength: [200, 'Excerpt cannot be more than 200 characters'],
  },
  tags: {
    type: [String],
    required: [true, 'At least one tag is required'],
    validate: {
      validator: function(v: string[]) {
        return v.length > 0 && v.every(tag => tag.length <= 20);
      },
      message: 'Tags must not be empty and each tag must be 20 characters or less',
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
  author: {
    name: {
      type: String,
      required: [true, 'Author name is required'],
      trim: true,
      maxlength: [50, 'Author name cannot be more than 50 characters'],
    },
    image: {
      type: String,
      required: [true, 'Author image is required'],
      trim: true,
    },
  },
}, {
  timestamps: true,
  toJSON: {
    transform: function(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    },
  },
});

export const BlogPost = models.BlogPost || model<BlogPostType>('BlogPost', blogPostSchema);

export async function getBlogPosts(page: number = 1, limit: number = 6) {
  const skip = (page - 1) * limit;
  
  const [posts, total] = await Promise.all([
    BlogPost.find({})
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit)
      .lean()
      .exec(),
    BlogPost.countDocuments({}),
  ]);

  const hasMore = total > skip + posts.length;

  return {
    posts,
    hasMore,
    total,
  };
}

export async function getBlogPost(id: string) {
  const post = await BlogPost.findById(id).lean().exec();
  if (!post) {
    throw new Error('Post not found');
  }
  return post;
}

export async function createBlogPost(data: Omit<BlogPostType, '_id' | 'id' | 'date'>) {
  const post = new BlogPost({
    ...data,
    date: new Date(),
  });
  await post.save();
  return post.toJSON();
}

export async function updateBlogPost(id: string, data: Partial<Omit<BlogPostType, '_id' | 'id'>>) {
  try {
    const post = await BlogPost.findById(id);
    if (!post) {
      throw new Error('Post not found');
    }

    // Update only the provided fields
    Object.keys(data).forEach((key) => {
      if (data[key] !== undefined) {
        post[key] = data[key];
      }
    });

    const updatedPost = await post.save();
    return updatedPost.toJSON();
  } catch (error) {
    console.error('Error updating blog post:', error);
    throw error;
  }
}

export async function deleteBlogPost(id: string) {
  const post = await BlogPost.findByIdAndDelete(id).lean().exec();
  if (!post) {
    throw new Error('Post not found');
  }
  return post;
}
