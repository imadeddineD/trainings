"use client"
import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip } from 'chart.js';
Chart.register(ArcElement, Tooltip);

const data:any = {
  labels: [
    'تنفيذ المطلوب',
    'الالتزام بتعاليم المؤسسة',
    'استيعاب المطلوب',
    'التواصل مع الآخرين',
    'التعاون والمشاركة',
    'القدرة على الإنجاز',
  ],
  datasets: [
    {
      data: [6, 5, 4, 3, 2, 1.8],
      backgroundColor: [
        '#67b7dc',
        '#6794dc',
        '#6771dc',
        '#8067dc',
        '#a367dc',
        '#c767dc',
      ],
      borderWidth: 0,
      borderRadius: 10,
      circumference: 180,
      rotation: -90,
      cutout: '50%',
    },
  ],
};

const sliceLabelPlugin:any = {
  id: 'sliceLabelPlugin',
  afterDraw(chart:any) {
    // Skip drawing labels on small screens
    if (window.innerWidth < 480) {
      return;
    }
    const { ctx, data } = chart;
    const meta = chart.getDatasetMeta(0);

    ctx.save();
    ctx.fillStyle = '#1e0101';
    ctx.font = '14px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    meta.data.forEach((arc:any, index:any) => {
      const center = arc.getCenterPoint();
      const radius = arc.outerRadius;
      const angle = (arc.startAngle + arc.endAngle) / 2;

      // push labels a bit farther out from arc center
      const labelX = center.x + radius * 0.7 * Math.cos(angle);
      const labelY = center.y + radius * 0.5 * Math.sin(angle);

      ctx.fillText(data.labels[index], labelX, labelY);
    });

    ctx.restore();
  },
};

export default function HalfDonutChartTailwind( {chartData, chartLabels}:any) {
  const [options, setOptions] = useState(getOptions(window.innerWidth));

  const data = {
    labels: chartLabels || [],
    datasets: [
      {
        data: chartData || [],
        backgroundColor: [
          '#67b7dc',
          '#6794dc',
          '#6771dc',
          '#8067dc',
          '#a367dc',
          '#c767dc',
        ],
        borderWidth: 0,
        borderRadius: 10,
        circumference: 180,
        rotation: -90,
        cutout: '50%',
      },
    ],
  };
  
  function getOptions(width:any) {
    const isVerySmallScreen = width < 480;
    if (isVerySmallScreen) {
      return {
        plugins: {
          legend: { display: false },
          tooltip: {
            enabled: true,
            callbacks: {
              label: (context:any) => context.label,
            },
          },
        },
        maintainAspectRatio: false,
        layout: {
          padding: {
            top: 10,
            right: 20,
            bottom: 5,
            left: 20,
          },
        },
      };
    }

    // Define a max width for scaling - you can adjust this
    const baseWidth = width >= 1024 ? 1400 : 650;

    // Calculate padding proportional to width, but capped at min and max values
    const scale = Math.min(width / baseWidth, 1); // max scale 1

    return {
      plugins: {
        legend: { display: false },
        tooltip: {
          enabled: true,
          callbacks: {
            label: (context:any) => context.label,
          },
        },
      },
      maintainAspectRatio: false,
      layout: {
        padding: {
          top: 80 * scale,
          right: 120 * scale,
          bottom: 40 * scale,
          left: 120 * scale,
        },
      },
    };
  }

  useEffect(() => {
    function handleResize() {
      setOptions(getOptions(window.innerWidth));
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      className="bg-white rounded-xl drop-shadow-[0px_10px_5px_rgba(117,116,113,0.39)] p-2 lg:h-[370px] xs:h-[250px] max-xs:max-h-[350px]">
      <ul className="xs:hidden w-full mb-1 flex flex-wrap gap-2 text-[#1e0101] text-xs">
        <li className="flex items-start gap-3">
          <span className={`w-3 h-3 bg-[${data.datasets[0].backgroundColor[0]}] mt-1 rounded-sm shrink-0`}></span>
          {data.labels[0]}
        </li>
        <li className="flex items-start gap-2">
          <span className={`w-3 h-3 bg-[${data.datasets[0].backgroundColor[1]}] mt-1 rounded-sm shrink-0`}></span>
          {data.labels[1]}
        </li>
        <li className="flex items-start gap-2">
          <span className={`w-3 h-3 bg-[${data.datasets[0].backgroundColor[2]}] mt-1 rounded-sm shrink-0`}></span>
          {data.labels[2]}
        </li>
        <li className="flex items-start gap-2">
          <span className={`w-3 h-3 bg-[${data.datasets[0].backgroundColor[3]}] mt-1 rounded-sm shrink-0`}></span>
          {data.labels[3]}
        </li>
        <li className="flex items-start gap-2">
          <span className={`w-3 h-3 bg-[${data.datasets[0].backgroundColor[4]}] mt-1 rounded-sm shrink-0`}></span>
          {data.labels[4]}
        </li>
        <li className="flex items-start gap-2">
          <span className={`w-3 h-3 bg-[${data.datasets[0].backgroundColor[5]}] mt-1 rounded-sm shrink-0`}></span>
          {data.labels[5]}
        </li>
      </ul>

      <div className='flex-center w-full h-full'>
        <Doughnut data={data} options={options} plugins={[sliceLabelPlugin]} />
      </div>
    </div>
  );
}
