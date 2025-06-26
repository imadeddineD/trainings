"use client"
import Chart from 'react-apexcharts';

const PieChartTailwind = ({ averages = [] }:any) => {
  const labels:any = averages.map((item:any) => item.section);
  const series:any = averages.map((item:any) => Math.round(item.average));

  const options:any = {
    labels,
    chart: {
      type: 'pie',
    },
    dataLabels: {
      enabled: true,
    },
    legend: {
      position: 'bottom',
      labels: {
        colors: '#000',
      },
    },
  };

  return (
    <div className="bg-white rounded-xl drop-shadow-[0px_10px_5px_rgba(117,116,113,0.39)] p-5">
      <h2 className="font-semibold mb-5 text-[#03727d] xs:text-[24px] text-[19px]">لمحة اجمالية لتصنيفات الجدارات</h2>
      <div id="piechart" className="flex-center">
        <div className="xs:w-[350px] w-[200px] h-[270px]">
          <Chart
            options={options}
            series={series}
            type="pie"
            width="100%"
            height="100%"
          />
        </div>
      </div>
    </div>
  );
};

export default PieChartTailwind;
