"use client"
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import imgPlaceholder from '../public/assets/img.png';
import { Goldman } from "next/font/google";

const inter = Goldman({ subsets: ["latin"] , weight:['400','700']})

// Helper function to slugify course titles
function slugify(text:any) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, '-') // Replace spaces and non-word chars with -
    .replace(/^-+|-+$/g, '');  // Remove leading/trailing dashes
}

const PopularCourses = () => {
  const [popularCourses, setPopularCourses] = useState([]);
  const VITE_API_LINK="https://api.euptc.com"

  useEffect(() => {
    fetch(`${VITE_API_LINK}/api/popular-courses`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setPopularCourses(data);
      })
      .catch((error) => {
        console.error('Error fetching popular courses:', error);
      });
  }, []);

  return (
    <section className='container-px xl:py-[75px] py-[60px]'>
      <div className='text-center mb-[60px]'>
        <h2 className='font-bold text-[28px] text-[#DA0E29] mb-[14px]'>
          Our Popular Courses
        </h2>
        <h3 className={`${inter.className} text-[#2C3C58] xl:text-[45px] xs:text-[35px] text-[32px]`}>
          Pick up One of The Most Popular Courses
        </h3>
      </div>

      <Swiper
        modules={[Navigation]}
        navigation
        slidesPerView={1}
        spaceBetween={10}
        breakpoints={{
          480: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 5 },
          1280: { slidesPerView: 5 },
        }}
      >
        {popularCourses.map((course:any) => (
          <SwiperSlide key={course.id}>
            <div
              className='text-white xl:text-[18px] lg:text-[14px] text-[18px] xl:h-[334px] lg:h-[300px] h-[334px] rounded-[10px] overflow-hidden
              xl:px-5 lg:px-4 px-5 xl:py-[34px] lg:py-[30px] py-[34px] bg-cover bg-center relative group'
              style={{
                backgroundImage: `url(${
                  course.thumbnail ? course.thumbnail : imgPlaceholder
                })`,
              }}
            >
              <div className='absolute left-0 top-0 h-full w-full bg-gradient-to-b from-transparent to-black group-hover:opacity-0 transition-opacity duration-[220ms]'></div>
              <div className='relative z-10 h-full w-full flex flex-col justify-end xl:gap-[18px] lg:gap-[15px] gap-[18px]'>                
                <h4>{course.title}</h4>
                <a
                  href={`/courses/${slugify(course.title)}`}
                  className='text-[#2C3C58] rounded-[8px] bg-white xl:w-[127px] lg:w-[110px] w-[127px] text-center xl:py-[6.5px] lg:py-[5px] py-[6.5px]'
                >
                  See More
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default PopularCourses;
