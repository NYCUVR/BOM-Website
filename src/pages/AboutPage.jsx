import React from 'react';
import TimelineSection from '../components/TimelineSection';
import FutureGoalsSection from '../components/FutureGoalsSection';

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
    <div className="bg-gray-900">
      <header className="bg-gray-800 text-white text-center py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-brand-pink tracking-tight">關於我們</h1>
          <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            我們不只是一支學生隊伍，我們是工程師、設計師與創新者的集合體，致力於在賽車場上定義永續的未來。
          </p>
        </div>
      </header>
      <TimelineSection />
      <FutureGoalsSection />
      <TeamMembersSection />
      {/* Other sections like Philosophy will be added here */}
    </div>
  );
};

export default AboutPage; 