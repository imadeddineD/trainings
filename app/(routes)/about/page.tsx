"use client"
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import ScrollToTop from '@/components/ScrollToTop';
import StatisticsSection from '@/components/StatisticsSection';
import { usePathname } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import { Goldman } from "next/font/google"
import dynamic from 'next/dynamic';

// Solution 1: Dynamically import WorldMap with SSR disabled
const WorldMap = dynamic(() => import('@/components/LocationsMap'), {
  ssr: false,
  loading: () => <div className="flex justify-center items-center h-64">Loading map...</div>
});

const inter = Goldman({ subsets: ["latin"], weight: ['400', '700'] });

const statistics = [
    { icon: "trained-group", number: 3, text: "Partners across Europe and Saudi Arabia" },
    { icon: "programs-group", number: 12, text: "Cities where we deliver our courses" },
    { icon: "bag-solid", number: 10, text: "Specialized training fields" },
    { icon: "hospital-solid", number: 63, text: "Certified expert trainers" },
]

const About = () => {
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [isClient, setIsClient] = useState(false);

  const pathnamee = usePathname();
  const hideHeaderFooter = pathnamee === '/pdf';

  const VITE_API_LINK = "https://api.euptc.com"

  // Solution 2: Check if we're on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Only run on client side
    if (typeof window !== 'undefined') {
      // Fetch phone number from API
      fetch(`${VITE_API_LINK}/api/contact`)
        .then((res) => res.json())
        .then((data) => {
          setPhoneNumber(data[0].phone);
        })
        .catch((err) => {
          console.error('Failed to fetch contact:', err);
        });
    }
  }, []);

  return (
    <>
      <ScrollToTop />

      {!hideHeaderFooter && <Header />}
      <main>
        <Suspense fallback={<div className="text-center py-20 font-goldman">Loading...</div>}>
          <div className="max-w-screen-2xl mx-auto font-arial">
            {/* WhatsApp Floating Icon - Only render on client side */}
            {isClient && phoneNumber && (
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
            )}

            <section className="container-px flex justify-between max-lg:flex-col gap-x-11 font-times pt-9">
              <div className="py-5 pb-16 px-2 xl:max-w-[850px] lg:max-w-[520px] max-w-full w-full">
                <div>
                  <h1 className={`${inter.className} mb-6 text-[#F9B223] xl:text-[35px] lg:text-[31px] sm:text-[35px] text-[30px]`}>Who are we?</h1>
                  <p className="xl:text-[20px] lg:text-[16px] sm:text-[20px] text-[#545353]">
                    <span className="xl:text-[36px] lg:text-[32px] sm:text-[36px] text-[30px] text-gray-700">E</span>
                    urope Professional Training is a trusted Europe-based training provider offering over 600 professional courses in
                    fields such as Media, Leadership, HR, Business, Project Management, Public Relations, Engineering, and more. <br />
                    We are committed to delivering high-quality training to professionals globally. <br /> Registered in England and Wales under Company
                    Number: 12566386. We focus on empowering individuals and organisations through effective learning experiences. <br />
                    Our courses are based on competencies that improve employees skills.
                  </p>
                </div>

                {/* Statistics section */}
                <div className="max-w-[620px]">
                  <StatisticsSection statistics={statistics} />
                </div>

              </div>
              <div className="flex-center w-full xl:max-w-[500px] lg:max-w-[340px]">
                <picture>
                  <source srcSet="optimized-imgs/About/Rectangle-30197.webp" type="image/webp" />
                  <img className="max-sm:max-h-[400px]" src="imgs/About/Rectangle-30197.png" alt="Rectangle-30197" />
                </picture>
              </div>
            </section>

            {/* services section */}
            <section className={`${inter.className} container-px group bg-[#EFF2F7] py-11 font-goldman xl:text-[18px] lg:text-[15px]  sm:text-[14.5px]`}>
              <div>
                <h2 className="mx-auto w-fit relative after:content-[''] after:absolute after:w-1/2 after:h-[2px] after:bg-red after:bottom-0 after:left-1/2
                 pb-[7px] text-[20px] after:-translate-x-1/2 group-hover:after:w-full after:transition-all duration-1000 capitalize">Our Services</h2>
              </div>
              <div className="grid lg:grid-cols-4 sm:grid-cols-2 mt-11 gap-11">
                <div className="flex-center flex-col gap-7 xl:px-7 px-5  sm:py-6 py-11 bg-[#ffffff] rounded-[7px]">
                  <picture>
                    <source srcSet="optimized-imgs/About/Classroom.webp" type="image/webp" />
                    <img className="max-w-[80px] max-h-[80px]" src="imgs/About/Classroom.png" alt="Classroom" loading="lazy" />
                  </picture>
                  <h3>Classroom Training</h3>
                </div>
                <div className="flex-center flex-col gap-7 xl:px-7 px-5  sm:py-6 py-11 bg-[#ffffff] rounded-[7px]">
                  <picture>
                    <source srcSet="optimized-imgs/About/OnlineCourses.webp" type="image/webp" />
                    <img className="max-w-[80px] max-h-[80px]" src="imgs/About/OnlineCourses.png" alt="OnlineCourses" loading="lazy" />
                  </picture>
                  <h3>Online Training</h3>
                </div>
                <div className="flex-center flex-col gap-7 xl:px-7 px-5  sm:py-6 py-11 bg-[#ffffff] rounded-[7px]">
                  <picture>
                    <source srcSet="optimized-imgs/About/Competencies.webp" type="image/webp" />
                    <img className="max-w-[80px] max-h-[80px]" src="imgs/About/Competencies.png" alt="Competencies" loading="lazy" />
                  </picture>
                  <h3>Competencies</h3>
                </div>
                <div className="flex-center flex-col gap-7 xl:px-7 px-5  sm:py-6 py-11 bg-[#ffffff] rounded-[7px]">
                  <picture>
                    <source srcSet="optimized-imgs/About/Assessment.webp" type="image/webp" />
                    <img className="max-w-[80px] max-h-[80px]" src="imgs/About/Assessment.png" alt="Assessment" loading="lazy" />
                  </picture>
                  <h3>Assessment Prog</h3>
                </div>
              </div>
            </section>

            {/* map section */}
            <section className="py-12 group pb-20">
              <div>
                <h2 className={`${inter.className} mx-auto w-fit relative after:content-[''] after:absolute after:w-1/2 after:h-[2px] after:bg-red after:bottom-0 after:left-1/2
                 pb-[7px] font-goldman text-[20px] after:-translate-x-1/2 group-hover:after:w-full after:transition-all duration-1000 capitalize`}>Our Locations</h2>
              </div>
              {/* map here - Only render on client side */}
              <div className="mt-11 max-h-[600px] max-w-full">
                {isClient && <WorldMap />}
              </div>
            </section>
          </div>
        </Suspense>
      </main>

      {!hideHeaderFooter && <Footer />}
    </>
  )
}

export default About