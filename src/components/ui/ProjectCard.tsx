"use client";

import { motion } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';
import { HiExternalLink } from 'react-icons/hi';
import { Project } from '@/types';
import ProjectImage from './ProjectImage';
import Button from './Button';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative grid gap-8 md:grid-cols-2"
    >
      <div className={`space-y-4 ${isEven ? 'md:order-1' : 'md:order-2'}`}>
        <h3 className="text-2xl font-bold text-white">{project.title}</h3>
        <p className="text-gray-400">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-purple-600/20 px-3 py-1 text-sm text-purple-400"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex gap-4">
          <Button
            href={project.github}
            isExternal
            variant="outline"
            size="sm"
            className="gap-2"
          >
            <FaGithub className="h-5 w-5" />
            GitHub
          </Button>
          {project.demo && (
            <Button
              href={project.demo}
              isExternal
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <HiExternalLink className="h-5 w-5" />
              Demo
            </Button>
          )}
        </div>
      </div>
      <div className={isEven ? 'md:order-2' : 'md:order-1'}>
        <ProjectImage src={project.image} alt={project.title} />
      </div>
    </motion.div>
  );
};

export default ProjectCard;
