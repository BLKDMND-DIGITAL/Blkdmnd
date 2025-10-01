
import React from 'react';
import type { Project } from '../types';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-lg shadow-lg overflow-hidden group transform hover:-translate-y-2 transition-transform duration-300">
      <img src={project.imageUrl} alt={project.title} className="w-full" />
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
        <p className="text-light-text-secondary dark:text-dark-text-secondary mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.metrics.map((metric, index) => (
            <span key={index} className="text-xs font-semibold bg-primary/10 text-primary px-3 py-1 rounded-full">
              {metric}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
