'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import SkillsModal from './SkillsModal';
import AchievementsModal from './AchievementsModal';

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  const [isSkillsModalOpen, setIsSkillsModalOpen] = useState(false);
  const [isAchievementsModalOpen, setIsAchievementsModalOpen] = useState(false);

  const tabs = [
    { id: 'education', label: 'Education' },
    { id: 'skills', label: 'Skills' },
    { id: 'achievements', label: 'Achievements' },
  ];

  const handleTabClick = (tabId: string) => {
    onTabChange(tabId);
    if (tabId === 'skills') {
      setIsSkillsModalOpen(true);
    } else if (tabId === 'achievements') {
      setIsAchievementsModalOpen(true);
    }
  };

  return (
    <div className="fixed left-1/2 top-8 z-50 -translate-x-1/2 w-[95%] max-w-lg md:top-1/2 md:-translate-y-1/2">
      <div className="glass relative">
        <div className="relative flex flex-col space-y-2 p-2 sm:flex-row sm:space-y-0 sm:space-x-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`relative w-full px-4 py-2.5 text-sm sm:text-base font-semibold tracking-wide transition-all duration-300 sm:w-auto sm:px-6 sm:py-3 ${
                activeTab === tab.id 
                  ? 'text-white shadow-lg' 
                  : 'text-gray-300 hover:text-white'
              }`}
              data-cursor-detail
              data-cursor-title={tab.label}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-[var(--gradient-start)] via-[var(--gradient-middle)] to-[var(--gradient-end)] opacity-20"
                  style={{ zIndex: -1 }}
                />
              )}
              <span className={`relative z-10 ${activeTab === tab.id ? 'gradient-text' : ''}`}>
                {tab.label}
              </span>
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[var(--gradient-start)] via-[var(--gradient-middle)] to-[var(--gradient-end)] opacity-20 blur-xl" />
              </div>
            </button>
          ))}
        </div>
        
        {/* Decorative border */}
        <div className="absolute -inset-[1px] rounded-[inherit] p-[1px] before:absolute before:inset-0 before:rounded-[inherit] before:bg-gradient-to-r before:from-[var(--gradient-start)] before:via-[var(--gradient-middle)] before:to-[var(--gradient-end)] before:opacity-20" />
      </div>

      <SkillsModal isOpen={isSkillsModalOpen} onClose={() => setIsSkillsModalOpen(false)} />
      <AchievementsModal isOpen={isAchievementsModalOpen} onClose={() => setIsAchievementsModalOpen(false)} />
    </div>
  );
}
