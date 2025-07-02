import React from 'react';
import HeroSection from '../components/HeroSection';
import CtaSection from '../components/CtaSection';
import FeatureSection from '../components/FeatureSection';

const Homepage = () => {
  return (
    <div>
      <HeroSection />
      <CtaSection />
      <FeatureSection />
      {/* Other sections of the homepage will be added here */}
    </div>
  );
};

export default Homepage; 