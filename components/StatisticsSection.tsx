"use client"

import { useGSAP } from "@gsap/react"
import gsap from "gsap";
import { useRef } from "react";

const StatisticsSection = ({statistics}:any) => {
  const numbersRef = useRef<any>([]);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".statistics-section",
        // start: "top 80%",
        start: "bottom bottom",
        toggleActions: "play none none none",
        once: true,       // Animate only once
      },
    });

    numbersRef.current.forEach((el:any) => {
      const finalValue = +el.dataset.number;

      tl.fromTo(
        el,
        { innerText: 0 },
        {
          innerText: finalValue,
          duration: 2,
          ease: "power1.out",
          snap: { innerText: 1 }, // to floor the number
          onUpdate: function () {
            el.innerText = Math.floor(el.innerText); // to ensure floor on old browsers
          },
        },
        0 // All start at the same time
      );
    });
  }, [])

  return (
    <section className="statistics-section flex flex-col mt-9 xl:text-[22px] lg:text-[20px] xs:text-[22px] text-[15px]">
        {statistics.map(({icon, number, text}:any, i:any) => (
            <div className="flex items-center gap-3 border-b border-[#C0BFBF] last:border-b-0" key={icon + i}>
                <picture>
                    <source srcSet={`optimized-imgs/Trainers/${icon}.webp`} type="image/webp" />
                    <img className="max-h-[32px] max-w-[32px]" src={`imgs/Trainers/${icon}.png`} alt={icon} />
                </picture>
                <p><span ref={(el:any) => (numbersRef.current[i] = el)} data-number={number} 
                className="text-[#F9B223] xl:text-[29px] lg:text-[28px] xs:text-[29px] text-[21px] font-bold font-arial">0</span>{" "}{text}</p>
            </div>
        ))}
    </section>
  )
}

export default StatisticsSection