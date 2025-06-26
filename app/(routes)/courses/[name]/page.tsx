'use client';

import React, { Suspense, useEffect, useRef, useState } from "react";
import { useParams, useRouter, useSearchParams, usePathname } from "next/navigation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { format } from "date-fns";
// import ApplyNowButton from "../ApplyNowButton";
// import CourseTable from "../CourseTable";
// import { extractSection, formatPrice, formatCourseContent } from "./htmlUtils";
import "./courseDetails.css";
import { extractSection, formatCourseContent, formatPrice } from "@/components/htmlutils";
import CourseTable from "@/components/CourseTable";
import ApplyNowButton from "@/components/ApplyNowButton";
import { Goldman } from "next/font/google";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import Footer from "@/components/Footer";


const inter = Goldman({ subsets: ["latin"] , weight:['400','700']});


function slugify(text:any) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, '-');
}

const CourseDetails = () => {
    // searchform
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

   const pathnamee = usePathname();
  const hideHeaderFooter = pathnamee === '/pdf';
  
  // Extract name from params
  const name = params.name;
  
  // Get date and courseId from URL search params (since Next.js doesn't have location.state)
  const selectedDateParam = searchParams.get('selectedDate');
  const courseId = searchParams.get('courseId');

  const VITE_API_LINK="https://api.euptc.com"
  
  // Parse the selectedDate if it exists
  const selectedDateFromParam = selectedDateParam ? new Date(selectedDateParam) : null;
  
  // Format the date for CourseTable component (expects string)
  const selectedDate = selectedDateFromParam 
    ? format(selectedDateFromParam, 'yyyy-MM-dd')
    : null;
  
  // Get location from URL parameters
  const [selectedCity, setSelectedCity] = useState<any>(searchParams.get('location') || '');
  const triggerRef = useRef(null);
  const [courseData, setCourseData] = useState<any>(null);
  const [loading, setLoading] = useState<any>(true);
  const [categories, setCategories] = useState<any>([]);
  const [phoneNumber, setPhoneNumber] = useState<any>(null);
  const [galleryItems, setGalleryItems] = useState<any>([]);
  const [galleryLoading, setGalleryLoading] = useState<any>(true);
  const [galleryError, setGalleryError] = useState<any>(null);

  // Cities array from SearchByCompetencies component
  const cities = [
    "London",
    "Paris",
    "Damascus",
    "Manchester",
    "Istanbul",
    "Amsterdam",
    "Rome",
    "Madrid",
    "Barcelona",
    "Athens",
    "Dubai",
    "Sharm El Sheikh",
  ];

  // Search form state
  const [searchForm, setSearchForm] = useState<any>({
    keyword: "",
    category: "",
    city: "",
    level: "",
  });

  useEffect(() => {
    if (!name) return;
    
    const fetchCourseData = async () => {
      try {
        const response = await fetch(
          `${VITE_API_LINK}/api/courses/name/${name}`
        );
        if (!response.ok) throw new Error("Failed to fetch course data");
        const data = await response.json();
        setCourseData(data);
      } catch (error) {
        console.error("Error fetching course:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourseData();
  }, [name]);

  // Fetch categories from backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${VITE_API_LINK}/api/courses/main-category`
        );
        if (!response.ok) throw new Error("Failed to fetch categories");
        const data = await response.json();
        const categoryNames = data.map((cat:any) => cat.category);
        setCategories(categoryNames);
      } catch (error) {
        console.error("Error fetching categories:", error);
        // Fallback categories
        setCategories(["HR", "Finance", "Management", "IT", "Marketing"]);
      }
    };
    fetchCategories();
  }, []);

  // Fetch phone number from API
  useEffect(() => {
    fetch(`${VITE_API_LINK}/api/contact`)
      .then((res) => res.json())
      .then((data) => {
        setPhoneNumber(data[0].phone);
      })
      .catch((err) => {
        console.error("Failed to fetch contact:", err);
      });
  }, []);

  // Fetch gallery items with loading and error states
  useEffect(() => {
    const fetchGalleryItems = async () => {
      setGalleryLoading(true);
      setGalleryError(null);
      try {
        const response = await fetch(`${VITE_API_LINK}/api/gallery`);
        if (!response.ok) throw new Error("Failed to fetch gallery items");
        const data = await response.json();
        setGalleryItems(data);
      } catch (error:any) {
        console.error("Error fetching gallery items:", error);
        setGalleryError(error.message);
      } finally {
        setGalleryLoading(false);
      }
    };
    
    fetchGalleryItems();
  }, []);

  useGSAP(() => {
    if (!courseData) return;
    const progressBars = gsap.utils.toArray(".progress-bar");
    gsap.to(progressBars, {
      width: (i, el) => el.getAttribute("data-percent") || "0%",
      duration: 1.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: triggerRef.current,
        start: "bottom bottom",
        toggleActions: "play none none none",
        invalidateOnRefresh: true,
      },
    });
  }, [courseData]);

  if (loading) return <div className="text-center p-10">Loading...</div>;
  if (!courseData)
    return <div className="text-center p-10">Course not found.</div>;

  // Parse the FAQs JSON object for competencies
  const competencies = courseData.faqs ? JSON.parse(courseData.faqs) : {};

  // Extract specific sections
  const introduction = extractSection(courseData.description, [
    "Introduction",
    " Introduction: ",
    " Introduction ",
  ]);
  const objectives = extractSection(courseData.description, [
    "Objectives",
    " Objectives: ",
    " Objectives ",
  ]);
  const courseOutline = extractSection(courseData.description, [
    "Outline",
    "Outline for 5 days",
    " Outline: ",
    " Outline for 5 days ",
    " Course Outline: 5 Days, 5 Topics per Day ",
    " Course Outline: ",
    "CourseOutline",
  ]);
  const whoShouldAttend = extractSection(courseData.description, [
    "Who Should Attend this Course",
    " Who Should Attend this Course: ",
    " Who Should Attend this Course ",
  ]);

  // Format price
  const formattedPrice = formatPrice(courseData.price);

  // Parse outcomes
  const outcomes = courseData.outcomes ? JSON.parse(courseData.outcomes) : [];

  // Handle search form input changes
  const handleSearchInputChange = (e:any) => {
    const { name, value } = e.target;
    setSearchForm((prev:any) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle search form submission
  const handleSearchSubmit = (e:any) => {
    e.preventDefault();

    // Build URL parameters
    const params = new URLSearchParams();

    if (searchForm.keyword) params.set("search", searchForm.keyword);
    if (searchForm.category && searchForm.category !== "Choose a Category") {
      params.set("category", searchForm.category);
    }
    if (searchForm.city && searchForm.city !== "Choose a City") {
      params.set("city", searchForm.city);
    }
    if (searchForm.level && searchForm.level !== "Choose a Date") {
      // Map the "date" selection to level %
      const levelMapping :any = {
        "One Week": "beginner",
        "Two Weeks": "advanced",
      };
      const level:any = levelMapping[searchForm.level];
      if (level) params.set("level", level);
    }

    // Navigate to courses page with search parameters using Next.js router
    router.push(`/courses?${params.toString()}`);
  };

  return (
    <>
        <ScrollToTop />

    {!hideHeaderFooter && <Header />}

    <main>
      <Suspense fallback={<div className="text-center py-20 font-goldman">Loading...</div>}>
    <div className="max-w-screen-2xl mx-auto special">
      {/* WhatsApp Floating Icon -[#2C3C58] -[#DA0E29] -[#9A103C] -[#FAD425] apply */}
      <a
        href={`https://wa.me/${phoneNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 rounded-full p-3 shadow-lg hover:bg-green-600 transition-colors"
        aria-label="Chat on WhatsApp"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="white"
          viewBox="0 0 24 24"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.447-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.148-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.372-.01-.571-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.363.709.306 1.262.489 1.694.626.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347zm-5.421 7.617h-.001a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.999-3.648-.235-.374A9.86 9.86 0 012.1 12.893C2.073 7.61 6.659 3.017 12.002 3c2.652.009 5.146 1.037 7.019 2.916a9.822 9.822 0 012.92 7.013c-.017 5.383-4.603 9.977-9.97 9.977zm8.413-18.29A11.815 11.815 0 0012.003.001C5.373.022.066 5.36.099 11.993c.017 2.11.553 4.162 1.601 5.977L.057 24l6.153-1.637a11.89 11.89 0 005.841 1.489h.005c6.627 0 12.015-5.385 12.033-12.009a11.821 11.821 0 00-3.504-8.435z" />
        </svg>
      </a>
      <CourseTable courseData={courseData} selectedDate={selectedDate} selectedCity={selectedCity} />
      <div className="container-px flex max-lg:flex-col xl:gap-11 gap-9 py-10">
        <div className="course-details flex-grow xl:text-[20px] lg:text-[16.5px]">

          {/* Competencies Progress Bars */}
          <div
            className="mt-2 mb-10 rounded-[8px] shadow-sm"
            ref={triggerRef}
          >
            <p className="mb-5">
              This course based on supporting the employee in the following competencies, at advanced rates, which are:
            </p>
            <div className={`${inter.className}  text-black flex flex-col gap-y-[8px] max-xs:text-[11.5px] mt-4`}>
              {Object.entries(competencies).map(([key, value]:any, index:any) => (
                <div
                  key={key}
                  className="bg-[#E8E8E8] rounded-[4px] h-[30px] relative border"
                >                  <div
                    className="progress-bar rounded-[4px] absolute left-0 top-0 h-full flex items-center justify-end pr-3"
                    data-percent={`${value}`}
                    style={{
                      width: `${value}%`,
                      backgroundColor: [
                        "#85B9E1", "#F2B670", "#B7D190", "#C4B5D2", "#EA9049", "#FF9E80",
                        "#80CBC4", "#9FA8DA", "#FFD54F", "#90CAF9", "#CE93D8", "#EF9A9A",
                      ][index % 12],
                    }}
                  >
                    <span className="font-bold text-white">{value}</span>
                  </div>
                  <div className="px-[19px] h-full w-full rounded-[4px] relative">
                    <span className="absolute top-1/2 left-5 -translate-y-1/2 font-medium text-white">
                      {key}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Introduction */}
          {introduction && (
            <div className="mb-8">
              <div
                className="course-content-section"
                dangerouslySetInnerHTML={{
                  __html: formatCourseContent(introduction),
                }}
              />
            </div>
          )}
          {" "}
          {/* Who Should Attend */}
          {whoShouldAttend && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-[#DA0E29]">
                Who Should Attend
              </h2>
              <div
                className="course-content-section"
                dangerouslySetInnerHTML={{
                  __html: formatCourseContent(whoShouldAttend),
                }}
              />
            </div>
          )}{" "}
          {/* Objectives */}
          {objectives && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-[#DA0E29]">Objectives</h2>
              <div
                className="course-content-section"
                dangerouslySetInnerHTML={{
                  __html: formatCourseContent(objectives),
                }}
              />
            </div>
          )}{" "}
          {/* Course Outline */}
          {courseOutline && (
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-[#DA0E29]">
                Course Outline
              </h3>
              <div
                className="course-content-section"
                dangerouslySetInnerHTML={{
                  __html: formatCourseContent(courseOutline),
                }}
              />
            </div>
          )}
          {/* Footer Call to Action yellowHome */}
          <div className="bg-[#9A103C] text-[#FAD425] xl:h-[75px] h-[65px] flex min-[681px]:justify-between max-[680px]:relative items-center gap-3 max-[680px]:mb-[70px] max-[680px]:h-[90px] mt-10">
            <picture className="h-full py-2 ps-5">
              <img
                className="h-full"
                src="/imgs/Logo-full.png"
                alt="logo"
                loading="lazy"
              />
            </picture>
            <span className="font-bold text-white xl:text-[18px] min-[1074px]:text-[17px] text-[14.9px] text-center max-[680px]:pe-3">
              Get an official offer letter under your{" "}
              <span className="text-[#FAD425]">NAME</span> in 5 seconds
            </span>
            <div className="min-[681px]:h-full xl:w-fit w-[144px] text-[14px] max-[680px]:text-[16px] max-[680px]:bottom-[-56px] max-[680px]:absolute max-[680px]:left-0 max-[680px]:w-full max-[680px]:shadow-custom">
              <ApplyNowButton courseData={courseData} selectedCity={selectedCity} selectedDate={selectedDate} />
            </div>
          </div>
        </div>

       { /* Sidebar */}
          <div className="xl:min-w-[350px] lg:min-w-[290px]">
            <div className="shadow-custom rounded-[7px] border border-[#D0D0D0] overflow-hidden max-w-[592px] mx-auto">
              <div className={`${inter.className} bg-[#2C3C58] -[#DA0E29] text-white font-goldman px-4 py-[6px] mb-3 max-lg:text-center`}>
                Search Courses
              </div>
              <form
                className="p-2 text-[#767676] flex flex-col gap-[14px] text-[15px]"
                onSubmit={handleSearchSubmit}
              >
                <input
            className={`${inter.className} font-goldman pb-2 border rounded-[3px] border-[#D0D0D0] pt-[2px] px-3 outline-none`}
            placeholder="Write the keyword"
            type="text"
            name="keyword"
            value={searchForm.keyword}
            onChange={handleSearchInputChange}
                />
                <select
            className="pb-2 border rounded-[3px] border-[#D0D0D0] pt-[2px] px-3 outline-none appearance-none"
            name="category"
            value={searchForm.category}
            onChange={handleSearchInputChange}
                >
            <option value="Choose a Category">Choose a Category</option>
            {categories.map((category:any) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
                </select>
                <select
            className="pb-2 border rounded-[3px] border-[#D0D0D0] pt-[2px] px-3 outline-none appearance-none"
            name="city"
            value={searchForm.city}
            onChange={handleSearchInputChange}
                >
            <option value="Choose a City">Choose a City</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
                </select>
                
                <button
            type="submit"
            className={`${inter.className} w-full h-[34px] flex-center text-[#2C3C58] -[#DA0E29] font-goldman bg-[#FAD425] rounded-[3px] border border-[#FAD425] hover:bg-[#FAD425]/90 transition-colors`}
                >
            Search
                </button>
              </form>
            </div>

            {/* Course Details Card apply */}
            <div className="shadow-custom rounded-[7px] border border-[#D0D0D0] overflow-hidden max-w-[592px] mx-auto mt-8 mb-6">
              <div className={`${inter.className} bg-[#2C3C58] -[#DA0E29] text-white font-goldman px-4 py-[6px] max-lg:text-center`}>
                Course Details
              </div>
              <div className="p-4">
                <div className="mb-3">
            <p className="font-bold">Duration:</p>
            <p>
              {courseData.duration}
            </p>
                </div>
                <div className="mb-3">
            <p className="font-bold">Category:</p>
            <p>
              {courseData.category} - {courseData.sub_category}
            </p>
                </div>
                <div className="mb-3">
            <p className="font-bold">Level:</p>
            <p>{courseData.level}</p>
                </div>
                <div className="mb-3">
            <p className="font-bold">Price:</p>
            <p>{formattedPrice}</p>
                </div>
                <div className="mb-3">
            <p className="font-bold mb-0">Contact us:</p>
            {phoneNumber && (
              <div className="flex items-center gap-2 mt-1">
                <a
                  href={`https://wa.me/${phoneNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center"
                  aria-label="Chat on WhatsApp"
                >
                  <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="#25D366"
              viewBox="0 0 24 24"
              className="mr-1"
                  >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.447-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.148-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.372-.01-.571-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.363.709.306 1.262.489 1.694.626.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347zm-5.421 7.617h-.001a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.999-3.648-.235-.374A9.86 9.86 0 012.1 12.893C2.073 7.61 6.659 3.017 12.002 3c2.652.009 5.146 1.037 7.019 2.916a9.822 9.822 0 012.92 7.013c-.017 5.383-4.603 9.977-9.97 9.977zm8.413-18.29A11.815 11.815 0 0012.003.001C5.373.022.066 5.36.099 11.993c.017 2.11.553 4.162 1.601 5.977L.057 24l6.153-1.637a11.89 11.89 0 005.841 1.489h.005c6.627 0 12.015-5.385 12.033-12.009a11.821 11.821 0 00-3.504-8.435z" />
                  </svg>
                </a>
                <span>++{phoneNumber}</span>
              </div>
            )}
                </div>
              </div>
            </div>
           
          
           {/* Gallery Section */}
          <div className={`${inter.className} bg-[#DA0E29] px-4 py-[7px] text-white shadow-custom font-goldman max-lg:text-center mt-3 mb-1`}>
            <h2>Gallery</h2>
          </div>
          <div className="shadow-custom  border border-[#D0D0D0] overflow-hidden max-w-[592px] mx-auto mt-6 mb-6">
            <div>
              {galleryLoading ? (
                <div className="text-center py-6 px-4">
                  <p>Loading gallery items...</p>
                </div>
              ) : galleryError ? (
                <div className="text-center py-6 px-4 text-[#DA0E29]-500">
                  <p>Error loading gallery: {galleryError}</p>
                </div>
              ) : galleryItems.length === 0 ? (
                <div className="text-center py-6 px-4">
                  <p>No gallery items available</p>
                </div>
              ) : (
                <div className="flex flex-col gap-4 max-lg:grid max-lg:grid-cols-2 max-sm:grid-cols-1">
                  {galleryItems.map((item:any, index:any) => {
                    // Create an array of color classes to cycle through
                    const colorClasses = [
                      "from-[#DA0E29]",
                      "from-orange-200",
                      "from-[#FAD425]",
                      "from-cyan-900",
                      "from-green-900",
                      "from-cyan-400",
                      "from-purple-900",
                    ];

                    // Get a color based on the index
                    const color = colorClasses[index % colorClasses.length];

                    return (
                      <div className="relative shadow-custom" key={item.id}>
                        <a
                          href={item.link || "#"}
                          target={item.link ? "_blank" : "_self"}
                          rel="noreferrer"
                        >
                          <img
                            src={
                              item.image.includes("http")
                                ? item.image
                                : `${
                                    VITE_API_LINK
                                  }/uploads/gallery/${item.image}`
                            }
                            alt={item.name}
                            className="lg:h-[130px] h-[250px] w-full object-cover"
                            onError={(e:any) => {
                              e.target.onerror = null;
                              e.target.src = "/imgs/Logo-full.png"; // Fallback image
                            }}
                          />
                          <div
                            className={`uppercase text-white text-[18px] first-letter:text-[22px] bg-gradient-to-r ${color} to-transparent 
                              absolute top-0 left-0 w-full h-full px-5 py-2 font-arial`}
                          >
                            {item.name}
                          </div>
                        </a>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    </Suspense>
    </main>

    {!hideHeaderFooter && <Footer />}
    </>
  );
};

export default CourseDetails;