import React from 'react';
import { Chart } from 'react-google-charts';

const BarChart2Tailwind = ({ averages = [] }:any) => {
  const colorMap:any = {
    'السلوكية': 'color: #5ba6ff',
    'الفنية': 'color: #f35d82',
    'القيادية': 'color: #6ad49b',
  };

  const data :any= [
    ['Element', 'Density', { role: 'style' }],
    ...averages.map((item:any) => [
      item.section,
      Math.round(item.average),
      colorMap[item.section] || 'color: #ccc',
    ]),
  ];

  const overallAvg = averages.reduce((acc:any, cur:any) => acc + cur.average, 0) / (averages.length || 1);

  const options = {
    title: '',
    chartArea: { width: '61%' },
    hAxis: {
      minValue: 0,
      maxValue: 100,
      ticks: [0, 25, 50, 75, 100],
      format: '#\'%\'',
      textStyle: {
        fontSize: 19,
        color: '#1e0101',
      },
    },
    vAxis: {
      textStyle: {
        fontSize: 19,
        color: '#1e0101',
      },
    },
    legend: {
      position: 'top',
      alignment: 'end',
      textStyle: {
        fontSize: 19,
        color: '#1e0101',
      },
    },
    bar: { groupWidth: '50%' },
  };

  return (
    <div className="bg-white rounded-xl drop-shadow-[0px_10px_5px_rgba(117,116,113,0.39)] lg:p-5 p-2">
      <h2 className="font-semibold mb-5 text-[#03727d] xs:text-[24px] text-[19px]">
        متوسط إجمالي تقييم الجدارات
        <span className='text-black font-bold xs:text-[27px] text-[22px]'> {Math.round(overallAvg)}%</span>
      </h2>
      <div id="BarChart2" className="flex justify-center">
        <Chart
          chartType="BarChart"
          width="100%"
          height="265.5px"
          data={data}
          options={options}
        />
      </div>
    </div>
  );
};

export default BarChart2Tailwind;
