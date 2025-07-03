import React from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

import { CogIcon, ChartBarIcon, WrenchScrewdriverIcon, TruckIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import AiPlanComparison from '../components/AiPlanComparison';

const galleryImages = [
  '/y_assm_01.jpg',
  '/y_assm_02.jpg',
  '/y_assm_03.jpg',
  '/y_assm_04.jpg',
  '/m_assm_05.jpg'
];

// --- Visual Components ---

const CarGallery = () => (
  <Swiper
    modules={[Navigation, Pagination, EffectCoverflow]}
    loop={true}
    effect={'coverflow'}
    grabCursor={true}
    centeredSlides={true}
    slidesPerView={'auto'}
    coverflowEffect={{
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    }}
    pagination={{ clickable: true }}
    navigation={true}
    className="w-full"
  >
    {galleryImages.map((src, index) => (
      <SwiperSlide key={index} style={{ width: '80%', maxWidth: '500px' }}>
        <img src={src} alt={`VR7.5 image ${index + 1}`} className="rounded-lg shadow-2xl" />
      </SwiperSlide>
    ))}
  </Swiper>
);

const VisualPlaceholder = ({ src, alt }) => (
    <div className="bg-gray-800/50 p-4 rounded-lg shadow-2xl border border-gray-700 h-full flex items-center justify-center">
        <img src={src} alt={alt} className="rounded-lg w-full h-auto object-cover max-h-[400px]" />
    </div>
);


// --- Refactored ServiceSection ---

const ServiceSection = ({ icon: Icon, title, children, visual, reverse = false }) => (
  <motion.div 
    className="items-center grid grid-cols-1 md:grid-cols-2 gap-12"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.8 }}
  >
    <div className={`md:order-${reverse ? '2' : '1'}`}>
      <Icon className="h-12 w-12 text-brand-pink mb-4" />
      <h3 className="text-3xl font-bold text-white mb-4">{title}</h3>
      <div className="text-gray-300 space-y-4">
        {children}
      </div>
    </div>
    <div className={`md:order-${reverse ? '1' : '2'} w-full h-full flex items-center justify-center`}>
      {visual}
    </div>
  </motion.div>
);

const ProductsPage = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="container mx-auto px-6 py-16 md:py-24 space-y-24">
        
        <header className="text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white">產品與服務</h1>
          <p className="mt-4 text-lg text-gray-400 max-w-3xl mx-auto">
            我們提供一個從硬體到軟體，從購買到維護的完整賽車生態系，旨在為客戶掃除一切障礙，專注於追求速度與勝利。
          </p>
        </header>

        {/* Vehicle Showcase */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-12">VR7.5 實車鑑賞</h2>
          <CarGallery />
        </section>

        {/* Core Services */}
        <div className="space-y-24">
          <ServiceSection 
            icon={TruckIcon} 
            title="整車銷售"
            visual={<VisualPlaceholder src="/y_com_car_01.jpg" alt="VR7.5 Production" />}
          >
            <p>
              我們提供已完成組裝、調校，並隨時可以下場的 VR7.5 賽車。每一台車都經過賽道上的嚴格測試，確保性能與穩定性達到最佳平衡。我們相信，您的團隊值得擁有一台開箱即用、專為勝利而生的戰駒。
            </p>
            <p>
              購車方案包含第一年的基礎 AI 數據服務 (Free Tier)，讓您從第一天起就能開始收集並分析車輛數據。
            </p>
          </ServiceSection>

          <ServiceSection 
            icon={CogIcon} 
            title="零件供應"
            visual={<VisualPlaceholder src="/y_part_01.jpg" alt="Aero Components" />}
            reverse={true}
          >
            <p>
              從輕量化碳纖維空力套件、高強度懸吊組件到客製化電池模組，我們提供 VR7.5 全車系的零件供應。無論是賽季中的維修更換，或是針對特定賽道的升級需求，我們都能快速回應，確保您的賽車時刻保持在巔峰狀態。
            </p>
          </ServiceSection>
          
          <ServiceSection 
            icon={WrenchScrewdriverIcon} 
            title="維修與技術支援"
            visual={<VisualPlaceholder src="/y_support_01.jpg" alt="Maintenance" />}
          >
            <p>
              我們的技術團隊擁有豐富的組裝與賽道支援經驗。我們提供從賽前整備、現場調校到賽後分析的全方位技術支援。遇到任何技術難題？我們就是您最可靠的後盾。
            </p>
          </ServiceSection>
        </div>

        {/* AI Plan Section */}
        <section className="text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white">選購 AI 方案</h2>
          <p className="mt-4 text-lg text-gray-400 max-w-3xl mx-auto">
            購車方案已包含第一年免費方案。升級您的方案以解鎖由 AI 驅動的深度數據洞察，將您的圈速推向極限。
          </p>
          <div className="mt-16">
            <AiPlanComparison />
          </div>
        </section>

      </div>
    </div>
  );
};

export default ProductsPage; 