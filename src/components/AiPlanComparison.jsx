import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

const Feature = ({ name }) => (
  <li className="flex items-start space-x-3">
    <CheckCircleIcon className="flex-shrink-0 w-5 h-5 text-green-500 mt-0.5" />
    <span className="text-white">{name}</span>
  </li>
);

const AiPlanComparison = () => {
  const plans = [
    {
      name: 'Basic',
      tier: 'first year for free',
      price: '0',
      description: '訂閱制內容',
      features: [
        { name: '保養部分：電池充電、煞車油、潤滑油、煞車碟片(第1年)' },
        { name: '調教部分(data)：油門、煞車、轉角、耗電' },
        { name: '運送物流部分：no' },
      ],
      highlight: false,
    },
    {
      name: 'Silver',
      tier: 'USD 1,400',
      price: '1400',
      description: '訂閱制內容',
      features: [
        { name: '保養部分：電池保固(電池容量低於70%)' },
        { name: '調教部分(data)：每圈圈數：分成該圈圈速&過彎速度)、懸吊參數調整' },
        { name: '運送物流部分：免運1次陸運來回' },
      ],
      highlight: true,
    },
    {
      name: 'Gold',
      tier: 'USD 2,800',
      price: '2800',
      description: '訂閱制內容',
      features: [
        { name: '保養部分：輪胎*1' },
        { name: '調教部分(data)：賽車加速調整' },
        { name: '運送物流部分：免運3次陸運來回' },
      ],
      highlight: false,
    },
  ];

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
                Recommended
              </span>
            </div>
          )}
          <h3 className="text-2xl font-bold text-center text-brand-gold">{plan.name}</h3>
          <p className="text-sm text-gray-400 text-center mb-6">{plan.tier}</p>
          <p className="flex-grow text-gray-300 mb-8">{plan.description}</p>
          <ul role="list" className="space-y-4 text-left">
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