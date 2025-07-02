import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BeakerIcon, BoltIcon, ShieldCheckIcon, Cog8ToothIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';

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
            <img src="/vr7.5-highlights.webp" alt="Vehicle Highlights" className="w-full h-auto rounded-lg" />
            
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

const techDetailsData = {
  suspension: {
    icon: BeakerIcon, // Using Beaker for 'design/experiment'
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
    const activeData = techDetailsData[activeTab];

    const renderContent = (item, index) => {
        switch (item.type) {
            case 'heading':
                return <h3 key={index} className="text-3xl font-bold text-brand-gold mt-8 mb-6">{item.text}</h3>;
            case 'subheading':
                return <h4 key={index} className="text-xl font-bold text-brand-pink mt-4 mb-2">{item.text}</h4>
            case 'paragraph':
                return <p key={index} className="text-gray-300 mb-4">{item.text}</p>
            case 'target':
                return <p key={index} className="text-brand-gold bg-gray-800/50 inline-block px-3 py-1 rounded-md mb-4">{item.text}</p>
            case 'list':
                return <ul key={index} className="space-y-3 list-disc list-inside text-gray-300">{item.items.map((li, i) => <li key={i}>{li}</li>)}</ul>
            case 'image':
                return <img key={index} src={item.src} alt={item.alt} className="w-full h-auto rounded-lg shadow-lg mb-4" />
            case 'image_grid':
                return <div key={index} className="grid grid-cols-2 gap-4 my-4">{item.images.map((src, i) => <img key={i} src={src} className="rounded-lg shadow-md" alt={`detail-${i}`} />)}</div>
            case 'key_value_grid':
                return <div key={index} className="grid md:grid-cols-2 gap-6 my-4">{item.items.map(kv => <div key={kv.key} className="bg-gray-800 p-4 rounded-lg"><p className="font-bold text-brand-pink">{kv.key}</p><p className="text-gray-300">{kv.value}</p></div>)}</div>
            case 'split_layout':
                const leftContent = <div className="flex-1 space-y-4">{item.left.map(renderContent)}</div>
                const rightContent = <div className="flex-1 space-y-4">{item.right.map(renderContent)}</div>
                return (
                    <div key={index} className={`flex flex-col md:flex-row gap-8 ${item.reverse ? 'md:flex-row-reverse' : ''}`}>
                        {leftContent}
                        {rightContent}
                    </div>
                )
            default:
                return null;
        }
    }

    return (
        <div className="bg-gray-800/50 p-4 sm:p-8 rounded-xl shadow-2xl">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar */}
                <aside className="md:w-1/4 lg:w-1/5">
                    <ul className="space-y-2">
                        {Object.entries(techDetailsData).map(([key, { icon: Icon, title }]) => (
                            <li key={key}>
                                <button
                                    onClick={() => setActiveTab(key)}
                                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 flex items-center gap-4 ${activeTab === key ? 'bg-brand-pink text-white font-bold' : 'bg-gray-700 hover:bg-gray-600 text-gray-200'}`}
                                >
                                    <Icon className="h-6 w-6"/>
                                    {title}
                                </button>
                            </li>
                        ))}
                    </ul>
                </aside>

                {/* Content */}
                <main className="md:w-3/4 lg:w-4/5">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            {activeData.content.map(renderContent)}
                        </motion.div>
                    </AnimatePresence>
                </main>
            </div>
        </div>
    )
}

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

        <div className="my-16 h-1 bg-gray-800 rounded-full"></div>

        <TechDetailsSection />

        <div className="my-16 h-1 bg-gray-800 rounded-full"></div>

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