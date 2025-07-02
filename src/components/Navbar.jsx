import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const navLinks = [
  { name: '首頁', href: '/' },
  { name: '關於團隊', href: '/about' },
  { name: '賽車介紹', href: '/car' },
  { name: '技術與數據服務', href: '/services' },
  { name: '合作夥伴', href: '/partners' },
  { name: '最新動態', href: '/news' },
];

const Navbar = () => {
  return (
    <nav className="bg-gray-800 bg-opacity-80 backdrop-blur-md shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-brand-pink hover:text-brand-gold transition-colors duration-300">
              VR7.5 Racing
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.href}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
                      isActive
                        ? 'bg-brand-pink text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`
                  }
                  end={link.href === '/'}
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
          </div>
          <div className="hidden md:block">
            <Link
              to="/contact"
              className="px-4 py-2 bg-brand-pink text-white rounded-md hover:bg-brand-gold transition-colors duration-300"
            >
              聯絡我們
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 