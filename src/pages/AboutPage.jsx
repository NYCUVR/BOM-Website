import React from 'react';
import TimelineSection from '../components/TimelineSection';

// Placeholder for team members section
const TeamMembersSection = () => (
  <div className="py-20 bg-gray-800">
    <div className="container mx-auto px-6 text-center">
      <h2 className="text-4xl font-bold text-white mb-4">我們的團隊</h2>
      <p className="text-gray-300">團隊成員介紹即將更新...</p>
    </div>
  </div>
);

const AboutPage = () => {
  return (
    <div>
      <TimelineSection />
      <TeamMembersSection />
      {/* Other sections like Philosophy will be added here */}
    </div>
  );
};

export default AboutPage; 