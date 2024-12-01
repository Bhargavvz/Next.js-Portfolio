import { motion } from 'framer-motion';

export default function LoadingPost() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-gray-900/50 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10"
    >
      {/* Image skeleton */}
      <div className="w-full h-48 bg-gray-800 animate-pulse" />

      {/* Content skeleton */}
      <div className="p-6 space-y-4">
        {/* Title skeleton */}
        <div className="h-6 bg-gray-800 rounded animate-pulse w-3/4" />

        {/* Description skeleton */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-800 rounded animate-pulse" />
          <div className="h-4 bg-gray-800 rounded animate-pulse w-5/6" />
          <div className="h-4 bg-gray-800 rounded animate-pulse w-4/6" />
        </div>

        {/* Date skeleton */}
        <div className="h-4 bg-gray-800 rounded animate-pulse w-1/4" />
      </div>
    </motion.div>
  );
}
