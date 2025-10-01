import React from 'react';
import ProfileCard from './ProfileCard';

const HeroSection: React.FC = () => {
  const handleContactClick = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative h-[700px] md:h-[800px] w-full flex items-center justify-center text-center overflow-hidden bg-light-bg dark:bg-dark-bg">
      <div className="relative z-10 w-full max-w-sm px-6">
        <ProfileCard
            name="Greg Dukes"
            status="Active"
            contactText="Contact Me"
            avatarUrl="https://i.imgur.com/ZSvYZJI.png"
            showUserInfo={true}
            enableTilt={true}
            onContactClick={handleContactClick}
          />
      </div>
    </section>
  );
};

export default HeroSection;