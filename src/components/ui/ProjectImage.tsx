"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ProjectImageProps {
  src: string;
  alt: string;
  className?: string;
}

const ProjectImage = ({ src, alt, className }: ProjectImageProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn(
        'relative aspect-video w-full overflow-hidden rounded-xl bg-gray-900/20 backdrop-blur-sm',
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        width={1920}
        height={1080}
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent" />
    </motion.div>
  );
};

export default ProjectImage;
