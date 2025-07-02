import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const performanceHighlights = [
  { name: '目標重量', value: '350 kg' },
  { name: '0-75 公尺加速', value: '5.5s' },
  { name: '橫向抓地力', value: '2.5 g' },
];

const sensorSuite = [
  '來自輪速的即時回饋',
  '懸吊行程',
  '轉向角度',
  'GPS',
];

const powertrain = [
  { name: '電動馬達', value: '80 kW' },
  { name: '電池系統', value: '396 V (含 BMS)' },
];

const chassisStructure = [
  '帶有複合材料車殼的鋼管車架',
  '剛性優化的輕量化設計',
];

const massBreakdown = {
  chassis: [
    { name: '車架', value: '50.8 kg' },
    { name: '地板關閉件', value: '0.648 kg' },
    { name: '防火牆', value: '0.378 kg' },
    { name: 'IA', value: '1.29 kg' },
    { name: 'AIP', value: '2.36 kg' },
    { name: '頭部約束裝置', value: '0.42 kg' },
    { name: '踏板', value: '3.216 kg' },
    { name: '座椅', value: '1.772 kg' },
    { name: '安全帶', value: '1.5 kg' },
    { name: '方向盤', value: '0.245 kg' },
    { name: '快拆裝置', value: '0.58 kg' },
  ],
  aero: [
    { name: '鼻翼', value: '26 kg' },
    { name: '前翼', value: '5.8 kg' },
    { name: '後翼', value: '9 kg' },
    { name: '側板', value: '0.9 kg' },
  ],
  suspension: [
    { name: '直立件', value: '2.582 kg' },
    { name: '輪轂', value: '2.37 kg' },
    { name: 'A臂', value: '3.76 kg' },
    { name: '輪圈', value: '14.78 kg' },
    { name: '輪胎', value: '13.73 kg' },
    { name: '卡鉗與碟盤', value: '4.76 kg' },
    { name: '搖臂', value: '1.052 kg' },
    { name: '避震器', value: '11.04 kg' },
    { name: '轉向齒條', value: '3.24 kg' },
    { name: '轉向臂', value: '0.42 kg' },
    { name: '轉向柱', value: '2.53 kg' },
  ],
  powertrain: [
    { name: '馬達', value: '13.5 kg' },
    { name: '差速器', value: '3.2 kg' },
    { name: '馬達與差速器連接件', value: '8.4 kg' },
    { name: '控制器', value: '7.5 kg' },
    { name: '電池箱', value: '126.55 kg' },
    { name: '高壓電子盒', value: '1.213 kg' },
    { name: '散熱器', value: '4 kg' },
    { name: '傳動軸', value: '5 kg' },
  ],
};

const highlightData = [
  {
    id: 1,
    title: '扭轉剛性提升',
    description: '底盤扭轉剛性提升 37.8%，大幅增強過彎穩定性與響應速度。',
    position: { top: '25%', left: '65%' },
  },
  {
    id: 2,
    title: '軸距縮短',
    description: '軸距縮短至 1570mm，提升車輛在狹窄彎道中的靈活性與敏捷度。',
    position: { top: '45%', left: '75%' },
  },
  {
    id: 3,
    title: '一體式鼻翼',
    description: '與去年的兩件式設計相比，一體式鼻翼提供更大的下壓力與穩定性。',
    position: { top: '85%', left: '70%' },
  },
  {
    id: 4,
    title: '前拉桿懸吊',
    description: '採用前拉桿設計，有效減少懸吊系統所需空間，優化內部佈局。',
    position: { top: '80%', left: '35%' },
  },
  {
    id: 5,
    title: '底盤加寬',
    description: '加寬底盤中部，以更低地放置高壓組件，有效降低車輛重心。',
    position: { top: '65%', left: '15%' },
  },
  {
    id: 6,
    title: '輕量化馬達',
    description: '與去年相比，馬達與差速器總重減輕超過 50 公斤，顯著提升加速性能。',
    position: { top: '40%', left: '5%' },
  },
];

const HighlightsSection = () => {
  const [activeHighlight, setActiveHighlight] = useState(null);

  return (
    <div className="mb-16">
        <header className="text-center mb-12">
            <h2 className="text-4xl font-bold text-brand-gold">車輛設計亮點</h2>
            <p className="mt-2 text-gray-400">將滑鼠懸停在熱點上以查看詳細資訊</p>
        </header>
        <div className="relative w-full max-w-5xl mx-auto">
            <img src="/vr7.5-highlights.png" alt="Vehicle Highlights" className="w-full h-auto rounded-lg" />
            
            {highlightData.map((item) => (
                <div 
                    key={item.id}
                    className="absolute"
                    style={{ top: item.position.top, left: item.position.left }}
                    onMouseEnter={() => setActiveHighlight(item)}
                    onMouseLeave={() => setActiveHighlight(null)}
                >
                    <div className="w-6 h-6 rounded-full bg-brand-pink ring-4 ring-pink-500/50 cursor-pointer transform transition-transform hover:scale-125">
                        <motion.div 
                            className="w-full h-full rounded-full bg-brand-pink"
                            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </div>
                </div>
            ))}

            <AnimatePresence>
                {activeHighlight && (
                    <motion.div
                        className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <div className="bg-black/80 backdrop-blur-sm p-6 rounded-lg shadow-2xl max-w-sm text-center border border-brand-pink/50">
                            <h3 className="text-2xl font-bold text-brand-pink mb-2">{activeHighlight.title}</h3>
                            <p className="text-white">{activeHighlight.description}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    </div>
  )
}

const Section = ({ title, children }) => (
    <motion.div 
        className="bg-gray-800 p-6 rounded-lg shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
    >
        <h3 className="text-2xl font-bold text-brand-pink mb-4 border-b border-brand-pink/30 pb-2">{title}</h3>
        {children}
    </motion.div>
);

const VehicleSpecPage = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="container mx-auto px-6 py-16 md:py-24">

        <header className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white">VR7.5 車輛規格</h1>
          <p className="mt-4 text-lg text-gray-400 max-w-3xl mx-auto">
            深入了解構成我們賽車的每一個精密組件與性能指標。
          </p>
        </header>
        
        <HighlightsSection />

        {/* Performance Highlights Section */}
        <div className="bg-gray-800/50 p-8 rounded-xl shadow-2xl mb-16">
            <h2 className="text-4xl font-bold text-center mb-8 text-brand-gold">性能概覽</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <Section title="性能亮點">
                    <ul className="space-y-2">
                        {performanceHighlights.map(item => <li key={item.name} className="flex justify-between"><span>{item.name}:</span> <span className="font-mono font-bold">{item.value}</span></li>)}
                    </ul>
                </Section>
                <Section title="感測器套件">
                    <ul className="space-y-2 list-disc list-inside">
                        {sensorSuite.map(item => <li key={item}>{item}</li>)}
                    </ul>
                </Section>
                <Section title="動力總成">
                     <ul className="space-y-2">
                        {powertrain.map(item => <li key={item.name} className="flex justify-between"><span>{item.name}:</span> <span className="font-mono font-bold">{item.value}</span></li>)}
                    </ul>
                </Section>
                <Section title="底盤與結構">
                    <ul className="space-y-2 list-disc list-inside">
                        {chassisStructure.map(item => <li key={item}>{item}</li>)}
                    </ul>
                </Section>
            </div>
        </div>

        {/* Mass Breakdown Section */}
        <div>
            <header className="text-center mb-12">
                <h2 className="text-4xl font-bold text-brand-gold">重量詳細分解</h2>
                <p className="mt-2 text-2xl font-mono text-brand-pink bg-gray-800 inline-block px-4 py-1 rounded-md">無駕駛員總重: 382.36 kg</p>
            </header>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <Section title="底盤">
                    <ul className="space-y-1 text-sm">
                        {massBreakdown.chassis.map(item => <li key={item.name} className="flex justify-between"><span>{item.name}:</span> <span className="font-mono">{item.value}</span></li>)}
                    </ul>
                </Section>
                <Section title="空氣動力學">
                    <ul className="space-y-1 text-sm">
                        {massBreakdown.aero.map(item => <li key={item.name} className="flex justify-between"><span>{item.name}:</span> <span className="font-mono">{item.value}</span></li>)}
                    </ul>
                </Section>
                <Section title="懸吊系統">
                     <ul className="space-y-1 text-sm">
                        {massBreakdown.suspension.map(item => <li key={item.name} className="flex justify-between"><span>{item.name}:</span> <span className="font-mono">{item.value}</span></li>)}
                    </ul>
                </Section>
                <Section title="動力總成">
                    <ul className="space-y-1 text-sm">
                        {massBreakdown.powertrain.map(item => <li key={item.name} className="flex justify-between"><span>{item.name}:</span> <span className="font-mono">{item.value}</span></li>)}
                    </ul>
                </Section>
            </div>
        </div>

      </div>
    </div>
  );
};

export default VehicleSpecPage; 