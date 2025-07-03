import React from 'react';
import { useTranslation } from 'react-i18next';
import { RocketLaunchIcon, TrophyIcon, UsersIcon } from '@heroicons/react/24/outline';

const goals = [
  {
    icon: TrophyIcon,
    key: 'goal1'
  },
  {
    icon: RocketLaunchIcon,
    key: 'goal2'
  },
  {
    icon: UsersIcon,
    key: 'goal3'
  }
];

const FutureGoalsSection = () => {
    const { t } = useTranslation();
    return (
        <section className="bg-gray-900 text-white py-16 md:py-24">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-brand-pink">{t('about.sdgs_title')}</h2>
                <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    {goals.map((goal) => (
                        <div key={goal.key} className="bg-gray-800 rounded-lg shadow-xl p-6 text-center flex flex-col items-center">
                            <goal.icon className="w-16 h-16 mb-4 text-brand-pink" />
                            <h3 className="text-xl font-bold mb-2 text-white">{t(`about.${goal.key}_title`)}</h3>
                            <p className="text-gray-400">{t(`about.${goal.key}_desc`)}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FutureGoalsSection; 