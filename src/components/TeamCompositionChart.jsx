import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export const chartData = {
  labels: [
    '再製造工程師',
    '市場行銷',
    'IT 工程師',
    '電機工程師',
    '機械工程師',
  ],
  datasets: [
    {
      label: '團隊成員數量',
      data: [6, 7, 8, 10, 15],
      backgroundColor: [
        '#ef4444', // Red-500
        '#d946ef', // Fuchsia-500
        '#8b5cf6', // Violet-500
        '#3b82f6', // Blue-500
        '#14b8a6', // Teal-500
      ],
      borderColor: '#1f2937', // Gray-800
      borderWidth: 4,
      hoverOffset: 32,
      hoverBorderWidth: 8,
      hoverBorderColor: '#FFFFFF',
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '70%',
  plugins: {
    legend: {
      display: false, // Hide the default legend
    },
    tooltip: {
      callbacks: {
        label: function(context) {
          let label = context.label || '';
          if (label) {
            label += ': ';
          }
          if (context.parsed !== null) {
            label += context.parsed;
          }
          return label;
        }
      }
    }
  },
};

const TeamCompositionChart = () => {
  return (
    <div className="relative w-full max-w-md mx-auto h-80 md:h-96">
      <Doughnut data={chartData} options={options} />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center">
            <p className="text-5xl font-bold text-white">46</p>
            <p className="text-lg text-gray-400">總成員</p>
        </div>
      </div>
    </div>
  );
};

export default TeamCompositionChart; 