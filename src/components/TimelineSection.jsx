import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { GlobeAltIcon, WrenchScrewdriverIcon, BoltIcon, CpuChipIcon, ArrowTrendingUpIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

const TimelineItem = ({ item, index }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });
    const controls = useAnimation();
    const isEven = index % 2 === 0;

    useEffect(() => {
        if (isInView) {
            controls.start("visible");
        }
    }, [isInView, controls]);

    const variants = {
        hidden: { opacity: 0, x: isEven ? 100 : -100 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
    };

    const CardContent = () => (
        <div className={`bg-gray-800 rounded-lg shadow-xl px-6 py-4 ${isEven ? 'text-left' : 'text-right'}`}>
            <div className={`flex items-center mb-2 ${isEven ? 'flex-row' : 'flex-row-reverse'}`}>
                <item.icon className={`w-8 h-8 text-brand-pink ${isEven ? 'mr-4' : 'ml-4'}`} />
                <div>
                    <p className="font-bold text-lg text-gray-300">{item.year}</p>
                    <h3 className="font-bold text-xl text-white">{item.title}</h3>
                </div>
            </div>
            <ul className={`list-disc text-gray-400 space-y-1 text-sm ${isEven ? 'list-inside' : 'text-left'}`}>
                 {item.description.map((point, i) => (
                    <li key={i}>{point}</li>
                ))}
            </ul>
        </div>
    );

    return (
        <div ref={ref} className="relative mb-8 flex justify-between items-center w-full">
            {/* Left Side Container */}
            <div className={`order-1 w-5/12 flex justify-end`}>
                {!isEven && (
                    <motion.div variants={variants} initial="hidden" animate={controls} className="w-full max-w-md">
                        <CardContent />
                    </motion.div>
                )}
            </div>

            {/* Marker */}
            <div className="z-20 flex items-center order-1 bg-gray-700 shadow-xl w-4 h-4 rounded-full border-2 border-brand-pink"></div>

            {/* Right Side Container */}
            <div className={`order-1 w-5/12 flex justify-start`}>
                 {isEven && (
                    <motion.div variants={variants} initial="hidden" animate={controls} className="w-full max-w-md">
                        <CardContent />
                    </motion.div>
                )}
            </div>
        </div>
    );
};


const TimelineSection = () => {
    const { t } = useTranslation();
    const timelineData = [
        {
            year: '2008',
            title: t('timeline.event1_title'),
            description: [t('timeline.event1_desc1')],
            icon: GlobeAltIcon,
        },
        {
            year: '2021',
            title: t('timeline.event2_title'),
            description: [
                t('timeline.event2_desc1'),
                t('timeline.event2_desc2')
            ],
            icon: WrenchScrewdriverIcon,
        },
        {
            year: '2022',
            title: t('timeline.event3_title'),
            description: [
                t('timeline.event3_desc1'),
                t('timeline.event3_desc2')
            ],
            icon: BoltIcon,
        },
        {
            year: '2023',
            title: t('timeline.event4_title'),
            description: [t('timeline.event4_desc1')],
            icon: CpuChipIcon,
        },
        {
            year: '2024-2025',
            title: t('timeline.event5_title'),
            description: [
                t('timeline.event5_desc1'),
                t('timeline.event5_desc2')
            ],
            icon: ArrowTrendingUpIcon,
        }
    ];
    return (
        <section className="bg-gray-900 text-white py-16 md:py-24">
            <div className="container mx-auto px-4 md:px-0">
                <div className="relative w-full max-w-4xl mx-auto">
                    {/* Central line */}
                    <div className="absolute left-1/2 -translate-x-1/2 h-full w-1 bg-gray-700"></div>

                    {timelineData.map((item, index) => (
                        <TimelineItem key={index} item={item} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TimelineSection; 