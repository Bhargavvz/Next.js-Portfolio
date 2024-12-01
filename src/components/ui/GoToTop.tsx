'use client';

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Rocket } from "lucide-react";

const GoToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50"
        >
          <motion.div
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.9 }}
            animate={{ y: [0, -10, 0] }}
            transition={{
              y: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
            className="relative"
          >
            {/* Glow effect */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-6 h-6 
                         bg-gradient-to-t from-purple-500/50 via-cyan-500/30 to-transparent 
                         blur-lg" />
            
            {/* Rocket */}
            <Rocket 
              className="w-8 h-8 text-transparent" 
              style={{
                stroke: "url(#rocket-gradient)",
                strokeWidth: 2
              }}
            />
            
            {/* Gradient definition */}
            <svg width="0" height="0">
              <defs>
                <linearGradient id="rocket-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: 'rgb(168, 85, 247)', stopOpacity: 0.9 }} />
                  <stop offset="100%" style={{ stopColor: 'rgb(34, 211, 238)', stopOpacity: 0.9 }} />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default GoToTop;
