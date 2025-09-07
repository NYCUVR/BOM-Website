import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { useTranslation } from 'react-i18next';

const Feature = ({ name }) => (
  <li className="flex items-start space-x-3">
    <CheckCircleIcon className="flex-shrink-0 w-5 h-5 text-green-500 mt-0.5" />
    <span className="text-white">{name}</span>
  </li>
);

const AiPlanComparison = () => {
  const { t } = useTranslation();
  const plans = [
    {
      name: t('products_page.subscription_plans.basic.name'),
      tier: t('products_page.subscription_plans.basic.tier'),
      description: t('products_page.subscription_plans.basic.desc'),
      features: [
        { name: t('products_page.subscription_plans.basic.maint') },
        { name: t('products_page.subscription_plans.basic.tuning') },
        { name: t('products_page.subscription_plans.basic.logistics') },
      ],
      highlight: false,
    },
    {
      name: t('products_page.subscription_plans.silver.name'),
      tier: t('products_page.subscription_plans.silver.tier'),
      description: t('products_page.subscription_plans.silver.desc'),
      features: [
        { name: t('products_page.subscription_plans.silver.maint') },
        { name: t('products_page.subscription_plans.silver.tuning') },
        { name: t('products_page.subscription_plans.silver.logistics') },
      ],
      highlight: true,
    },
    {
      name: t('products_page.subscription_plans.gold.name'),
      tier: t('products_page.subscription_plans.gold.tier'),
      description: t('products_page.subscription_plans.gold.desc'),
      features: [
        { name: t('products_page.subscription_plans.gold.maint') },
        { name: t('products_page.subscription_plans.gold.tuning') },
        { name: t('products_page.subscription_plans.gold.logistics') },
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