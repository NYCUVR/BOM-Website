import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { RocketLaunchIcon, CloudIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

const FeatureSection = ({ inView }) => {
  const { t } = useTranslation();
  const controls = useAnimation();

  const features = [
    {
      name: t('homepage.feature1_title'),
      description: t('homepage.feature1_desc'),
      icon: RocketLaunchIcon,
    },
    {
      name: t('homepage.feature2_title'),
      description: t('homepage.feature2_desc'),
      icon: CloudIcon,
    },
    {
      name: t('homepage.feature3_title'),
      description: t('homepage.feature3_desc'),
      icon: ComputerDesktopIcon,
    },
  ];

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [inView, controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="w-full">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
          {t('homepage.feature_section_title')}
        </h2>
        <p className="mt-6 text-lg leading-8 text-gray-300 max-w-2xl mx-auto">
          {t('homepage.feature_section_desc')}
        </p>
        <motion.div
          className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.name}
              className="flex flex-col items-center p-8 bg-gray-800/70 rounded-2xl shadow-lg transition-all duration-300 hover:bg-brand-pink/20 hover:shadow-brand-pink/50"
              variants={itemVariants}
            >
              <feature.icon className="h-12 w-12 text-brand-pink" aria-hidden="true" />
              <h3 className="mt-5 text-xl font-semibold leading-7 text-white">{feature.name}</h3>
              <p className="mt-2 text-base leading-7 text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureSection; 