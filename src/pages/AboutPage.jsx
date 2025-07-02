import React from 'react';
import TeamCompositionChart from '../components/TeamCompositionChart';

const chartData = {
    labels: [
      '再製造工程師', '市場行銷', 'IT 工程師', '電機工程師', '機械工程師'
    ],
    values: [6, 7, 8, 10, 15],
    colors: ['#ef4444', '#d946ef', '#8b5cf6', '#3b82f6', '#14b8a6']
};

const AboutPage = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="container mx-auto px-6 py-16 md:py-24">
        
        <header className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold italic text-white">Company Profile</h1>
          <div className="mt-4 h-1 w-32 bg-brand-pink mx-auto"></div>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Text Info */}
          <div className="lg:col-span-1 space-y-12">
            <section>
              <h2 className="text-3xl font-bold italic text-brand-pink mb-4 border-b-2 border-brand-pink/30 pb-2">Our Services</h2>
              <ul className="space-y-2 text-lg text-gray-200">
                <li className="font-semibold italic">電動賽車製造</li>
                <li className="font-semibold italic">賽車數據分析服務</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-bold italic text-brand-pink mb-4 border-b-2 border-brand-pink/30 pb-2">Why We Stand Out</h2>
              <ul className="space-y-2 text-lg text-gray-200">
                <li className="font-semibold italic">價格實惠的入門級賽車</li>
                <li className="font-semibold italic">雲端 AI 調校</li>
                <li className="font-semibold italic">模組化、可替換的組件</li>
                <li className="font-semibold italic">即時碳纖維儀表板</li>
              </ul>
            </section>
          </div>

          {/* Middle Column: Chart */}
          <div className="lg:col-span-1 flex justify-center relative z-10">
            <TeamCompositionChart />
          </div>
          
          {/* Right Column: Legend */}
          <div className="lg:col-span-1 space-y-4">
             <h2 className="text-3xl font-bold italic text-brand-pink mb-4 text-center lg:text-left">Key Human Resources</h2>
             {chartData.labels.map((label, index) => (
                 <div key={label} className="flex items-center p-3 bg-gray-800 rounded-lg">
                     <div style={{ backgroundColor: chartData.colors[index] }} className="w-5 h-5 rounded-sm mr-4"></div>
                     <div className="flex justify-between w-full">
                         <span className="text-gray-200 font-medium">{label}</span>
                         <span className="font-bold text-white">{chartData.values[index]}</span>
                     </div>
                 </div>
             ))}
          </div>

        </main>
        
      </div>
    </div>
  );
};

export default AboutPage; 