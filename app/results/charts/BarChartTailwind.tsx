"use client"

import React, { Fragment } from 'react';
import Chart from 'react-apexcharts';

const BarChartTailwind = ({ sectionAverages}:any) => {
  if (!Array.isArray(sectionAverages) || sectionAverages.length === 0) {
    return (
      <div className="bg-white rounded-xl drop-shadow-[0px_10px_5px_rgba(117,116,113,0.39)] p-6">
        <h2 className="font-semibold mb-5 text-[#03727d] xs:text-[24px] text-[19px]">
          نتائج تقييم جميع وحدات الجدارات
        </h2>
        <p className="text-center text-gray-500">لا توجد بيانات لعرضها</p>
      </div>
    );
  }

  const chartData = {
  options: {
    chart: {
      id: 'section-averages',
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: true, 
      },
    },
    xaxis: {
      categories: (sectionAverages || []).map((item) => item.section),
      labels: {
        style: {
          fontSize: '14px',
          colors: '#1e0101',
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val:any) => `${val.toFixed(2)}%`,
    },
    colors: ['#03727d'],
  },
  series: [
    {
      name: 'Average Score',
      data: (sectionAverages || []).map((item) =>
        parseFloat(item.average.toFixed(2))
      ),
    },
  ],
};

  return (
    <div className="bg-white rounded-xl drop-shadow-[0px_10px_5px_rgba(117,116,113,0.39)] p-6">
      <h2 className="font-semibold mb-5 text-[#03727d] xs:text-[24px] text-[19px]">
        نتائج تقييم جميع وحدات الجدارات
      </h2>
      <div id="basic-bar">
        <Chart options={chartData.options} series={chartData.series} type="bar" height={200} />
      </div>
    </div>
  );
};



export default BarChartTailwind;