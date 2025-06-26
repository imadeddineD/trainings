"use client"
import Searchbycompetencies from "@/components/Searchbycompetencies";
import { lazy, Suspense, useEffect, useState } from "react";
import { Goldman } from "next/font/google";
import ScrollToTop from "@/components/ScrollToTop";
import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Goldman({ subsets: ["latin"] , weight:['400','700']});

const TrainersSection = lazy(() => import('../../components/TrainersSection'));
const PlacesCarousel = lazy(() => import('../../components/PlacesCarousel'));
const ClientsCarousel = lazy(() => import('../../components/ClientsCarousel'));
const SkillsSection = lazy(() => import('../../components/SkillsSection')); 
const SpecialtiesSection = lazy(() => import('../../components/SpecialtiesSection')); 
const PopularCourses = lazy(() => import('../../components/PopularCourses')); 
const Blogs = lazy(() => import('../../components/Blogs')); //notyet


export default function Home() {
  const [phoneNumber, setPhoneNumber] = useState(null);
  const VITE_API_LINK="https://api.euptc.com"

  const pathname = usePathname();
  const hideHeaderFooter = pathname === '/pdf';

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
      <div className='max-w-screen-2xl mx-auto font-arial mb-20'>
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

      <Searchbycompetencies />

       <Suspense fallback={null}>
        <TrainersSection />
      </Suspense>

      <section id='places-section'>
        <div className='container-px places-headings bg-[linear-gradient(182.49deg,_#2D108C_-20.63%,_#DA0E29_49.15%)] lg:py-[60px] md:py-12 py-9'>
          <h2 className={`${inter.className} xl:text-[48px] lg:text-[43px] md:text-[32px] text-[29px] text-white lg:mb-5 mb-3`}>
            Discover the places that you like to be in
          </h2>
          <p className='lg:text-[28px] md:text-[25px] text-[22px] font-bold text-[#E6E6E6]'>
            We are excited to welcome you here.
          </p>
        </div>

        <Suspense fallback={null}>
          <PlacesCarousel />
        </Suspense>

          </section>

        <Suspense fallback={null}>
        <ClientsCarousel componentTitle="Our Partners" componentEndpoint="partners" />
      </Suspense>

       <Suspense fallback={null}>
        <SkillsSection />
      </Suspense>

      <Suspense fallback={null}>
        <SpecialtiesSection />
      </Suspense>

      <Suspense fallback={null}>
        <ClientsCarousel componentTitle="Our Valuable Clients" componentEndpoint="clients" />
      </Suspense>


        <section className='container-px bg-[#F6F6F6] py-[60px] gap-5 flex max-md:flex-col max-md:items-center'>
        <div className='max-md:order-2'>
          <h2 className='font-bold text-[#DA0E29] xl:text-[28px] lg:text-[24px] md:text-[20px] xs:text-[32px] text-[20px] mb-[14px]'>
            Employees Assessment
          </h2>
          <h3 className={`${inter.className} xl:text-[40px] lg:text-[32px] md:text-[27px] xs:text-[32px] text-[27px] text-blue mb-[10px]`}>
            Assessment Program Based on Competencies
          </h3>
          <p className='font-bold text-blue mb-11'>
            A Specialized Assessment Program for Trainees
          </p>
          <a href='/login' className='btn-yellow'>
            Read More
          </a>
        </div>
        <div>
          <picture>
            <source
              srcSet='optimized-imgs/Home/statistics.webp'
              type='image/webp'
            />
            <img
              src='imgs/Home/statistics.png'
              alt='statistics'
              loading='lazy'
            />
          </picture>
        </div>
      </section>

 <Suspense fallback={null}>
        <PopularCourses />
      </Suspense>

      <Suspense fallback={null}>
        <Blogs />
      </Suspense>

    


       
    </div>
    </Suspense>
    </main>

    {!hideHeaderFooter && <Footer />}

    </>
  );
}
