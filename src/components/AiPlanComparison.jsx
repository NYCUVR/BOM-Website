import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  const plans = [
    {
      name: t('products_page.plan_free_name'),
      tier: t('products_page.plan_free_tier'),
      description: t('products_page.plan_free_desc'),
      features: [
        { name: t('products_page.feature_telemetry'), included: true },
        { name: t('products_page.feature_kpi'), included: true },
        { name: t('products_page.feature_lap_data'), included: true },
        { name: t('products_page.feature_ai_text'), included: false },
        { name: t('products_page.feature_ai_map'), included: false },
        { name: t('products_page.feature_prediction'), included: false },
      ],
      highlight: false,
    },
    {
      name: t('products_page.plan_silver_name'),
      tier: t('products_page.plan_silver_tier'),
      description: t('products_page.plan_silver_desc'),
      features: [
        { name: t('products_page.feature_telemetry'), included: true },
        { name: t('products_page.feature_kpi'), included: true },
        { name: t('products_page.feature_lap_data'), included: true },
        { name: t('products_page.feature_ai_text'), included: true },
        { name: t('products_page.feature_ai_map'), included: false },
        { name: t('products_page.feature_prediction'), included: false },
      ],
      highlight: true,
    },
    {
      name: t('products_page.plan_gold_name'),
      tier: t('products_page.plan_gold_tier'),
      description: t('products_page.plan_gold_desc'),
      features: [
        { name: t('products_page.feature_telemetry'), included: true },
        { name: t('products_page.feature_kpi'), included: true },
        { name: t('products_page.feature_lap_data'), included: true },
        { name: t('products_page.feature_ai_text'), included: true },
        { name: t('products_page.feature_ai_map'), included: true },
        { name: t('products_page.feature_prediction'), included: true },
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
                {t('products_page.recommended_plan')}
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