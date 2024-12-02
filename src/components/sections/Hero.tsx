"use client";

import { motion, useMotionValue, useTransform } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Hero = () => {
  const router = useRouter();
  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/bhargavvz",
      label: "GitHub",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/bhargavvz/",
      label: "LinkedIn",
    },
    {
      icon: Twitter,
      href: "https://x.com/avsbhar",
      label: "Twitter",
    },
    {
      icon: Mail,
      href: "mailto:adepuvaatsavasribhargav@gmail.com",
      label: "Email",
    },
  ];

  const dragY = useMotionValue(0);
  const textOpacity = useTransform(dragY, [0, 50, 100], [0, 1, 1]);

  const handleDragEnd = () => {
    if (dragY.get() > 100) {
      router.push('/blog');
    }
    dragY.set(0);
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center py-20">
      {/* Drag indicator */}
      <motion.div 
        className="fixed bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center cursor-grab active:cursor-grabbing"
        drag="y"
        dragConstraints={{ top: -100, bottom: 100 }}
        dragElastic={0.4}
        style={{ y: dragY }}
        onDragEnd={handleDragEnd}
      >
        <motion.div 
          style={{ opacity: textOpacity }}
          className="text-transparent bg-clip-text bg-gradient-to-r from-[#9333EA] to-[#EC4899] whitespace-nowrap text-lg font-medium px-4 py-2"
        >
          Pull down to view blog →
        </motion.div>
      </motion.div>

      <div className="container mx-auto px-6 text-center z-10">
        <motion.h1 
          className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text"
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          Adepu Vaatsava Sri Bhargav
        </motion.h1>

        <motion.div 
          className="text-xl md:text-2xl text-gray-300 mb-8 h-[60px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <TypeAnimation
            sequence={[
              'Full Stack Developer',
              2000,
              'Tech Enthusiast',
              2000,
              'Problem Solver',
              2000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
            className="font-light"
          />
        </motion.div>

        <motion.div
          className="flex items-center justify-center gap-6 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {socialLinks.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-purple-500 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              title={link.label}
            >
              <link.icon className="w-6 h-6" />
              <span className="sr-only">{link.label}</span>
            </motion.a>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="flex justify-center gap-4">
            <Link 
              href="#projects" 
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 
                     text-white rounded-lg font-medium hover:opacity-90 
                     transition-opacity"
            >
              View Projects
            </Link>
            <Link 
              href="#contact" 
              className="px-6 py-3 bg-transparent border border-transparent hover:bg-purple-500/10
                     text-white rounded-lg font-medium transition-all duration-300
                     bg-gradient-to-r from-transparent to-transparent hover:from-transparent hover:to-transparent
                     [background-clip:padding-box]
                     relative before:absolute before:inset-0 before:rounded-lg before:p-[1px]
                     before:bg-gradient-to-r before:from-purple-500 before:to-cyan-500 before:-z-10"
            >
              Contact Me
            </Link>
            <Link 
              href="#blog" 
              className="px-6 py-3 bg-transparent border border-transparent hover:bg-purple-500/10
                     text-white rounded-lg font-medium transition-all duration-300
                     bg-gradient-to-r from-transparent to-transparent hover:from-transparent hover:to-transparent
                     [background-clip:padding-box]
                     relative before:absolute before:inset-0 before:rounded-lg before:p-[1px]
                     before:bg-gradient-to-r before:from-purple-500 before:to-cyan-500 before:-z-10"
            >
              Read Blog
            </Link>
          </div>
          <Link 
            href="/resume.pdf" 
            target="_blank"
            className="px-6 py-3 bg-transparent border border-purple-500/50 hover:border-purple-500
                   text-white rounded-lg font-medium hover:bg-purple-500/10 
                   transition-all duration-300"
          >
            Resume
          </Link>
        </motion.div>
      </div>

      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <motion.div
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="text-gray-400"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14" />
            <path d="m19 12-7 7-7-7" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
