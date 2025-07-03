import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';

const plans = [
  {
    name: 'Free',
    tier: '免費方案',
    description: '包含於購車方案中，提供基礎遙測數據，適合初步賽道測試。',
    features: [
      { name: '即時遙測數據', included: true },
      { name: '基礎 KPI 指標', included: true },
      { name: '單圈數據紀錄', included: true },
      { name: 'AI 文字版駕駛建議', included: false },
      { name: 'AI 戰術賽道地圖', included: false },
      { name: '進階效能預測模型', included: false },
    ],
    highlight: false,
  },
  {
    name: 'Silver',
    tier: '白銀方案',
    description: '解鎖 AI 核心分析能力，提供可執行的駕駛優化建議。',
    features: [
        { name: '即時遙測數據', included: true },
        { name: '基礎 KPI 指標', included: true },
        { name: '單圈數據紀錄', included: true },
        { name: 'AI 文字版駕駛建議', included: true },
        { name: 'AI 戰術賽道地圖', included: false },
        { name: '進階效能預測模型', included: false },
    ],
    highlight: true,
  },
  {
    name: 'Gold',
    tier: '黃金方案',
    description: '終極數據分析工具，提供視覺化戰術地圖與前瞻性預測。',
    features: [
        { name: '即時遙測數據', included: true },
        { name: '基礎 KPI 指標', included: true },
        { name: '單圈數據紀錄', included: true },
        { name: 'AI 文字版駕駛建議', included: true },
        { name: 'AI 戰術賽道地圖', included: true },
        { name: '進階效能預測模型', included: true },
    ],
    highlight: false,
  },
];

const Feature = ({ name, included }) => (
  <li className="flex items-center space-x-3">
    {included ? (
      <CheckCircleIcon className="flex-shrink-0 w-5 h-5 text-green-500" />
    ) : (
      <XCircleIcon className="flex-shrink-0 w-5 h-5 text-gray-500" />
    )}
    <span className={included ? 'text-white' : 'text-gray-400'}>{name}</span>
  </li>
);

const AiPlanComparison = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {plans.map((plan, index) => (
        <motion.div
          key={plan.name}
          className={`relative border rounded-2xl p-8 flex flex-col ${
            plan.highlight ? 'border-brand-pink shadow-brand-pink/30 shadow-2xl' : 'border-gray-700'
          }`}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          {plan.highlight && (
            <div className="absolute top-0 -translate-y-1/2 w-full flex justify-center">
              <span className="bg-brand-pink text-white text-xs font-bold px-4 py-1 rounded-full uppercase">
                推薦方案
              </span>
            </div>
          )}
          <h3 className="text-2xl font-bold text-center text-brand-gold">{plan.name}</h3>
          <p className="text-sm text-gray-400 text-center mb-6">{plan.tier}</p>
          <p className="flex-grow text-gray-300 mb-8">{plan.description}</p>
          <ul role="list" className="space-y-4">
            {plan.features.map((feature) => (
              <Feature key={feature.name} {...feature} />
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  );
};

export default AiPlanComparison; 