'use client';

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

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
          className="fixed bottom-8 right-8 z-50 hidden md:block"
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
            <Image 
              src="/projects/rocket.png"
              alt="Scroll to top"
              width={32}
              height={32}
              className="w-8 h-8"
            />
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default GoToTop;
