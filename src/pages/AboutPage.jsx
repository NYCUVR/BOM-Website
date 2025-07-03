import React from 'react';
import { useTranslation } from 'react-i18next';
import TimelineSection from '../components/TimelineSection';
import TeamCompositionChart from '../components/TeamCompositionChart';
import FutureGoalsSection from '../components/FutureGoalsSection';
import SdgSection from '../components/SdgSection';

const AboutPage = () => {
    const { t } = useTranslation();

    return (
        <div className="bg-gray-900 min-h-screen">
            <div className="container mx-auto px-4">
                <main>
                    {/* Section 1: SDGs */}
                    <SdgSection />

                    {/* Section 2: Timeline */}
                    <TimelineSection />

                    {/* Section 3: Team Composition */}
                    <section id="team" className="bg-gray-800 py-16 md:py-24 my-16 md:my-24 rounded-lg">
                        <div className="container mx-auto px-4 text-center">
                            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-brand-pink">
                                {t('about.team_title')}
                            </h2>
                            <div className="max-w-3xl mx-auto text-lg text-gray-400 space-y-4 mb-12">
                                <p>{t('about.team_desc1')}</p>
                                <p>{t('about.team_desc2')}</p>
                            </div>
                            <div className="max-w-md mx-auto">
                                <TeamCompositionChart />
                            </div>
                        </div>
                    </section>

                    {/* Section 4: Future Goals */}
                    <FutureGoalsSection />
                </main>
            </div>
        </div>
    );
};

export default AboutPage; 