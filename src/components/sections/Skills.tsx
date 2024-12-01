'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, X, Minus, Square, Terminal, ArrowRight } from 'lucide-react';
import { siteConfig } from '@/config/site';
import SectionHeading from '../ui/SectionHeading';
import { Dialog } from '@headlessui/react';

interface SkillCategory {
  title: string;
  items: string[];
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

const SkillCard = ({ skill, index }: { skill: string; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-br from-purple-500/10 to-cyan-500/10 
             border border-purple-500/20"
  >
    <span className="text-purple-400">$</span>
    <span className="text-gray-300 font-mono">{skill}</span>
  </motion.div>
);

const SkillButton = ({ category, onClick }: { category: SkillCategory; onClick: () => void }) => (
  <motion.button
    onClick={onClick}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{
      type: "spring",
      stiffness: 400,
      damping: 30
    }}
    whileHover={{ y: -5 }}
    className="group relative w-full h-full"
  >
    {/* Card Container */}
    <div className="relative h-full rounded-2xl p-1 transition-all duration-300 bg-gradient-to-br from-purple-500/5 to-cyan-500/5 hover:from-purple-500/10 hover:to-cyan-500/10">
      <div className="relative h-full rounded-xl bg-gray-900/30 p-6 backdrop-blur-sm border border-white/5">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400/90 to-cyan-400/90 bg-clip-text text-transparent">
            {category.title}
          </h3>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
            className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-500/10 to-cyan-500/10 
                     flex items-center justify-center transition-transform cursor-pointer
                     backdrop-blur-sm border border-white/5 hover:from-purple-500/20 
                     hover:to-cyan-500/20 hover:border-white/10"
          >
            <Terminal className="h-4 w-4 text-white/70" />
          </motion.div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 gap-2">
          {category.items.map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/5 to-cyan-500/5 blur" />
              <div className="relative rounded-lg border border-white/5 px-3 py-1.5 
                           backdrop-blur-sm transition-colors group-hover:border-white/10
                           bg-white/5">
                <span className="text-sm font-medium text-white/80">
                  {item}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </motion.button>
);

const Skills = () => {
  const [mounted, setMounted] = useState(false);
  const [skillsData, setSkillsData] = useState<SkillCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    setSkillsData(siteConfig.skills.categories);
  }, []);

  if (!mounted) return null;

  const selectedSkills = skillsData.find(category => category.title === selectedCategory);

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-4">
        <SectionHeading icon={<Code className="h-8 w-8" />}>
          Skills
        </SectionHeading>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-12 grid gap-8 sm:grid-cols-2"
        >
          {skillsData.map((category, index) => (
            <SkillButton
              key={category.title}
              category={category}
              onClick={() => setSelectedCategory(category.title)}
            />
          ))}
        </motion.div>

        {selectedCategory && (
          <Dialog
            open={!!selectedCategory}
            onClose={() => setSelectedCategory(null)}
            className="relative z-50"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setSelectedCategory(null)}
            />

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4">
                <Dialog.Panel>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    className="w-full max-w-2xl overflow-hidden"
                  >
                    {/* macOS window */}
                    <div className="rounded-lg bg-gray-900/90 backdrop-blur-xl border border-gray-700 shadow-2xl">
                      {/* Title bar */}
                      <div className="px-4 h-10 bg-gray-800/80 border-b border-gray-700 
                          flex items-center justify-between group">
                        <div className="flex items-center gap-2">
                          <MacOSButton 
                            icon={X} 
                            color="bg-red-400" 
                            onClick={() => setSelectedCategory(null)} 
                          />
                          <MacOSButton icon={Minus} color="bg-yellow-400" />
                          <MacOSButton icon={Square} color="bg-green-400" />
                        </div>
                        <div className="absolute left-1/2 -translate-x-1/2 text-sm text-gray-400 flex items-center gap-2">
                          <Terminal className="w-4 h-4" />
                          <span>skills.sh</span>
                        </div>
                      </div>

                      {/* Terminal content */}
                      <div className="p-6 font-mono text-sm">
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 text-gray-400">
                            <span className="text-purple-400">$</span>
                            <span>ls -la {selectedCategory?.toLowerCase()}</span>
                          </div>
                          <div className="mt-4 grid gap-2">
                            {selectedSkills?.items.map((skill, index) => (
                              <motion.div
                                key={skill}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-br 
                                 from-purple-500/10 to-cyan-500/10 border border-purple-500/20"
                              >
                                <span className="text-purple-400">$</span>
                                <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                                  {skill}
                                </span>
                              </motion.div>
                            ))}
                            <div className="flex items-center gap-2 text-green-400">
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
                    </div>
                  </motion.div>
                </Dialog.Panel>
              </div>
            </div>
          </Dialog>
        )}
      </div>
    </section>
  );
};

export default Skills;
