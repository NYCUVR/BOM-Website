import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { useTranslation } from 'react-i18next';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Custom plugin to draw text in the center
const centerTextPlugin = {
  id: 'centerText',
  afterDraw: (chart) => {
    if (chart.config.options.plugins.centerText.display) {
      const { ctx } = chart;
      const { top, left, width, height } = chart.chartArea;
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      
      ctx.save();
      
      // Total members number
      ctx.font = 'bold 3rem sans-serif'; // Corresponds to text-5xl font-bold
      ctx.fillStyle = '#FFFFFF'; // text-white
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const total = chart.config.data.datasets[0].data.reduce((a, b) => a + b, 0);
      ctx.fillText(total, centerX, centerY - 12);

      // "Total Members" text
      const text = chart.config.options.plugins.centerText.text;
      ctx.font = '1.125rem sans-serif'; // Corresponds to text-lg
      ctx.fillStyle = '#9ca3af'; // text-gray-400
      ctx.fillText(text, centerX, centerY + 24);
      
      ctx.restore();
    }
  }
};

ChartJS.register(ArcElement, Tooltip, Legend, centerTextPlugin);

const TeamCompositionChart = () => {
  const { t } = useTranslation();

  const chartData = {
    labels: [
      t('team_chart.label_remanufacturing'),
      t('team_chart.label_marketing'),
      t('team_chart.label_it'),
      t('team_chart.label_electrical'),
      t('team_chart.label_mechanical'),
    ],
    datasets: [
      {
        label: t('team_chart.dataset_label'),
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

  const totalMembers = chartData.datasets[0].data.reduce((a, b) => a + b, 0);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '60%',
    layout: {
      padding: {
        right: 20, // Add space between chart and legend
      }
    },
    plugins: {
      centerText: {
        display: true,
        text: t('team_chart.center_text_total'),
      },
      legend: {
        display: true,
        position: 'right',
        labels: {
          color: '#d1d5db',
          font: {
            size: 14,
          }
        }
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

  return (
    <div className="relative w-full h-80 md:h-96">
      <Doughnut data={chartData} options={options} />
    </div>
  );
};

export default TeamCompositionChart; 