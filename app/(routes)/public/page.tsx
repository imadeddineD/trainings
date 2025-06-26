"use client"
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import ScrollToTop from "@/components/ScrollToTop"
import { Suspense } from "react"

const Pubic = () => {
  return (
    <>
    <ScrollToTop />

      <Header />
    <main>
    <Suspense fallback={<div className="text-center py-20 font-goldman">Loading...</div>}>
    <div className="max-w-screen-2xl mx-auto font-times">
        <section className="container-px h-[400px] bg-center bg-cover" style={{backgroundImage: "url(imgs/Pubic/Top-Photo.png)"}}>
            <h1 className="text-white lg:text-[40px] sm:text-[35px] text-[30px] font-bold text-center pt-[55px]">The Page Title</h1>
        </section>

        <section className="xl:max-w-[80%] lg:max-w-[90%] mx-auto xs:py-[120px] py-24 flex flex-col xs:gap-28 gap-24">
            <div className="flex max-lg:flex-col justify-between items-center lg:gap-20 xs:gap-14 gap-12">
                <picture>
                    <source srcSet="optimized-imgs/Pubic/Photo1.webp" type="image/webp" />
                    <img className="max-h-[576px]" src="imgs/Pubic/Photo1.png" alt="Photo1" loading="lazy" />
                </picture>
                <div className="lg:max-w-[448px] max-w-[80%] max-lg:mx-auto">
                    <h3 className="sm:text-[55px] xs:text-[50px] text-[40px] max-[353px]:text-[34px] lg:mb-8 mb-10 leading-[120%] max-lg:text-center">Travel wherever courses takes you</h3>
                    <div className="sm:text-[20px] xs:text-[19px] text-[17px] max-[353px]:text-[16px] flex flex-col gap-8 leading-[130%]">
                        <p className="relative pl-9 before:absolute before:left-0 before:top-1 before:w-4 before:h-4 before:rounded-full before:bg-red">
                        With over 15 locations worldwide, we offer offices, courses, and services across the globe. So don’t worry about your next destination, there are friendly people waiting for you.
                        </p>
                        <p className="relative pl-9 before:absolute before:left-0 before:top-1 before:w-4 before:h-4 before:rounded-full before:bg-red">
                        Discover a new training experience where professionalism meets global standards. With centers in over 15 locations, we deliver excellence wherever you are — because your growth deserves more than just a course.
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex max-lg:flex-col justify-between items-center lg:gap-20 xs:gap-14 gap-12">
                <picture className="lg:order-2">
                    <source srcSet="optimized-imgs/Pubic/Photo2.webp" type="image/webp" />
                    <img className="max-h-[576px]" src="imgs/Pubic/Photo2.png" alt="Photo2" loading="lazy" />
                </picture>
                <div className="lg:max-w-[448px] max-w-[80%] max-lg:mx-auto">
                    <h3 className="sm:text-[55px] xs:text-[50px] text-[40px] max-[353px]:text-[34px] lg:mb-8 mb-10 leading-[120%] max-lg:text-center">Travel wherever courses takes you</h3>
                    <div className="sm:text-[20px] xs:text-[19px] text-[17px] max-[353px]:text-[16px] flex flex-col gap-8 leading-[130%]">
                        <p className="relative pl-9 before:absolute before:left-0 before:top-1 before:w-4 before:h-4 before:rounded-full before:bg-red">
                        With over 15 locations worldwide, we offer offices, courses, and services across the globe. So don’t worry about your next destination, there are friendly people waiting for you.
                        </p>
                        <p className="relative pl-9 before:absolute before:left-0 before:top-1 before:w-4 before:h-4 before:rounded-full before:bg-red">
                        Discover a new training experience where professionalism meets global standards. With centers in over 15 locations, we deliver excellence wherever you are — because your growth deserves more than just a course.
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex max-lg:flex-col justify-between items-center lg:gap-20 xs:gap-14 gap-12">
                <picture>
                    <source srcSet="optimized-imgs/Pubic/Photo3.webp" type="image/webp" />
                    <img className="max-h-[576px]" src="imgs/Pubic/Photo3.png" alt="Photo3" loading="lazy" />
                </picture>
                <div className="lg:max-w-[448px] max-w-[80%] max-lg:mx-auto">
                    <h3 className="sm:text-[55px] xs:text-[50px] text-[40px] max-[353px]:text-[34px] lg:mb-8 mb-10 leading-[120%] max-lg:text-center">Travel wherever courses takes you</h3>
                    <div className="sm:text-[20px] xs:text-[19px] text-[17px] max-[353px]:text-[16px] flex flex-col gap-8 leading-[130%]">
                        <p className="relative pl-9 before:absolute before:left-0 before:top-1 before:w-4 before:h-4 before:rounded-full before:bg-red">
                        With over 15 locations worldwide, we offer offices, courses, and services across the globe. So don’t worry about your next destination, there are friendly people waiting for you.
                        </p>
                        <p className="relative pl-9 before:absolute before:left-0 before:top-1 before:w-4 before:h-4 before:rounded-full before:bg-red">
                        Discover a new training experience where professionalism meets global standards. With centers in over 15 locations, we deliver excellence wherever you are — because your growth deserves more than just a course.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    </div>
    </Suspense>
     </main>
      <Footer />
    </>
  )
}

export default Pubic