"use client";

import { AlarmClock } from "lucide-react";
import { useRouter } from "next/navigation";
import { Goldman } from "next/font/google";

const inter = Goldman({ subsets: ["latin"] , weight:['400','700']});

type FilterSectionProps = {
 courseData:any; 
 selectedCity:any; 
 selectedDate:any
};


const ApplyNowButton : React.FC<FilterSectionProps>  = ({ courseData, selectedCity, selectedDate }) => {
  const router = useRouter();

  const handleClick = () => {
    const queryParams = new URLSearchParams({
      city: selectedCity || "",
      date: selectedDate || "",
      courseId: courseData?.id || "", // Or any identifier you use
    }).toString();

    router.push(`/register?${queryParams}`);
  };

  return (
    <button
      className={`${inter.className} w-full h-full flex-center bg-[#FAD425] text-[#374957] font-goldman flex-nowrap text-nowrap p-4`}
      onClick={handleClick}
    >
      <AlarmClock className="inline-block mr-3 text-[#374957]" color="#374957" />
      Apply Now
    </button>
  );
};

export default ApplyNowButton;
