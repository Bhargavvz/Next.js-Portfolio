"use client";

import { motion } from 'framer-motion';
import { HiExternalLink } from 'react-icons/hi';
import { Achievement } from '@/types';
import { cn } from '@/lib/utils';

interface AchievementCardProps {
  achievement: Achievement;
  index: number;
}

const AchievementCard = ({ achievement, index }: AchievementCardProps) => {
  return (
    <motion.a
      href={achievement.link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn(
        'group relative overflow-hidden rounded-xl bg-gray-900/50 p-6 backdrop-blur-sm',
        'transition-all duration-300 hover:bg-gray-900/80',
        'flex flex-col gap-2'
      )}
    >
      <div className="flex items-start justify-between">
        <h3 className="text-xl font-bold text-white group-hover:text-purple-400">
          {achievement.title}
        </h3>
        <HiExternalLink className="h-5 w-5 text-gray-400 transition-colors group-hover:text-purple-400" />
      </div>
      <p className="text-lg font-semibold text-purple-400">{achievement.position}</p>
      <p className="text-gray-400">{achievement.organization}</p>
    </motion.a>
  );
};

export default AchievementCard;
