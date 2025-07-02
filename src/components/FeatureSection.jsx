import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { RocketLaunchIcon, CloudIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline';

const features = [
  {
    name: '入門級方程式賽車',
    description: '我們打造兼具高性能、極致安全與合理成本的方程式賽車，是您踏入賽車運動的最佳夥伴。',
    icon: RocketLaunchIcon,
  },
  {
    name: '雲端 AI 數據分析',
    description: '透過我們強大的雲端 AI 平台，分析您的每一次過彎、每一次加速，將數據轉化為您在賽道上的絕對優勢。',
    icon: CloudIcon,
  },
  {
    name: '即時數據儀表板',
    description: '在駕駛艙內，所有關鍵車輛數據與 AI 建議一目了然。我們提供高度客製化的即時儀表板，讓您全權掌控。',
    icon: ComputerDesktopIcon,
  },
];

const FeatureSection = ({ inView }) => {
  const controls = useAnimation();

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
          一個完整的賽車生態系
        </h2>
        <p className="mt-6 text-lg leading-8 text-gray-300 max-w-2xl mx-auto">
          從硬體到軟體，從賽道到雲端，我們提供您所需要的一切，讓您專注於最純粹的駕駛樂趣。
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