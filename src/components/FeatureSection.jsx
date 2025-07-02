import React from 'react';
import { BrainCircuit, Recycle, Wrench } from 'lucide-react';

const features = [
  {
    name: 'AI 駕駛分析平台',
    description: '透過 VR 模擬器與即時數據回饋，我們的 AI 平台能精準分析駕駛行為，提供專業的路線與操控建議，最大化賽道表現。',
    icon: BrainCircuit,
  },
  {
    name: '循環經濟實踐',
    description: '從再生碳纖維車體到零件翻新再製，我們將永續理念貫徹在賽車的每一個細節中，打造高性能與低碳排的完美結合。',
    icon: Recycle,
  },
  {
    name: '頂尖工程教育',
    description: '我們不僅是一個賽車隊，更是一個培育未來工程領袖的搖籃。團隊成員在此獲得無可取代的實作經驗與跨領域協作能力。',
    icon: Wrench,
  },
];

const FeatureSection = () => {
  return (
    <div className="bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-brand-pink">Our Core Philosophies</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            驅動我們前進的三大核心
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            我們相信，最極致的性能來自於最智慧的分析、最永續的實踐以及最扎實的工程教育。
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-white">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-gray-800">
                    <feature.icon className="h-6 w-6 text-brand-gold" aria-hidden="true" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-400">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default FeatureSection; 