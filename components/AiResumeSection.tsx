
import React, { useState, useRef } from 'react';
import type { GeneratedResume } from '../types';
import { generateResumeContent } from '../services/geminiService';

const AiResumeSection: React.FC = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [generatedResume, setGeneratedResume] = useState<GeneratedResume | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const resumeContentRef = useRef<HTMLDivElement>(null);

  const handleGenerate = async () => {
    if (!jobTitle.trim()) {
      setError('Please enter a job title or keywords.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedResume(null);
    try {
      const result = await generateResumeContent(jobTitle);
      setGeneratedResume(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyToClipboard = () => {
    if (resumeContentRef.current) {
      const text = resumeContentRef.current.innerText;
      navigator.clipboard.writeText(text).then(() => {
        alert('Resume content copied to clipboard!');
      }).catch(err => {
        console.error('Failed to copy text: ', err);
        alert('Failed to copy content.');
      });
    }
  };
  
  const handleExportToPdf = () => {
      // PDF generation requires a client-side library like jsPDF and html2canvas.
      // This is a placeholder for that functionality.
      alert('PDF export functionality would be implemented here using a library like jsPDF.');
  }

  return (
    <section id="resume" className="py-16 md:py-24 scroll-mt-20">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">AI-Driven Dynamic Resume</h2>
        <p className="max-w-2xl mx-auto text-light-text-secondary dark:text-dark-text-secondary mb-8">
          Enter a job title or keywords to generate a resume summary and key achievements tailored to the role, powered by the Gemini API.
        </p>
      </div>

      <div className="max-w-xl mx-auto flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          placeholder="e.g., Senior Frontend Engineer, AI/ML"
          className="flex-grow w-full px-4 py-3 bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-xl border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary focus:outline-none transition"
          disabled={isLoading}
        />
        <button
          onClick={handleGenerate}
          disabled={isLoading}
          className="px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? 'Generating...' : 'Generate'}
        </button>
      </div>

      {error && <p className="text-center text-red-500 mt-4">{error}</p>}

      <div className="mt-12 max-w-4xl mx-auto">
        {isLoading && (
          <div className="space-y-6 animate-pulse">
            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mt-6"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full ml-4"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full ml-4"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full ml-4"></div>
          </div>
        )}
        {generatedResume && (
          <div className="bg-light-bg-secondary dark:bg-dark-bg-secondary p-8 rounded-lg shadow-lg">
            <div ref={resumeContentRef}>
              <h3 className="text-2xl font-bold text-primary mb-4">Professional Summary</h3>
              <p className="text-light-text-secondary dark:text-dark-text-secondary mb-8">{generatedResume.summary}</p>
              <h3 className="text-2xl font-bold text-primary mb-4">Key Achievements</h3>
              <ul className="list-disc list-inside space-y-2 text-light-text-secondary dark:text-dark-text-secondary">
                {generatedResume.bulletPoints.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>
            <div className="flex gap-4 mt-8">
              <button onClick={handleCopyToClipboard} className="px-5 py-2 border border-primary text-primary font-semibold rounded-xl hover:bg-primary/10 transition-colors">Copy</button>
              <button onClick={handleExportToPdf} className="px-5 py-2 border border-primary text-primary font-semibold rounded-xl hover:bg-primary/10 transition-colors">Export as PDF</button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AiResumeSection;
