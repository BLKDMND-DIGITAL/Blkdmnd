
import React from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ProjectsSection from './components/ProjectsSection';
import AiResumeSection from './components/AiResumeSection';
import ContactSection from './components/ContactSection';
import ChatWidget from './components/ChatWidget';

const App: React.FC = () => {
  return (
    <div className="text-light-text dark:text-dark-text font-sans">
      <Header />
      <HeroSection />
      <main className="container mx-auto px-6 py-8 md:px-8 lg:px-12">
        <AboutSection />
        <ProjectsSection />
        <AiResumeSection />
        <ContactSection />
      </main>
      <ChatWidget />
      <footer className="text-center py-6 text-sm text-light-text-secondary dark:text-dark-text-secondary">
        <p>&copy; {new Date().getFullYear()} Greg L. Dukes (BLKDMND). All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default App;
