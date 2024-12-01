'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';
import { ExternalLink } from 'lucide-react';
import { siteConfig } from '@/config/site';
import SectionHeading from '../ui/SectionHeading';

interface Achievement {
  title: string;
  position: string;
  organization: string;
  link: string;
}

const AchievementCard = ({ achievement, index }: { achievement: Achievement; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{
      type: "spring",
      stiffness: 400,
      damping: 30,
      delay: index * 0.1
    }}
    className="group relative"
  >
    <div className="relative rounded-xl overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-cyan-500/20 to-transparent" />
      
      {/* Animated border */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
           style={{ padding: '1px' }}>
        <div className="absolute inset-0 bg-gray-900/90 backdrop-blur-sm" />
      </div>

      {/* Content */}
      <div className="relative p-6 bg-gray-900/90 backdrop-blur-sm border border-purple-500/20 
                    group-hover:border-transparent transition-colors">
        <div className="space-y-4">
          {/* Title and Position */}
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 
                         bg-clip-text text-transparent group-hover:from-purple-300 
                         group-hover:to-cyan-300 transition-colors">
              {achievement.title}
            </h3>
            <span className="px-2 py-1 text-sm rounded-full bg-purple-500/10 text-purple-300 
                         border border-purple-500/20">
              {achievement.position}
            </span>
          </div>

          {/* Organization */}
          <p className="text-gray-300 group-hover:text-gray-200 transition-colors">
            {achievement.organization}
          </p>

          {/* Link */}
          {achievement.link && achievement.link !== '#' && (
            <a
              href={achievement.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-purple-400 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span>View Certificate</span>
            </a>
          )}
        </div>

        {/* Decorative elements */}
        <div className="absolute -bottom-1 -right-1 w-20 h-20 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 
                     rounded-full blur-2xl group-hover:from-purple-500/20 group-hover:to-cyan-500/20 transition-colors" />
        <div className="absolute -top-1 -left-1 w-20 h-20 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 
                     rounded-full blur-2xl group-hover:from-cyan-500/20 group-hover:to-purple-500/20 transition-colors" />
      </div>
    </div>
  </motion.div>
);

const Achievements = () => {
  return (
    <section id="achievements" className="py-20">
      <div className="container mx-auto px-4">
        <SectionHeading icon={<Trophy className="h-8 w-8" />}>
          Achievements
        </SectionHeading>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {siteConfig.achievements.map((achievement, index) => (
            <AchievementCard
              key={achievement.title}
              achievement={achievement}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
