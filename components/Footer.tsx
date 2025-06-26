"use client"
import { useEffect, useState } from 'react';
import {
  ChevronRight,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPinned,
  Youtube,
} from 'lucide-react';


const Footer = () => {
  const [contacts, setContacts] = useState([]);

  const VITE_API_LINK="https://api.euptc.com"

  useEffect(() => {
    fetch(`${VITE_API_LINK}/api/contact`)
      .then((response) => {
        if (!response.ok) throw new Error('Failed to fetch contact info');
        return response.json();
      })
      .then((data) => setContacts(data))
      .catch((error) => console.error('Error fetching contact info:', error));
  }, []);

  return (
    <footer className='bg-[#DA0E29] md:px-5 font-arial pt-4'>
      <div className='bg-[#2C3C58] md:-translate-y-5'>
        <div className='text-white xl:py-[60px] lg:py-[50px] py-9 flex justify-between flex-wrap gap-8 sm:px-6 px-5 xl:px-9 lg:px-[26px] md:px-9 max-w-screen-2xl mx-auto xl:text-[16px] lg:text-[14px] text-[16px]'>
          <div className='flex flex-col gap-6 xl:w-[350px] lg:w-[300px] md:w-[310px] w-full'>
            <div className='max-md:mx-auto'>
              <picture>
                <source
                  srcSet='/optimized-imgs/footer-Logo-full.webp'
                  type='image/webp'
                />
                <img
                  className='xl:w-[212px] lg:w-[200px] w-[212px]'
                  src='/imgs/footer-Logo-full.png'
                  alt='logo'
                />
              </picture>
            </div>
          </div>

          <div className='flex flex-col gap-5 max-lg:order-3 max-md:order-2 max-lg:w-full max-md:w-auto'>
            <h3 className='text-18px font-bold uppercase leading-[120%]'>
              Quick Links:
            </h3>
            <ul className='flex flex-col gap-2'>              <li>
                <a href={'/'}>
                  <ChevronRight className='inline' size={16} /> Home
                </a>
              </li>
              <li>
                <a href={'/about'}>
                  <ChevronRight className='inline' size={16} /> About Us
                </a>
              </li>
              <li>
                <a href={'/courses'}>
                  <ChevronRight className='inline' size={16} /> Courses
                </a>
              </li>              <li>
                <a href={'/categories'}>
                  <ChevronRight className='inline' size={16} /> Category
                </a>
              </li>
              <li>
                <a href={'/blogs'}>
                  <ChevronRight className='inline' size={16} /> Our Blog
                </a>
              </li>
               <li>
                <a href={'/contact'}>
                  <ChevronRight className='inline' size={16} /> Contact Us
                </a>
              </li>
            </ul>
          </div>

          <div className='flex flex-col gap-5 xl:w-[350px] lg:w-[300px] w-[310px] max-lg:order-2 max-md:order-3'>
            <h3 className='text-18px font-bold uppercase leading-[120%]'>
              Find Us:
            </h3>
            {contacts.length > 0 ? (
              contacts.map((contact:any) => (
                <ul className='flex flex-col gap-3' key={contact.id}>
                  <li>
                    <div className='flex items-start gap-[15px]'>
                      <p>{contact.name}</p>
                    </div>
                  </li>
                  <li>
                    <div className='flex items-start gap-[15px]'>
                      <MapPinned className='w-[20px]' />
                      <p>{contact.address}</p>
                    </div>
                  </li>
                  <li>
                    <div className='flex items-start gap-[15px]'>
                      <img
                        src='/imgs/whatsapp-brands.svg'
                        alt='WhatsApp'
                        className='w-[18.6px] select-none'
                      />
                      <p>{contact.phone}</p>
                    </div>
                  </li>
                  <li>
                    <div className='flex items-start gap-[15px]'>
                      <Mail width={18.6} />
                      <p>{contact.email}</p>
                    </div>
                  </li>
                </ul>
              ))
            ) : (
              <p>Loading contact info...</p>
            )}
          </div>
        </div>

        <hr className='border-[#FFFFFF33]' />

        <div className='xl:py-4 lg:py-3 py-4 text-[#FBFAF8] flex justify-between items-center gap-5 max-sm:flex-col max-sm:gap-3 sm:px-6 px-5 xl:px-9 lg:px-[26px] md:px-9 max-w-screen-2xl mx-auto'>
          <p className='max-sm:order-2 xl:text-[16px] lg:text-[14px] text-[16px]'>
            &copy; 2025 eptec. All rights reserved
          </p>
          <ul className='flex gap-5 text-[#4B4072]'>
            <li>
              <a
                href='#'
                className='w-[30px] h-[30px] bg-white inline-block rounded-full shadow-[0px_4px_10px_0px_#00000026] flex-center'
              >
                <Facebook size={16} />
              </a>
            </li>
            <li>
              <a
                href='#'
                className='w-[30px] h-[30px] bg-white inline-block rounded-full shadow-[0px_4px_10px_0px_#00000026] flex-center'
              >
                <Instagram size={16} />
              </a>
            </li>
            <li>
              <a
                href='#'
                className='w-[30px] h-[30px] bg-white inline-block rounded-full shadow-[0px_4px_10px_0px_#00000026] flex-center'
              >
                <Linkedin size={16} />
              </a>
            </li>
            <li>
              <a
                href='#'
                className='w-[30px] h-[30px] bg-white inline-block rounded-full shadow-[0px_4px_10px_0px_#00000026] flex-center'
              >
                <Youtube size={16} />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
