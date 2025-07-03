import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useTranslation } from 'react-i18next';

ChartJS.register(ArcElement, Tooltip, Legend);

// A plugin to draw text in the center of the doughnut chart
const centerTextPlugin = {
  id: 'centerText',
  afterDraw: (chart, args, options) => {
    if (!options.text) return;
    const { ctx, chartArea: { left, right, top, bottom } } = chart;
    ctx.save();
    
    const centerX = (left + right) / 2;
    const centerY = (top + bottom) / 2;
    
    ctx.font = `bold ${options.fontSize || '24px'} ${options.fontFamily || 'sans-serif'}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = options.color || '#FFFFFF';

    // Main text (total number)
    ctx.fillText(options.text, centerX, centerY - (options.subtext ? 8 : 0));
    
    // Subtext
    if (options.subtext) {
      ctx.font = `${options.subtextFontSize || '12px'} ${options.fontFamily || 'sans-serif'}`;
      ctx.fillStyle = options.subtextColor || '#A0AEC0'; // gray-400
      ctx.fillText(options.subtext, centerX, centerY + 12);
    }

    ctx.restore();
  },
};

const TeamCompositionChart = ({ data }) => {
  const { t } = useTranslation();

  const chartData = {
    labels: data.map(item => t(`team_chart.${item.id}.label`)),
    datasets: [
      {
        label: t('team_chart.dataset_label'),
        data: data.map(item => item.value),
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
          '#9966FF', '#FF9F40', '#C9CBCF'
        ],
        borderColor: '#1A202C', // bg-gray-800
        borderWidth: 2,
        hoverOffset: 4,
      },
    ],
  };

  const totalMembers = data.reduce((sum, item) => sum + item.value, 0);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#2D3748', // gray-700
        titleColor: '#FFFFFF',
        bodyColor: '#E2E8F0', // gray-200
        callbacks: {
          label: function(context) {
            let label = context.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed !== null) {
              label += `${context.parsed} members`;
            }
            return label;
          }
        }
      },
      centerText: {
        text: totalMembers,
        subtext: t('team_chart.center_text_total'),
        color: '#FFFFFF',
        fontSize: '36px',
        subtextColor: '#A0AEC0',
        subtextFontSize: '14px',
      }
    },
  };
  
  ChartJS.register(centerTextPlugin);

  return (
    <section id="team" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
          {t('team_chart.title')}
        </h2>
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
          {/* Chart */}
          <div className="relative w-full max-w-sm h-72 md:h-96">
            <Doughnut data={chartData} options={options} />
          </div>

          {/* Descriptions */}
          <div className="w-full lg:w-1/2 space-y-4">
            {data.map((item, index) => (
              <div key={item.id} className="flex items-start gap-4">
                <div 
                  className="mt-1.5 w-4 h-4 rounded-full flex-shrink-0" 
                  style={{ backgroundColor: chartData.datasets[0].backgroundColor[index] }}
                ></div>
                <div>
                  <h4 className="font-bold text-lg text-white">{t(`team_chart.${item.id}.label`)} ({item.value})</h4>
                  <p className="text-gray-400">{t(`team_chart.${item.id}.description`)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamCompositionChart; 