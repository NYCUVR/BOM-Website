import React from 'react';
import { useTranslation } from 'react-i18next';
import TeamCompositionChart from '../components/TeamCompositionChart';
import FutureGoalsSection from '../components/FutureGoalsSection';
import SdgSection from '../components/SdgSection';

const AboutPage = () => {
    const { t } = useTranslation();

    const teamData = [
        { id: 'remanufacturing', value: 6 },
        { id: 'carbon', value: 3 },
        { id: 'mechanical', value: 15 },
        { id: 'electrical', value: 10 },
        { id: 'it', value: 8 },
        { id: 'marketing', value: 7 },
        { id: 'customer', value: 6 },
    ];

    return (
        <div className="bg-gray-900 text-white">
            {/* Header Section */}
            <header className="py-16 md:py-24 bg-gray-800 text-center">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                        {t('about.corporate_header_title')}
                    </h1>
                    <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-gray-300">
                        {t('about.corporate_header_subtitle')}
                    </p>
                </div>
            </header>
            <section>
                <SdgSection />
            </section>
            {/* Main Content */}
            <main className="px-4 sm:px-6 lg:px-8 bg-gray-800">
                <div className="max-w-7xl mx-auto">
                    {/* The TeamCompositionChart component now has its own section padding */}
                    <TeamCompositionChart data={teamData} />
                </div>
            </main>
        </div>
    );
};

export default AboutPage; 