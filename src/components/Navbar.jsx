import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  const navLinks = [
    { title: '關於團隊', path: '/about' },
    { title: '賽車介紹', path: '/car' },
    { title: '技術與數據服務', path: '/services' },
    { title: '合作夥伴', path: '/partners' },
    { title: '最新動態', path: '/news' },
  ];

  return (
    <nav className="bg-gray-900 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-brand-pink hover:opacity-80 transition-opacity duration-300">
          VR7.5 Racing
        </Link>
        <div className="hidden md:flex space-x-6 items-center">
          {navLinks.map((link) => (
            <NavLink 
              key={link.title} 
              to={link.path} 
              className={({ isActive }) =>
                `transition-colors duration-300 ${isActive ? 'text-brand-pink' : 'hover:text-brand-pink'}`
              }
            >
              {link.title}
            </NavLink>
          ))}
          <Link to="/contact" className="bg-brand-pink hover:opacity-80 text-white font-bold py-2 px-4 rounded-md transition-all duration-300">
            聯絡我們
          </Link>
        </div>
        {/* Mobile Menu Button (to be implemented later) */}
        <div className="md:hidden">
          <button className="text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 