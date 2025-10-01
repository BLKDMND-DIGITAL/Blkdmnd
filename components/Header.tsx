
import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { SunIcon } from './icons/SunIcon';
import { MoonIcon } from './icons/MoonIcon';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Resume', href: '#resume' },
    { name: 'Contact', href: '#contact' },
  ];

  const linkClasses = "px-4 py-2 rounded-xl hover:bg-black/10 dark:hover:bg-white/10 transition-colors duration-200";

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-light-bg/80 dark:bg-dark-bg/80 backdrop-blur-md shadow-md' : 'bg-transparent'}`}>
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center md:px-8 lg:px-12">
        <a href="#" className="text-xl font-bold text-primary-DEFAULT">BLKDMND</a>
        
        <div className="hidden md:flex items-center space-x-4">
          {navLinks.map(link => (
            <a key={link.name} href={link.href} className={linkClasses}>
              {link.name}
            </a>
          ))}
          <button onClick={toggleTheme} aria-label="Toggle theme" className="p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
            {theme === 'light' ? <MoonIcon /> : <SunIcon />}
          </button>
        </div>

        <div className="md:hidden flex items-center">
            <button onClick={toggleTheme} aria-label="Toggle theme" className="p-2 mr-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
                {theme === 'light' ? <MoonIcon /> : <SunIcon />}
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu" className="p-2">
                <div className="w-6 h-0.5 bg-light-text dark:bg-dark-text mb-1.5 transition-transform duration-300"></div>
                <div className="w-6 h-0.5 bg-light-text dark:bg-dark-text transition-transform duration-300"></div>
            </button>
        </div>
      </nav>
      
      {/* Mobile Menu */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-light-bg-secondary dark:bg-dark-bg-secondary transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-y-0' : '-translate-y-full opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col items-center p-4">
          {navLinks.map(link => (
            <a key={link.name} href={link.href} onClick={() => setIsMenuOpen(false)} className="py-3 w-full text-center hover:bg-black/5 dark:hover:bg-white/5 rounded-xl">
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
