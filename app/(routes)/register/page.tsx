"use client"

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import ScrollToTop from '@/components/ScrollToTop';
import { usePathname, useRouter } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import {Goldman} from "next/font/google"



const inter = Goldman({ subsets: ["latin"] , weight:['400','700']});

export default function Register() {
  const router = useRouter();

  const [courseData, setCourseData] = useState(null);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const pathnamee = usePathname();
              const hideHeaderFooter = pathnamee === '/pdf';

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedData = JSON.parse(localStorage.getItem('formState') || '{}');
      setCourseData(storedData.courseData);
      setSelectedCity(storedData.selectedCity);
      setSelectedDate(storedData.selectedDate);
    }
  }, []);

  const handleSubmit = (e:any) => {
    e.preventDefault();
    const formData = {
      company: e.target.company.value,
      name: e.target.name.value,
      phoneNumber: e.target['phone-number'].value,
      email: e.target.email.value,
    };

    
    localStorage.setItem(
      'finalForm',
      JSON.stringify({ formData, courseData, selectedCity, selectedDate })
    );

    router.push('/pdf');
  };

  return (
    <>
    <ScrollToTop />

      {!hideHeaderFooter && <Header />}
    <main>
    <Suspense fallback={<div className="text-center py-20 font-goldman">Loading...</div>}>
    <section className={`${inter.className} max-w-screen-2xl mx-auto bg-[#F2F2F2] pt-16 pb-28 font-goldman container-px`}>
        <div className="flex gap-5 mx-auto w-fit items-start mb-5">
            <img className="mt-5 max-w-[50px]" src="imgs/Register/Formal.svg" alt="formal-icon" />
            <h1 className="sm:max-w-[350px] max-w-[280px] max-[382px]:max-w-[250px] sm:text-[25px] text-[21px] max-[382px]:text-[18px]">Get a
                <span className="text-[#DA0E29] sm:text-[40px] text-[32px] max-[382px]:text-[27px]"> formal letter</span> under
                <span className="sm:text-[40px] text-[32px] max-[382px]:text-[27px]"> your name</span> in
                <span className="text-[#FAD425] sm:text-[40px] text-[32px] max-[382px]:text-[27px]"> 5 Seconds</span></h1>
        </div>
        <form onSubmit={handleSubmit} className="lg:max-w-[65%] sm:max-w-[80%] w-full mx-auto flex flex-col gap-8 sm:text-[20px] max-[382px]:text-[14px]" action="">
            <input className="px-3 py-4 w-full" type="text" name="company" id="" placeholder="Your Company Name" required />
            <input className="px-3 py-4 w-full" type="text" name="name" id="" placeholder="Your Name" required />
            <input className="px-3 py-4 w-full" type="text" name="phone-number" id="" placeholder="Phone Number" required />
            <input className="px-3 py-4 w-full" type="email" name="email" id="" placeholder="email" required />
            <button className="btn-yellow !rounded-none !text-[20px] !px-12 mx-auto block mt-2" type="submit">Submit</button>
        </form>
    </section>
    </Suspense>
    </main>
     {!hideHeaderFooter && <Footer />}
    </>
  );
}
