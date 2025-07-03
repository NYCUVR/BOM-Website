import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { BeakerIcon, BoltIcon, ShieldCheckIcon, Cog8ToothIcon, PaperAirplaneIcon, ChevronDownIcon, ScaleIcon } from '@heroicons/react/24/outline';

// --- DATA DEFINITIONS ---

const performanceHighlights = [
  { name: '目標重量', value: '350 kg' },
  { name: '0-75公尺加速', value: '5.5s' },
  { name: '橫向抓地力', value: '2.5 g' },
];

const massBreakdown = {
  chassis: [
    { name: '車架', value: '50.8 kg' }, { name: '地板關閉件', value: '0.648 kg' },
    { name: '防火牆', value: '0.378 kg' }, { name: 'IA', value: '1.29 kg' },
    { name: 'AIP', value: '2.36 kg' }, { name: '頭部約束裝置', value: '0.42 kg' },
    { name: '踏板', value: '3.216 kg' }, { name: '座椅', value: '1.772 kg' },
    { name: '安全帶', value: '1.5 kg' }, { name: '方向盤', value: '0.245 kg' },
    { name: '快拆裝置', value: '0.58 kg' },
  ],
  aero: [
    { name: '鼻翼', value: '26 kg' }, { name: '前翼', value: '5.8 kg' },
    { name: '後翼', value: '9 kg' }, { name: '側板', value: '0.9 kg' },
  ],
  suspension: [
    { name: '直立件', value: '2.582 kg' }, { name: '輪轂', value: '2.37 kg' },
    { name: 'A臂', value: '3.76 kg' }, { name: '輪圈', value: '14.78 kg' },
    { name: '輪胎', value: '13.73 kg' }, { name: '卡鉗與碟盤', value: '4.76 kg' },
    { name: '搖臂', value: '1.052 kg' }, { name: '避震器', value: '11.04 kg' },
    { name: '轉向齒條', value: '3.24 kg' }, { name: '轉向臂', value: '0.42 kg' },
    { name: '轉向柱', value: '2.53 kg' },
  ],
  powertrain: [
    { name: '馬達', value: '13.5 kg' }, { name: '差速器', value: '3.2 kg' },
    { name: '馬達與差速器連接件', value: '8.4 kg' }, { name: '控制器', value: '7.5 kg' },
    { name: '電池箱', value: '126.55 kg' }, { name: '高壓電子盒', value: '1.213 kg' },
    { name: '散熱器', value: '4 kg' }, { name: '傳動軸', value: '5 kg' },
  ],
};

const sumWeights = (category) => category.reduce((sum, item) => sum + parseFloat(item.value), 0);
const chassisWeight = sumWeights(massBreakdown.chassis);
const aeroWeight = sumWeights(massBreakdown.aero);
const suspensionWeight = sumWeights(massBreakdown.suspension);
const powertrainWeight = sumWeights(massBreakdown.powertrain);
const totalWeight = chassisWeight + aeroWeight + suspensionWeight + powertrainWeight;

const highlightData = [
  { id: 1, position: { top: '25%', left: '65%' } },
  { id: 2, position: { top: '45%', left: '75%' } },
  { id: 3, position: { top: '85%', left: '70%' } },
  { id: 4, position: { top: '80%', left: '35%' } },
  { id: 5, position: { top: '65%', left: '15%' } },
  { id: 6, position: { top: '40%', left: '5%' } },
];

const techDetailsData = {
  suspension: {
    icon: BeakerIcon,
    titleKey: 'suspension.title',
    content: [
      { type: 'heading', textKey: 'suspension.content.0.text' },
      {
        type: 'split_layout',
        left: [
          { type: 'subheading', textKey: 'suspension.content.1.left.0.text' },
          { type: 'paragraph', textKey: 'suspension.content.1.left.1.text' },
          { type: 'target', textKey: 'suspension.content.1.left.2.text' },
          { type: 'subheading', textKey: 'suspension.content.1.left.3.text' },
          { type: 'paragraph', textKey: 'suspension.content.1.left.4.text' },
          { type: 'target', textKey: 'suspension.content.1.left.5.text' },
          { type: 'subheading', textKey: 'suspension.content.1.left.6.text' },
          { type: 'paragraph', textKey: 'suspension.content.1.left.7.text' },
          { type: 'target', textKey: 'suspension.content.1.left.8.text' },
        ],
        right: [
          { type: 'image', src: '/suspension-front.png', altKey: 'suspension.content.1.right.0.alt' },
          { type: 'image', src: '/suspension-rear.png', altKey: 'suspension.content.1.right.1.alt' },
        ],
      },
    ],
  },
  aero: {
    icon: PaperAirplaneIcon,
    titleKey: 'aero.title',
    content: [
        { type: 'heading', textKey: 'aero.content.0.text' },
        { type: 'key_value_grid', items: [
            { key: 'aero.content.1.items.0.key', valueKey: 'aero.content.1.items.0.value' },
            { key: 'aero.content.1.items.1.key', valueKey: 'aero.content.1.items.1.value' }
        ]},
        { type: 'heading', textKey: 'aero.content.2.text' },
        { type: 'split_layout', left: [
            { type: 'list', itemsKey: 'aero.content.3.left.0.items'}
        ], right: [{ type: 'image', src: '/aero-car-view.png', altKey: 'aero.content.3.right.0.alt' }]},
        { type: 'image_grid', images: ['/aero-components1.webp', '/aero-components2.webp', '/aero-components3.webp', '/aero-components4.webp']},
        { type: 'heading', textKey: 'aero.content.5.text' },
        { type: 'paragraph', textKey: 'aero.content.6.text' },
        { type: 'key_value_grid', items: [
            { key: 'aero.content.7.items.0.key', value: '-1.31' },
            { key: 'aero.content.7.items.1.key', value: '0.85' },
            { key: 'aero.content.7.items.2.key', value: '235 N' },
            { key: 'aero.content.7.items.3.key', value: '153 N' },
            { key: 'aero.content.7.items.4.key', value: '-1.54' },
        ]},
        { type: 'image_grid', images: ['/cfdsim1.png', '/cfdsim2.png', '/cfdsim3.png']},
    ],
  },
  power: {
    icon: BoltIcon,
    titleKey: 'power.title',
    content: [
      { type: 'heading', textKey: 'power.content.0.text' },
      { type: 'split_layout', reverse: true, left: [
        { type: 'list', itemsKey: 'power.content.1.left.0.items' }
      ], right: [{ type: 'image', src: '/power-conversion-diagram.webp', altKey: 'power.content.1.right.0.alt' }]}
    ]
  },
  motor: {
    icon: Cog8ToothIcon,
    titleKey: 'motor.title',
    content: [
      { type: 'heading', textKey: 'motor.content.0.text' },
      { type: 'split_layout', left: [
        { type: 'subheading', textKey: 'motor.content.1.left.0.text' },
        { type: 'list', itemsKey: 'motor.content.1.left.1.items'},
        { type: 'subheading', textKey: 'motor.content.1.left.2.text' },
        { type: 'list', itemsKey: 'motor.content.1.left.3.items'},
        { type: 'subheading', textKey: 'motor.content.1.left.4.text' },
        { type: 'list', itemsKey: 'motor.content.1.left.5.items'}
      ], right: [{ type: 'image', src: '/transmission-diagram.webp', altKey: 'motor.content.1.right.0.alt' }]}
    ],
  },
  safety: {
    icon: ShieldCheckIcon,
    titleKey: 'safety.title',
    content: [
      { type: 'heading', textKey: 'safety.content.0.text' },
      { type: 'split_layout', reverse: true, left: [
        { type: 'list', itemsKey: 'safety.content.1.left.0.items' }
      ], right: [{ type: 'image', src: '/safety-system-diagram.png', altKey: 'safety.content.1.right.0.alt' }]}
    ]
  },
};

// --- GENERIC COMPONENTS ---

const Section = ({ title, children }) => (
    <motion.div 
        className="mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
    >
        <header className="text-center mb-12">
            <h2 className="text-4xl font-bold text-brand-gold">{title}</h2>
        </header>
        {children}
    </motion.div>
);

// --- SPECIFIC SECTIONS ---

const WeightSection = () => {
    const { t } = useTranslation('vehicleSpec');

    const weightStats = [
        { key: 'totalWeight', value: totalWeight.toFixed(1) },
        { key: 'chassisAeroWeight', value: (chassisWeight + aeroWeight).toFixed(1) },
        { key: 'powerSuspensionWeight', value: (suspensionWeight + powertrainWeight).toFixed(1) },
    ];

    return (
        <Section title={t('weightSection.title')}>
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
                        <h4 className="text-xl font-semibold text-white mb-1">{t(`weightSection.stats.${stat.key}.name`)}</h4>
                        <p className="text-5xl font-bold text-brand-pink tracking-tighter">
                            {stat.value}
                            <span className="text-2xl font-medium text-gray-400 ml-1">{t(`weightSection.stats.${stat.key}.unit`)}</span>
                        </p>
                        <p className="text-gray-400 mt-2 text-sm">{t(`weightSection.stats.${stat.key}.description`)}</p>
                    </motion.div>
                ))}
            </div>
        </Section>
    );
};

const HighlightsSection = () => {
  const { t } = useTranslation('vehicleSpec');
  const [activeId, setActiveId] = useState(null);

  const handleHotspotClick = (id) => {
    setActiveId(prevId => prevId === id ? null : id);
  }

  return (
    <div className="mb-16">
        <header className="text-center mb-12">
            <h2 className="text-4xl font-bold text-brand-gold">{t('highlightsSection.title')}</h2>
            <p className="mt-2 text-gray-400 md:hidden">{t('highlightsSection.mobileHint')}</p>
            <p className="mt-2 text-gray-400 hidden md:block">{t('highlightsSection.desktopHint')}</p>
        </header>

        <div className="relative w-full max-w-5xl mx-auto hidden md:block">
            <img src="/vr7.5-highlights.webp" alt={t('highlightsSection.title')} className="w-full h-auto rounded-lg" />
            
            {highlightData.map((item) => (
                <div 
                    key={item.id}
                    className="absolute"
                    style={{ top: item.position.top, left: item.position.left, transform: 'translate(-50%, -50%)' }}
                    onMouseEnter={() => setActiveId(item.id)}
                    onMouseLeave={() => setActiveId(null)}
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
                {activeId && (() => {
                    const activeItem = highlightData.find(i => i.id === activeId);
                    if (!activeItem) return null;

                    const topPercentage = parseInt(activeItem.position.top, 10);
                    const transformStyle = topPercentage > 50 
                        ? 'translate(-50%, -120%)'
                        : 'translate(-50%, 20%)';

                    return (
                        <motion.div
                            className="absolute pointer-events-none z-10"
                            style={{ top: activeItem.position.top, left: activeItem.position.left, transform: transformStyle }}
                            initial={{ opacity: 0, y: topPercentage > 50 ? 10 : -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: topPercentage > 50 ? 10 : -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className="bg-black/80 backdrop-blur-sm p-6 rounded-lg shadow-2xl max-w-xs text-center border border-brand-pink/50">
                                <h3 className="text-xl font-bold text-brand-pink mb-2">{t(`highlightsSection.items.${activeId}.title`)}</h3>
                                <p className="text-white text-sm">{t(`highlightsSection.items.${activeId}.description`)}</p>
                            </div>
                        </motion.div>
                    )
                })()}
            </AnimatePresence>
        </div>

        <div className="w-full max-w-2xl mx-auto md:hidden space-y-4">
          {highlightData.map(item => (
            <div key={item.id} className="bg-gray-800 rounded-lg overflow-hidden">
              <button
                onClick={() => handleHotspotClick(item.id)}
                className="w-full text-left p-4 flex justify-between items-center"
              >
                <span className="font-bold text-white">{t(`highlightsSection.items.${item.id}.title`)}</span>
                <motion.div animate={{ rotate: activeId === item.id ? 180 : 0 }} transition={{ duration: 0.3 }}>
                  <ChevronDownIcon className="w-6 h-6 text-gray-400" />
                </motion.div>
              </button>
              <AnimatePresence>
                {activeId === item.id && (
                  <motion.div
                    initial="collapsed" animate="open" exit="collapsed"
                    variants={{ open: { opacity: 1, height: 'auto', y: 0 }, collapsed: { opacity: 0, height: 0, y: -10 } }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className="p-4 pt-0 text-gray-300">
                      <p>{t(`highlightsSection.items.${item.id}.description`)}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
    </div>
  );
};

const TechDetailsSection = () => {
  const { t } = useTranslation('vehicleSpec');
  const [activeTab, setActiveTab] = useState(Object.keys(techDetailsData)[0]);
  const activeData = techDetailsData[activeTab];
  const baseKey = 'techDetailsSection.categories';

  const renderContent = (item, index) => {
      switch (item.type) {
          case 'heading':
              return <h3 key={index} className="text-3xl font-bold text-brand-gold mt-8 mb-6">{t(`${baseKey}.${item.textKey}`)}</h3>;
          case 'subheading':
              return <h4 key={index} className="text-xl font-bold text-brand-pink mt-4 mb-2">{t(`${baseKey}.${item.textKey}`)}</h4>
          case 'paragraph':
              return <p key={index} className="text-gray-300 mb-4">{t(`${baseKey}.${item.textKey}`)}</p>
          case 'target':
              return <p key={index} className="text-brand-gold bg-gray-800/50 inline-block px-3 py-1 rounded-md mb-4">{t(`${baseKey}.${item.textKey}`)}</p>
          case 'list':
              const listItems = t(`${baseKey}.${item.itemsKey}`, { returnObjects: true });
              return <ul key={index} className="space-y-3 list-disc list-inside text-gray-300">{Array.isArray(listItems) && listItems.map((li, i) => <li key={i}>{li}</li>)}</ul>
          case 'image':
              return <img key={index} src={item.src} alt={t(`${baseKey}.${item.altKey}`)} className="w-full h-auto rounded-lg shadow-lg mb-4" />
          case 'image_grid':
              return <div key={index} className="grid grid-cols-2 gap-4 my-4">{item.images.map((src, i) => <img key={i} src={src} className="rounded-lg shadow-md" alt={`${t(`${baseKey}.${activeData.titleKey}`)} detail ${i + 1}`} />)}</div>
          case 'key_value_grid':
              const gridItems = item.items.map(kv => ({
                  key: t(`${baseKey}.${kv.key}`),
                  value: kv.valueKey ? t(`${baseKey}.${kv.valueKey}`) : kv.value
              }));
              return <div key={index} className="grid md:grid-cols-2 gap-6 my-4">{gridItems.map(kv => <div key={kv.key} className="bg-gray-800 p-4 rounded-lg"><p className="font-bold text-brand-pink">{kv.key}</p><p className="text-gray-300">{kv.value}</p></div>)}</div>
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
      <div className="md:hidden mb-6">
        <div className="flex space-x-2 overflow-x-auto pb-4 -mx-4 px-4">
          {Object.entries(techDetailsData).map(([key, { icon: Icon, titleKey }]) => (
            <button key={key} onClick={() => setActiveTab(key)} className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 flex items-center gap-2 ${activeTab === key ? 'bg-brand-pink text-white' : 'bg-gray-700 text-gray-200'}`}>
              <Icon className="h-5 w-5"/>
              <span>{t(`${baseKey}.${titleKey}`)}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="hidden md:block md:w-1/4 lg:w-1/5">
          <ul className="space-y-2">
            {Object.entries(techDetailsData).map(([key, { icon: Icon, titleKey }]) => (
              <li key={key}>
                <button onClick={() => setActiveTab(key)} className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 flex items-center gap-4 ${activeTab === key ? 'bg-brand-pink text-white font-bold' : 'bg-gray-700 hover:bg-gray-600 text-gray-200'}`}>
                  <Icon className="h-6 w-6"/>
                  {t(`${baseKey}.${titleKey}`)}
                </button>
              </li>
            ))}
          </ul>
        </aside>
        <main className="w-full">
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

// --- MAIN PAGE COMPONENT ---

const VehicleSpecPage = () => {
  const { t } = useTranslation('vehicleSpec');

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <main className="py-12 md:py-20 px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-16 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-tight">
            {t('title')}
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-400">
            {t('subtitle')}
          </p>
        </header>
        
        <WeightSection />
        <HighlightsSection />
        <TechDetailsSection />
      </main>
    </div>
  );
};

export default VehicleSpecPage; 