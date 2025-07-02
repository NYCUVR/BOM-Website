import React from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

import { CogIcon, ChartBarIcon, WrenchScrewdriverIcon } from '@heroicons/react/24/outline';

const galleryImages = [
  'https://placehold.co/800x600/111827/ffffff.png?text=VR7.5+車頭視角',
  'https://placehold.co/800x600/1f2937/ffffff.png?text=駕駛艙細節',
  'https://placehold.co/800x600/374151/ffffff.png?text=側面空氣動力學套件',
  'https://placehold.co/800x600/4b5563/ffffff.png?text=後懸吊與動力單元',
  'https://placehold.co/800x600/6b7280/ffffff.png?text=賽道動態'
];

// --- Visual Components ---

const CarGallery = () => (
  <Swiper
    modules={[Navigation, Pagination, EffectCoverflow]}
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

        <ServiceSection 
          icon={CogIcon} 
          title="電動賽車製造"
          visual={<CarGallery />}
        >
            <p>我們從設計、開發到製造，一手包辦高性能電動方程式賽車。採用最先進的複合材料與電控系統，為客戶提供在賽道上最具競爭力的基礎。</p>
            <p>每一台車都經過嚴格的賽道測試與數據驗證，確保其在性能、穩定性與安全性上都達到最高標準。我們相信，卓越的硬體是實現一切的根本。</p>
        </ServiceSection>
        
        <ServiceSection 
          icon={ChartBarIcon} 
          title="賽車數據分析服務" 
          visual={<VisualPlaceholder src="https://placehold.co/800x600/1f2937/c9d1d9.png?text=AI數據分析儀表板" alt="Data Analysis Dashboard" />}
          reverse={true}
        >
            <p>這不僅僅是數據紀錄，更是勝利的藍圖。透過安裝在車上的多種感測器，我們能收集包括輪速、G值、電池效能、馬達溫度在內的上百種數據。</p>
            <p>我們的雲端平台利用機器學習模型進行深度分析，提供從駕駛行為到車輛設定的全面優化建議，將每一毫秒的潛力都挖掘出來。客戶可以透過專屬儀表板查看分析報告，或訂閱我們的進階諮詢服務。</p>
        </ServiceSection>

        <ServiceSection 
          icon={WrenchScrewdriverIcon} 
          title="車輛模組維護方案"
          visual={<VisualPlaceholder src="https://placehold.co/800x600/374151/c9d1d9.png?text=車輛模組化分解圖" alt="Exploded View of Car Modules" />}
        >
            <p>賽車是精密的儀器，需要專業的照護。我們提供靈活的模組化維護合約，讓您無需擔憂後勤的繁瑣。</p>
            <p>無論是賽季前的全面檢測、電池組的健康度評估，還是動力單元或懸吊系統的預防性更換，我們確保您的賽車隨時保持在巔峰狀態，最大化您的賽道時間與投資回報。</p>
        </ServiceSection>

      </div>
    </div>
  );
};

export default ProductsPage; 