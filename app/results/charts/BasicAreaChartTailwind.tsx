"use client"
import Chart from 'react-apexcharts';

type ClientsCarouselProps = {
chartSeries:any;
 chartOptions:any
};


const BasicAreaChartTailwind: React.FC<ClientsCarouselProps> = ({chartSeries, chartOptions}) => {
    return (
    <div className="bg-white rounded-xl drop-shadow-[0px_10px_5px_rgba(117,116,113,0.39)] p-5">
      <div id="basic-apex">
        <Chart
          options={chartOptions}
          series={chartSeries}
          type="area"
          height={315}
        />
      </div>
    </div>
  );
};

export default BasicAreaChartTailwind;
