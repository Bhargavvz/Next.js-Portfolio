"use client";

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SkillBadgeProps {
  skill: string;
  index: number;
}

const SkillBadge = ({ skill, index }: SkillBadgeProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className={cn(
        'rounded-full bg-purple-600/20 px-4 py-2',
        'text-purple-400 font-medium',
        'transition-all duration-300 hover:bg-purple-600/30'
      )}
    >
      {skill}
    </motion.div>
  );
};

export default SkillBadge;
