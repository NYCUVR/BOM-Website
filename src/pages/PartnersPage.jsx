import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AcademicCapIcon, ArrowsRightLeftIcon, CogIcon } from '@heroicons/react/24/outline';

const PartnerCategory = ({ icon: Icon, title, description, imgSrc, reverse = false }) => {
  const content = (
    <div className="md:w-1/2">
      <div className="flex items-center mb-4">
        <Icon className="h-10 w-10 text-brand-pink mr-4" />
        <h3 className="text-3xl font-bold text-white">{title}</h3>
      </div>
      <p className="text-gray-300 leading-relaxed">
        {description}
      </p>
    </div>
  );

  const visual = (
    <div className="md:w-1/2">
      <img src={imgSrc} alt={title} className="rounded-lg shadow-2xl object-cover w-full h-full aspect-[4/3]" />
    </div>
  );

  return (
    <motion.div
      className={`flex flex-col md:flex-row items-center gap-12 ${reverse ? 'md:flex-row-reverse' : ''}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
    >
      {content}
      {visual}
    </motion.div>
  );
};

const PartnersPage = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="container mx-auto px-6 py-16 md:py-24 space-y-24">
        
        <header className="text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white">{t('partners_page.header_title')}</h1>
          <p className="mt-4 text-lg text-gray-400 max-w-3xl mx-auto">
            {t('partners_page.header_subtitle')}
          </p>
        </header>

        <div className="space-y-20">
          <PartnerCategory
            icon={AcademicCapIcon}
            title={t('partners_page.category1_title')}
            description={t('partners_page.category1_desc')}
            imgSrc="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1470&auto=format&fit=crop"
          />
          <PartnerCategory
            icon={ArrowsRightLeftIcon}
            title={t('partners_page.category2_title')}
            description={t('partners_page.category2_desc')}
            imgSrc="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1470&auto=format&fit=crop"
            reverse={true}
          />
          <PartnerCategory
            icon={CogIcon}
            title={t('partners_page.category3_title')}
            description={t('partners_page.category3_desc')}
            imgSrc="/sam-loyd-qy27JnsH9sU-unsplash.jpg"
          />
        </div>

        {/* Call to Action Section */}
        <div className="text-center bg-gray-800 p-12 rounded-2xl shadow-2xl">
            <h2 className="text-4xl font-bold text-brand-gold mb-4">{t('partners_page.cta_title')}</h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-8">
                {t('partners_page.cta_subtitle')}
            </p>
            <Link to="/contact">
                <button className="bg-brand-pink text-white font-bold py-3 px-8 rounded-full hover:bg-pink-600 transition-colors duration-300 text-lg shadow-lg">
                    {t('partners_page.cta_button')}
                </button>
            </Link>
        </div>

      </div>
    </div>
  );
};

export default PartnersPage; 