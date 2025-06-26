"use client"
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import ScrollToTop from '@/components/ScrollToTop';
import StatisticsSection from '@/components/StatisticsSection';
import { usePathname } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import {Goldman} from "next/font/google"


const inter = Goldman({ subsets: ["latin"] , weight:['400','700']});

const statistics = [
  { icon: 'trained-group', number: 63, text: 'Professionals Trained' },
  {
    icon: 'programs-group',
    number: 92,
    text: 'Corporate Development Programs',
  },
  { icon: 'bag-solid', number: 121, text: 'Specialized Training Courses' },
  { icon: 'hospital-solid', number: 34, text: 'Companies We Helped' },
];

const Trainers = () => {
  const [trainers, setTrainers] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState(null);

  const pathnamee = usePathname();
      const hideHeaderFooter = pathnamee === '/pdf';

  const VITE_API_LINK="https://api.euptc.com"

  useEffect(() => {
    // Fetch trainers from API
    fetch(`${VITE_API_LINK}/api/instructors`)
      .then((res) => res.json())      .then((data) => setTrainers(data))
      .catch((err) => console.error('Failed to fetch trainers:', err));
  }, []);

  useEffect(() => {
    // Fetch phone number from API
    fetch(`${VITE_API_LINK}/api/contact`)
      .then((res) => res.json())
      .then((data) => {
        setPhoneNumber(data[0].phone);
      })
      .catch((err) => {
        console.error('Failed to fetch contact:', err);
      });
  }, []);
  
  return (
    <>
      <ScrollToTop />

      {!hideHeaderFooter && <Header />}
    <main>
    <Suspense fallback={<div className="text-center py-20 font-goldman">Loading...</div>}>
    <div id='trainers-grid' className="max-w-screen-2xl mx-auto font-arial">
      {/* WhatsApp Floating Icon */}
      <a
        href={`https://wa.me/${phoneNumber}`}
        target='_blank'
        rel='noopener noreferrer'
        className='fixed bottom-6 right-6 z-50 bg-green-500 rounded-full p-3 shadow-lg hover:bg-green-600 transition-colors'
        aria-label='Chat on WhatsApp'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='32'
          height='32'
          fill='white'
          viewBox='0 0 24 24'
        >
          <path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.447-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.148-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.372-.01-.571-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.363.709.306 1.262.489 1.694.626.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347zm-5.421 7.617h-.001a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.999-3.648-.235-.374A9.86 9.86 0 012.1 12.893C2.073 7.61 6.659 3.017 12.002 3c2.652.009 5.146 1.037 7.019 2.916a9.822 9.822 0 012.92 7.013c-.017 5.383-4.603 9.977-9.97 9.977zm8.413-18.29A11.815 11.815 0 0012.003.001C5.373.022.066 5.36.099 11.993c.017 2.11.553 4.162 1.601 5.977L.057 24l6.153-1.637a11.89 11.89 0 005.841 1.489h.005c6.627 0 12.015-5.385 12.033-12.009a11.821 11.821 0 00-3.504-8.435z' />
        </svg>
      </a>

      <div>
        <div className="container-px flex justify-between max-lg:flex-col gap-x-20 font-times pt-9">
            <div className="py-5 pb-16 px-2 xl:max-w-[650px] lg:max-w-[520px] max-w-full w-full">
                <div>
                    <h1 className={`${inter.className} mb-6 text-[#F9B223] xl:text-[35px] lg:text-[31px] sm:text-[35px] text-[30px]`}>Our Trainers</h1>
                    <p className="xl:text-[21px] 
                    lg:text-[17px] sm:text-[21px] text-[#545353]">
                        <span className="xl:text-[34px] lg:text-[32px] sm:text-[34px] text-[30px] text-[#BBB8B9]">At </span>
                         Europe Professional Training, we pride ourselves on our elite team of trainers—leading university professors and industry
                         experts from countries like the UK, France, Switzerland, Canada, and the US. <br/> Renowned for their excellence, 
                         they combine academic expertise with real-world insight to deliver high-quality, impactful training programs.
                    </p>
                </div>

                {/* Statistics section */}
                <StatisticsSection statistics={statistics} />
            </div>
            <div className="flex justify-center w-full items-end xl:max-w-[600px] lg:max-w-[440px]">
                <picture>
                    <source srcSet="optimized-imgs/Trainers/trainer-0.webp" type="image/webp" />
                    <img className="max-sm:max-h-[400px]" src="imgs/Trainers/trainer-0.png" alt="trainer-0" />
                </picture>
            </div>
        </div>      
        </div>

      <div className="container-px bg-[#F4F3F3] grid lg:grid-cols-2 gap-x-4 max-sm:gap-y-4 pt-14 lg:pb-[130px] md:pb-[100px] pb-[70px]">
          {trainers.map((trainer:any, i:any) => {
              // Checkerboard pattern logic
              const isReversed = (Math.floor(i / 2) + i % 2) % 2 === 1;
          
              return (
                  <div className={`flex rounded-[9px] border-4 border-white overflow-hidden even:max-lg:flex-row-reverse max-sm:!flex-col ${isReversed ? "lg:flex-row-reverse" : ""}`} key={trainer._id || i}>
                      <div className={`sm:w-1/2 border-white box-content max-sm:border-b-[5px] ${isReversed ? "sm:border-l-[5px]" : "sm:border-r-[5px]"}`}>
                          <picture className="w-full">
                              <img 
                                  className="w-full"
                                  src={trainer.img}
                                  alt={trainer.name}
                                  loading="lazy"
                              />
                          </picture>
                      </div>
                      <div className="py-5 px-4 sm:w-1/2">
                          <h4 className={`${inter.className} font-bold lg:text-[17px] mb-4  sm:text-[16px] text-[18px]`}>{trainer.name}</h4>
                          <p className="lg:text-[16px] 
                           sm:text-[14px] text-[16px]">{trainer.short_description}</p>
                      </div>
                  </div>
              );
          })}
      </div>
    </div>
    </Suspense>
    </main> 
    
        {!hideHeaderFooter && <Footer />}
    </>
  );
};

export default Trainers;
