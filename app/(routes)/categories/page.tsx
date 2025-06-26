"use client"
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import ScrollToTop from '@/components/ScrollToTop';
import Searchbycompetencies from '@/components/Searchbycompetencies';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';


// Color palette for categories
const categoryColors = [
  "bg-[#D1527F]", "bg-[#D8B200]", "bg-[#4ECF9A]", "bg-[#949090]", 
  "bg-[#4EB1CF]", "bg-[#ED8C05]", "bg-[#99643C]", "bg-[#E260B7]", 
  "bg-[#BA6EC1]", "bg-[#60D7E2]"
];

const Categories = () => {
  const [categories, setCategories] = useState<any>([]);
  const [loading, setLoading] = useState<any>(true);
  const [phoneNumber, setPhoneNumber] = useState<any>(null);
  const navigate = useRouter();


    const pathname = usePathname();
    const hideHeaderFooter = pathname === '/pdf';

  // Handle category click navigation
  const handleCategoryClick = (categoryName:any) => {
    const params = new URLSearchParams();
    params.set('category', categoryName);
    navigate.push(`/courses?${params.toString()}`);
  };

  // Handle subcategory click navigation
  const handleSubCategoryClick = (categoryName:any, subCategoryName:any) => {
    const params = new URLSearchParams();
    params.set('category', categoryName);
    params.set('subCategory', subCategoryName);
    navigate.push(`/courses?${params.toString()}`);
  };

  // Fetch main categories and their subcategories
  const VITE_API_LINK="https://api.euptc.com"
  useEffect(() => {
    const fetchCategoriesAndSubs = async () => {
        
      try {
        setLoading(true);
        
        // Fetch main categories
        const mainCategoriesResponse = await fetch(`${VITE_API_LINK}/api/courses/main-category`);
        const mainCategoriesData = await mainCategoriesResponse.json();
        const categoryNames = mainCategoriesData.map((cat:any) => cat.category);

        // Fetch subcategories for each main category
        const categoriesWithSubs = await Promise.all(
          categoryNames.map(async (categoryName:any, index:any) => {
            try {
              const subCategoriesResponse = await fetch(
                `${VITE_API_LINK}/api/courses/category/${encodeURIComponent(categoryName)}`
              );
              const subCategoriesData = await subCategoriesResponse.json();
              const subCategoryList = subCategoriesData.map((item:any) => item.sub_category);

              return {
                category: categoryName,
                subs: subCategoryList,
                color: categoryColors[index % categoryColors.length] // Cycle through colors
              };
            } catch (error) {
              console.error(`Error fetching subcategories for ${categoryName}:`, error);
              return {
                category: categoryName,
                subs: [],
                color: categoryColors[index % categoryColors.length]
              };
            }
          })
        );

        setCategories(categoriesWithSubs);
      } catch (error) {
        console.error('Error fetching main categories:', error);
        // Fallback to empty array or you could set some default categories
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoriesAndSubs();
  }, []);

  useEffect(() => {
    // Fetch phone number from API
    fetch(`${VITE_API_LINK}/api/contact`)
      .then((res) => res.json())
      .then((data) => {
        // Assuming your API returns an object like { phone: "201234567890" }
        setPhoneNumber(data[0].phone);
      })
      .catch((err) => {
        console.error('Failed to fetch contact:', err);
      });
  }, []);

  return (
    <>

     <ScrollToTop />

      {!hideHeaderFooter && <Header />}
    <main>
    <Suspense fallback={<div className="text-center py-20 font-goldman">Loading...</div>}>
    <div className="max-w-screen-2xl mx-auto">
        {/* WhatsApp Floating Icon */}
        <a
          href={`https://wa.me/${phoneNumber}`}
          target='_blank'
          rel='noopener noreferrer'
          className='fixed bottom-6 right-6 z-50 bg-green-500 rounded-full p-3 shadow-lg hover:bg-green-600 transition-colors'
          aria-label='Chat on WhatsApp'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='32'
            height='32'
            fill='white'
            viewBox='0 0 24 24'
          >
            <path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.447-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.148-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.372-.01-.571-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.363.709.306 1.262.489 1.694.626.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347zm-5.421 7.617h-.001a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.999-3.648-.235-.374A9.86 9.86 0 012.1 12.893C2.073 7.61 6.659 3.017 12.002 3c2.652.009 5.146 1.037 7.019 2.916a9.822 9.822 0 012.92 7.013c-.017 5.383-4.603 9.977-9.97 9.977zm8.413-18.29A11.815 11.815 0 0012.003.001C5.373.022.066 5.36.099 11.993c.017 2.11.553 4.162 1.601 5.977L.057 24l6.153-1.637a11.89 11.89 0 005.841 1.489h.005c6.627 0 12.015-5.385 12.033-12.009a11.821 11.821 0 00-3.504-8.435z' />
          </svg>
        </a>

        <Searchbycompetencies />
          <section className="container-px py-[60px] lg:pb-[130px] md:pb-[100px] pb-[80px]">
            <h1 className="xs:text-2xl text-[22px] text-red font-goldman mb-8">Discover the training world categories</h1>

            {loading ? (
              <div className="text-center py-10">
                <p className="text-gray-600">Loading categories...</p>
              </div>
            ) : categories.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-gray-600">No categories available at the moment.</p>
              </div>            ) : (              <div className="grid md:grid-cols-2 md:gap-y-4 md:gap-x-6 gap-4">
                  {categories.map(({category, subs, color}:any, i:any) => (
                      <div className={`font-arial flex flex-col gap-1 xl:text-[18px] lg:text-[15px] md:text-[13px] max-xs:text-[14px] md:even:ml-auto w-full xl:max-w-[620px] md:max-w-[600px] ${subs.length < 2 ? 'h-auto' : 'h-fit'}`} key={category + i}>
                          <div 
                              className={`text-white font-bold flex items-center py-[2.5px] px-6 xl:gap-5 lg:gap-4 gap-3 h-[40px] max-md:justify-center text-center cursor-pointer hover:opacity-90 transition-opacity ${color}`}
                              onClick={() => handleCategoryClick(category)}
                          >
                              <picture>
                                  <source src="optimized-imgs/Categories/Icon.webp" type="image/webp" />
                                  <img src="imgs/Categories/Icon.png" alt="category icon" loading="lazy" />
                              </picture>
                              <span>{category}</span>
                          </div>                          <div className={`flex flex-col ${subs.length < 2 ? 'gap-0.5' : 'gap-1'} ${subs.length < 2 ? 'min-h-[40px]' : 'min-h-[50px]'}`}>
                              {subs.length > 0 ? subs.map((sub:any) => (
                                  <div 
                                      className={`bg-[#F4F3F3] py-[2.5px] px-6 h-[40px] flex items-center max-md:justify-center cursor-pointer hover:bg-gray-200 transition-colors`} 
                                      key={sub}
                                      onClick={() => handleSubCategoryClick(category, sub)}
                                  >
                                      {sub}
                                  </div>
                              )) : (
                                  <div className="bg-[#F4F3F3] py-[2.5px] px-6 h-[40px] flex items-center max-md:justify-center text-gray-500 italic">
                                      No subcategories available
                                  </div>
                              )}
                          </div>
                      </div>
                  ))}
              </div>
            )}
        </section>

    </div>
    </Suspense>
    </main>

    {!hideHeaderFooter && <Footer />}
    </>
  )
}

export default Categories