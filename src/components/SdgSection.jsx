import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const sdgData = [
  {
    id: 4,
    color: 'bg-red-500',
    borderColor: 'border-red-500',
    keyPrefix: 'sdg4'
  },
  {
    id: 9,
    color: 'bg-orange-500',
    borderColor: 'border-orange-500',
    keyPrefix: 'sdg9'
  },
  {
    id: 12,
    color: 'bg-yellow-500',
    borderColor: 'border-yellow-500',
    keyPrefix: 'sdg12'
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.5,
    },
  }),
};

const SdgSection = () => {
    const { t } = useTranslation();

    return (
        <section className="py-16 md:py-24">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-brand-pink">{t('about.sdgs_section_title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {sdgData.map((sdg, i) => (
                    <motion.div
                        key={sdg.id}
                        className={`bg-gray-800 rounded-lg p-8 flex flex-col items-center text-center border-b-4 ${sdg.borderColor}`}
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        custom={i}
                    >
                        <div className={`w-20 h-20 ${sdg.color} rounded-md flex items-center justify-center mb-6`}>
                            <span className="text-white text-4xl font-extrabold">{sdg.id}</span>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">{t(`about.${sdg.keyPrefix}_title`)}</h3>
                        <p className="text-gray-300">{t(`about.${sdg.keyPrefix}_desc`)}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default SdgSection; 