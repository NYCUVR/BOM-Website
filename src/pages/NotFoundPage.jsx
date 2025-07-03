import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-gray-900 text-white flex items-center justify-center min-h-screen">
      <motion.div
        className="text-center p-8 max-w-lg"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <ExclamationTriangleIcon className="h-24 w-24 mx-auto text-brand-pink mb-6" />
        <h1 className="text-8xl md:text-9xl font-extrabold text-white tracking-tighter">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-300 mt-4">
          {t('not_found_page.title')}
        </h2>
        <p className="mt-4 text-gray-400">
          {t('not_found_page.subtitle')}
        </p>
        <Link to="/">
          <motion.button
            className="mt-8 bg-brand-pink text-white font-bold py-3 px-8 rounded-full hover:bg-pink-600 transition-colors duration-300 shadow-lg transform hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t('not_found_page.button_text')}
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFoundPage; 