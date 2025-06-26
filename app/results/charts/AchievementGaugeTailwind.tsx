"use client"
import React from 'react';
import Chart from 'react-apexcharts';

const AchievementGaugeTailwind = ({ subsection, title, percent, points, desc, color }:any) => {
  const chartOptions:any = {
    chart: {
      type: 'radialBar',
      offsetY: -10,
      sparkline: { enabled: true },
    },
    plotOptions: {
      radialBar: {
        startAngle: -100,
        endAngle: 100,
        hollow: { size: '45%' },
        track: {
          background: '#e6e6e6',
          strokeWidth: '97%',
        },
        dataLabels: {
          name: { show: false },
          value: {
            fontSize: '24px',
            fontWeight: 'bold',
            formatter: (val:any) => `${val.toFixed(1)}%`,
          },
        },
      },
    },
    fill: { colors: color },
    labels: [''],
    stroke: { lineCap: 'round' },
  };

  

  const series:any = [percent];

  return (
    <div className="bg-white rounded-xl drop-shadow-[0px_10px_5px_rgba(117,116,113,0.39)] xl:p-4 lg:p-2 p-4 text-center">
      <h3 className="text-[#03727d] font-bold text-sm mb-1">{subsection}</h3>
      <h4 className="xl:text-sm lg:text-xs text-sm text-[#03727d] font-semibold xl:min-h-[35px] lg:min-h-[32px] min-h-[35px]">
        {title}
      </h4>
      <Chart options={chartOptions} series={series} type="radialBar" height={180} />
      <p className="text-[#767677] text-xs xl:mb-4 lg:mb-2 mb-4">{points}</p>
      <p className="text-[#1e0101] text-xs mt-1 leading-snug">{desc}</p>
    </div>
  );
};

export default AchievementGaugeTailwind;
