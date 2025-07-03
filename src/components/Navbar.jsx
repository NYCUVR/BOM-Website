import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../context/AuthContext';

const navLinks = [
  { name: '首頁', href: '/' },
  { name: '關於我們', href: '/about' },
  { name: '產品與服務', href: '/products' },
  { name: '車輛規格', href: '/specs' },
  { name: '合作夥伴', href: '/partners' },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.logout(() => navigate('/'));
    setIsMenuOpen(false);
  }

  const mobileLinkClass = "block text-3xl font-bold text-center text-white py-4 hover:bg-brand-pink transition-colors duration-300";
  const desktopLinkClass = ({ isActive }) =>
      `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
        isActive
          ? 'bg-brand-pink text-white'
          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
      }`;

  return (
    <>
      <nav className="bg-gray-800 bg-opacity-80 backdrop-blur-md shadow-lg fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold text-brand-pink hover:text-brand-gold transition-colors duration-300">
                VR7.5 Racing
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.href}
                  className={desktopLinkClass}
                  end={link.href === '/'}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </NavLink>
              ))}
              {auth.user ? (
                <>
                  <Link
                    to="/dashboard"
                    className="px-4 py-2 bg-brand-pink text-white rounded-md hover:bg-brand-gold transition-colors duration-300 text-sm font-medium"
                  >
                    儀表板
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors duration-300 text-sm font-medium"
                  >
                    登出
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="px-4 py-2 bg-brand-pink text-white rounded-md hover:bg-brand-gold transition-colors duration-300 text-sm font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  登入
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="text-white focus:outline-none"
                >
                    {isMenuOpen ? <XMarkIcon className="h-8 w-8" /> : <Bars3Icon className="h-8 w-8" />}
                </button>
            </div>

          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="md:hidden fixed top-0 left-0 w-full h-screen bg-black bg-opacity-90 z-40 flex flex-col justify-center items-center pt-20"
          >
            <div className="w-full flex flex-col items-center">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.href}
                  className={mobileLinkClass}
                  onClick={() => setIsMenuOpen(false)}
                  end={link.href === '/'}
                >
                  {link.name}
                </NavLink>
              ))}
              {auth.user ? (
                <>
                   <Link
                      to="/dashboard"
                      className={`${mobileLinkClass} mt-8 bg-brand-pink rounded-lg w-3/4`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      儀表板
                    </Link>
                    <button
                      onClick={handleLogout}
                      className={`${mobileLinkClass} mt-4 bg-gray-600 rounded-lg w-3/4`}
                    >
                      登出
                    </button>
                </>
              ) : (
                 <Link
                    to="/login"
                    className={`${mobileLinkClass} mt-8 bg-brand-pink rounded-lg w-3/4`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    登入
                  </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar; 