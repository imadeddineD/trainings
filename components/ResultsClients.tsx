"use client"
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import chart components with ssr: false to prevent server-side rendering issues
const AchievementGaugeTailwind = dynamic(
  () => import('@/app/results/charts/AchievementGaugeTailwind'),
  { ssr: false }
);

const BarChart2Tailwind = dynamic(
  () => import('@/app/results/charts/BarChart2Tailwind'),
  { ssr: false }
);

const BarChartTailwind = dynamic(
  () => import('@/app/results/charts/BarChartTailwind'),
  { ssr: false }
);

const BasicAreaChartTailwind = dynamic(
  () => import('@/app/results/charts/BasicAreaChartTailwind'),
  { ssr: false }
);

const HalfDonutChartTailwind = dynamic(
  () => import('@/app/results/charts/HalfDonutChartTailwind'),
  { ssr: false }
);

const PieChartTailwind = dynamic(
  () => import('@/app/results/charts/PieChartTailwind'),
  { ssr: false }
);

interface User {
  user_id: string;
  first_name: string;
}

interface ResultsClientProps {
  user: User | null;
}

const ResultsClient = ({ user }: ResultsClientProps) => {
  const [subsectionResults, setSubsectionResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const VITE_API_LINK = "https://api.euptc.com";

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!user?.user_id) {
      console.log('No user ID found, setting loading to false');
      setIsLoading(false);
      return;
    }

    console.log('Starting data fetch for user:', user.user_id);
    setIsLoading(true);
    
    const startTime = Date.now();
    const minLoadingTime = 500;
    
    fetch(`${VITE_API_LINK}/api/sections/${user.user_id}/subsection-results`)
      .then((res) => {
        console.log('Response received:', res.status);
        return res.json();
      })
      .then((data) => {
        console.log('Data received:', data);
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, minLoadingTime - elapsedTime);
        
        setTimeout(() => {
          setSubsectionResults(data);
          setIsLoading(false);
          console.log('Loading set to false');
        }, remainingTime);
      })
      .catch((err) => {
        console.error('Error fetching results:', err);
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, minLoadingTime - elapsedTime);
        
        setTimeout(() => {
          setIsLoading(false);
          console.log('Loading set to false due to error');
        }, remainingTime);
      });
  }, [user?.user_id]);

  const groupBySection = (data: any) => {
    const grouped: any = {};
    data.forEach((item: any) => {
      const section = item.section_title;
      if (!grouped[section]) grouped[section] = [];
      grouped[section].push(item);
    });
    return grouped;
  };

  const toGaugeProps = (item: any) => {
    const correct = Number(item.correct_answers);
    const total = Number(item.total_questions_answered);
    const percent = total > 0 ? (correct / total) * 100 : 0;

    return {
      title: item.sub_section_title,
      percent,
      points: `${correct}/${total}`,
      desc: '',
      color: percent >= 70 ? '#4caf50' : '#f44336',
    };
  };

  const getSectionAverages = () => {
    const sectionSums: any = {};
    const sectionCounts: any = {};

    subsectionResults.forEach((item: any) => {
      const section = item.section_title;
      const correct = Number(item.correct_answers);
      const total = Number(item.total_questions_answered);
      const percent = total > 0 ? (correct / total) * 100 : 0;

      if (!sectionSums[section]) {
        sectionSums[section] = 0;
        sectionCounts[section] = 0;
      }

      sectionSums[section] += percent;
      sectionCounts[section] += 1;
    });

    const averages = Object.keys(sectionSums).map((section) => ({
      section,
      average: Number((sectionSums[section] / sectionCounts[section]).toFixed(2)),
    }));

    return averages;
  };

  const categorizedResults = groupBySection(subsectionResults);
  const sectionAverages = subsectionResults.length > 0 ? getSectionAverages() : [];

  // Loading component
  const LoadingSpinner = () => (
    <div className='flex items-center justify-center py-20'>
      <div className='flex flex-col items-center gap-4'>
        <div className='animate-spin rounded-full h-16 w-16 border-b-2 border-[#03727d]'></div>
        <p className='text-[#03727d] text-lg font-semibold'>جاري تحميل النتائج...</p>
      </div>
    </div>
  );

  // Don't render charts until component is mounted on client
  if (!isMounted) {
    return <LoadingSpinner />;
  }

  return (
    <div className='py-14 flex flex-col gap-5'>
      {isLoading ? (
        <LoadingSpinner />
      ) : subsectionResults.length === 0 ? (
        <div className='text-center text-xl font-semibold text-gray-600 py-20'>
          لا توجد نتائج لعرضها
        </div>
      ) : (
        <>
          {/* Overall Charts */}
          <div className='grid lg:grid-cols-5 grid-cols-1 gap-4'>
            <div className='lg:col-span-2 col-span-1'>
              <PieChartTailwind averages={sectionAverages} />
            </div>
            <div className='lg:col-span-3 col-span-1'>
              <BarChart2Tailwind averages={sectionAverages} />
            </div>
          </div>

          {Object.entries(categorizedResults).map(
            ([sectionTitle, sectionData]: any, idx) => {
              const donutLabels = sectionData.map((item: any) => item.sub_section_title);
              const donutValues = sectionData.map((item: any) => item.total_questions_answered);
              const areaChartSeries = [
                {
                  name: `${sectionTitle} (%)`,
                  data: sectionData.map((item: any) => {
                    const correct = Number(item.correct_answers);
                    const total = Number(item.total_questions_answered);
                    return total > 0 ? Math.round((correct / total) * 100) : 0;
                  }),
                },
              ];

              const areaChartOptions = {
                chart: {
                  id: `${sectionTitle}-area`,
                  toolbar: { show: false },
                },
                xaxis: {
                  categories: sectionData.map((item: any) => item.sub_section_title),
                  labels: {
                    style: { fontSize: '14px', colors: '#1e0101' },
                  },
                },
                yaxis: {
                  max: 100,
                  min: 0,
                  labels: {
                    style: { fontSize: '14px', colors: '#1e0101' },
                    formatter: (val: any) => `${val}%`,
                  },
                },
                dataLabels: {
                  enabled: true,
                  formatter: (val: any) => `${val}%`,
                },
                colors: ['#03727d'],
                stroke: {
                  curve: 'smooth',
                  width: 2,
                },
                fill: {
                  type: 'gradient',
                  gradient: {
                    shadeIntensity: 1,
                    opacityFrom: 0.7,
                    opacityTo: 0.3,
                    stops: [0, 100],
                  },
                },
                title: {
                  text: `نسب النجاح في ${sectionTitle}`,
                  align: 'center',
                  style: {
                    fontSize: '16px',
                    color: '#03727d',
                    fontWeight: 'bold',
                  },
                },
              };

              return (
                <div
                  key={idx}
                  className='flex flex-col gap-5 p-6 bg-[#eff1f1] rounded-xl drop-shadow-[0px_10px_5px_rgba(117,116,113,0.39)]'
                >
                  <h2 className='font-semibold mb-6 text-[#03727d] xs:text-[24px] text-[19px]'>
                    نتائج تقييم وحدات {sectionTitle}
                  </h2>

                  <div className='grid lg:grid-cols-6 md:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-[10px]'>
                    {sectionData.map((item: any, i: any) => (
                      <AchievementGaugeTailwind {...toGaugeProps(item)} key={i} />
                    ))}
                  </div>

                  <div className='grid lg:grid-cols-9 grid-cols-1 gap-3'>
                    <div className='lg:col-span-4 col-span-1'>
                      <HalfDonutChartTailwind
                        chartData={donutValues}
                        chartLabels={donutLabels}
                      />
                    </div>
                    <div className='lg:col-span-5 col-span-1'>
                      <BasicAreaChartTailwind
                        chartSeries={areaChartSeries}
                        chartOptions={areaChartOptions}
                      />
                    </div>
                  </div>
                </div>
              );
            }
          )}

          {/* Total Competency Summary */}
          <div className='mt-6'>
            <BarChartTailwind sectionAverages={sectionAverages} />
          </div>
        </>
      )}
    </div>
  );
};

export default ResultsClient;