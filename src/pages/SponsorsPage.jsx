import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { sponsors } from '../data/sponsorsData';

const SponsorCard = ({ sponsor, level }) => {
  const { t } = useTranslation();
  
  const levelColors = {
    'SS': 'bg-gradient-to-br from-yellow-400 to-yellow-600', // 金級
    'S': 'bg-gradient-to-br from-gray-300 to-gray-500', // 銀級
    'A': 'bg-gradient-to-br from-amber-600 to-amber-800', // 銅級
    'B': 'bg-gradient-to-br from-amber-600 to-amber-800' // 銅級
  };

  const levelNames = {
    'SS': t('sponsors_page.gold_level'),
    'S': t('sponsors_page.silver_level'),
    'A': t('sponsors_page.bronze_level'),
    'B': t('sponsors_page.bronze_level')
  };

  return (
    <motion.div
      className="bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      <div className="relative">
        {/* Level Badge */}
        <div className={`absolute -top-3 -right-3 px-3 py-1 rounded-full text-xs font-bold text-white ${levelColors[sponsor.level]}`}>
          {levelNames[sponsor.level]}
        </div>
        
                  {/* Sponsor Logo */}
          <div className="h-32 mb-4 flex items-center justify-center bg-gray-700 rounded-lg">
            <img 
              src={`/sponsors/${sponsor.logo}`} 
              alt={sponsor.name}
              className="max-h-24 max-w-full object-contain"
              onError={(e) => {
                // 如果圖片載入失敗，使用 SVG placeholder
                e.target.src = '/sponsors/placeholder-logo.svg';
              }}
            />
          </div>
        
        {/* Sponsor Info */}
        <div className="text-center">
          <h3 className="text-lg font-bold text-white mb-2">{sponsor.name}</h3>
          <p className="text-sm text-gray-300 mb-2 leading-relaxed">{sponsor.description}</p>
          <p className="text-xs text-gray-500 mb-3">{sponsor.group}</p>
          
          {/* Sponsor Link */}
          <a 
            href={`https://${sponsor.name.toLowerCase().replace(/\s+/g, '')}.com`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-brand-pink text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-gold transition-colors duration-300"
          >
            {t('sponsors_page.visit_website')}
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const SponsorsPage = () => {
  const { t } = useTranslation();

  // 按等級分組贊助商
  const goldSponsors = sponsors.filter(s => s.level === 'SS');
  const silverSponsors = sponsors.filter(s => s.level === 'S');
  const bronzeSponsors = sponsors.filter(s => s.level === 'A' || s.level === 'B');

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="container mx-auto px-6 py-16 md:py-24">
        
        {/* Header */}
        <motion.header 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6">
            {t('sponsors_page.title')}
          </h1>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            {t('sponsors_page.subtitle')}
          </p>
        </motion.header>

        {/* Gold Sponsors */}
        <motion.section 
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-yellow-400 mb-2">
              {t('sponsors_page.gold_sponsors')}
            </h2>
            <p className="text-gray-400">{t('sponsors_page.gold_description')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {goldSponsors.map((sponsor, index) => (
              <SponsorCard key={sponsor.name} sponsor={sponsor} level="SS" />
            ))}
          </div>
        </motion.section>

        {/* Silver Sponsors */}
        <motion.section 
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-300 mb-2">
              {t('sponsors_page.silver_sponsors')}
            </h2>
            <p className="text-gray-400">{t('sponsors_page.silver_description')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {silverSponsors.map((sponsor, index) => (
              <SponsorCard key={sponsor.name} sponsor={sponsor} level="S" />
            ))}
          </div>
        </motion.section>

        {/* Bronze Sponsors */}
        <motion.section 
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-amber-600 mb-2">
              {t('sponsors_page.bronze_sponsors')}
            </h2>
            <p className="text-gray-400">{t('sponsors_page.bronze_description')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {bronzeSponsors.map((sponsor, index) => (
              <SponsorCard key={sponsor.name} sponsor={sponsor} level="A" />
            ))}
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.div 
          className="text-center bg-gray-800 p-12 rounded-2xl shadow-2xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-brand-gold mb-4">
            {t('sponsors_page.cta_title')}
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            {t('sponsors_page.cta_subtitle')}
          </p>
          <Link to="/contact">
            <button className="bg-brand-pink text-white font-bold py-3 px-8 rounded-full hover:bg-brand-gold transition-colors duration-300 text-lg shadow-lg transform hover:scale-105">
              {t('sponsors_page.cta_button')}
            </button>
          </Link>
        </motion.div>

      </div>
    </div>
  );
};

export default SponsorsPage; 