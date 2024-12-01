'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code2, ExternalLink, Github } from 'lucide-react';
import { siteConfig } from '@/config/site';
import SectionHeading from '../ui/SectionHeading';
import Image from 'next/image';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  github: string;
  image: string;
}

const ProjectCard = ({ project, index }: { project: Project; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{
      type: "spring",
      stiffness: 400,
      damping: 30,
      delay: index * 0.1
    }}
    className="group relative"
  >
    <div className="relative rounded-xl overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-cyan-500/20 to-transparent" />
      
      {/* Project Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-gray-900/20" />
      </div>

      {/* Content */}
      <div className="relative p-6 bg-gray-900/90 backdrop-blur-sm border border-purple-500/20 
                    group-hover:border-transparent transition-colors">
        <div className="space-y-4">
          {/* Title */}
          <h3 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 
                       bg-clip-text text-transparent group-hover:from-purple-300 
                       group-hover:to-cyan-300 transition-colors">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-gray-300 group-hover:text-gray-200 transition-colors">
            {project.description}
          </p>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, idx) => (
              <span
                key={idx}
                className="px-2 py-1 text-xs rounded-full bg-purple-500/10 text-purple-300 
                         border border-purple-500/20 group-hover:bg-purple-500/20 
                         group-hover:border-purple-500/30 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex items-center gap-4 pt-2">
            {project.github && project.github !== '#' && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-purple-400 transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>Source</span>
              </a>
            )}
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -bottom-1 -right-1 w-20 h-20 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 
                     rounded-full blur-2xl group-hover:from-purple-500/20 group-hover:to-cyan-500/20 transition-colors" />
        <div className="absolute -top-1 -left-1 w-20 h-20 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 
                     rounded-full blur-2xl group-hover:from-cyan-500/20 group-hover:to-purple-500/20 transition-colors" />
      </div>
    </div>
  </motion.div>
);

const Projects = () => {
  const [mounted, setMounted] = useState(false);
  const [projectsData, setProjectsData] = useState<Project[]>([]);

  useEffect(() => {
    setMounted(true);
    setProjectsData(siteConfig.projects);
  }, []);

  if (!mounted) {
    return (
      <section id="projects" className="container mx-auto px-4 py-24">
        <div className="space-y-12">
          <SectionHeading icon={<Code2 className="h-8 w-8" />}>
            Projects
          </SectionHeading>
          <div className="h-96 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="container mx-auto px-4 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="space-y-12"
      >
        <SectionHeading icon={<Code2 className="h-8 w-8" />}>
          Projects
        </SectionHeading>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projectsData.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Projects;
