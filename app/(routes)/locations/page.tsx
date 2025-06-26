"use client"
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import ScrollToTop from '@/components/ScrollToTop';
import Searchbycompetencies from '@/components/Searchbycompetencies';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';

const locations = [
    {title: "London", icon: "Ellipse-7", img: "Rectangle-86", number: 3}, {title: "paris", icon: "Ellipse-7-(1)", img: "Rectangle-86-(1)", number: 3},
    {title: "damascus", icon: "Ellipse-7-(2)", img: "Rectangle-86-(2)", number: 4}, {title: "dubai", icon: "Ellipse-7-(3)", img: "Rectangle-86-(3)", number: 3},
    {title: "barcelona", icon: "Ellipse-7-(4)", img: "Rectangle-86-(4)", number: 3}, {title: "rome", icon: "Ellipse-7-(5)", img: "Rectangle-86-(5)", number: 3},
    {title: "amsterdam", icon: "Ellipse-7-(6)", img: "Rectangle-86-(6)", number: 4}, {title: "istanbul", icon: "Ellipse-7-(7)", img: "Rectangle-86-(7)", number: 4},
    {title: "madrid", icon: "Ellipse-7-(8)", img: "Rectangle-86-(8)", number: 3}, {title: "sharm el sheikh", icon: "Ellipse-7-(9)", img: "Rectangle-86-(9)", number: 3},
    {title: "manchester", icon: "Ellipse-7-(10)", img: "Rectangle-86-(10)", number: 4}, {title: "Athens", icon: "Ellipse-7-(11)", img: "Rectangle-86-(11)", number: 3},
]

 const VITE_API_LINK="https://api.euptc.com"

const Locations = () => {
  const [phoneNumber, setPhoneNumber] = useState(null);
  const navigate = useRouter();

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
    <div className="max-w-screen-2xl mx-auto">
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

        <Searchbycompetencies />

        <section className="container-px py-[60px] font-goldman bg-[#F5F5F5] lg:pb-[140px] md:pb-[110px] pb-[80px]">
            <h1 className="xs:text-2xl text-[22px] text-red mb-8">Discover the training world cities</h1>

            <div className="grid lg:grid-cols-4 md:grid-cols-3 xs:grid-cols-2 gap-x-[14.5px] gap-y-10">
                {locations.map(({ title, icon, img, number }) => (
                    <div
                        className="group shadow-custom flex flex-col overflow-hidden cursor-pointer"
                        key={title}
                        onClick={() => navigate.push(`/courses?city=${encodeURIComponent(title)}`)}
                    >
                        <div className="bg-[#2C3C58] py-2 px-3 text-white capitalize xl:text-[20px] text-[18px] max-md:text-[20px] z-10">
                            <h4>{title}</h4>
                        </div>
                        <div className="relative">
                            <div>
                                <picture>
                                    <source srcSet={`optimized-imgs/Locations/${img}.webp`} type="image/webp" />
                                    <img
                                        className="min-w-full transition brightness-75 duration-300 group-hover:brightness-100 group-hover:scale-105"
                                        src={`imgs/Locations/${img}.png`}
                                        alt={title}
                                        loading="lazy"
                                    />
                                </picture>
                            </div>

                            <div className="flex-center rounded-full absolute bottom-0 translate-y-1/4 left-1/2 -translate-x-1/2 w-[27%] h-[32%]">
                                <div
                                    className="relative p-[4px] bg-[#F5F5F5] rounded-full w-full h-full
                                                                before:content-[''] before:absolute before:inset-0 before:rounded-full xl:before:border-[4.8px] md:before:border-4 sm:before:border-[4.8px] xs:before:border-4 before:border-[5.6px] max-[400px]:before:border-[4.8px] 
                                                                before:border-[#2C3C58] before:scale-0 before:transition-transform before:duration-500 group-hover:before:scale-110 before:z-20"
                                >
                                    <div className="absolute inset-0 rounded-full border-8 border-transparent transition-all duration-300 group-hover:delay-1000 group-hover:border-t-red group-hover:border-b-red animate-spin-slow"></div>

                                    <div className="flex-center bg-[#2C3C58] rounded-full p-1 w-full h-full z-10 relative">
                                        <picture>
                                            <source srcSet={`optimized-imgs/Locations/${icon}.webp`} type="image/webp" />
                                            <img
                                                className="xl:min-w-[60px] xl:min-h-[62.6px]"
                                                src={`imgs/Locations/${icon}.png`}
                                                alt={title}
                                                loading="lazy"
                                            />
                                        </picture>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="h-[91px] max-xs:h-[120px] max-[400px]:h-[91px] xl:text-[18px] max-md:text-[18px] flex-center text-[#2C3C58]">
                            {number} Locations
                        </div>
                    </div>
                ))}
            </div>
        </section>
    </div>
    </Suspense>
     </main>

    {!hideHeaderFooter && <Footer />}

    </>
)
}

export default Locations