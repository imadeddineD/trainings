"use client"
import React, { useEffect, useState } from 'react'
import { Goldman } from "next/font/google";
import { useRouter } from 'next/navigation';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { isMonday, isAfter, startOfToday, format } from 'date-fns';
const inter = Goldman({ subsets: ["latin"] , weight:['400']});

const Searchbycompetencies = () => {
    const [selectedValues, setSelectedValues] = useState<any>({});
     const [mainCategories, setMainCategories] = useState<any>([]);
  const [subCategories, setSubCategories] = useState<any>([]);
  const [competencies, setCompetencies] = useState<any>([]);
  const [selectedDate, setSelectedDate] = useState<any>(null);
  const [selectedDuration, setSelectedDuration] = useState<any>("one week");
  const router = useRouter() 

   const cities : any = [
    'London',
    'Paris',
    'Damascus',
    'Manchester',
    'Istanbul',
    'Amsterdam',
    'Rome',
    'Madrid',
    'Barcelona',
    'Athens',
    'Dubai',    'Sharm El Sheikh',
  ];

  const durations : any = ['one week', 'two weeks'];

  const VITE_API_LINK="https://api.euptc.com"
  useEffect(() => {
    fetch(`${VITE_API_LINK}/api/courses/main-category`)
      .then((res) => res.json())
      .then((data) => {
        const categoryNames = data.map((cat:any) => cat.category);
        setMainCategories(categoryNames);
      })
      .catch((error) => {
        setMainCategories(['HR']); // Fallback
      });
  }, []);

   useEffect(() => {
    const mainCategory = selectedValues['Main Categories'];
    if (!mainCategory) return;

    fetch(
      `${VITE_API_LINK}/api/courses/competencies/${encodeURIComponent(
        mainCategory
      )}`
    )
      .then((res) => res.json())
      .then((data) => {
        setCompetencies(Array.isArray(data) ? data : []);
      })
      .catch((error) => {
        setCompetencies([
          'Leadership',
          'Communication',
          'Project Management',
          'Technical Skills',
        ]); // Fallback
      });
  }, [selectedValues['Main Categories']]);



   const fetchSubCategories = (mainCategory :any) => {
    if (!mainCategory) return;
    fetch(
      `${
        VITE_API_LINK
      }/api/courses/category/${encodeURIComponent(mainCategory)}`
    )
      .then((res) => res.json())
      .then((data) => {
        const subCategoryList = data.map((item : any) => item.sub_category);
        setSubCategories(subCategoryList);
      })
      .catch((error) => {
        console.error('Error fetching subcategories:', error);
      });
  };

  const handleChange = (e : any, title : any) => {
    const value = e.target.value;
    setSelectedValues((prev : any) => ({
      ...prev,
      [title]: value,
    }));

    if (title === 'Main Categories') {
      fetchSubCategories(value);
    }
  };

const handleSearch = (e: React.FormEvent) => {
  e.preventDefault();

  const mainCategory = selectedValues['Main Categories'];
  const subCategory = selectedValues['Sub Categories'];
  const city = selectedValues['City'];
  const date = selectedDate;
  const competency1 = selectedValues['competency 1'];
  const competency2 = selectedValues['Competency 2'];
  const duration = selectedDuration;

  const params = new URLSearchParams(); 

  if (mainCategory) params.set('category', mainCategory);
  if (subCategory) params.set('subCategory', subCategory);
  if (city) params.set('city', city);
  if (duration) params.set('duration', duration);
  
  // ADD THIS LINE TO INCLUDE THE DATE
  if (date) params.set('date', format(date, 'yyyy-MM-dd'));

  const competencies = [];
  if (competency1 && competency1 !== 'competency 1') competencies.push(competency1);
  if (competency2 && competency2 !== 'Competency 2') competencies.push(competency2);

  if (competencies.length > 0) {
    params.set('competencies', JSON.stringify(competencies));
  }

  router.push(`/courses?${params.toString()}`);
};



  return (
    <section className='container-px shadow-[0px_3px_4px_0px_#00000026] py-[58.5px] font-arial mb-1'>

         <div className={`${inter.className} xl:text-[32px] text-[27px] max-[490px]:text-[23px]`}>
        <h3>
          Search Based On <span className='text-[#DA0E29]'>Competencies</span>
        </h3>
      </div>

       <form onSubmit={handleSearch}>
         <div className="flex gap-14 pb-6 pt-8">
                    <label className="cursor-pointer flex items-center text-[#8E8988] font-bold" htmlFor="One-Week">
                      <input 
                        className="appearance-none peer" 
                        type="radio" 
                        name="duration" 
                        id="One-Week" 
                        value="one week" 
                        checked={selectedDuration === "one week"}
                        onChange={(e) => setSelectedDuration(e.target.value)}
                      />
                        <div className="w-[24px] h-[24px] rounded-full bg-[#B5AFAE] border-[3.5px] border-[#8E8988] 
                        peer-checked:bg-[#DA0E29] peer-checked:border-[#2C3C58] mr-[10px]"></div>
                        <span className="peer-checked:text-[#2C3C58]">One Week</span>
                    </label>
                    <label className="cursor-pointer flex items-center text-[#8E8988] font-bold" htmlFor="Two-Week">
                      <input 
                        className="appearance-none peer" 
                        type="radio" 
                        name="duration" 
                        id="Two-Week" 
                        value="two weeks"
                        checked={selectedDuration === "two weeks"}
                        onChange={(e) => setSelectedDuration(e.target.value)}
                      />
                        <div className="w-[24px] h-[24px] rounded-full bg-[#B5AFAE] border-[3.5px] border-[#8E8988] 
                        peer-checked:bg-[#DA0E29] peer-checked:border-[#2C3C58] mr-[10px]"></div>
                        <span className="peer-checked:text-[#2C3C58]">Two Weeks</span>
                    </label>
                </div>

                <div className='flex w-full max-lg:flex-col'>
          <div className='text-gray-400 grid grid-cols-5 max-md:grid-cols-4 max-sm:grid-cols-2 xl:gap-x-11 lg:gap-x-8 md:gap-x-8 gap-x-6 gap-y-6 flex-grow'>
            {[
              {
                title: 'Main Categories',
                options: mainCategories.length ? mainCategories : [''],
                cols: 'col-span-2',
              },
              {
                title: 'competency 1',
                options: competencies.length ? competencies : [''],
                cols: 'col-span-2 max-sm::order-3',
              },
              {
                title: 'City',
                options: cities,
                cols: 'col-span-1 max-md:order-5 max-md:col-span-col-span-2 max-sm::col-span-1',
              },
              {
                title: 'Sub Categories',
                options: subCategories.length ? subCategories : [''],
                cols: 'col-span-2',
              },
              {
                title: 'Competency 2',
                options: competencies.length ? competencies : [''],
                cols: 'col-span-2 max-sm::order-4',
              },
              {
                title: 'Date',
                isCalendar: true,
                cols: 'col-span-1 max-md:order-6 max-md:col-span-col-span-2 max-sm::col-span-1',
              },
            ].map(({ title, options, cols, isCalendar }) =>
              isCalendar ? (
                <div className={`${cols} relative`} key={title}>
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    filterDate={(date) =>
                      isMonday(date) && isAfter(date, startOfToday())
                    }
                    placeholderText='Date'
                    dateFormat='yyyy-MM-dd'
                    minDate={startOfToday()}
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode='select'
                    className='border-b-2 border-gray-400 pb-[2px] outline-none bg-transparent capitalize text-gray-400 cursor-pointer w-full appearance-none'
                  />
                  <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">
                    <div className="inline-block border-l-[5px] border-r-[5px] border-t-[8px] border-l-transparent border-r-transparent border-gray-400"></div>
                  </span>
                </div>
              ) : (
                <select
                  name={title}
                  className={`border-b-2 border-gray-400 pb-[2px] outline-none bg-transparent ${cols} capitalize ${
                    selectedValues[title] ? 'text-gray-800 border-gray-800' : ''
                  }`}
                  defaultValue={title}
                  key={title}
                  onChange={(e) => handleChange(e, title)}
                >
                  <option disabled hidden>
                    {title}
                  </option>
                  {options?.map((option:any) => (
                    <option className='text-gray-800' value={option} key={option}>
                      {option}
                    </option>
                  ))}
                </select>
              )
            )}
          </div>

          <div className='lg:ml-11 max-lg:mt-9'>
            <button
              type='submit'
              className='btn-red inline-block lg:h-full flex-center h-[60px] xl:w-[180px] w-[120px]'
            >
              Search
            </button>
          </div>
        </div>
         </form>

    </section>
  )
}

export default Searchbycompetencies