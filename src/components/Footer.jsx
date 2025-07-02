import React from 'react';
import { FaGithub, FaLinkedin, FaInstagram, FaFacebook } from 'react-icons/fa';

const Footer = () => {
  // You can replace these with your actual social media links
  const socialLinks = {
    facebook: 'https://www.facebook.com/NycuVulpesRacing/',
    instagram: 'https://www.instagram.com/nycu_vulpes_racing/',
    github: 'https://github.com/NYCUVR/BOM-Website',
    linkedin: null, // Add your LinkedIn URL here or leave it null
  };

  const icons = {
      facebook: <FaFacebook size={24} />,
      instagram: <FaInstagram size={24} />,
      github: <FaGithub size={24} />,
      linkedin: <FaLinkedin size={24} />,
  }

  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col items-center sm:flex-row sm:justify-between">
          <div className="text-center sm:text-left mb-4 sm:mb-0">
            <h3 className="text-xl font-bold text-white">VR7.5 Racing Team</h3>
            <p className="mt-1">創新源於賽道，智慧定義未來</p>
          </div>
          <div className="flex space-x-6">
            {Object.entries(socialLinks).map(([key, value]) => {
                if(value) {
                    return (
                        <a key={key} href={value} target="_blank" rel="noopener noreferrer" className="hover:text-brand-pink transition-colors duration-300">
                            {icons[key]}
                        </a>
                    )
                }
                return null;
            })}
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