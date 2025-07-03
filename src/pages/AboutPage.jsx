import React from 'react';
import { motion } from 'framer-motion';
import TeamCompositionChart, { chartData as teamChartData } from '../components/TeamCompositionChart';
import TimelineSection from '../components/TimelineSection';
import {
    BoltIcon,
    CpuChipIcon,
    CurrencyDollarIcon,
    CloudArrowUpIcon,
    PuzzlePieceIcon,
    ClockIcon,
    ShieldCheckIcon,
    UserGroupIcon,
} from '@heroicons/react/24/outline';

// SDG 內容
const sdgData = [
  {
    id: 4,
    title: '優質教育',
    description: '我們與頂尖學術機構深度合作，建立產學一體的工程人才培育計畫。透過高階賽車的研發專案，我們為產業輸送具備尖端實務經驗與創新思維的專業人才。',
    color: 'bg-red-500',
  },
  {
    id: 9,
    title: '工業、創新與基礎設施',
    description: 'VR7.5本身就是創新的結晶。從輕量化複合材料到AI數據分析，我們不斷挑戰技術極限，為未來永續的交通基礎設施貢獻心力。',
    color: 'bg-orange-500',
  },
  {
    id: 12,
    title: '負責任的消費與生產',
    description: '我們在設計階段即融入循環經濟理念，優先選用可回收材料、減少浪費，並探索零件的再生價值，打造一輛「從搖籃到搖籃」的賽車。',
    color: 'bg-yellow-500',
  },
];

const AboutPage = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
      },
    }),
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="container mx-auto px-6 py-16 md:py-24">
        
        <header className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-tight">關於我們</h1>
          <p className="text-xl text-gray-400 mt-4">從賽道到未來，我們的熱情與承諾</p>
          <div className="mt-6 h-1 w-32 bg-brand-pink mx-auto"></div>
        </header>

        {/* SDGs Section */}
        <section className="mb-24">
          <h2 className="text-4xl font-bold text-center mb-12">我們的永續承諾</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sdgData.map((sdg, i) => (
              <motion.div
                key={sdg.id}
                className="bg-gray-800 rounded-lg p-8 flex flex-col items-center text-center border-b-4"
                style={{ borderColor: sdg.color.replace('bg-', 'var(--color-') }} // A bit of a hack for dynamic border color
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
              >
                 <div className={`w-20 h-20 ${sdg.color} rounded-md flex items-center justify-center mb-6`}>
                    <span className="text-white text-4xl font-extrabold">{sdg.id}</span>
                </div>
                <h3 className="text-2xl font-bold text-brand-pink mb-4">{sdg.title}</h3>
                <p className="text-gray-300">{sdg.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Timeline Section */}
        <TimelineSection />

        {/* Vision & Features Section */}
        <section className="my-24">
            <h2 className="text-4xl font-bold text-center mb-12">團隊願景與特色</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                
                {/* Our Services */}
                <motion.div 
                    className="bg-gray-800 p-8 rounded-lg"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h3 className="text-3xl font-bold italic text-brand-pink mb-6 border-b-2 border-brand-pink/30 pb-3">我們的服務</h3>
                    <ul className="space-y-4 text-lg text-gray-200">
                        <li className="font-semibold flex items-start">
                            <BoltIcon className="h-6 w-6 mr-4 mt-1 text-brand-pink flex-shrink-0" />
                            <span>電動賽車製造</span>
                        </li>
                        <li className="font-semibold flex items-start">
                            <CpuChipIcon className="h-6 w-6 mr-4 mt-1 text-brand-pink flex-shrink-0" />
                            <span>賽車數據分析 (含進階 AI 訂閱)</span>
                        </li>
                    </ul>
                </motion.div>

                {/* Why We Stand Out */}
                <motion.div 
                    className="bg-gray-800 p-8 rounded-lg"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    <h3 className="text-3xl font-bold italic text-brand-pink mb-6 border-b-2 border-brand-pink/30 pb-3">我們的特色</h3>
                    <ul className="space-y-4 text-lg text-gray-200">
                        <li className="font-semibold flex items-start">
                           <CurrencyDollarIcon className="h-6 w-6 mr-4 mt-1 text-brand-pink flex-shrink-0" />
                            <span>價格實惠的入門級賽車</span>
                        </li>
                        <li className="font-semibold flex items-start">
                            <CloudArrowUpIcon className="h-6 w-6 mr-4 mt-1 text-brand-pink flex-shrink-0" />
                            <span>雲端 AI 調校</span>
                        </li>
                        <li className="font-semibold flex items-start">
                            <PuzzlePieceIcon className="h-6 w-6 mr-4 mt-1 text-brand-pink flex-shrink-0" />
                            <span>模組化、可替換的組件</span>
                        </li>
                        <li className="font-semibold flex items-start">
                           <UserGroupIcon className="h-6 w-6 mr-4 mt-1 text-brand-pink flex-shrink-0" />
                            <span>合作夥伴賽道網絡</span>
                        </li>
                        <li className="font-semibold flex items-start">
                            <ShieldCheckIcon className="h-6 w-6 mr-4 mt-1 text-brand-pink flex-shrink-0" />
                            <span>首年全車安心保固</span>
                        </li>
                    </ul>
                </motion.div>
            </div>
        </section>

        {/* Team Composition Section */}
        <section className="mt-24">
            <h2 className="text-4xl font-bold text-center mb-12">團隊組成</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 items-center bg-gray-800 p-8 rounded-lg">
                <div className="lg:col-span-2 flex justify-center relative z-10">
                    <TeamCompositionChart />
                </div>
                <div className="lg:col-span-1 space-y-4">
                    <h3 className="text-2xl font-bold text-brand-pink mb-4 text-center lg:text-left">核心人力資源</h3>
                    {teamChartData.labels.map((label, index) => (
                        <div key={label} className="flex items-center p-3 bg-gray-900 rounded-lg">
                            <div style={{ backgroundColor: teamChartData.datasets[0].backgroundColor[index] }} className="w-5 h-5 rounded-sm mr-4 flex-shrink-0"></div>
                            <div className="flex justify-between w-full items-center">
                                <span className="text-gray-200 font-medium">{label}</span>
                                <span className="font-bold text-white text-lg">{teamChartData.datasets[0].data[index]}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

      </div>
    </div>
  );
};

export default AboutPage; 