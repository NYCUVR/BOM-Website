import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const CtaSection = ({ inView }) => {
  const { t } = useTranslation();
  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <motion.section
      className="text-white container mx-auto px-4 py-16 md:py-24 text-center"
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
    >
      <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
        {t('homepage.cta_title')}
      </h2>
      <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-300">
        {t('homepage.cta_desc')}
      </p>
      <div className="mt-10">
        <a
          href="/contact"
          className="inline-block px-8 py-4 bg-brand-pink text-white font-bold rounded-md hover:bg-brand-gold transition-colors duration-300 shadow-lg transform hover:scale-105"
        >
          {t('homepage.cta_button')}
        </a>
      </div>
    </motion.section>
  );
};

export default CtaSection; 