"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Star = ({ delay = 0 }: { delay?: number }) => (
  <motion.div
    initial={{ scale: 0, opacity: 0 }}
    animate={{ 
      scale: [0, 1, 0],
      opacity: [0, 1, 0]
    }}
    transition={{
      duration: 2,
      delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
    className="absolute h-1 w-1 bg-white rounded-full"
    style={{
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }}
  />
);

const LoadingAnimation = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#030014] overflow-hidden"
        >
          {/* Stars */}
          {[...Array(50)].map((_, i) => (
            <Star key={i} delay={Math.random() * 2} />
          ))}

          {/* Center Planet */}
          <div className="relative">
            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 20,
                ease: "linear",
                repeat: Infinity,
              }}
              className="absolute inset-0 opacity-30"
            >
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute h-40 w-[1px] origin-bottom"
                  style={{
                    background: "linear-gradient(to top, transparent, #8b5cf6)",
                    transform: `rotate(${i * 45}deg)`,
                  }}
                />
              ))}
            </motion.div>

            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 4,
                ease: "easeInOut",
                times: [0, 0.5, 1],
                repeat: Infinity,
              }}
              className="relative h-20 w-20"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 opacity-80 blur-sm" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-600 to-blue-600" />
              <motion.div
                animate={{
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  ease: "easeInOut",
                  repeat: Infinity,
                }}
                className="absolute inset-0 rounded-full bg-white opacity-20"
              />
            </motion.div>
          </div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-24 text-center"
          >
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent mb-2">
              Code Cosmos
            </h1>
            <p className="text-gray-400 font-mono">Initializing...</p>
          </motion.div>

          {/* Orbital Ring */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 10,
                ease: "linear",
                repeat: Infinity,
              }}
              className="h-48 w-48 rounded-full border border-purple-500/20"
              style={{
                borderRadius: "50%",
                border: "1px solid rgba(139, 92, 246, 0.2)",
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingAnimation;
