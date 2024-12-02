'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiHome, FiUser, FiBook, FiAward, FiMail, FiCode, FiStar, FiFileText } from 'react-icons/fi';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

const taskbarItems = [
  { icon: FiHome, label: 'Blog Post', href: '/blog' },
  { icon: FiUser, label: 'About', href: '#about' },
  { icon: FiCode, label: 'Skills', href: '#skills' },
  { icon: FiStar, label: 'Projects', href: '#projects' },
  { icon: FiFileText, label: 'Blog', href: '#blog' },
  { icon: FiAward, label: 'Achievements', href: '#achievements' },
  { icon: FiMail, label: 'Contact', href: '#contact' },
];

const Taskbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>('');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1080);  // Updated breakpoint for wider mobile screens
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = taskbarItems
        .filter(item => item.href.startsWith('#'))
        .map(item => item.href.replace('#', ''));

      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { top, bottom } = element.getBoundingClientRect();
          const viewportHeight = window.innerHeight;
          if (top <= viewportHeight / 2 && bottom >= viewportHeight / 2) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleClick = async (href: string) => {
    try {
      if (href.startsWith('#')) {
        const sectionId = href.slice(1); // Remove the # from href
        if (pathname === '/blog') {
          await router.push('/');
          setTimeout(() => scrollToSection(sectionId), 100);
        } else {
          scrollToSection(sectionId);
        }
      } else {
        await router.push(href);
      }
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

  const isActive = (href: string) => {
    if (href === '/blog') return pathname === '/blog';
    if (href.startsWith('#')) return activeSection === href.slice(1);
    return false;
  };

  return (
    <div 
      className={cn(
        "fixed z-50 pointer-events-none",
        isMobile 
          ? "bottom-8 left-1/2 -translate-x-1/2 w-[95%] max-w-[500px]" // Added max-width and width constraints
          : "left-8 top-1/2 -translate-y-1/2"
      )}
    >
      <motion.div
        initial={isMobile ? { y: 100, opacity: 0 } : { x: -100, opacity: 0 }}
        animate={isMobile ? { y: 0, opacity: 1 } : { x: 0, opacity: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: 0.5 
        }}
        className={cn(
          "flex pointer-events-auto backdrop-blur-md bg-black/70 border border-white/10 rounded-full p-2",
          isMobile ? "justify-around w-full" : "flex-col gap-4"  // Added full width and justify-around for mobile
        )}
      >
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 blur-xl" />
        
        {/* Main container */}
        <div className={cn(
          "relative flex gap-2 border border-white/10 bg-black/90 backdrop-blur-xl",
          isMobile 
            ? "flex-row rounded-full px-4 py-3 shadow-lg" 
            : "flex-col items-center gap-3 rounded-full py-4 px-3"
        )}>
          {/* Decorative elements */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-purple-500/5 via-cyan-500/5 to-purple-500/5" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          
          {taskbarItems.map((item, index) => (
            <motion.div
              key={item.label}
              className="relative group"
              onMouseEnter={() => !isMobile && setHoveredItem(item.label)}
              onMouseLeave={() => !isMobile && setHoveredItem(null)}
              onClick={() => isMobile && setHoveredItem(hoveredItem === item.label ? null : item.label)}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: index * 0.1,
                type: "spring",
                stiffness: 260,
                damping: 20
              }}
            >
              <button
                onClick={() => handleClick(item.href)}
                className={cn(
                  "relative rounded-full transition-colors duration-200",
                  isMobile ? "p-3" : "p-2.5",
                  isActive(item.href)
                    ? "text-purple-400"
                    : "text-gray-400 hover:text-purple-400"
                )}
                aria-label={item.label}
              >
                <item.icon className={cn(
                  "transition-transform",
                  isMobile ? "w-6 h-6" : "w-5 h-5",
                  isActive(item.href) && "scale-110"
                )} />
              </button>

              {/* Label tooltip */}
              <AnimatePresence>
                {hoveredItem === item.label && (
                  <motion.div
                    initial={{ opacity: 0, y: isMobile ? 10 : 0, x: isMobile ? 0 : -10 }}
                    animate={{ opacity: 1, y: 0, x: 0 }}
                    exit={{ opacity: 0 }}
                    className={cn(
                      "absolute whitespace-nowrap rounded-lg bg-black/95 px-3 py-2",
                      "border border-white/10 text-sm text-white backdrop-blur-md shadow-xl",
                      isMobile
                        ? "bottom-full left-1/2 -translate-x-1/2 mb-2"
                        : "top-1/2 -translate-y-1/2 left-12"
                    )}
                  >
                    {item.label}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Taskbar;
