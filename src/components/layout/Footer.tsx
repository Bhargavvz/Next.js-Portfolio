'use client';

import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="container mx-auto px-4 text-center py-4"
      >
        <div className="bg-[#1a1a1a] rounded-full py-2 px-6 inline-block border border-[#333] backdrop-blur-sm">
          <p className="flex items-center justify-center gap-2 text-gray-200 text-sm">
            Built with{' '}
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="text-red-500"
            >
              ❤️
            </motion.span>{' '}
            by Bhargav
          </p>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
