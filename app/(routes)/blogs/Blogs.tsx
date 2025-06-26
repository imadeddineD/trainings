"use client"
import React, { Suspense, useEffect, useState } from 'react';

import img1 from '../../../public/assets/blogs/article1.png';
import img2 from '../../../public/assets/blogs/article2.png';
import img3 from '../../../public/assets/blogs/article3.png';
import img4 from '../../../public/assets/blogs/article4.png';
import img5 from '../../../public/assets/blogs/article5.png';
import { usePathname, useRouter } from 'next/navigation';
import ScrollToTop from '@/components/ScrollToTop';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const staticImages = [img1, img2, img3, img4, img5];

const Blogs = () => {
  const navigate = useRouter();
  const [blogs, setBlogs] = useState<any>([]);
  const [loading, setLoading] = useState<any>(true);
  const [error, setError] = useState<any>(null);
  const VITE_API_LINK="https://api.euptc.com"

    const pathnamee = usePathname();
    const hideHeaderFooter = pathnamee === '/pdf';

  useEffect(() => {
    fetch(`${VITE_API_LINK}/api/blogs`)
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((data) => {
        setBlogs(data);
        setLoading(false);
      })
      .catch((err:any) => {
        console.error('Failed to fetch blogs:', err);
        setError('Failed to load blogs');
        setLoading(false);
      });
  }, []);

  // Handle blog click - navigate to blog details page
  const handleBlogClick = (blog:any) => {
    navigate.push(`/blogs/${blog.blog_id.toString()}`, {
    });
  };

  if (loading) return <p className='text-center py-10'>Loading blogs...</p>;
  if (error) return <p className='text-center py-10 text-red-500'>{error}</p>;

  return (
    <>
        <ScrollToTop />

      {!hideHeaderFooter && <Header />}
    <main>
    <Suspense fallback={<div className="text-center py-20 font-goldman">Loading...</div>}>
    <section className='container-px py-5'>
      <div className='text-center xl:mb-[60px] lg:mb-[55px] mb-[60px]'>
        <h2 className='font-bold text-[28px] text-red xl:mb-[14px] lg:mb-1 mb-[14px]'>
          Our Blogs
        </h2>
        <h3 className='text-blue font-goldman xl:text-[45px] lg:text-[42px] md:text-[45px] sm:text-[39px] text-[32px]'>
          Specialized Articles
        </h3>
      </div>

      <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5'>
        {blogs.map((blog:any, index:any) => {
          // Pick the static image by index or fallback to img1 if more than 5 blogs
          const bgImage = staticImages[index] || img1;

          // Custom layout for first blog
          const isFirst = index === 0;

          return (
            <article
              key={blog.blog_id}
              className={`col-span-1 rounded-[10px] relative group overflow-hidden bg-cover bg-center bg-no-repeat cursor-pointer hover:scale-105 transition-transform duration-300
                ${
                  isFirst
                    ? 'sm:col-span-2 row-span-2 xl:py-[100px] xl:px-[80px] lg:py-[70px] lg:px-[50px] md:py-[100px] md:px-[80px] sm:py-[60px] sm:px-[50px] px-[20px] py-[30px] xl:min-h-[530px] lg:min-h-[230px] sm:min-h-[530px] min-h-[315px]'
                    : 'xl:py-[30px] xl:px-[20px] lg:py-[25px] lg:px-[18px] py-[30px] px-[20px] xl:min-h-[315px] lg:min-h-[230px] min-h-[315px]'
                }
              `}
              style={{
                backgroundImage: `url(${
                  blog.thumbnail ? blog.thumbnail : bgImage
                })`,
              }}
              onClick={() => handleBlogClick(blog)}
            >
              <div className='absolute left-0 top-0 h-full w-full bg-gradient-to-b from-transparent to-black group-hover:opacity-0 transition-opacity duration-[220ms]'></div>
              <div className='flex flex-col h-full justify-end gap-2 relative z-10'>
                <h3
                  className={`font-bold text-[#FAFAFA] ${
                    isFirst
                      ? 'xl:text-[28px] lg:text-[21.5px] sm:text-[28px] text-[18px]'
                      : 'xl:text-[18px] lg:text-[14px] text-[18px]'
                  }`}
                >
                  {blog.title}
                </h3>
                <h6
                  className={`text-[#D9D9D9] ${
                    isFirst
                      ? 'xl:text-[16px] lg:text-[14px] max-sm:text-[14px]'
                      : 'xl:text-[14px] lg:text-[12px] text-[14px]'
                  }`}
                >
                  By - {blog.author_firstName || 'John Doe'}{' '}
                  {blog.authorLastName}
                </h6>
              </div>
            </article>
          );
        })}
      </div>
    </section>
    </Suspense>
        </main>
     {!hideHeaderFooter && <Footer />}
    </>
  );
};

export default Blogs;
