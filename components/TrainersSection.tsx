"use client"
import { Goldman } from "next/font/google";

const inter = Goldman({ subsets: ["latin"] , weight:['400','700']});

const TrainersSection = () => {
  return (
    <section className="container-px flex justify-between max-md:flex-col gap-x-16 gap-y-10 md:py-[76.5px] py-[58.5px] bg-[#F6F6F6]">
        <div className="flex flex-col justify-center max-md:order-2">
            <h3 className="xl:text-[34px] lg:text-[29px] md:text-[26px] sm:text-[30px] xs:text-[26px] text-[26px] text-[#00224F] font-bold">Have a look to</h3>
            <h4 className={`${inter.className} xl:text-[68px] lg:text-[52px] md:text-[36px] sm:text-[55px] xs:text-[42px] text-[36px] text-[#374957] font-[700]`}>Our Trainers</h4>
            <p className="xl:text-[24px] lg:text-[19px] md:text-[17px] sm:text-[20px] xs:text-[18px] text-[17] text-[#6F6C6C] xl:mt-6 xl:mb-10 mt-2 mb-6">Professional trainers are the key to effective professional development. Be with the best, always</p>
            <a className="btn-yellow w-fit" href="/Trainers">Look</a>
        </div>

        <div className="h-full pl-5 pb-5 max-md:order-1">
            <div className="rounded-[10px] bg-[linear-gradient(252.97deg,_rgba(249,178,35,0.2)_8.91%,_rgba(250,211,37,0.2)_82.11%)] w-full h-full">
                <div className="img-cont w-full h-full -translate-x-5 translate-y-5 cursor-pointer">
                    <picture>
                        <source srcSet="optimized-imgs/Home/Rectangle-63.webp" type="image/webp" />
                        <img className="w-full h-full" src="/imgs/Home/Rectangle-63.png" alt="trainer" loading="lazy" />
                    </picture>
                    
                    <div className="absolute inset-0 flex-center pointer-events-none">
                        <div className="relative w-20 h-20 border-2 border-[#ffffff50] rounded-full">
                            {/* Animated ring 1 */}
                            <span className="absolute inset-0 rounded-full border-2 border-white opacity-40 animate-[ping_2s_linear_infinite]"></span>

                            {/* Animated ring 2 */}
                            <span className="absolute inset-0 rounded-full border-2 border-white opacity-20 animate-[ping_2s_linear_infinite] delay-[300ms]"></span>

                            {/* Center circle with blur and play icon */}
                            <div className="absolute inset-0 backdrop-blur-sm bg-white/10 rounded-full flex-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-12 h-15 text-white"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M6.5 5.5v9l7-4.5-7-4.5z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </section>
  )
}

export default TrainersSection