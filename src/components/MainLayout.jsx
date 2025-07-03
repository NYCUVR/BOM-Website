import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Navbar />
      <main className="flex-grow container mx-auto px-6 pt-28 pb-8">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout; 