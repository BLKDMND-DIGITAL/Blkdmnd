import React from 'react';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-16 md:py-24 scroll-mt-20">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-2">Visual Thesis</h2>
        <h3 className="text-xl text-primary text-center font-semibold mb-8">Greg L. Dukes (BLKDMND)</h3>
        <div className="space-y-6 text-light-text-secondary dark:text-dark-text-secondary text-lg text-justify">
          <p>
            As an AI Architect and Senior React Engineer, my focus is on the synthesis of function and form. I build intelligent, scalable, and visually compelling digital experiences that solve real-world problems. My approach is rooted in a deep understanding of user-centric design principles, seamlessly integrated with cutting-edge AI technologies to create products that are not just smart, but also intuitive and delightful to use.
          </p>
          <p>
            I thrive in environments that demand rigorous problem-solving and creative ideation. From initial concept to deployment, I lead with a clear vision, ensuring every line of code and every pixel serves a purpose. My process for managing stress and resolving conflict is proactive and collaborative, fostering a team culture where open communication and mutual respect lead to resilient and innovative solutions. I believe the best products are born from a balance of technical excellence and human-centered empathy.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;