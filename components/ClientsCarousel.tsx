"use client"
import { useEffect, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Goldman } from 'next/font/google';

const inter = Goldman({ subsets: ["latin"] , weight:['400','700']});

type ClientsCarouselProps = {
  componentTitle: any;
  componentEndpoint: any;
};

const ClientsCarousel: React.FC<ClientsCarouselProps>  = ({componentTitle , componentEndpoint}) => {
  const [clients, setClients] = useState([]);
   const VITE_API_LINK="https://api.euptc.com"

  // Fetch clients from API on mount
  useEffect(() => {
    async function fetchClients() {
      try {
        const res = await fetch(`${VITE_API_LINK}/api/${componentEndpoint}`);
        if (!res.ok) throw new Error('Failed to fetch clients');
        const data = await res.json();
        setClients(data);
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    }
    fetchClients();
  }, []);

  // GSAP animation for infinite scroll
  useGSAP(() => {
    gsap.to('.logos-slide', {
      x: '-100%',
      duration: 35,
      repeat: -1,
      ease: 'linear',
    });
  }, []);

  return (
    <section className='container-px xl:py-[90px] lg:pt-[60px] lg:pb-[80px] py-[90px]'>
      <div>
        <h2 className={`${inter.className} lg:text-[45px] sm:text-[40px] text-[32px] text-center text-[#DA0E29] mb-[65px]`}>
          {componentTitle}
        </h2>
      </div>

      <div className='logos h-[140px] relative flex whitespace-nowrap overflow-hidden'>
        <div className='pointer-events-none absolute left-0 top-0 z-10 h-full w-[100px] bg-gradient-to-r from-white to-transparent'></div>
        <div className='pointer-events-none absolute right-0 top-0 z-10 h-full w-[100px] bg-gradient-to-l from-white to-transparent'></div>

        {/* First logos-slide */}
        <div className='logos-slide h-full flex shrink-0 items-center'>
          {clients.map((client:any) => (
            <a
              key={client.id}
              href={client.website ? client.website : client.link}
              target='_blank'
              rel='noopener noreferrer'
              className='h-full'
            >
              <img
                className='h-full mx-9 cursor-pointer object-contain'
                src={client.img_url ? client.img_url : client.logo}
                alt={client.name}
                loading='lazy'
              />
            </a>
          ))}
        </div>

        {/* Duplicate logos-slide for seamless infinite scroll */}
        <div className='logos-slide h-full flex shrink-0 items-center'>
          {clients.map((client:any) => (
            <a
              key={`${client.id}-2`}
              href={client.website ? client.website : client.link}
              target='_blank'
              rel='noopener noreferrer'
              className='h-full'
            >
              <img
                className='h-full mx-9 cursor-pointer object-contain'
                src={client.img_url? client.img_url : client.logo}
                alt={client.name}
                loading='lazy'
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsCarousel;
