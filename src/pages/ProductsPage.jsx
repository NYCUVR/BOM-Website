import React from 'react';
import { motion } from 'framer-motion';
import { CogIcon, ChartBarIcon, WrenchScrewdriverIcon } from '@heroicons/react/24/outline';

const services = [
  {
    name: '電動賽車製造',
    description: '我們從設計、開發到製造，一手包辦高性能電動方程式賽車。採用最先進的複合材料與電控系統，為客戶提供在賽道上最具競爭力的基礎。',
    icon: CogIcon,
  },
  {
    name: '賽車數據分析服務',
    description: '透過遙測系統收集的數據，我們的雲端平台利用機器學習模型進行深度分析，提供從駕駛行為到車輛設定的全面優化建議，將每一毫秒的潛力都挖掘出來。',
    icon: ChartBarIcon,
  },
  {
    name: '車輛模組維護方案',
    description: '我們提供靈活的模組化維護合約。無論是電池組、動力單元或懸吊系統，我們確保您的賽車隨時保持在巔峰狀態，最大化您的賽道時間。',
    icon: WrenchScrewdriverIcon,
  },
];

const ProductsPage = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="container mx-auto px-6 py-16 md:py-24">
        
        <header className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white">產品與服務</h1>
          <p className="mt-4 text-lg text-gray-400 max-w-3xl mx-auto">
            我們提供一個從硬體到軟體，從購買到維護的完整賽車生態系，旨在為客戶掃除一切障礙，專注於追求速度與勝利。
          </p>
        </header>

        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.name}
              className="bg-gray-800 p-8 rounded-lg shadow-lg flex flex-col"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="flex-shrink-0">
                <service.icon className="h-12 w-12 text-brand-pink" />
              </div>
              <h3 className="text-2xl font-bold mt-6 mb-3 text-white">{service.name}</h3>
              <p className="text-gray-300 flex-grow">{service.description}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ProductsPage; 