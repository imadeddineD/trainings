"use client"
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";


const SkillsSection = () => {
    const triggerRef = useRef(null)

    useGSAP(() => {
      const progressBars = gsap.utils.toArray('.progress-bar');
    
      gsap.to(progressBars, {
        width: (i, el) => el.getAttribute('data-percent') || "0%",
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "bottom bottom",
          toggleActions: "play none none none",
          invalidateOnRefresh: true,
        },
      });
    }, []);

  return (
    <section id="skills-section" className="container-px flex justify-between max-lg:flex-col max-lg:max-w-[89%] max-md:max-w-none mx-auto xl:gap-x-16 gap-x-6 gap-y-10 md:py-[76.5px] py-[58.5px]">
        <div className="relative select-none">
          <picture>
            <source srcSet="optimized-imgs/Home/040.webp" type="image/webp" />
            <img src="imgs/Home/040.jpg" alt="skills" loading="lazy" />
          </picture>
          <picture>
            <source srcSet="/optimized-imgs/Home/023.webp" type="image/webp" />
            <img
                className="absolute top-0 right-0 w-[34%] spin-slow"
                src="/imgs/Home/023.png"
                alt="skills"
                loading="lazy"
            />
            </picture>
        </div>

        <div className="flex flex-col gap-10" ref={triggerRef}>
          <div className="skills-headings">
            <h2 className="text-[#FCBB19] xl:text-[28px] xs:text-[26px] text-[19px] font-bold mb-[10px]">Courses Based on Competencies</h2>
            <h3 className="text-[#2C3C58] min-[1408px]:text-[40px] lg:text-[31px] md:text-[36px] xs:text-[29px] text-[22px] max-[370px]:text-[21px] font-bold">
              Enhancing employees’ skills through <span className="text-[#9A103C] relative inline-block">300 Competencies
                <picture>
                  <source srcSet="optimized-imgs/Home/Vector.webp" type="image/webp" />
                  <img className="xs:w-[330px] w-[180px] max-[354px]:hidden absolute xs:left-8 xs:-bottom-6 left-6 -bottom-3 select-none" src="imgs/Home/Vector.png" alt="arrow" loading="lazy" />
                </picture>
              </span> that we develop
            </h3>
          </div>

          <div className="text-[#2C3C58] font-bold capitalize flex flex-col gap-y-[30px]">
            <div>
              <h4>Organization & Planning</h4>
              <div className="bg-[#E6E7E9] rounded-[8px] h-[8px] w-full mt-[10px] relative">
                <div className="progress-bar bg-[#FC767C] rounded-[8px] h-full w-0" data-percent="86%"></div>
                <span className="absolute inline-block top-[-10px] -translate-y-[100%] left-[86%] -translate-x-1/2">86%</span>
              </div>
            </div>

            <div>
              <h4>Corporate Project Management</h4>
              <div className="bg-[#E6E7E9] rounded-[8px] h-[8px] w-full mt-[10px] relative">
                <div className="progress-bar bg-[#FCBB19] rounded-[8px] h-full w-0"  data-percent="95%"></div>
                <span className="absolute inline-block top-[-10px] -translate-y-[100%] left-[95%] -translate-x-1/2">95%</span>
              </div>
            </div>

            <div>
              <h4>Performance Management</h4>
              <div className="bg-[#E6E7E9] rounded-[8px] h-[8px] w-full mt-[10px] relative">
                <div className="progress-bar bg-[#2EBBBB] rounded-[8px] h-full w-0" data-percent="90%"></div>
                <span className="absolute inline-block top-[-10px] -translate-y-[100%] left-[90%] -translate-x-1/2">90%</span>
              </div>
            </div>
          </div>

          <a className="btn-yellow w-fit h-fit" href="/courses">Read More</a>
        </div>
    </section>
  )
}

export default SkillsSection