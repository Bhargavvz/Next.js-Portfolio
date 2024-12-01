"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiHome, FiUser, FiBook, FiAward, FiMail, FiCode, FiStar, FiBook as FiBlog } from 'react-icons/fi';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const taskbarItems = [
  { icon: FiHome, label: 'Home', href: '/' },
  { icon: FiUser, label: 'About', href: '#about' },
  { icon: FiBook, label: 'Education', href: '#education' },
  { icon: FiCode, label: 'Skills', href: '#skills' },
  { icon: FiStar, label: 'Projects', href: '#projects' },
  { icon: FiAward, label: 'Achievements', href: '#achievements' },
  { icon: FiBlog, label: 'Blog', href: '/blog' },
  { icon: FiMail, label: 'Contact', href: '#contact' },
];

const Taskbar = () => {
  const pathname = usePathname();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>('');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Only track sections on the home page
      if (pathname !== '/') return;

      const sections = taskbarItems
        .filter(item => item.href.startsWith('#'))
        .map(item => item.href.replace('#', ''));

      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { top, bottom } = element.getBoundingClientRect();
          if (top <= window.innerHeight / 2 && bottom >= window.innerHeight / 2) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  // Handle scroll to section for hash links
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      
      // If we're not on the home page, navigate there first
      if (pathname !== '/') {
        window.location.href = '/' + href;
        return;
      }

      const element = document.getElementById(href.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    if (href === '/blog') return pathname === '/blog';
    if (href.startsWith('#')) return activeSection === href.replace('#', '');
    return false;
  };

  return (
    <div 
      className={cn(
        "fixed z-50 pointer-events-none",
        isMobile 
          ? "bottom-8 left-1/2 -translate-x-1/2" 
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
        className="pointer-events-auto relative"
      >
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 blur-xl" />
        
        {/* Main container */}
        <div className={cn(
          "relative flex gap-1 border border-white/10 bg-black/80 backdrop-blur-xl",
          isMobile 
            ? "flex-row rounded-full px-3 py-2" 
            : "flex-col items-center gap-4 rounded-full py-4"
        )}>
          {/* Decorative elements */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-purple-500/5 via-cyan-500/5 to-purple-500/5" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          
          {taskbarItems.map((item, index) => (
            <motion.div
              key={item.label}
              className="relative group"
              onMouseEnter={() => setHoveredItem(item.label)}
              onMouseLeave={() => setHoveredItem(null)}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: index * 0.1,
                type: "spring",
                stiffness: 260,
                damping: 20
              }}
            >
              {item.href.startsWith('/') ? (
                <Link
                  href={item.href}
                  className={cn(
                    'group relative flex items-center justify-center rounded-full transition-all duration-300',
                    isMobile ? 'h-10 w-10' : 'h-12 w-12',
                    isActive(item.href)
                      ? 'bg-gradient-to-br from-purple-500/20 to-cyan-500/20 text-white'
                      : 'hover:bg-white/5 text-gray-400 hover:text-white'
                  )}
                >
                  <item.icon className={cn(
                    "relative transition-all duration-300 group-hover:scale-110",
                    isMobile ? "h-4 w-4" : "h-5 w-5"
                  )} />
                </Link>
              ) : (
                <a
                  href={item.href}
                  onClick={(e) => handleClick(e, item.href)}
                  className={cn(
                    'group relative flex items-center justify-center rounded-full transition-all duration-300',
                    isMobile ? 'h-10 w-10' : 'h-12 w-12',
                    isActive(item.href)
                      ? 'bg-gradient-to-br from-purple-500/20 to-cyan-500/20 text-white'
                      : 'hover:bg-white/5 text-gray-400 hover:text-white'
                  )}
                >
                  <item.icon className={cn(
                    "relative transition-all duration-300 group-hover:scale-110",
                    isMobile ? "h-4 w-4" : "h-5 w-5"
                  )} />
                </a>
              )}

              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/20 to-cyan-500/20 blur-sm" />
              </div>

              {/* Active indicator */}
              {isActive(item.href) && (
                <motion.div
                  layoutId="activeSection"
                  className={cn(
                    "absolute top-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 ring-2 ring-purple-500/20",
                    isMobile 
                      ? "-right-0.5 h-1 w-1" 
                      : "-right-1 h-1.5 w-1.5"
                  )}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              
              {/* Tooltip - Only show on desktop */}
              {!isMobile && (
                <AnimatePresence>
                  {hoveredItem === item.label && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 10 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="absolute left-full top-1/2 ml-4 -translate-y-1/2 whitespace-nowrap"
                    >
                      <div className="relative rounded-full bg-black/90 px-4 py-2">
                        {/* Tooltip glow */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 blur-sm" />
                        
                        {/* Tooltip content */}
                        <span className="relative font-medium text-white">
                          {item.label}
                        </span>
                        
                        {/* Tooltip arrow */}
                        <div className="absolute left-0 top-1/2 -ml-1.5 h-3 w-3 -translate-y-1/2 rotate-45 rounded-sm bg-black" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Taskbar;
