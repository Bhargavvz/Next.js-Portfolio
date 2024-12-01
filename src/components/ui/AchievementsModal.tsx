'use client';

import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { IoClose } from 'react-icons/io5';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTrophy, FaMedal } from 'react-icons/fa';
import { HiExternalLink } from 'react-icons/hi';

interface Achievement {
  title: string;
  date: string;
  award: string;
  organization: string;
  link: string;
}

const achievements: Achievement[] = [
  {
    title: "HackByte 2024",
    date: "October 2024",
    award: "2nd Runner-Up, HackByte: National-Level Hackathon",
    organization: "Vellore Institute of Technology, Andhra Pradesh",
    link: "https://link-to-hackbyte-details.com"
  },
  {
    title: "Hack4SDG Hackathon",
    date: "October 2024",
    award: "Honorable Mention for SDG 11: Sustainable Cities and Communities",
    organization: "IIT Hyderabad, Organized by FCCxAIESEC",
    link: "https://shorturl.at/LpVSy"
  },
  {
    title: "Specathon 2024",
    date: "September 2024",
    award: "Finalist, Specathon 2024: 36-Hour National-Level Hackathon",
    organization: "St. Peter's Engineering College, Hyderabad",
    link: "https://shorturl.at/2TF2X"
  },
  {
    title: "Intinta Innovation",
    date: "July 2024",
    award: "Top 10 Selected Innovators",
    organization: "Warangal District, Telangana",
    link: "https://shorturl.at/WZ30U"
  },
  {
    title: "Hackwave 2024",
    date: "May 2024",
    award: "Top 70 Finalists, Hackwave 2024",
    organization: "Sreenidhi Institute of Science and Technology, Hyderabad",
    link: "https://shorturl.at/Z1MxJ"
  },
  {
    title: "Innovatia 2024",
    date: "November 2024",
    award: "Top 70 Finalists, Innovatia 2024",
    organization: "Vasavi College of Engineering, Hyderabad",
    link: "https://link-to-innovatia-details.com"
  }
];

interface AchievementsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AchievementsModal({ isOpen, onClose }: AchievementsModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-50" onClose={onClose}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black/60" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="glass w-full max-w-2xl transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all">
                    <div className="flex items-center justify-between">
                      <Dialog.Title as="h3" className="gradient-text text-2xl font-bold">
                        <FaTrophy className="text-3xl text-yellow-400" />
                        Achievements & Recognition
                      </Dialog.Title>
                      <button
                        onClick={onClose}
                        className="rounded-lg p-2 text-gray-400 hover:bg-white/10 hover:text-white"
                      >
                        <IoClose size={24} />
                      </button>
                    </div>

                    <div className="mt-8 space-y-6">
                      {achievements.map((achievement, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="relative rounded-lg bg-white/5 p-4 backdrop-blur-sm transition-transform hover:scale-[1.02]"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <h4 className="text-lg font-semibold text-white">{achievement.title}</h4>
                            <span className="text-sm text-gray-400">{achievement.date}</span>
                          </div>
                          <p className="mt-2 text-gray-300">{achievement.award}</p>
                          <p className="mt-1 text-sm text-gray-400">{achievement.organization}</p>
                          {achievement.link && (
                            <a
                              href={achievement.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-2 inline-flex items-center space-x-2 text-sm text-blue-400 hover:text-blue-300"
                            >
                              <span>View Certificate</span>
                              <HiExternalLink size={12} />
                            </a>
                          )}
                          
                          {/* Timeline dot */}
                          <div className="absolute -left-2 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-purple-500 shadow-lg shadow-purple-500/50">
                            <div className="absolute inset-0 rounded-full bg-purple-400 animate-ping opacity-75" />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      )}
    </AnimatePresence>
  );
}
