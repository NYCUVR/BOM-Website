import React from 'react';

const timelineData = [
  {
    year: '2008-2020',
    title: 'Formula Hybrid',
    description: 'Once been to US to participate in formula hybrid.',
  },
  {
    year: '2021',
    title: 'VR5 – IC',
    description: 'The first IC car after 10 years. Participated in FST. Established an administrative group responsible for securing sponsorships and managing external relations.',
  },
  {
    year: '2022',
    title: 'VR6 – EV',
    description: 'Transitioned to developing electric vehicles (EVs). Formed a manufacturing group and appointed a chief engineer to oversee production progress.',
  },
  {
    year: '2023',
    title: 'VR7 – EV',
    description: 'Established a new software and firmware group to focus on developing and maintaining vehicle software.',
  },
  {
    year: '2024-2025',
    title: 'VR7.5 – EV',
    description: 'Implemented advanced software to collect precise vehicle data, enhancing overall vehicle control and performance. Upgraded the VR7 with enhancements to its chassis, software, and overall design.',
  },
];

const TimelineSection = () => {
  return (
    <div className="bg-gray-900 py-20 text-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">
          Team History & Status
        </h2>
        <div className="relative wrap overflow-hidden p-10 h-full">
          <div className="border-2-2 absolute border-opacity-20 border-gray-700 h-full border" style={{left: '50%'}}></div>
          {timelineData.map((item, index) => (
            <div key={index} className={`mb-8 flex justify-between items-center w-full ${index % 2 === 0 ? 'flex-row-reverse left-timeline' : 'right-timeline'}`}>
              <div className="order-1 w-5/12"></div>
              <div className="z-20 flex items-center order-1 bg-gray-800 shadow-xl w-8 h-8 rounded-full">
                <h1 className="mx-auto font-semibold text-lg text-white">{index + 1}</h1>
              </div>
              <div className="order-1 bg-brand-pink rounded-lg shadow-xl w-5/12 px-6 py-4">
                <h3 className="mb-3 font-bold text-white text-xl">{item.year} - {item.title}</h3>
                <p className="text-sm leading-snug tracking-wide text-gray-100 text-opacity-100">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


export default TimelineSection; 