"use client";

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface SectionHeadingProps {
  children: ReactNode;
  icon?: ReactNode;
}

const SectionHeading = ({ children, icon }: SectionHeadingProps) => {
  return (
    <motion.div 
      className="flex items-center justify-start gap-4 mb-12 group cursor-default"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {icon && (
        <motion.div
          className="relative"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            className="absolute inset-0 bg-purple-500/20 rounded-lg blur-lg"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <div className="relative p-2 bg-purple-500/10 rounded-lg border border-purple-500/20 group-hover:border-purple-500/40 transition-colors">
            <div className="text-purple-400 group-hover:text-purple-300 transition-colors">
              {icon}
            </div>
          </div>
        </motion.div>
      )}
      <h2 
        className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text relative group-hover:from-purple-500 group-hover:to-pink-700 transition-all duration-300"
      >
        {children}
        <motion.div
          className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-600 opacity-0 group-hover:opacity-100 group-hover:w-full transition-all duration-300"
          layoutId="underline"
        />
      </h2>
    </motion.div>
  );
};

export default SectionHeading;
