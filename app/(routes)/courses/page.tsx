"use client"
import { SearchIcon } from "lucide-react";
import { useCallback, useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { parseISO, format, isMonday, isAfter, startOfToday } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useDebounce from "@/app/hooks/usedebounce";
import Filters from "@/components/Filters";
import Link from "next/link";
import ScrollToTop from "@/components/ScrollToTop";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

function slugify(text: any) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Create a separate component for the courses content
const CoursesContent = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isInitialMount = useRef(true);

  const pathnamee = usePathname();
  const hideHeaderFooter = pathnamee === '/pdf';
  
  // time
  const [courses, setCourses] = useState<any>([]);
  const [loading, setLoading] = useState<any>(false);
  const [error, setError] = useState<any>(null);
  const [totalPages, setTotalPages] = useState<any>(1);
  const [totalCourses, setTotalCourses] = useState<any>(0);
  const [searchTerm, setSearchTerm] = useState<any>("");

  const VITE_API_LINK = "https://api.euptc.com"

  const [selectedDate, setSelectedDate] = useState(
    searchParams.get("date") ? parseISO(searchParams.get("date")!) : null
  );
  const [selectedLocation, setSelectedLocation] = useState(
    searchParams.get("city") || ""
  );

  const [courseSelections, setCourseSelections] = useState<any>({});
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const currentSearchInUrl = searchParams.get("search") || "";
  const limit = 25;

  const getCurrentFilters = useCallback(() => {
    return {
      category: searchParams.get("category") || null,
      subCategory: searchParams.get("subCategory") || null,
      location: searchParams.get("city") || null,
      duration: searchParams.get("duration") || null,
    };
  }, [searchParams]);

  const updateUrlParams = useCallback((filters: any, search: any, page = 1) => {
    const params = new URLSearchParams();

    if (filters.category) params.set('category', filters.category);
    if (filters.subCategory) params.set('subCategory', filters.subCategory);
    if (filters.location) params.set('city', filters.location);
    if (filters.duration) params.set('duration', filters.duration);
    if (search) params.set('search', search);
    if (page > 1) params.set('page', page.toString());

    const competenciesParam = searchParams.get('competencies');
    if (competenciesParam) {
      params.set('competencies', competenciesParam);
    }

    router.push(`${pathname}?${params.toString()}`);
  }, [router, pathname, searchParams]);

  const fetchCourses = useCallback(
    async (filters: any, search: any, page: any) => {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams();

        if (filters.category) params.append("category", filters.category);
        if (filters.subCategory) params.append("subCategory", filters.subCategory);
        if (filters.location) params.append("city", filters.location);
        if (filters.duration) params.append("duration", filters.duration);
        if (search) params.append("search", search);

        const competenciesParam = searchParams.get("competencies");
        if (competenciesParam) {
          try {
            const competencies = JSON.parse(competenciesParam);
            if (Array.isArray(competencies) && competencies.length > 0) {
              params.append("competencies", JSON.stringify(competencies));
            }
          } catch (error) {
            console.error("Error parsing competencies parameter:", error);
          }
        }

        params.append("page", page.toString());
        params.append("limit", limit.toString());

        const response = await fetch(
          `${VITE_API_LINK}/api/courses?${params.toString()}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }

        const data = await response.json();

        if (data.courses && data.pagination) {
          setCourses(data.courses);
          setTotalPages(data.pagination.totalPages || 1);
          setTotalCourses(data.pagination.totalCourses || data.courses.length);
        } else {
          setCourses(data);
          setTotalPages(1);
          setTotalCourses(data.length);
        }
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError("Could not load courses. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [limit, searchParams]
  );

  const handleSearchChange = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const handleLocationChange = (e: any) => {
    const newLocation = e.target.value;
    setSelectedLocation(newLocation);

    const currentFilters = getCurrentFilters();
    currentFilters.location = newLocation === "" ? null : newLocation;

    updateUrlParams(currentFilters, currentSearchInUrl, 1);
  };

  const handleCourseLocationChange = (courseId: any, newLocation: any) => {
    setCourseSelections((prev: any) => ({
      ...prev,
      [courseId]: {
        ...prev[courseId],
        location: newLocation,
      },
    }));
  };

  const handleCourseDateChange = (courseId: any, newDate: any) => {
    setCourseSelections((prev: any) => ({
      ...prev,
      [courseId]: {
        ...prev[courseId],
        date: newDate,
      },
    }));
  };

  const handlePageChange = (newPage: any) => {
    const currentFilters = getCurrentFilters();
    updateUrlParams(currentFilters, currentSearchInUrl, newPage);
  };

  useEffect(() => {
    if (debouncedSearchTerm !== currentSearchInUrl) {
      const currentFilters = getCurrentFilters();
      updateUrlParams(currentFilters, debouncedSearchTerm, 1);
    }
  }, [debouncedSearchTerm, currentSearchInUrl, getCurrentFilters, updateUrlParams]);

  useEffect(() => {
    if (isInitialMount.current) {
      const urlSearch = searchParams.get("search") || "";
      setSearchTerm(urlSearch);

      const urlLocation = searchParams.get("city") || "";
      setSelectedLocation(urlLocation);

      isInitialMount.current = false;
    }
  }, [searchParams]);

  useEffect(() => {
    if (courses.length > 0) {
      const newSelections: any = {};

      courses.forEach((course: any) => {
        newSelections[course.id] = {
          location:
            selectedLocation ||
            (course.city ? course.city.split(",")[0].trim() : ""),
          date: selectedDate,
        };
      });

      setCourseSelections((prev: any) => ({ ...prev, ...newSelections }));
    }
  }, [courses, selectedLocation, selectedDate]);

  useEffect(() => {
    const urlLocation = searchParams.get("city") || "";

    if (selectedLocation !== urlLocation) {
      setSelectedLocation(urlLocation);
    }
  }, [searchParams, selectedLocation]);

  useEffect(() => {
    const currentFilters = getCurrentFilters();
    fetchCourses(currentFilters, currentSearchInUrl, currentPage);
  }, [fetchCourses, currentPage, currentSearchInUrl, getCurrentFilters]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      fetch(`${VITE_API_LINK}/api/contact`)
        .then((res) => res.json())
        .then((data) => {
          setPhoneNumber(data[0].phone);
        })
        .catch((err) => {
          console.error("Failed to fetch contact:", err);
        });
    }
  }, []);

  useEffect(() => {
  if (typeof window !== 'undefined') {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }
}, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const style = document.createElement("style");
      style.textContent = `
        /* Make the datepicker calendar responsive */
        .react-datepicker {
          font-size: 0.85rem;
          border-radius: 4px;
          border-color: #e2e8f0;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          width: 250px;
          z-index : 1 !important;
        }
        
        /* Make placeholder text black */
        .react-datepicker__input-container input::placeholder {
          color: black !important;
          opacity: 1 !important;
          z-index : 1 !important;
        }
        
        .react-datepicker__header {
          background-color: #E6E7E9; 
          border-bottom: 1px solid #e2e8f0;
          padding-top: 8px;
          z-index : 1 !important;
        }
        
        .react-datepicker__month-container {
          width: 100%;
          z-index : 1 !important;
        }
        
        .react-datepicker__current-month {
          color: #111;
          font-weight: 600;
          font-size: 0.9rem;
          z-index : 1 !important;
        }
        
        .react-datepicker__day--selected, 
        .react-datepicker__day--keyboard-selected {
          background-color: #E6E7E9 !important;
          color: #111 !important;
          font-weight: 600;
          z-index : 1 !important;
        }
        
        .react-datepicker__day:hover {
          background-color: #F3F4F6 !important;
          z-index : 1 !important;
        }
        
        .react-datepicker__navigation {
          top: 8px;
          z-index : 1 !important;
        }
        
        .react-datepicker__day {
          width: 1.7rem;
          line-height: 1.7rem;
          margin: 0.1rem;
          z-index : 1 !important;
        }
        
        @media (max-width: 768px) {
          .react-datepicker {
            font-size: 0.75rem;
            width: 190px;
            z-index : 1 !important;
          }
          
          .react-datepicker__day {
            width: 1.6rem;
            line-height: 1.6rem;
            margin: 0.1rem;
            z-index : 1 !important;
          }
        }
        
        @media (max-width: 640px) {
          .react-datepicker {
            font-size: 0.7rem;
            width: 180px;
            z-index : 1 !important;
          }
          
          .react-datepicker__day {
            width: 1.5rem;
            line-height: 1.5rem;
            margin: 0.08rem;
            z-index : 1 !important;
          }
          
          .react-datepicker__header {
            padding-top: 5px;
            z-index : 1 !important;
          }
          
          .react-datepicker__current-month {
            font-size: 0.75rem;
            z-index : 1 !important;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  if (loading) {
    return (
      <section className="mb-20 text-center py-10 font-arial">
        Loading courses...
      </section>
    );
  }

  if (error) {
    return (
      <section className="mb-20 text-center py-10 font-arial text-red-600">
        {error}
      </section>
    );
  }

  return (
    <section className="mb-20">
      {/* WhatsApp Floating Icon */}
      {phoneNumber && (
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
      )}

      <div className="courses-cover-img"></div>

      <div className="courses-container flex max-w-screen-2xl mx-auto 2xl:px-16 md:px-9 sm:px-5 px-[15px] pt-4 font-arial">
        <aside className="pr-5 pt-28 pb-16 max-[1100px]:hidden">
          <Filters />
        </aside>

        <div className="w-full">
          <div className="flex-center md:h-[88px] max-md:p-6 max-md:flex-col w-full gap-5 border-b border-[#DDE1E6]">
            <h1 className="text-2xl font-bold text-[#121619]">
              Get Your Course Now
            </h1>

            <div className="flex-grow flex max-md:w-full gap-4 px-4 py-3 text-[#697077] bg-[#F2F4F8] border-b border-[#C1C7CD]">
              <SearchIcon />
              <input
                onChange={handleSearchChange}
                value={searchTerm}
                className="bg-inherit w-full outline-none text-black"
                type="text"
                placeholder="Search for..."
                aria-label="Search courses"
              />
            </div>
          </div>

          {/* filters in md screens */}
          <div className="min-[1101px]:hidden max-md:hidden">
            <Filters />
          </div>

          <div>
            <div
              className="grid grid-cols-12 gap-4 mt-[23px] mb-[27px] lg:px-6 md:px-5 p-4 py-3 lg:pr-0 shadow-[3px_4px_4px_0px_#00000040]
            text-white text-[20px] font-bold rounded-t-lg bg-gradient-to-b from-[#FAD51D] to-[#BE901E]"
            >
              <h3 className="md:col-span-4 col-span-6">Course</h3>
              <h3 className="col-span-2 max-md:hidden">Category</h3>
              <h3 className="md:col-span-2 col-span-3 max-sm:hidden">
                Location
              </h3>
              <h3 className="col-span-3 xl:ml-6 lg:ml-10 md:ml-14 ml-3">
                Date
              </h3>
            </div>
            <div className="flex justify-content-center flex-col space-y-4">
              {courses.length === 0 ? (
                <div className="text-center py-10 text-gray-600">
                  {loading ? "Loading courses..." : "No courses found."}
                </div>
              ) : (
                courses.map((course: any) => {
                  // Initialize course selection if not already set
                  if (!courseSelections[course.id]) {
                    const defaultCity = course.city
                      ? course.city.split(",")[0].trim()
                      : "";
                    setCourseSelections((prev: any) => ({
                      ...prev,
                      [course.id]: {
                        location: selectedLocation || defaultCity,
                        date: selectedDate,
                      },
                    }));
                  }

                  return (
                    <div
                      className="course grid grid-cols-12 gap-4 shadow-custom border lg:p-6 lg:pr-0 md:p-5 p-3 even:bg-[#EBEBEB] "
                      key={course.id + course.title}
                    >
                      <div className="text-[18px] md:col-span-4 col-span-6 border-r border-[#8E8988] pr-2">
                        {course.title}
                      </div>
                      <div className="col-span-2 max-md:hidden">
                        <h4>{course.category}</h4>
                        <h6 className="text-[14px] mt-2">
                          {course.sub_category}
                        </h6>
                      </div>
                      <div className="md:col-span-2 col-span-3 max-sm:hidden">
                        <div className="relative w-fit">
                          <select
                            className="border-black border bg-[#FBF8F8] appearance-none outline-none xl:pl-3 xl:pr-9 pl-1 pr-5 xl:w-[160px] lg:w-[150px] md:w-[140px] w-[140px] text-md"
                            name="location"
                            value={courseSelections[course.id]?.location || ""}
                            onChange={(e) =>
                              handleCourseLocationChange(
                                course.id,
                                e.target.value
                              )
                            }
                          >
                            <option value="" disabled>All Locations</option>
                            {/* Extract cities from the current course */}
                            {course.city &&
                              Array.from(
                                new Set(
                                  course.city
                                    .split(",")
                                    .map((city: string) => city.trim())
                                    .filter((city: any) => city)
                                )
                              )
                                .sort()
                                .map((city: any) => (
                                  <option key={city} value={city}>
                                    {city.replace(/\b\w/g, (char: any) => char.toUpperCase())}
                                  </option>
                                ))}
                          </select>
                          <div
                            className="inline-block absolute top-1/2 -translate-y-1/2 right-1 pointer-events-none 
                        border-l-[5px] border-r-[5px] border-t-[8px] border-l-transparent border-r-transparent border-[#8E8988]"
                          ></div>
                        </div>
                      </div>
                      <div className="lg:col-span-2 col-span-3">
                        <div className="relative w-fit xl:ml-2 lg:ml-5 md:ml-6 ml-1">
                          <DatePicker
                            selected={courseSelections[course.id]?.date || null}
                            onChange={(date) =>
                              handleCourseDateChange(course.id, date)
                            }
                            filterDate={(date) =>
                              isMonday(date) && isAfter(date, startOfToday())
                            }
                            placeholderText="Choose a Date"
                            dateFormat={
                              windowWidth < 640 ? "yyyy-MM-dd" : "yyyy-MM-dd"
                            }
                            minDate={startOfToday()}
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            className="border-black border bg-[#FBF8F8] appearance-none outline-none xl:w-[160px] lg:w-[150px] md:w-[140px] w-[140px] text-md xl:pl-3 xl:pr-2 pl-1 pr-1 placeholder-black"
                            calendarClassName="z-50 responsive-calendar"
                          />
                          <div
                            className="inline-block absolute top-1/2 -translate-y-1/2 right-1 pointer-events-none 
                        border-l-[5px] border-r-[5px] border-t-[8px] border-l-transparent border-r-transparent border-[#8E8988]"
                          ></div>
                        </div>
                      </div>
                      <div className="lg:col-span-2 col-span-12 text-center lg:ml-3">
                        <Link
                          href={`/courses/${slugify(course.title)}${courseSelections[course.id]?.location
                            ? `?location=${courseSelections[course.id].location}`
                            : ""
                            }`}

                          className="courses-btn text-[14px]"
                        >
                          Enroll Now
                        </Link>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pagination flex justify-center items-center mt-6 space-x-4">
                <button
                  onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
                >
                  Previous
                </button>

                <div className="flex items-center space-x-2">
                  {/* Show first page */}
                  {currentPage > 3 && (
                    <>
                      <button
                        onClick={() => handlePageChange(1)}
                        className="px-3 py-1 rounded hover:bg-gray-200 transition-colors"
                      >
                        1
                      </button>
                      {currentPage > 4 && <span>...</span>}
                    </>
                  )}

                  {/* Show current page and surrounding pages */}
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const startPage = Math.max(1, currentPage - 2);
                    const page = startPage + i;

                    // Don't render if page exceeds totalPages or if it's already shown as first page
                    if (page > totalPages || (page === 1 && currentPage > 3))
                      return null;

                    return (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-3 py-1 rounded transition-colors ${page === currentPage
                          ? "bg-blue-500 text-white"
                          : "hover:bg-gray-200"
                          }`}
                      >
                        {page}
                      </button>
                    );
                  })}

                  {/* Show last page */}
                  {currentPage < totalPages - 2 && totalPages > 5 && (
                    <>
                      {currentPage < totalPages - 3 && <span>...</span>}
                      <button
                        onClick={() => handlePageChange(totalPages)}
                        className="px-3 py-1 rounded hover:bg-gray-200 transition-colors"
                      >
                        {totalPages}
                      </button>
                    </>
                  )}
                </div>

                <button
                  onClick={() =>
                    handlePageChange(Math.min(currentPage + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
                >
                  Next
                </button>
              </div>
            )}
            {/* Results summary */}
            {totalCourses > 0 && (
              <div className="text-center text-gray-600 mt-4">
                Showing {(currentPage - 1) * limit + 1} to{" "}
                {Math.min(currentPage * limit, totalCourses)} of {totalCourses}{" "}
                courses
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

// Main Courses component with Suspense boundary
const Courses = () => {
  const pathnamee = usePathname();
  const hideHeaderFooter = pathnamee === '/pdf';

  return (
    <>
      <ScrollToTop />

      {!hideHeaderFooter && <Header />}
      <main>
        <Suspense fallback={<div className="text-center py-20 font-goldman">Loading...</div>}>
          <CoursesContent />
        </Suspense>
      </main>

      {!hideHeaderFooter && <Footer />}
    </>
  );
};

export default Courses;