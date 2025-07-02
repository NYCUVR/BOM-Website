import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCoverflow } from 'swiper/modules';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, ComposedChart, Bar } from 'recharts';
import { faker } from '@faker-js/faker';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

import { CogIcon, ChartBarIcon, WrenchScrewdriverIcon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

const galleryImages = [
  'https://placehold.co/800x600/111827/ffffff.png?text=VR7.5+車頭視角',
  'https://placehold.co/800x600/1f2937/ffffff.png?text=駕駛艙細節',
  'https://placehold.co/800x600/374151/ffffff.png?text=側面空氣動力學套件',
  'https://placehold.co/800x600/4b5563/ffffff.png?text=後懸吊與動力單元',
  'https://placehold.co/800x600/6b7280/ffffff.png?text=賽道動態'
];

// --- MOCK DATA GENERATION ---
const generateLapData = (laps) => {
    let data = [];
    const totalDistance = 3740; // meters for Lihpao G2
    const pointsPerLap = 50;
    for (let lap = 1; lap <= laps; lap++) {
        let lapTime = 90 + faker.number.float({ min: -2, max: 2 }); // Base lap time in seconds
        for (let i = 0; i < pointsPerLap; i++) {
            const distance = (i / pointsPerLap) * totalDistance;
            data.push({
                lap: lap,
                distance: distance,
                speed: 120 + faker.number.float({ min: -40, max: 40 }), // km/h
                g_force: 1.5 + faker.number.float({ min: -1, max: 1 }),
                battery_voltage: 400 - (i / pointsPerLap) * 20 - faker.number.float({ min: 0, max: 5 }),
            });
        }
    }
    return data;
};

const mockDataSets = {
  'lihpao_driver_a': {
    name: "麗寶國際賽車場 G2 - 車手 A",
    kpis: {
        best_lap: '1:30.125',
        top_speed: '165 km/h',
        avg_g_force: '1.8 G',
        battery_efficiency: '92%',
    },
    lapData: generateLapData(5),
  },
  'lihpao_driver_b': {
    name: "麗寶國際賽車場 G2 - 車手 B",
    kpis: {
        best_lap: '1:31.560',
        top_speed: '162 km/h',
        avg_g_force: '1.7 G',
        battery_efficiency: '94%',
    },
    lapData: generateLapData(5),
  }
};

const KPI = ({ title, value }) => (
    <div className="bg-gray-800 p-4 rounded-lg text-center">
        <p className="text-sm text-gray-400">{title}</p>
        <p className="text-2xl font-bold text-white">{value}</p>
    </div>
);

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

// --- Dashboard Modal ---
const DashboardModal = ({ onClose }) => {
    const [dataSetKey, setDataSetKey] = useState(Object.keys(mockDataSets)[0]);
    const activeData = useMemo(() => mockDataSets[dataSetKey], [dataSetKey]);

    return (
        <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                className="bg-gray-900 border border-brand-pink/30 w-full max-w-7xl h-[90vh] rounded-2xl shadow-2xl flex flex-col"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
            >
                <header className="flex justify-between items-center border-b border-gray-700 p-4">
                    <h2 className="text-xl font-bold text-brand-gold">AI 數據分析儀表板 (模擬)</h2>
                    <div className="flex items-center gap-4">
                        <select 
                          value={dataSetKey}
                          onChange={(e) => setDataSetKey(e.target.value)}
                          className="bg-gray-700 border-gray-600 text-white rounded-md p-2 focus:ring-brand-pink focus:border-brand-pink transition"
                        >
                            {Object.entries(mockDataSets).map(([key, data]) => (
                                <option key={key} value={key}>{data.name}</option>
                            ))}
                        </select>
                        <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                            <XMarkIcon className="h-8 w-8" />
                        </button>
                    </div>
                </header>
                <main className="flex-1 flex flex-col lg:flex-row gap-4 p-4 overflow-hidden">
                    {/* KPIs */}
                    <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
                        {Object.entries(activeData.kpis).map(([key, value]) => (
                            <KPI key={key} title={key.replace('_', ' ').replace(/(?:^|\s)\S/g, a => a.toUpperCase())} value={value} />
                        ))}
                    </div>

                    {/* Main Chart */}
                    <div className="w-full h-full flex-1">
                        <ResponsiveContainer width="100%" height="100%">
                            <ComposedChart data={activeData.lapData.filter(d => d.lap === 1)}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
                                <XAxis dataKey="distance" unit="m" stroke="#9CA3AF" />
                                <YAxis yAxisId="left" label={{ value: 'Speed (km/h)', angle: -90, position: 'insideLeft', fill: '#818CF8' }} stroke="#818CF8" />
                                <YAxis yAxisId="right" orientation="right" label={{ value: 'G-Force', angle: -90, position: 'insideRight', fill: '#F472B6' }} stroke="#F472B6" />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'rgba(31, 41, 55, 0.8)',
                                        borderColor: '#4B5563',
                                        color: '#F9FAFB',
                                    }}
                                />
                                <Legend />
                                <Bar yAxisId="left" dataKey="speed" name="Speed" fill="#818CF8" />
                                <Line yAxisId="right" type="monotone" dataKey="g_force" name="G-Force" stroke="#F472B6" strokeWidth={2} dot={false} />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>

                    {/* AI Suggestions */}
                    <div className="w-full lg:w-1/4 bg-gray-800/50 p-4 rounded-lg overflow-y-auto">
                        <h3 className="text-lg font-bold text-brand-pink mb-4">AI 駕駛建議 (單圈 1)</h3>
                        <ul className="space-y-3 text-sm text-gray-300">
                           <li className="p-2 bg-gray-700/50 rounded-md">在 T3 彎道延後剎車點 5 公尺，預計可提升 0.15 秒。</li>
                           <li className="p-2 bg-gray-700/50 rounded-md">於 1500m 處的連續彎，路線可更貼近彎心，以提升出彎速度。</li>
                           <li className="p-2 bg-gray-700/50 rounded-md">電池溫度在後半段偏高，建議調整動能回收強度至等級 2。</li>
                           <li className="p-2 bg-gray-700/50 rounded-md">偵測到輕微轉向不足，建議前輪胎壓降低 0.5 psi。</li>
                        </ul>
                    </div>
                </main>
                 <footer className="text-center text-sm text-gray-500 p-2 border-t border-gray-700">
                    <p>此為模擬數據展示。成為會員以解鎖您自己車輛的即時數據分析。</p>
                </footer>
            </motion.div>
        </motion.div>
    );
};

const ProductsPage = () => {
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);

  const DataAnalysisVisual = () => (
    <div className="bg-gray-800/50 p-4 rounded-lg shadow-2xl border border-gray-700 h-full flex flex-col items-center justify-center text-center gap-4">
        <img src="https://placehold.co/800x450/1f2937/c9d1d9.png?text=AI數據分析儀表板" alt="Data Analysis Dashboard" className="rounded-lg w-full h-auto object-cover" />
        <button 
            onClick={() => setIsDashboardOpen(true)}
            className="mt-4 bg-brand-pink text-white font-bold py-3 px-8 rounded-full hover:bg-pink-600 transition-colors duration-300 shadow-lg"
        >
            體驗互動式儀表板
        </button>
    </div>
  );

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
          visual={<DataAnalysisVisual />}
          reverse={true}
        >
            <p>這不僅僅是數據紀錄，更是勝利的藍圖。透過安裝在車上的多種感測器，我們能收集包括輪速、G值、電池效能、馬達溫度在內的上百種數據。</p>
            <p>我們的雲端平台利用機器學習模型進行深度分析，提供從駕駛行為到車輛設定的全面優化建議，將每一毫秒的潛力都挖掘出來。點擊右側按鈕，體驗我們的模擬數據儀表板。</p>
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
      <AnimatePresence>
        {isDashboardOpen && <DashboardModal onClose={() => setIsDashboardOpen(false)} />}
      </AnimatePresence>
    </div>
  );
};

export default ProductsPage; 