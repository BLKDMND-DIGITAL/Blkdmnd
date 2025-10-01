
import React from 'react';
import type { Project } from '../types';
import ProjectCard from './ProjectCard';

const caseStudies: Project[] = [
    {
        id: 1,
        title: 'The Visual Thesis: A Strategic Self-Portrait',
        description: 'Designed an interactive, living portfolio to answer “Who are you?” and “What can you do?”. The outcome is a self-validating artifact providing a multi-layered experience that preemptively answers recruiters’ questions.',
        metrics: ['Interactive Portfolio', 'Strategic Design', 'Self-Validating', 'Recruiter-Focused'],
        imageUrl: 'https://i.imgur.com/OfUcaIH.png'
    },
    {
        id: 2,
        title: 'The Dynamic Resume System',
        description: 'Tackled the problem of static portfolios becoming outdated by building a self-updating resume using LLMs to tailor content. This transformed the portfolio into an active, strategic tool demonstrating practical AI use.',
        metrics: ['LLM-Powered Content', 'Self-Updating', 'Dynamic & Tailored', 'Practical AI'],
        imageUrl: 'https://i.imgur.com/0i06jkg.png'
    },
    {
        id: 3,
        title: 'AI-Powered Legal Document Analysis',
        description: 'Addressed slow, manual, and error-prone legal discovery by creating a Gemini API proof-of-concept for entity recognition, sentiment analysis, and summarization, demonstrating AI\'s power in complex business problems.',
        metrics: ['~70% Time Reduction', 'Gemini API', 'Legal Tech', 'Entity Recognition'],
        imageUrl: 'https://i.imgur.com/OfUcaIH.png'
    },
    {
        id: 4,
        title: 'Navigating Corporate Conflict (The Court TV Project)',
        description: 'Took command of a failing, undocumented, and conflict-plagued project. Realigned stakeholders, triaged technical assets, and rebuilt team morale to deliver on time and exceed expectations.',
        metrics: ['Crisis Leadership', 'Turnaround Success', 'Stakeholder Alignment', 'On-Time Delivery'],
        imageUrl: 'https://i.imgur.com/owinRmg.png'
    }
];

const ProjectsSection: React.FC = () => {
  return (
    <section id="projects" className="py-16 md:py-24 scroll-mt-20">
      <h2 className="text-3xl font-bold text-center mb-12">Projects & Case Studies</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {caseStudies.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;