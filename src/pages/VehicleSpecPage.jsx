import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BeakerIcon, BoltIcon, ShieldCheckIcon, Cog8ToothIcon, PaperAirplaneIcon, ChevronDownIcon, ScaleIcon } from '@heroicons/react/24/outline';

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

// --- Simplified Weight Section ---

// Helper function to sum weights in a category
const sumWeights = (category) => 
  category.reduce((acc, item) => acc + item.value, 0);

// Original detailed data, now used for calculation instead of direct display
const massBreakdown = {
  chassis: [
    { name: '車架', value: 50.8 },
    { name: '地板關閉件', value: 0.648 },
    { name: '防火牆', value: 0.378 },
    { name: 'IA', value: 1.29 },
    { name: 'AIP', value: 2.36 },
    { name: '頭部約束裝置', value: 0.42 },
    { name: '踏板', value: 3.216 },
    { name: '座椅', value: 1.772 },
    { name: '安全帶', value: 1.5 },
    { name: '方向盤', value: 0.245 },
    { name: '快拆裝置', value: 0.58 },
  ],
  aero: [
    { name: '鼻翼', value: 26 },
    { name: '前翼', value: 5.8 },
    { name: '後翼', value: 9 },
    { name: '側板', value: 0.9 },
  ],
  suspension: [
    { name: '直立件', value: 2.582 },
    { name: '輪轂', value: 2.37 },
    { name: 'A臂', value: 3.76 },
    { name: '輪圈', value: 14.78 },
    { name: '輪胎', value: 13.73 },
    { name: '卡鉗與碟盤', value: 4.76 },
    { name: '搖臂', value: 1.052 },
    { name: '避震器', value: 11.04 },
    { name: '轉向齒條', value: 3.24 },
    { name: '轉向臂', value: 0.42 },
    { name: '轉向柱', value: 2.53 },
  ],
  powertrain: [
    { name: '馬達', value: 13.5 },
    { name: '差速器', value: 3.2 },
    { name: '馬達與差速器連接件', value: 8.4 },
    { name: '控制器', value: 7.5 },
    { name: '電池箱', value: 126.55 },
    { name: '高壓電子盒', value: 1.213 },
    { name: '散熱器', value: 4 },
    { name: '傳動軸', value: 5 },
  ],
};

const chassisWeight = sumWeights(massBreakdown.chassis);
const aeroWeight = sumWeights(massBreakdown.aero);
const suspensionWeight = sumWeights(massBreakdown.suspension);
const powertrainWeight = sumWeights(massBreakdown.powertrain);
const totalWeight = chassisWeight + aeroWeight + suspensionWeight + powertrainWeight;

const weightStats = [
    { 
        name: '總整備重量', 
        value: totalWeight.toFixed(1),
        unit: 'kg',
        description: '車輛在賽道上準備就緒時的總重量，包含所有液體。'
    },
    { 
        name: '底盤與空力總重', 
        value: (chassisWeight + aeroWeight).toFixed(1),
        unit: 'kg',
        description: '結構核心與空氣動力學套件的重量，輕量化的關鍵。'
    },
    { 
        name: '動力與傳動總重', 
        value: (suspensionWeight + powertrainWeight).toFixed(1),
        unit: 'kg',
        description: '包含馬達、電池、懸吊等，直接影響性能與操控。'
    },
]

const WeightSection = () => (
    <Section title="關鍵重量指標">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            {weightStats.map((stat, index) => (
                <motion.div 
                    key={index}
                    className="bg-gray-700/50 p-6 rounded-xl border border-gray-600 flex flex-col items-center justify-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                    <ScaleIcon className="w-10 h-10 text-brand-gold mb-3" />
                    <h4 className="text-xl font-semibold text-white mb-1">{stat.name}</h4>
                    <p className="text-5xl font-bold text-brand-pink tracking-tighter">
                        {stat.value}
                        <span className="text-2xl font-medium text-gray-400 ml-1">{stat.unit}</span>
                    </p>
                    <p className="text-gray-400 mt-2 text-sm">{stat.description}</p>
                </motion.div>
            ))}
        </div>
    </Section>
);

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

  const handleHotspotClick = (item) => {
    // On mobile, this will toggle the highlight.
    // On desktop, subsequent clicks on the same item won't re-trigger mouseEnter.
    setActiveHighlight(item.id === activeHighlight?.id ? null : item);
  }

  return (
    <div className="mb-16">
        <header className="text-center mb-12">
            <h2 className="text-4xl font-bold text-brand-gold">車輛設計亮點</h2>
            <p className="mt-2 text-gray-400 md:hidden">點擊熱點查看詳細資訊</p>
            <p className="mt-2 text-gray-400 hidden md:block">將滑鼠懸停在熱點上以查看詳細資訊</p>
        </header>

        {/* Desktop View: Interactive Image */}
        <div className="relative w-full max-w-5xl mx-auto hidden md:block">
            <img src="/vr7.5-highlights.webp" alt="Vehicle Highlights" className="w-full h-auto rounded-lg" />
            
            {highlightData.map((item) => (
                <div 
                    key={item.id}
                    className="absolute"
                    style={{ top: item.position.top, left: item.position.left, transform: 'translate(-50%, -50%)' }}
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
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center pointer-events-none p-4"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                    >
                        <div className="bg-black/80 backdrop-blur-sm p-6 rounded-lg shadow-2xl max-w-sm text-center border border-brand-pink/50">
                            <h3 className="text-2xl font-bold text-brand-pink mb-2">{activeHighlight.title}</h3>
                            <p className="text-white">{activeHighlight.description}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>

        {/* Mobile View: Accordion List */}
        <div className="w-full max-w-2xl mx-auto md:hidden space-y-4">
          {highlightData.map(item => (
            <div key={item.id} className="bg-gray-800 rounded-lg overflow-hidden">
              <button
                onClick={() => handleHotspotClick(item)}
                className="w-full text-left p-4 flex justify-between items-center"
              >
                <span className="font-bold text-white">{item.title}</span>
                <motion.div
                  animate={{ rotate: activeHighlight?.id === item.id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDownIcon className="h-6 w-6 text-brand-pink" />
                </motion.div>
              </button>
              <AnimatePresence>
                {activeHighlight?.id === item.id && (
                  <motion.div
                    initial="collapsed"
                    animate="open"
                    exit="collapsed"
                    variants={{
                      open: { opacity: 1, height: 'auto' },
                      collapsed: { opacity: 0, height: 0 }
                    }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="px-4 pb-4"
                  >
                    <p className="text-gray-300">{item.description}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
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

const techDetailsData = {
  suspension: {
    icon: BeakerIcon,
    title: '懸吊與輪胎',
    content: [
      {
        type: 'heading',
        text: '設計目標',
      },
      {
        type: 'split_layout',
        left: [
          { type: 'subheading', text: '降低非簧載質量' },
          { type: 'paragraph', text: '非簧載質量會嚴重增加轉向的偏航慣性並延長對路面顛簸的反應時間。' },
          { type: 'target', text: '目標：每輪低於 10 公斤重。' },
          { type: 'subheading', text: '確保結構強度' },
          { type: 'paragraph', text: '透過有限元素分析(FEA)驗證我們的設計，包含馮·米塞斯應力、位移、疲勞與頻率分析。' },
          { type: 'target', text: '目標：所有組件安全係數 > 1.6。' },
          { type: 'subheading', text: '提升適應性' },
          { type: 'paragraph', text: '為了在任何情況下都達到最佳性能，賽車和車手都必須能夠適應不同條件。' },
          { type: 'target', text: '目標：可調節的幾何形狀、低預算與可替換性。' },
        ],
        right: [
          { type: 'image', src: '/suspension-front.png', alt: '前懸吊系統' },
          { type: 'image', src: '/suspension-rear.png', alt: '後懸吊系統' },
        ],
      },
    ],
  },
  aero: {
    icon: PaperAirplaneIcon,
    title: '空氣動力學',
    content: [
        { type: 'heading', text: '設計目標' },
        { type: 'key_value_grid', items: [
            { key: '提升下壓力', value: '下壓力可幫助車輛在過彎時提高穩定性，但也會產生不利的阻力。目標是在 15m/s 速度下，下壓力達到 350N，阻力不超過 120N。' },
            { key: '減輕重量', value: '減重是我們今年的主要目標。它不僅幫助車輛加速，還能有效減少慣性矩。目標總重 < 25 公斤，材料選用碳纖維和輕量樹脂。' }
        ]},
        { type: 'heading', text: '空力套件特點 (翼型: S1223)' },
        { type: 'split_layout', left: [
            { type: 'list', items: [
                "使用格尼襟翼增加尾翼下壓力。",
                "降低鼻錐尖端以減少升力產生。",
                "使用彎曲金屬板作為支架，在降低重量和成本的同時，增加對抗不同方向應力的強度。",
                "使用碳纖維三明治板作為前翼的內部結構。",
            ]}
        ], right: [{ type: 'image', src: '/aero-car-view.png', alt: '空力套件整車視圖' }]},
        { type: 'image_grid', images: ['/aero-components1.webp', '/aero-components2.webp', '/aero-components3.webp', '/aero-components4.webp']},
        { type: 'heading', text: '計算流體力學 (CFD) 模擬' },
        { type: 'paragraph', text: '我們使用 ANSYS Fluent 進行模擬，邊界條件：入口速度 15m/s，四輪旋轉，地面以 15m/s 速度向負X軸移動。' },
        { type: 'key_value_grid', items: [
            { key: 'Cl (升力係數)', value: '-1.31' },
            { key: 'Cd (阻力係數)', value: '0.85' },
            { key: 'Downforce (下壓力)', value: '235 N' },
            { key: 'Drag force (阻力)', value: '153 N' },
            { key: 'Cl/Cd (升阻比)', value: '-1.54' },
        ]},
        { type: 'image_grid', images: ['/cfdsim1.png', '/cfdsim2.png', '/cfdsim3.png']},
    ],
  },
  power: {
    icon: BoltIcon,
    title: '電力系統',
    content: [
      { type: 'heading', text: '電力轉換與分配' },
      { type: 'split_layout', reverse: true, left: [
        { type: 'list', items: [
            "控制器: 使用 Cascadia (Rinehart) PM100DZ 作為馬達控制器，電壓範圍寬，並與解角器和編碼器相容。",
            "高壓斷電裝置 (HVD): 可從車輛兩側操作，增加事故發生時需要立即斷電的安全性。",
            "整合式安裝: 馬達與差速器的一體式安裝，增強了機械強度和穩定性。",
            "高壓線路優化: 將蓄電池容器的輸出端放置在分線盒附近，以縮短高壓電纜。",
            "便捷維護: 將蓄電池容器從底盤底部拆卸，使組裝和拆卸更加直接。"
        ]}
      ], right: [{ type: 'image', src: '/power-conversion-diagram.webp', alt: '電力系統轉換圖' }]}
    ]
  },
  motor: {
    icon: Cog8ToothIcon,
    title: '馬達與傳動',
    content: [
      { type: 'heading', text: '系統規格' },
      { type: 'split_layout', left: [
        { type: 'subheading', text: '馬達 (EMRAX 228 MV)' },
        { type: 'list', items: [
            "峰值扭矩: 230Nm",
            "峰值轉速: 5400 RPM",
            "總重: 12.9 kg",
        ]},
        { type: 'subheading', text: '傳動系統' },
        { type: 'list', items: [
            "傳動方式: 使用鏈輪和鏈條傳輸動力。",
            "扭矩放大: 透過適當的齒輪比增強扭矩，以獲得更好的加速度。",
            "高效長壽: 更高的傳動效率，更長的使用壽命。",
            "最終齒比: 3",
            "最終扭矩: 720Nm",
        ]},
        { type: 'subheading', text: '設計細節' },
        { type: 'list', items: [
            "在馬達安裝點放置襯套，以防止振動對馬達造成損壞。",
            "使用螺母調整差速器的位置，以便輕鬆調整鏈條的張力。",
        ]}
      ], right: [{ type: 'image', src: '/transmission-diagram.webp', alt: '馬達與傳動系統' }]}
    ],
  },
  safety: {
    icon: ShieldCheckIcon,
    title: '安全系統',
    content: [
      { type: 'heading', text: '設計目標: 確保駕駛安全，並能快速切斷電源' },
      { type: 'split_layout', reverse: true, left: [
        { type: 'list', items: [
            "BMS (電池管理系統): 監控電池單元電壓和溫度，並在檢測到異常狀態時打開關斷電路。",
            "主開關: 可以切斷所有到地線低壓系統或牽引系統的電源。",
            "慣性開關: Sensata 可重置碰撞感測器，可在車輛受到撞擊時打開關斷電路並切斷電源。",
            "緊急斷電按鈕: 位於主防滾架兩側和儀表板上，可打開關斷電路並切斷所有電源。",
            "BOTS (煞車踏板超程開關): 如果煞車踏板行程超過正常範圍，則打開關斷電路。",
            "BSPD (煞車系統合理性檢查裝置): 檢查同時煞車和高功率輸出的情況。"
        ]}
      ], right: [{ type: 'image', src: '/safety-system-diagram.png', alt: '安全系統圖' }]}
    ]
  },
};

const TechDetailsSection = () => {
  const [activeTab, setActiveTab] = useState(Object.keys(techDetailsData)[0]);

  const renderContent = (item, index) => {
    if (!item) return null;

    switch(item.type) {
        case 'heading':
            return <h4 key={index} className="text-xl font-bold text-brand-gold mt-6 mb-2">{item.text}</h4>;
        case 'subheading':
            return <h5 key={index} className="text-lg font-semibold text-white mt-4 mb-1">{item.text}</h5>;
        case 'paragraph':
            return <p key={index} className="text-gray-300 mb-2">{item.text}</p>;
        case 'target':
            return <p key={index} className="text-brand-pink/90 font-semibold mb-2">» {item.text}</p>;
        case 'list':
            return (
                <ul key={index} className="list-disc list-inside space-y-1 text-gray-300">
                    {item.items.map((li, i) => <li key={i}>{li}</li>)}
                </ul>
            );
        case 'split_layout':
            return (
                <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
                    <div className="space-y-2">{item.left.map(renderContent)}</div>
                    <div className="space-y-4">{item.right.map(renderContent)}</div>
                </div>
            );
        case 'image':
            return <img key={index} src={item.src} alt={item.alt} className="rounded-lg shadow-md w-full" />;
        case 'image_grid':
            return <div key={index} className="grid grid-cols-2 gap-4 my-4">{item.images.map((src, i) => <img key={i} src={src} className="rounded-lg shadow-md" alt={`detail-${i}`} />)}</div>
        case 'key_value_grid':
            return <div key={index} className="grid md:grid-cols-2 gap-6 my-4">{item.items.map(kv => <div key={kv.key} className="bg-gray-800 p-4 rounded-lg"><p className="font-bold text-brand-pink">{kv.key}</p><p className="text-gray-300">{kv.value}</p></div>)}</div>
        default:
            return null;
    }
  };

  return (
    <Section title="技術細節深入探討">
        <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/4">
                <nav className="sticky top-28">
                    <ul className="space-y-2">
                        {Object.keys(techDetailsData).map(key => {
                            const Icon = techDetailsData[key].icon;
                            return (
                                <li key={key}>
                                    <button
                                        onClick={() => setActiveTab(key)}
                                        className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 flex items-center gap-3 ${
                                            activeTab === key
                                                ? 'bg-brand-pink text-white font-bold shadow-lg'
                                                : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                                        }`}
                                    >
                                        <Icon className="w-6 h-6 flex-shrink-0" />
                                        <span>{techDetailsData[key].title}</span>
                                    </button>
                                </li>
                            )
                        })}
                    </ul>
                </nav>
            </div>
            <div className="w-full md:w-3/4">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {techDetailsData[activeTab].content.map(renderContent)}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    </Section>
  );
};

const VehicleSpecPage = () => {
  return (
    <div className="bg-gray-900 text-white">
        <div className="container mx-auto px-6 py-16">
            <header className="text-center mb-16">
                <h1 className="text-5xl md:text-6xl font-extrabold text-white">VR7.5 技術規格</h1>
                <p className="mt-4 text-lg text-gray-400 max-w-3xl mx-auto">
                    深入了解驅動我們最新賽車的工程細節與設計理念。
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 text-center">
                {performanceHighlights.map((item, index) => (
                    <motion.div 
                        key={index} 
                        className="bg-gray-800 p-6 rounded-lg"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <p className="text-gray-400 text-sm">{item.name}</p>
                        <p className="text-3xl font-bold text-brand-pink">{item.value}</p>
                    </motion.div>
                ))}
            </div>

            <HighlightsSection />
            
            <div className="space-y-12 mt-16">
                <WeightSection />
                <TechDetailsSection />
            </div>

        </div>
    </div>
  );
};

export default VehicleSpecPage; 