'use client';

import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { IoClose } from 'react-icons/io5';

interface Skill {
  category: string;
  items: {
    name: string;
    description: string;
    experience: string;
    projects?: string[];
  }[];
}

const skills: Skill[] = [
  {
    category: "Programming Languages",
    items: [
      {
        name: "Python",
        description: "Advanced proficiency in Python development with extensive experience in web applications and data processing",
        experience: "4 years",
        projects: ["Data Analysis Projects", "Web Scrapers", "Django Applications"]
      },
      {
        name: "Java",
        description: "Strong expertise in Java development, particularly in building enterprise applications",
        experience: "3 years",
        projects: ["Spring Boot Applications", "Android Development"]
      },
      // Add other languages similarly
    ]
  },
  {
    category: "Web Development",
    items: [
      {
        name: "React",
        description: "Extensive experience in building modern, responsive web applications using React and Next.js",
        experience: "3 years",
        projects: ["Portfolio Website", "E-commerce Platforms"]
      },
      {
        name: "Node.js",
        description: "Proficient in server-side JavaScript development using Node.js and Express",
        experience: "2 years",
        projects: ["REST APIs", "Real-time Applications"]
      }
    ]
  },
  // Add other categories
];

interface SkillsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SkillsModal({ isOpen, onClose }: SkillsModalProps) {
  return (
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
                    Technical Skills & Experience
                  </Dialog.Title>
                  <button
                    onClick={onClose}
                    className="rounded-lg p-2 text-gray-400 hover:bg-white/10 hover:text-white"
                  >
                    <IoClose size={24} />
                  </button>
                </div>

                <div className="mt-8 grid gap-8 sm:grid-cols-1 md:grid-cols-2">
                  {skills.map((category, idx) => (
                    <div key={idx}>
                      <h4 className="mb-4 text-lg font-semibold text-white">{category.category}</h4>
                      <div className="flex flex-wrap gap-2">
                        {category.items.map((skill, skillIdx) => (
                          <div key={skillIdx} className="rounded-lg bg-white/5 p-4 backdrop-blur-sm transition-transform hover:scale-[1.02]">
                            <h4 className="mb-2 font-semibold text-blue-400">{skill.name}</h4>
                            <p className="mb-2 text-sm text-gray-300">{skill.description}</p>
                            <p className="text-sm text-purple-400">Experience: {skill.experience}</p>
                            {skill.projects && (
                              <div className="mt-2">
                                <p className="text-sm text-gray-400">Projects:</p>
                                <ul className="ml-4 mt-1 list-disc text-sm text-gray-300">
                                  {skill.projects.map((project, projectIdx) => (
                                    <li key={projectIdx}>{project}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
