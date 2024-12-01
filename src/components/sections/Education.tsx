'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, X, Minus, Square, Terminal } from 'lucide-react';
import { siteConfig } from '@/config/site';
import SectionHeading from '../ui/SectionHeading';
import { Dialog } from '@headlessui/react';

interface Education {
  school: string;
  degree: string;
  duration: string;
  location: string;
  courses?: string[];
  gpa?: string;
}

const MacOSButton = ({ icon: Icon, color, onClick }: { icon: any; color: string; onClick?: () => void }) => (
  <button
    onClick={onClick}
    className={`w-3 h-3 rounded-full ${color} flex items-center justify-center 
              hover:opacity-80 transition-opacity focus:outline-none`}
  >
    <Icon className="w-2 h-2 text-black/50 opacity-0 group-hover:opacity-100 transition-opacity" />
  </button>
);

const CourseModal = ({ courses, isOpen, onClose }: { courses: string[]; isOpen: boolean; onClose: () => void }) => (
  <Dialog open={isOpen} onClose={onClose} className="relative z-50">
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    />

    <div className="fixed inset-0 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4">
        <Dialog.Panel>
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="w-full max-w-2xl overflow-hidden"
          >
            {/* macOS window */}
            <div className="rounded-lg bg-gray-900/90 backdrop-blur-xl border border-gray-700 shadow-2xl">
              {/* Title bar */}
              <div className="px-4 h-10 bg-gray-800/80 border-b border-gray-700 
                          flex items-center justify-between group">
                <div className="flex items-center gap-2">
                  <MacOSButton icon={X} color="bg-red-400" onClick={onClose} />
                  <MacOSButton icon={Minus} color="bg-yellow-400" />
                  <MacOSButton icon={Square} color="bg-green-400" />
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 text-sm text-gray-400 flex items-center gap-2">
                  <Terminal className="w-4 h-4" />
                  <span>coursework.sh</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 font-mono text-sm">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-green-400">
                    <span>$</span>
                    <span className="text-purple-400">cd</span>
                    <span>coursework</span>
                  </div>
                  <div className="flex items-center gap-2 text-green-400">
                    <span>$</span>
                    <span className="text-purple-400">ls</span>
                    <span>-la</span>
                  </div>
                  <div className="pl-4 pt-2 space-y-1">
                    {courses.map((course, idx) => (
                      <motion.div
                        key={course}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="flex items-center gap-4"
                      >
                        <span className="text-blue-400">drwxr-xr-x</span>
                        <span className="text-gray-400">course_{(idx + 1).toString().padStart(2, '0')}</span>
                        <span className="text-purple-400">{course}</span>
                      </motion.div>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-green-400 pt-2">
                    <span>$</span>
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="w-2 h-4 bg-green-400"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </Dialog.Panel>
      </div>
    </div>
  </Dialog>
);

const TimelineItem = ({ item, index }: { item: Education; index: number }) => {
  const [showCourses, setShowCourses] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: index * 0.1
      }}
      className="relative pl-8 pb-12 last:pb-0"
    >
      {/* Timeline line */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500 via-purple-500/50 to-transparent" />
      
      {/* Timeline dot */}
      <div className="absolute left-0 top-2 -translate-x-1/2 w-4 h-4">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 + 0.2 }}
          className="w-full h-full bg-purple-500 rounded-full"
        />
        <div className="absolute inset-0 animate-ping bg-purple-500/20 rounded-full" />
      </div>

      {/* Content */}
      <div className="relative p-6 bg-black/40 backdrop-blur-sm rounded-xl border border-purple-500/20 
                    hover:border-purple-500/40 transition-all group overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-cyan-500/10 to-transparent 
                     opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative space-y-3">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
            <h3 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 
                         bg-clip-text text-transparent">
              {item.school}
            </h3>
            <span className="text-gray-400 whitespace-nowrap">{item.duration}</span>
          </div>

          {/* Subheader */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-1">
            <p className="text-lg font-medium text-gray-200">{item.degree}</p>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>{item.location}</span>
              {item.gpa && (
                <>
                  <span>•</span>
                  <span className="text-purple-400">GPA: {item.gpa}</span>
                </>
              )}
            </div>
          </div>

          {/* Course Button */}
          {item.courses && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowCourses(true)}
              className="mt-4 px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 
                       text-purple-400 rounded-lg text-sm font-medium transition-colors
                       flex items-center gap-2"
            >
              <Terminal className="w-4 h-4" />
              View Coursework
            </motion.button>
          )}
        </div>
      </div>

      <AnimatePresence>
        {showCourses && item.courses && (
          <CourseModal
            courses={item.courses}
            isOpen={showCourses}
            onClose={() => setShowCourses(false)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Education = () => {
  const [mounted, setMounted] = useState(false);
  const [educationData, setEducationData] = useState<Education[]>([]);

  useEffect(() => {
    setMounted(true);
    setEducationData(siteConfig.education);
  }, []);

  if (!mounted) {
    return (
      <section id="education" className="container mx-auto px-4 py-24">
        <div className="space-y-12">
          <SectionHeading icon={<GraduationCap className="h-8 w-8" />}>
            Education
          </SectionHeading>
          <div className="h-96 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="education" className="container mx-auto px-4 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="space-y-12"
      >
        <SectionHeading icon={<GraduationCap className="h-8 w-8" />}>
          Education
        </SectionHeading>

        <div className="max-w-3xl mx-auto">
          {educationData.map((item, index) => (
            <TimelineItem key={item.school} item={item} index={index} />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Education;
