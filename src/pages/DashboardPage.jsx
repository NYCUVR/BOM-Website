import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { faker } from '@faker-js/faker';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart, Bar, Line, Area, ZAxis } from 'recharts';
import { 
    ChevronDownIcon, 
    UserCircleIcon,
    CogIcon,
    BellIcon,
    AcademicCapIcon,
    ArrowTrendingUpIcon,
    MapIcon,
    ChartBarIcon,
    TrophyIcon,
    BeakerIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';

const DashboardPage = () => {
    const { t } = useTranslation();
    const { user } = useAuth();
    const [plan, setPlan] = useState('free');

    const TRACKS = useMemo(() => ({
        test_base: { name: t('dashboard.tracks.test_base') },
        lihpao_g2: { name: t('dashboard.tracks.lihpao_g2') },
        suzuka_east: { name: t('dashboard.tracks.suzuka_east') },
    }), [t]);

    const TRACK_PROFILES = useMemo(() => ({
        test_base: { baseSpeed: 120, speedVariance: 50, throttleAggression: 1, brakeIntensity: 0.8 },
        lihpao_g2: { baseSpeed: 105, speedVariance: 45, throttleAggression: 0.9, brakeIntensity: 1 },
        suzuka_east: { baseSpeed: 135, speedVariance: 60, throttleAggression: 1.1, brakeIntensity: 0.9 },
    }), []);

    const [trackKey, setTrackKey] = useState(Object.keys(TRACKS)[0]);

    const trackGenerators = useMemo(() => ({
        test_base: (i, points) => {
            const angle = (i / points) * 2 * Math.PI;
            const r = 100;
            const x = r * Math.sin(angle) * (1 + 0.2 * Math.cos(angle * 3));
            const y = r * Math.cos(angle) * (1 + 0.2 * Math.sin(angle * 2));
            return { x, y, angle };
        },
        lihpao_g2: (i, points) => {
            const angle = (i / points) * 2 * Math.PI;
            const r = 100;
            const x = r * (Math.sin(angle) - 0.3 * Math.sin(angle*2));
            const y = r * (Math.cos(angle) + 0.4 * Math.cos(angle*3) - 0.2 * Math.sin(angle*4));
            return { x, y, angle };
        },
        suzuka_east: (i, points) => {
            const t = (i / points) * 2 * Math.PI;
            const r = 100;
            const x = r * (Math.sin(t) - 0.5 * Math.sin(2 * t) + 0.2 * Math.cos(3 * t));
            const y = r * (Math.cos(t) + 0.5 * Math.sin(3 * t));
            return { x, y, angle: t };
        }
    }), []);
    
    const pointsConfig = useMemo(() => ({ test_base: 200, lihpao_g2: 300, suzuka_east: 250 }), []);

    const generateSessionData = (currentTrackKey) => {
        let data = [];
        const points = pointsConfig[currentTrackKey];
        const generator = trackGenerators[currentTrackKey];
        const profile = TRACK_PROFILES[currentTrackKey];

        const brakingIndices = [Math.floor(points * 0.2), Math.floor(points * 0.7), Math.floor(points * 0.45)];
        const apexIndices = [Math.floor(points * 0.3), Math.floor(points * 0.8), Math.floor(points * 0.55)];

        for (let i = 0; i < points; i++) {
            const { x, y, angle } = generator(i, points);
            const userSpeed = profile.baseSpeed + profile.speedVariance * Math.sin(angle * 2 + Math.PI / 2) + faker.number.float({ min: -5, max: 5 });
            const idealSpeed = userSpeed + faker.number.float({ min: 3, max: 10 });

            data.push({
                distance: (i / points) * 3740,
                userSpeed,
                idealSpeed,
                throttle: faker.number.float({ min: 0.2, max: 1 }) * profile.throttleAggression,
                brake: brakingIndices.includes(i) ? faker.number.float({ min: 0.8, max: 1 }) * profile.brakeIntensity : faker.number.float({ min: 0, max: 0.1 }),
                gForce: 1.5 + Math.abs(Math.sin(angle * 2)),
                x, y,
                isBrakingPoint: brakingIndices.includes(i),
                isApex: apexIndices.includes(i)
            });
        }
        return data;
    };

    const sessionData = useMemo(() => generateSessionData(trackKey), [trackKey]);
    const brakingPoints = useMemo(() => sessionData.filter(d => d.isBrakingPoint), [sessionData]);
    const apexPoints = useMemo(() => sessionData.filter(d => d.isApex), [sessionData]);

    const kpis = useMemo(() => {
        if (!sessionData || sessionData.length === 0) {
            return {
                best_lap: 'N/A',
                top_speed: 'N/A',
                max_g_force: 'N/A',
                delta_to_ideal: 'N/A',
            };
        }

        const topSpeed = Math.max(...sessionData.map(d => d.userSpeed));
        const maxGForce = Math.max(...sessionData.map(d => d.gForce));

        // Generate a plausible lap time based on track
        const lapTimeBases = { test_base: 90, lihpao_g2: 105, suzuka_east: 85 };
        const baseTime = lapTimeBases[trackKey] || 95;
        const lapTimeInSeconds = baseTime + faker.number.float({ min: -0.5, max: 0.5 });
        const minutes = Math.floor(lapTimeInSeconds / 60);
        const seconds = Math.floor(lapTimeInSeconds % 60);
        const milliseconds = Math.floor((lapTimeInSeconds * 1000) % 1000);
        const formattedLapTime = `${minutes}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
        
        // Generate a plausible delta
        const deltaBases = { test_base: -0.8, lihpao_g2: -1.2, suzuka_east: -0.6 };
        const baseDelta = deltaBases[trackKey] || -0.9;
        const delta = baseDelta + faker.number.float({min: -0.2, max: 0.2});

        return {
            best_lap: formattedLapTime,
            top_speed: `${topSpeed.toFixed(0)} km/h`,
            max_g_force: `${maxGForce.toFixed(1)} G`,
            delta_to_ideal: <span className={delta > 0 ? "text-green-400" : "text-red-400"}>{delta.toFixed(3)}s</span>,
        }
    }, [sessionData, trackKey, t]);

    const analysis = useMemo(() => ({
        silver: t('dashboard.ai_analysis.silver', { returnObjects: true }) || [],
        gold: t('dashboard.ai_analysis.gold', { returnObjects: true }) || []
    }), [t]);

    const KPICard = ({ title, value, icon: Icon }) => (
        <div className="bg-gray-800 p-4 rounded-xl flex items-center gap-4">
            <div className="bg-brand-pink/20 p-3 rounded-lg">
                <Icon className="h-6 w-6 text-brand-pink" />
            </div>
            <div>
                <p className="text-sm text-gray-400">{title}</p>
                <p className="text-3xl font-bold text-white">{value}</p>
            </div>
        </div>
    );

    const TelemetryChart = ({ data, plan, trackName }) => (
        <div className="bg-gray-800 p-6 rounded-2xl h-[500px]">
            <h3 className="text-xl font-bold mb-4">{t('dashboard.telemetry_chart_title')} ({t('dashboard.telemetry_chart_subtitle_template', { trackName, lapNumber: 3 })})</h3>
            <ResponsiveContainer width="100%" height="90%">
                <ComposedChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
                    <XAxis dataKey="distance" unit="m" stroke="#9CA3AF" />
                    <YAxis yAxisId="left" label={{ value: t('dashboard.chart_y_axis_speed'), angle: -90, position: 'insideLeft', fill: '#818CF8' }} stroke="#818CF8" />
                    <YAxis yAxisId="right" orientation="right" label={{ value: t('dashboard.chart_y_axis_input'), angle: 90, position: 'insideRight', fill: '#fbbf24' }} stroke="#fbbf24" domain={[0, 1]}/>
                    <Tooltip contentStyle={{ backgroundColor: 'rgba(31, 41, 55, 0.8)', borderColor: '#4B5563' }}/>
                    <Legend />
                    <Area yAxisId="left" type="monotone" dataKey="userSpeed" name={t('dashboard.chart_your_speed')} fill="#818CF8" stroke="#818CF8" fillOpacity={0.3} />
                    {plan === 'gold' && (
                        <Line yAxisId="left" type="monotone" dataKey="idealSpeed" name={t('dashboard.chart_ai_speed')} stroke="#F472B6" strokeWidth={2} dot={false} strokeDasharray="5 5" />
                    )}
                    <Bar yAxisId="right" dataKey="brake" name={t('dashboard.chart_brake')} fill="#ef4444" barSize={5} />
                    <Bar yAxisId="right" dataKey="throttle" name={t('dashboard.chart_throttle')} fill="#22c55e" barSize={5} />
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    );

    const TrackMap = ({ data, braking, apexes }) => (
         <div className="bg-gray-800 p-6 rounded-2xl h-[500px] flex flex-col">
            <h3 className="text-xl font-bold mb-2">{t('dashboard.map_title')}</h3>
             <div className="flex-grow">
                <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
                        <XAxis type="number" dataKey="x" name="x" tick={false} axisLine={false} label=""/>
                        <YAxis type="number" dataKey="y" name="y" tick={false} axisLine={false} label=""/>
                        <ZAxis type="number" dataKey="userSpeed" range={[20, 300]} name={t('dashboard.chart_your_speed')} unit="km/h" />
                        <Tooltip cursor={{ strokeDasharray: '3 3' }} wrapperStyle={{ backgroundColor: 'rgba(31, 41, 55, 0.8)', border: '1px solid #4B5563' }} />
                        
                        <Scatter name={t('dashboard.map_legend_your_route')} data={data} fill="#818CF8" line={{ stroke: '#4f46e5', strokeWidth: 2 }} shape="dot" />
                        <Scatter name={t('dashboard.map_legend_brake_point')} data={braking} fill="#ef4444" shape="triangle" />
                        <Scatter name={t('dashboard.map_legend_apex')} data={apexes} fill="#facc15" shape="star" />
                    </ScatterChart>
                </ResponsiveContainer>
             </div>
             <div className="flex justify-center items-center gap-6 pt-4 border-t border-gray-700/50">
                 <div className="flex items-center gap-2 text-sm"><div className="w-4 h-1 bg-[#4f46e5]"></div><span>{t('dashboard.map_legend_your_route')}</span></div>
                 <div className="flex items-center gap-2 text-sm"><div className="w-3 h-3 bg-[#ef4444]" style={{clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'}}></div><span>{t('dashboard.map_legend_brake_point')}</span></div>
                 <div className="flex items-center gap-2 text-sm"><div className="w-3 h-3 bg-[#facc15]" style={{clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'}}></div><span>{t('dashboard.map_legend_apex')}</span></div>
             </div>
        </div>
    );

    const PlanButton = ({ level, title }) => (
        <button
            onClick={() => setPlan(level)}
            className={`w-full text-left p-4 rounded-lg transition-all duration-300 ${
                plan === level ? 'bg-brand-pink text-white shadow-lg' : 'bg-gray-700 hover:bg-gray-600'
            }`}
        >
            <span className={`text-xs font-bold uppercase ${plan === level ? 'text-white/70' : 'text-brand-gold'}`}>{level}</span>
            <h4 className="text-lg font-bold">{title}</h4>
        </button>
    );

    return (
        <div className="bg-gray-900 text-white min-h-screen p-4 sm:p-6 lg:p-8">
            <div className="max-w-screen-2xl mx-auto">
                <header className="flex justify-between items-center mb-8 flex-wrap gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-white">{t('dashboard.title')}</h1>
                        <p className="text-gray-400">{t('dashboard.subtitle_greeting')} {user?.name || 'Guest'}. {t('dashboard.subtitle_prompt')}</p>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <button className="p-2 rounded-full bg-gray-800 hover:bg-gray-700">
                            <BellIcon className="h-6 w-6" />
                        </button>
                         <button className="p-2 rounded-full bg-gray-800 hover:bg-gray-700">
                            <CogIcon className="h-6 w-6" />
                        </button>
                        <UserCircleIcon className="h-10 w-10 text-gray-500"/>
                    </div>
                </header>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                            <KPICard title={t('dashboard.kpi_best_lap')} value={kpis.best_lap} icon={TrophyIcon} />
                            <KPICard title={t('dashboard.kpi_top_speed')} value={kpis.top_speed} icon={ArrowTrendingUpIcon} />
                            <KPICard title={t('dashboard.kpi_max_g')} value={kpis.max_g_force} icon={ChartBarIcon} />
                            <KPICard title={t('dashboard.kpi_delta')} value={kpis.delta_to_ideal} icon={BeakerIcon} />
                        </div>
                <main className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    {/* Left Panel */}
                    <aside className="lg:col-span-1 space-y-6">
                        <div className="bg-gray-800 p-6 rounded-2xl">
                            <h3 className="text-xl font-bold mb-4">{t('dashboard.plan_selector_title')}</h3>
                            <div className="space-y-4">
                                <PlanButton level="free" title={t('dashboard.plan_free')} />
                                <PlanButton level="silver" title={t('dashboard.plan_silver')} />
                                <PlanButton level="gold" title={t('dashboard.plan_gold')} />
                            </div>
                        </div>

                        <div className="bg-gray-800 p-6 rounded-2xl">
                             <h3 className="text-xl font-bold mb-4">{t('dashboard.track_selector_title')}</h3>
                             <div className="relative">
                                <select 
                                    value={trackKey} 
                                    onChange={(e) => setTrackKey(e.target.value)}
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-brand-pink transition appearance-none"
                                >
                                    {Object.keys(TRACKS).map(key => (
                                        <option key={key} value={key}>{TRACKS[key].name}</option>
                                    ))}
                                </select>
                                <ChevronDownIcon className="h-5 w-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>
                        </div>
                    </aside>

                    {/* Main Content: Center Chart */}
                    <div className="lg:col-span-3">
                         <AnimatePresence mode="wait">
                            <motion.div
                                key={plan === 'gold' ? 'map' : 'telemetry'}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                {plan === 'gold' ? (
                                    <TrackMap data={sessionData} braking={brakingPoints} apexes={apexPoints} />
                                ) : (
                                    <TelemetryChart data={sessionData} plan={plan} trackName={TRACKS[trackKey].name} />
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Right Panel */}
                    <aside className="lg:col-span-1 bg-gray-800 p-6 rounded-2xl flex flex-col">
                       <AnimatePresence mode="wait">
                            <motion.div
                                key={plan}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                                className="flex-grow flex flex-col"
                            >
                                {plan === 'free' && (
                                    <div>
                                        <h3 className="text-xl font-bold mb-4">{t('dashboard.right_panel_raw_data_title')}</h3>
                                        <div className="bg-gray-900/50 p-4 rounded-lg h-96 overflow-y-auto text-xs font-mono text-gray-400 space-y-1">
                                            {sessionData.slice(0, 50).map((d, i) => (
                                                <p key={i} className="break-all">
                                                    <span className="text-sky-400">T:{d.distance.toFixed(0).padStart(4, '0')}</span> | 
                                                    <span className="text-rose-400"> S:{d.userSpeed.toFixed(1).padStart(5, ' ')}</span> | 
                                                    <span className="text-emerald-400"> thr:{d.throttle.toFixed(2)}</span> |
                                                    <span className="text-amber-400"> brk:{d.brake.toFixed(2)}</span>
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {(plan === 'silver' || plan === 'gold') && (
                                    <div className="flex-grow flex flex-col">
                                        <h3 className="text-xl font-bold mb-4">{t('dashboard.right_panel_ai_title')}</h3>
                                        <div className="space-y-4 flex-grow">
                                            {analysis[plan].map((item, index) => (
                                                <div key={index} className="bg-gray-900/50 p-4 rounded-lg text-gray-300 text-sm">
                                                    {typeof item === 'string' ? item : item.text}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                 {(plan === 'silver' || plan === 'free') && (
                                    <div className="mt-6 border-t border-gray-700/50 pt-4">
                                        <h4 className="font-bold text-brand-gold">{t('dashboard.map_title')}</h4>
                                        <p className="text-sm text-gray-400">{t('dashboard.right_panel_upgrade_prompt')}</p>
                                    </div>
                                )}
                            </motion.div>
                       </AnimatePresence>
                    </aside>
                </main>
            </div>
        </div>
    );
};

export default DashboardPage; 