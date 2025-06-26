"use client"
import React, { useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import "swiper/swiper-bundle.css";


const PlacesCarousel = () => {
  const places = useMemo(() => [
    {title: "Dubai", img: "image-1"}, {title: "Rome", img: "image-2"}, {title: "Dubai", img: "image-3"},
    {title: "Amsterdam", img: "image-4"}, {title: "Dubai", img: "image-5"}, {title: "London", img: "image-6"},
    {title: "Rome", img: "image-7"}, {title: "London", img: "image-8"}, {title: "Amsterdam", img: "image-9"},
  ], [])

  return (
    <Swiper
      className='places-carousel h-[390px] bg-gray-700 flex flex-row-reverse'
      modules={[Navigation]}
      navigation
      slidesPerView={1}
      spaceBetween={0}
      breakpoints={{
        480: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        1024: { slidesPerView: 7 },
        1280: { slidesPerView: 8 },
        1536: { slidesPerView: 9 },
      }}
    >
      {places.map(({ title, img }) => {
        const citySlug = title.toLowerCase();
        return (
          <SwiperSlide key={title+img} className="places-slide !transition-all !duration-300 group xs:hover:!w-[380px] w-[188px]">
            <div className='relative h-full text-center text-white overflow-hidden'>
              <picture>
                <source srcSet={`optimized-imgs/Home/places-carousel/${img}.webp`} type='image/webp' />
                <img className='absolute left-0 top-0 h-full w-full object-cover group-hover:grayscale-0 grayscale brightness-50
                transition-all duration-300' src={`imgs/Home/places-carousel/${img}.jpg`} alt={title} loading='lazy' />
              </picture>
              <div className='absolute left-[30px] top-[40px] z-10'>
                <h4 className='xl:text-[24px] text-[19px] font-bold relative w-fit'>{title}
                  <span className='absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full bg-red transition-all duration-300'></span>
                </h4>
              </div>
              <div className='absolute flex flex-col gap-6 max-w-full bottom-[40px] left-0 pe-[30px] z-10 opacity-0 
              group-hover:opacity-100 group-hover:left-[30px] transition-all group-hover:duration-700'>
                <p className='xl:text-[18px] text-start'>The City of Light Welcomes You With One of The Best Courses In Europe</p>
                <a href={`/courses?city=${encodeURIComponent(title)}`} className='btn-red w-[132px] xl:!text-[18px] !text-[16px] py-[6px]'>Find More</a>
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default PlacesCarousel;
