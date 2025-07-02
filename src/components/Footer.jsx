import React from 'react';

const Footer = () => {
  // You can replace these with your actual social media links
  const socialLinks = {
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    instagram: 'https://instagram.com',
  };

  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col items-center sm:flex-row sm:justify-between">
          <div className="text-center sm:text-left mb-4 sm:mb-0">
            <h3 className="text-xl font-bold text-white">VR7.5 Racing Team</h3>
            <p className="mt-1">創新源於賽道，智慧定義未來</p>
          </div>
          <div className="flex space-x-4">
            {socialLinks.github && (
              <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                {/* Placeholder for GitHub Icon */}
                <span className="text-2xl">G</span>
              </a>
            )}
            {socialLinks.linkedin && (
              <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                {/* Placeholder for LinkedIn Icon */}
                <span className="text-2xl">L</span>
              </a>
            )}
            {socialLinks.instagram && (
              <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                {/* Placeholder for Instagram Icon */}
                <span className="text-2xl">I</span>
              </a>
            )}
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} VR7.5 Racing Team. All Rights Reserved.</p>
          <p className="mt-1">
            National Yang Ming Chiao Tung University
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 