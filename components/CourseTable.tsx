"use client"
import ApplyNowButton from "./ApplyNowButton"
import { format, parseISO } from 'date-fns';
import { formatPrice } from "./htmlutils";
import { Goldman } from "next/font/google";


const inter = Goldman({ subsets: ["latin"] , weight:['400','700']});

type FilterSectionProps = {
 courseData:any; 
 selectedCity:any; 
 selectedDate:any
};

const CourseTable: React.FC<FilterSectionProps>  = ({ courseData, selectedDate, selectedCity }) => {
    const formattedPrice = formatPrice(courseData.price);
      // Process the selectedDate if available
    const formattedDate = selectedDate 
        ? format(parseISO(selectedDate), 'dd MMM yyyy')
        : "No date picked";
        
return (
    <section className="flex justify-between max-lg:flex-col xl:text-[17px] lg:text-[14px] shadow-custom mr-[2px] bg-[#F3F0F08F]">
            <div className="course-table container-px py-[30px] grid xl:grid-cols-5 grid-cols-4 gap-y-4">
                    <h4 className={`${inter.className} title col-span-1 capitalize`}>course title:</h4>
                    <p className="body xl:text-2xl lg:text-[18px] text-[20px] xl:col-span-4 col-span-3 capitalize">{courseData?.title}</p>
                    <h4 className={`${inter.className} title col-span-1 capitalize`}>Course Category:</h4> <p className="body col-span-1 capitalize">{courseData?.category}</p>
                    <h4 className={`${inter.className} title col-span-1 capitalize`}>Course City:</h4> <p className="body xl:col-span-2 col-span-1 capitalize">{selectedCity ? selectedCity : "N/A" }</p>
                    <h4 className={`${inter.className} title col-span-1 capitalize`}>Course Date:</h4> <p className="body col-span-1 capitalize">{formattedDate}</p>
                    <h4 className={`${inter.className} title col-span-1 capitalize`}>Course fee:</h4> <p className="body xl:col-span-2 col-span-1 !text-black xl:text-[19px] lg:text-[17px] text-[19px] capitalize">{formattedPrice}</p>
            </div>

            <div className="bg-[#2C3C58] flex flex-col justify-between xl:w-[220px] lg:w-[180px] max-lg:w-full">
                    <div className="flex-center text-center flex-1 special text-white text-[17px] xl:p-6 lg:p-4 p-5 capitalize">
                            Get an official letter in 5 Seconds
                    </div>
                    <div className="h-[43px]">
                            <ApplyNowButton courseData={courseData} selectedCity={selectedCity} selectedDate={selectedDate} />
                    </div>
            </div>
    </section>
)
}

export default CourseTable