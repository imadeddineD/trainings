"use client"
import { useGSAP } from "@gsap/react";
import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // أو useSearchParams إذا استخدمت query
import gsap from "gsap";
import { extractSection, formatPrice } from "@/components/htmlutils";


const PDF = () => {
const router = useRouter();
  const [contacts, setContacts] = useState<any>([]);

  // مثال: إذا استخدمت localStorage لتخزين البيانات عند التنقل
  const [formData, setFormData] = useState<any>(null);
  const [courseData, setCourseData] = useState<any>(null);
  const [selectedCity, setSelectedCity] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<any>(null);

  const VITE_API_LINK="https://api.euptc.com"

  useEffect(() => {
    // استرجاع البيانات من localStorage (أو من query أو props حسب تصميمك)
    const stored = JSON.parse(localStorage.getItem("courseInfo") || "{}");
    setFormData(stored.formData);
    setCourseData(stored.courseData);
    setSelectedCity(stored.selectedCity);
    setSelectedDate(stored.selectedDate);
  }, []);

  // Fetch contacts
  useEffect(() => {
    fetch(`${VITE_API_LINK}/api/contact`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch contact info");
        return res.json();
      })
      .then((data) => setContacts(data))
      .catch((err) => console.error("Error fetching contact info:", err));
  }, []);

  // Animations
  const triggerRef = useRef(null);
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

  if (!courseData) return null; 

  // Extracted sections
  const competencies = courseData.faqs ? JSON.parse(courseData.faqs) : {};
  const introduction = extractSection(courseData.short_description, [
    "Introduction",
    " Introduction: ",
    " Introduction ",
    "About the Course",
  ]);
  const objectives = extractSection(courseData.short_description, [
    "Objectives",
    " Objectives: ",
    " Objectives ",
    "Outputs",
  ]);
  const courseOutline = extractSection(courseData.short_description, [
    "Outline",
    "Outline for 5 days",
    " Outline: ",
    " Outline for 5 days ",
    " Course Outline: 5 Days, 5 Topics per Day ",
    " Course Outline: ",
    "Course Outline",
  ]);
  const formattedPrice = formatPrice(courseData.price);

  return (    
    <>
    
  <div className="print-A4 max-w-screen-2xl mx-auto font-times overflow-hidden min-h-screen flex flex-col print:min-h-screen print:flex print:flex-col relative">
      <header className="bg-blue xl:h-[210px] h-[200px] max-sm:h-[170px] max-[391px]:h-[150px] relative print:h-fit">
        <div className="container-px flex justify-between py-7 print:py-4">
          <picture>
            <source srcSet="optimized-imgs/Logo-full.webp" type="image/webp" />
            <img
              className="w-[170px] max-sm:w-[130px] max-[391px]:w-[110px] print:w-[90px]"
              src="imgs/Logo-full.png"
              alt="logo"
            />
          </picture>
          <div className="max-sm:text-[14px] max-[391px]:text-[12px] print:text-[12px]">
            <div className="flex justify-between font-arial text-white">
              <span>Company Number:</span>
              <span> 14562349</span>
            </div>
            <div className="flex justify-between font-arial text-white">
              <span>Company Registration:</span>
              <span> England</span>
            </div>
          </div>
        </div>
        <div className="absolute left-0 top-0 w-full h-full flex items-end overflow-hidden print:hidden">
          <picture>
            <source
              srcSet="optimized-imgs/PDF/Red-lines.webp"
              type="image/webp"
            />
            <img
              className="w-full min-w-[1024px] object-cover print:min-w-[768px]"
              src="imgs/PDF/Red-lines.png"
              alt="waves"
            />
          </picture>
        </div>
      </header>

      <div className="print-flex-grow flex-grow">
        <section className="container-px xl:text-[24px] text-[21px] py-4 print:text-[15px] print:py-2">
          <h3>Dear {formData?.company}</h3>
          <p className="ms-5">
            We are pleased to offer Your employee {formData?.name} the
            opportunity to participate in our training course{" "}
            {courseData?.title} at Europe Professional Training. According to
            the following information:
          </p>
        </section>

        <section className="flex justify-between max-lg:flex-col lg:text-[17px]  mr-[1px] bg-[#F3F0F08F] print:text-[13px]">
          <div className="course-table container-px py-4 print:py-2 grid xl:grid-cols-5 grid-cols-4 gap-y-4 print:gap-y-2">
            <h4 className="title col-span-1">course title:</h4>
            <p className="body xl:text-2xl text-[20px] xl:col-span-4 col-span-3 print:text-[15px]">
              {courseData?.title}
            </p>
            <h4 className="title col-span-1">Course Category:</h4>{" "}
            <p className="body text-[20px] col-span-1 print:text-[15px]">
              {courseData?.category}
            </p>
            <h4 className="title col-span-1">Course City:</h4>{" "}
            <p className="body text-[20px] xl:col-span-2 col-span-1 print:text-[15px]">
              {selectedCity || courseData?.city || "N/A"}
            </p>
            <h4 className="title col-span-1">Course Date:</h4>{" "}
            <p className="body text-[20px] col-span-1 print:text-[15px]">
              {selectedDate || "No Date Picked"}
            </p>
            <h4 className="title col-span-1">Course fee:</h4>{" "}
            <p className="body xl:col-span-2 col-span-1 !text-black text-[22px] print:text[15px]">
              {formattedPrice}
            </p>
          </div>
        </section>

        <section className="container-px py-4 print:py-1 print:text-[13px]">
          <div ref={triggerRef}>
            <p className="mb-4 xl:text-[24px] text-[21px] print:text-[15px]">
              This course is designed to support employees in developing the
              following competencies, with each competency addressed according
              to the percentages shown below:
            </p>
            {/* Competencies Progress Bars */}
            <div className="mt-4 mb-4">
              <h2 className="text-2xl font-semibold mb-3">
                Course Competencies
              </h2>
              <p>
                This course supports the following competencies with advanced
                proficiency:
              </p>
              <div className="font-goldman text-black flex flex-col gap-y-[6px] max-xs:text-[11.5px] mt-4">
                {Object.entries(competencies).map(([key, value]:any) => (
                  <div
                    key={key}
                    className="bg-[#E8E8E8] rounded-[3px] h-[30px] relative"
                  >
                    <div
                      className="progress-bar rounded-[3px] absolute left-0 top-0 h-full w-0"
                      data-percent={`${value}`}
                      style={{
                        backgroundColor: key.includes("Financial")
                          ? "#85B9E1"
                          : key.includes("Cost")
                          ? "#F2B670"
                          : key.includes("Accounting")
                          ? "#B7D190"
                          : "#9CB9E4",
                      }}
                    ></div>
                    <span className="relative z-10 pl-3">
                      {key} ({value}%)
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="container-px text-[16px] relative mb-[180px] print:text-[14px] print:mb-[70px]">
          {introduction && (
            <div className="mb-3">
              <h2 className="text-2xl font-semibold mb-3">About this Course</h2>
              <div dangerouslySetInnerHTML={{ __html: introduction }} />
            </div>
          )}

           {objectives && (
            <div className="mb-3">
              <h2 className="text-2xl font-semibold mb-3">Outputs</h2>
              <div dangerouslySetInnerHTML={{ __html: objectives }} />
            </div>
          )}

          {courseOutline && (
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-3">Course Outline</h2>
              <div
                className="font-bold"
                dangerouslySetInnerHTML={{
                  __html: courseOutline.replace(/(\d+:)/g, "<br/>$1"),
                }}
              />
            </div>
          )}          {/* Print settings for scale, margins, and background graphics */}
          <style>
            {`
           @media print {
            @page {
              size: Statement portrait;
              margin: 0;
            }

            html, body {
              height: 100% !important;
              width: 100% !important;
              margin: 0 !important;
              padding: 0 !important;
              zoom: 0.825 !important;
            }

            body > div {
              min-height: 100vh !important; /* Force full viewport height */
              height: 100% !important;
              display: flex !important;
              flex-direction: column !important;
              justify-content: space-between; /* Optional: space out header/footer */
            }
           .print-flex-grow {
              flex: 1 0 auto;
            }
            .container, .main, .wrapper {
              flex: 1;
              width: 100% !important;
              max-width: none !important;
              margin: 0 auto !important;
              box-sizing: border-box !important;
              padding: 0 10px;
            }
            footer {
              flex-shrink: 0;
              margin-top: auto !important;
              position: fixed;
              bottom: 0;
              width: 100%;
            }
          }
          
          /* Ensure sticky footer works properly in non-print mode */
          @media screen {
            .print-A4 {
              display: flex;
              flex-direction: column;
              min-height: 100vh;
            }
            
            .print-flex-grow {
              flex: 1 0 auto;
            }
            
            footer.sticky {
              margin-top: auto;
            }
          }
                `}
          </style>
        </section>
      </div>

      {/* print document */}      <div className="my-6 print:hidden flex justify-end px-4">
        <button
          onClick={() => window.print()}
          className="bg-blue-600 text-black text-xl font-semibold px-6 py-3 rounded shadow-lg hover:bg-blue-700 flex items-center gap-2"
        >
          🖨️ Print PDF
        </button>
      </div>
      <div style={{ height: '80px' }} className="print:hidden" />

      <footer className="md:h-[60px] bg-blue text-white lg:text-[20px] max-md:text-[20px] font-goldman print:h-[70px] print:text-[14px] print:mt-auto sticky bottom-0 w-full">
        <div className="container-px h-full flex max-md:flex-col max-md:gap-4 max-md:py-7 justify-between items-center print:flex-row print:gap-0 print:py-0">
          <picture className="h-full">
            <source srcSet="optimized-imgs/Logo-full.webp" type="image/webp" />
            <img
              className="max-h-full max-md:max-w-[200px] py-1"
              src="imgs/Logo-full.png"
              alt="logo"
              loading="lazy"
            />
          </picture>

          {contacts.length > 0 ? (
            <>
              <span className="flex gap-2">
                {contacts[0]?.website || "www.eptce.com"}{" "}
                <img
                  src="imgs/Contact/location-icon.svg"
                  alt="location icon"
                  loading="lazy"
                />
              </span>
              <span className="flex gap-3">
                {contacts[0]?.email || "info@eptce.com"}{" "}
                <img
                  src="imgs/Contact/email-icon.svg"
                  alt="email icon"
                  loading="lazy"
                />
              </span>
              <span className="flex gap-2">
                {contacts[0]?.phone || "+447737137773"}{" "}
                <img
                  src="imgs/Contact/whatsapp-icon.svg"
                  alt="whatsapp icon"
                  loading="lazy"
                />
              </span>
            </>
          ) : (
            <>
              <span className="flex gap-2">
                www.eptce.com{" "}
                <img
                  src="imgs/Contact/location-icon.svg"
                  alt="location icon"
                  loading="lazy"
                />
              </span>
              <span className="flex gap-3">
                info@eptce.com{" "}
                <img
                  src="imgs/Contact/email-icon.svg"
                  alt="email icon"
                  loading="lazy"
                />
              </span>
              <span className="flex gap-2">
                +447737137773{" "}
                <img
                  src="imgs/Contact/whatsapp-icon.svg"
                  alt="whatsapp icon"
                  loading="lazy"
                />
              </span>
            </>
          )}
        </div>
      </footer>
    </div>
    </>
  );
};

export default PDF;
