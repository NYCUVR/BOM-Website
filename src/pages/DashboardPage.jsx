import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { faker } from '@faker-js/faker';
import { ScatterChart, Scatter, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, ComposedChart, Bar, ReferenceLine, ZAxis } from 'recharts';
import { 
    ChevronDownIcon, 
    UserCircleIcon,
    CogIcon,
    BellIcon,
    AcademicCapIcon,
    ArrowTrendingUpIcon,
    MapIcon,
} from '@heroicons/react/24/outline';
import { useAuth } from '../context/AuthContext';


// --- MOCK DATA & TRACK GENERATION ---

const TRACKS = {
    test_base: {
        name: 'VR7.5 測試基地',
        points: 200,
        generator: (i, points) => {
            const angle = (i / points) * 2 * Math.PI;
            const r = 100;
            const x = r * Math.sin(angle) * (1 + 0.2 * Math.cos(angle * 3));
            const y = r * Math.cos(angle) * (1 + 0.2 * Math.sin(angle * 2));
            return { x, y, angle };
        }
    },
    lihpao_g2: {
        name: '麗寶國際賽車場 G2',
        points: 300,
        generator: (i, points) => {
            const angle = (i / points) * 2 * Math.PI;
            const r = 100;
            const x = r * (Math.sin(angle) - 0.3 * Math.sin(angle*2));
            const y = r * (Math.cos(angle) + 0.4 * Math.cos(angle*3) - 0.2 * Math.sin(angle*4));
            return { x, y, angle };
        }
    },
    suzuka_east: {
        name: '鈴鹿賽車場 - 東賽道',
        points: 250,
        generator: (i, points) => {
            const t = (i / points) * 2 * Math.PI;
            const r = 100;
            const x = r * (Math.sin(t) - 0.5 * Math.sin(2 * t) + 0.2 * Math.cos(3 * t));
            const y = r * (Math.cos(t) + 0.5 * Math.sin(3 * t));
            return { x, y, angle: t };
        }
    }
}

const generateSessionData = (trackKey) => {
    let data = [];
    const track = TRACKS[trackKey];
    const { points, generator } = track;

    // Define braking and apex points relative to the number of points
    const brakingIndices = [Math.floor(points * 0.2), Math.floor(points * 0.7)];
    const apexIndices = [Math.floor(points * 0.3), Math.floor(points * 0.8)];

    for (let i = 0; i < points; i++) {
        const { x, y, angle } = generator(i, points);
        const userSpeed = 120 + 50 * Math.sin(angle * 2 + Math.PI / 2) + faker.number.float({ min: -5, max: 5 });
        const idealSpeed = userSpeed + faker.number.float({ min: 3, max: 10 });

        const isBrakingPoint = brakingIndices.includes(i);
        const isApex = apexIndices.includes(i);

        data.push({
            distance: (i / points) * 3740, // Approximate distance
            userSpeed,
            idealSpeed,
            throttle: faker.number.float({ min: 0.2, max: 1 }),
            brake: isBrakingPoint ? faker.number.float({ min: 0.8, max: 1 }) : faker.number.float({ min: 0, max: 0.1 }),
            gForce: 1.5 + Math.abs(Math.sin(angle * 2)),
            x,
            y,
            isBrakingPoint,
            isApex
        });
    }
    return data;
};

const sessionData = generateSessionData(Object.keys(TRACKS)[0]);
const brakingPoints = sessionData.filter(d => d.isBrakingPoint);
const apexPoints = sessionData.filter(d => d.isApex);

const kpis = {
    best_lap: '1:30.125',
    top_speed: '165 km/h',
    max_g_force: '2.3 G',
    delta_to_ideal: <span className="text-red-400">-0.850s</span>,
}

const analysis = {
    silver: [
        '在 T3 彎道延後剎車點 5 公尺，預計可提升 0.15 秒。',
        '於 1500m 處的連續彎，路線可更貼近彎心，以提升出彎速度。',
        '電池溫度在後半段偏高，建議調整動能回收強度至等級 2。',
        '偵測到輕微轉向不足，建議前輪胎壓降低 0.5 psi。',
    ],
    gold: [
        { text: 'AI 教練：地圖上已標示出 T3 彎的理想煞車點，您的反應比建議晚了 0.08 秒。'},
        { text: 'AI 教練：與理想路線相比，你的出彎點過於遠離彎心，建議修正方向盤角度，以最大化出彎速度。'},
        { text: 'AI 教練：警告！電池溫度達到 85°C 臨界值，建議立即進站或啟用冷卻模式。'},
        { text: 'AI 教練：你的平均 G 值低於最佳範圍，顯示輪胎抓地力未被充分利用。更大膽地相信你的車！'}
    ]
}


// --- Components ---
const KPICard = ({ title, value, icon: Icon }) => (
    <div className="bg-gray-800 p-4 rounded-xl flex items-center gap-4">
        <div className="bg-brand-pink/20 p-3 rounded-lg">
            <Icon className="h-6 w-6 text-brand-pink" />
        </div>
        <div>
            <p className="text-sm text-gray-400">{title}</p>
            <p className="text-2xl font-bold text-white">{value}</p>
        </div>
    </div>
);


const TelemetryChart = ({ data, plan }) => (
    <div className="bg-gray-800 p-6 rounded-2xl h-[500px]">
        <h3 className="text-xl font-bold mb-4">賽道遙測數據 (麗寶 G2 賽道 - 單圈 3)</h3>
        <ResponsiveContainer width="100%" height="90%">
            <ComposedChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
                <XAxis dataKey="distance" unit="m" stroke="#9CA3AF" />
                <YAxis yAxisId="left" label={{ value: 'Speed (km/h)', angle: -90, position: 'insideLeft', fill: '#818CF8' }} stroke="#818CF8" />
                <YAxis yAxisId="right" orientation="right" label={{ value: 'Brake / Throttle', angle: 90, position: 'insideRight', fill: '#fbbf24' }} stroke="#fbbf24" domain={[0, 1]}/>
                <Tooltip contentStyle={{ backgroundColor: 'rgba(31, 41, 55, 0.8)', borderColor: '#4B5563' }}/>
                <Legend />
                <Area yAxisId="left" type="monotone" dataKey="userSpeed" name="您的速度" fill="#818CF8" stroke="#818CF8" fillOpacity={0.3} />
                {plan === 'gold' && (
                    <Line yAxisId="left" type="monotone" dataKey="idealSpeed" name="AI 建議速度" stroke="#F472B6" strokeWidth={2} dot={false} strokeDasharray="5 5" />
                )}
                <Bar yAxisId="right" dataKey="brake" name="煞車力道" fill="#ef4444" barSize={5} />
                <Bar yAxisId="right" dataKey="throttle" name="油門深度" fill="#22c55e" barSize={5} />
            </ComposedChart>
        </ResponsiveContainer>
    </div>
);

const TrackMap = ({ data, braking, apexes }) => (
     <div className="bg-gray-800 p-6 rounded-2xl h-[500px] flex flex-col">
        <h3 className="text-xl font-bold mb-2">AI 戰術賽道地圖</h3>
         <div className="flex-grow">
            <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
                    <XAxis type="number" dataKey="x" name="x" tick={false} axisLine={false} label=""/>
                    <YAxis type="number" dataKey="y" name="y" tick={false} axisLine={false} label=""/>
                    <ZAxis type="number" dataKey="userSpeed" range={[20, 300]} name="速度" unit="km/h" />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} wrapperStyle={{ backgroundColor: 'rgba(31, 41, 55, 0.8)', border: '1px solid #4B5563' }} />
                    
                    <Scatter name="您的路線" data={data} fill="#818CF8" line={{ stroke: '#4f46e5', strokeWidth: 2 }} shape="dot" />
                    <Scatter name="理想煞車點" data={braking} fill="#ef4444" shape="triangle" />
                    <Scatter name="最佳入彎點" data={apexes} fill="#facc15" shape="star" />
                </ScatterChart>
            </ResponsiveContainer>
         </div>
         <div className="flex justify-center items-center gap-6 pt-4 border-t border-gray-700/50">
             <div className="flex items-center gap-2 text-sm"><div className="w-4 h-1 bg-[#4f46e5]"></div><span>您的路線</span></div>
             <div className="flex items-center gap-2 text-sm"><div className="w-3 h-3 bg-[#ef4444]" style={{clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'}}></div><span>理想煞車點</span></div>
             <div className="flex items-center gap-2 text-sm"><div className="w-3 h-3 bg-[#facc15]" style={{clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'}}></div><span>最佳入彎點</span></div>
         </div>
    </div>
);

const DashboardPage = () => {
    const { user } = useAuth();
    const [plan, setPlan] = useState('free');
    const [track, setTrack] = useState(Object.keys(TRACKS)[0]);

    const sessionData = useMemo(() => generateSessionData(track), [track]);
    const brakingPoints = useMemo(() => sessionData.filter(d => d.isBrakingPoint), [sessionData]);
    const apexPoints = useMemo(() => sessionData.filter(d => d.isApex), [sessionData]);

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
                {/* Header */}
                <header className="flex justify-between items-center mb-8 flex-wrap gap-4">
                    <div>
                        <h1 className="text-3xl font-bold">AI 數據儀表板</h1>
                        <p className="text-gray-400">歡迎回來, {user?.name || 'User'}!</p>
                    </div>
                    <div className="flex items-center gap-4">
                       {/* Track Selector */}
                        <div className="relative">
                            <select
                                value={track}
                                onChange={(e) => setTrack(e.target.value)}
                                className="bg-gray-700 border-gray-600 text-white rounded-md p-2 focus:ring-brand-pink focus:border-brand-pink transition appearance-none pr-8"
                            >
                                {Object.entries(TRACKS).map(([key, { name }]) => (
                                    <option key={key} value={key}>{name}</option>
                                ))}
                            </select>
                            <ChevronDownIcon className="h-5 w-5 text-gray-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                        <button className="p-2 rounded-full hover:bg-gray-700"><BellIcon className="h-6 w-6" /></button>
                        <button className="p-2 rounded-full hover:bg-gray-700"><CogIcon className="h-6 w-6" /></button>
                        <UserCircleIcon className="h-10 w-10 text-gray-500" />
                    </div>
                </header>

                {/* Main Content */}
                <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Center Column: Main viz */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* KPIs */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            <KPICard title="最佳單圈" value={kpis.best_lap} icon={ArrowTrendingUpIcon} />
                            <KPICard title="最高時速" value={kpis.top_speed} icon={ArrowTrendingUpIcon} />
                            <KPICard title="最大G值" value={kpis.max_g_force} icon={ArrowTrendingUpIcon} />
                            <KPICard title="理想圈速差" value={kpis.delta_to_ideal} icon={ArrowTrendingUpIcon} />
                        </div>

                        {/* Telemetry Chart or Track Map */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={plan}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                {plan === 'gold' ? (
                                    <TrackMap data={sessionData} braking={brakingPoints} apexes={apexPoints} />
                                ) : (
                                    <TelemetryChart data={sessionData} plan={plan} />
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Right Column: AI Analysis */}
                    <div className="bg-gray-800 p-6 rounded-2xl flex flex-col">
                        <h3 className="text-xl font-bold mb-4">AI 驅動分析</h3>
                        
                        {/* Plan Selector */}
                        <div className="space-y-4 mb-6">
                           <PlanButton level="free" title="基礎數據" />
                           <PlanButton level="silver" title="AI 分析建議" />
                           <PlanButton level="gold" title="AI 視覺化教練" />
                        </div>
                        
                        <div className="flex-1 overflow-y-auto p-4 bg-gray-900/50 rounded-lg">
                            {plan === 'free' && (
                                <div>
                                    <h4 className="text-lg font-bold text-brand-gold mb-2">原始遙測數據</h4>
                                    <p className="text-sm text-gray-400 mb-4">Free 方案提供您基礎的賽道數據輸出，可供您自行分析。</p>
                                    <ul className="text-xs text-gray-300 space-y-1 font-mono">
                                        {sessionData.slice(0, 10).map((d, i) => (
                                            <li key={i}>{`Dist: ${d.distance.toFixed(0)}m, Spd: ${d.userSpeed.toFixed(1)}km/h, Thr: ${d.throttle.toFixed(2)}`}</li>
                                        ))}
                                        <li>... (共 {sessionData.length} 筆數據)</li>
                                    </ul>
                                </div>
                            )}

                            {plan === 'silver' && (
                                <div>
                                    <h4 className="text-lg font-bold text-brand-gold mb-2">AI 分析與建議</h4>
                                    <p className="text-sm text-gray-400 mb-4">Silver 方案解鎖 AI 文字分析，為您提供可執行的改進建議。</p>
                                    <ul className="space-y-3 text-sm text-gray-300">
                                        {analysis.silver.map((item, i) => (
                                            <li key={i} className="p-3 bg-gray-700/50 rounded-md">{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {plan === 'gold' && (
                                <div>
                                     <h4 className="text-lg font-bold text-brand-gold mb-2">AI 視覺化教練</h4>
                                     <p className="text-sm text-gray-400 mb-4">Gold 方案提供視覺化路線對比與即時教練回饋，發掘您的全部潛力。</p>
                                      <ul className="space-y-3 text-sm text-gray-300">
                                        {analysis.gold.map((item, i) => (
                                            <li key={i} className="p-3 bg-gray-700/50 rounded-md flex items-start gap-3">
                                                <AcademicCapIcon className="h-5 w-5 text-brand-gold mt-0.5 flex-shrink-0" />
                                                <span>{item.text}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardPage; 