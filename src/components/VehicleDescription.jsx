import React from 'react';
import { CheckCircle } from 'lucide-react';

const techFeatures = [
  {
    title: "Made In Taiwan",
    points: [
      "Over 70% of the components are sourced from Taiwan, including battery cells, brake systems, shock absorbers, rims, carbon fiber cloth and tubes, etc.",
      "We gain insights from our cooperation partners on techniques such as bonding carbon fiber with aluminum and verifying the strength of our rims."
    ],
  },
  {
    title: "Precise Manufacturing",
    points: [
      "Aim to improve component precision by increasing the ratio of machine-made components to 50%. Key components include frame tubing, pedals, motor differential assembly, and accumulator mounts.",
      "Utilize advanced manufacturing techniques: 3D laser cutting for chassis tubes, 2D laser cutting for sheet metal, NC bender and CNC milling bending for sheet metal."
    ],
  },
  {
    title: "In-House Manufacturing",
    points: [
      "Manufacture as many components as possible in-house to gain hands-on experience and improve design quality.",
      "For example, welding tasks such as chassis, accumulator, and pedal assembly are primarily completed by our team members."
    ],
  },
  {
    title: "Reducing Weight",
    points: [
      "Incorporate more carbon fiber and lighter resin materials to reduce the overall weight of the vehicle.",
      "Increase Power Density in Accumulator."
    ],
  },
  {
    title: "Enhance Reliability",
    points: [
      "Boost software reliability by establishing a dedicated software control group within the team.",
      "Use finite element analysis software to accurately simulate and test each component."
    ],
  },
  {
    title: "SoC Calculation & Launch Control",
    points: [
        "Calculate the remaining battery capacity in real-time to provide an estimated remaining mileage, assisting the driver in power allocation during endurance races.",
        "Prevent excessive wheel slip during sudden throttle input to maintain optimal acceleration and power efficiency of the vehicle."
    ],
  },
];

const VehicleDescription = () => {
  return (
    <div className="bg-gray-800 py-20">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white">Overall Vehicle Description</h2>
          <p className="mt-2 text-lg text-brand-pink font-semibold">VR7.5 / E31</p>
        </div>
        <div className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {techFeatures.map((feature) => (
            <div key={feature.title} className="bg-gray-900 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-brand-gold mb-4">{feature.title}</h3>
              <ul className="space-y-4">
                {feature.points.map((point, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="flex-shrink-0 h-6 w-6 text-brand-pink mt-1 mr-3" />
                    <span className="text-gray-300">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
};

export default VehicleDescription; 