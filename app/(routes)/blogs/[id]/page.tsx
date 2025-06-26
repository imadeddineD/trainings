"use client";

import React, { Suspense, useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import defaultBlogImage from '../../../../public/assets/blogs/article1.png';
import ScrollToTop from '@/components/ScrollToTop';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface BlogDetailsPageProps {
  params: { id: any };
}

const BlogDetails = ({ params }: BlogDetailsPageProps) => {
  const navigate = useRouter();
  const searchParams = useSearchParams();

  const id = decodeURIComponent(params.id); 
  const blogDetailsFromState = JSON.parse(searchParams.get('blogDetails') || 'null');

   const VITE_API_LINK="https://api.euptc.com"

       const pathnamee = usePathname();
       const hideHeaderFooter = pathnamee === '/pdf';


  const [blogDetails, setBlogDetails] = useState<any>(null);
  const [loading, setLoading] = useState<any>(true);
  const [error, setError] = useState<any>(null);


 
  // Function to decode HTML entities
  const decodeHtmlEntities = (text:any) => {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.value;
  };
  // Function to fetch blog details
  const fetchBlogDetails = async (blogId:any) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${VITE_API_LINK}/api/blogs/${blogId}`);
      if (!response.ok) throw new Error('Failed to fetch blog details');
      const data = await response.json();
      
      // Decode HTML entities in the description
      if (data.description) {
        data.description = decodeHtmlEntities(data.description);
      }
      
      setBlogDetails(data);
    } catch (err) {
      console.error('Failed to fetch blog details:', err);
      setError('Failed to load blog details. Please try again.');
    } finally {
      setLoading(false);
    }
  };  useEffect(() => {
    // Priority 1: If we have blog details from navigation state, use them immediately
    // This happens when user clicks on a blog from the Blogs component
    if (blogDetailsFromState) {
      let processedBlogDetails = { ...blogDetailsFromState };
      
      // Decode HTML entities in the description if it exists
      if (processedBlogDetails.description) {
        processedBlogDetails.description = decodeHtmlEntities(processedBlogDetails.description);
      }
      
      setBlogDetails(processedBlogDetails);
      setLoading(false);
      setError(null);
    } 
    // Priority 2: Otherwise, fetch from API using the ID parameter
    // This happens when user directly navigates to the URL or refreshes the page
    else if (id) {
      fetchBlogDetails(id);
    }
    // Priority 3: If no state and no ID, show error
    else {
      setError('No blog information available');
      setLoading(false);
    }
  }, [id, blogDetailsFromState]);
  // Go back to blogs
  const goBackToBlogs = () => {
    navigate.push('/blogs');
  };

  if (loading) {
    return (
      <div className="container mx-auto py-20 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        <p className="text-gray-600 mt-4">Loading blog details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-20 text-center">
        <p className="text-red-500 mb-4">{error}</p>
        <div className="space-x-4">
          {id && (
            <button
              onClick={() => fetchBlogDetails(id)}
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Retry
            </button>
          )}
          <button
            onClick={goBackToBlogs}
            className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Back to Blogs
          </button>
        </div>
      </div>
    );
  }

  if (!blogDetails) {
    return (
        <>
          <ScrollToTop />

      {!hideHeaderFooter && <Header />}
    <main>
    <Suspense fallback={<div className="text-center py-20 font-goldman">Loading...</div>}>
      <div className="container mx-auto py-20 text-center">
        <p className="text-gray-600 mb-4">Blog not found.</p>
        <button
          onClick={goBackToBlogs}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Back to Blogs
        </button>
      </div>
      </Suspense>
       </main>
     {!hideHeaderFooter && <Footer />}
      </>
    );
  }

  return (
    <>

  <ScrollToTop />

      {!hideHeaderFooter && <Header />}
    <main>
    <Suspense fallback={<div className="text-center py-20 font-goldman">Loading...</div>}>
  <div className='container-px py-5'>
      {/* Back Button No blog information available */}
      <div className='mb-6'>
        <button
          onClick={goBackToBlogs}
          className='flex items-center gap-2 text-blue hover:text-blue-700 font-medium'
        >
          <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
          </svg>
          Back to Blogs
        </button>
      </div>      {/* Blog Details Content */}
      <article className='max-w-4xl mx-auto'>        {/* Blog Banner */}
        <div className='mb-8'>
          <img
            src={blogDetails.banner || defaultBlogImage}
            alt={blogDetails.title}
            className='w-full h-64 md:h-80 lg:h-96 object-cover rounded-lg shadow-lg'
            onError={(e:any) => {
              if (e.target.src !== defaultBlogImage) {
                e.target.src = defaultBlogImage;
              }
            }}
          />
        </div>

        {/* Blog Header */}
        <header className='mb-8'>
          <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 leading-tight'>
            {blogDetails.title}
          </h1>

          {/* Author and Date Info */}
          <div className='flex flex-wrap items-center gap-4 text-gray-600 border-b border-gray-200 pb-4'>
            <div className='flex items-center gap-2'>
              <div className='w-10 h-10 bg-blue text-white rounded-full flex items-center justify-center font-semibold'>
                {(blogDetails.author_firstName || 'J').charAt(0).toUpperCase()}
              </div>
              <span className='font-medium'>
                {blogDetails.author_firstName || 'John'} {blogDetails.author_lastName || 'Doe'}
              </span>
            </div>
            
            {blogDetails.added_date && (
              <div className='flex items-center gap-2'>
                <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
                </svg>
                <span>
                  {new Date(parseInt(blogDetails.added_date) * 1000).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
            )}

            {blogDetails.keywords && (
              <div className='flex items-center gap-2'>
                <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z' />
                </svg>
                <span className='text-sm bg-gray-100 px-2 py-1 rounded'>
                  {blogDetails.keywords}
                </span>
              </div>
            )}
          </div>
        </header>

        {/* Blog Content */}
        {blogDetails.description && (
          <div className='prose prose-lg max-w-none'>
            <style dangerouslySetInnerHTML={{ __html: blogContentStyles }} />
            <div 
              className='blog-content'
              dangerouslySetInnerHTML={{ __html: blogDetails.description }}
            />
          </div>
        )}        {/* Back to Blogs Button at Bottom */}
        <div className='mt-12 pt-8 mb-16 border-t border-gray-200 text-center'>
          <button
            onClick={goBackToBlogs}
            className='px-8 py-3 bg-blue text-white rounded-lg hover:bg-blue-700 transition-colors'
          >
            Back to All Blogs
          </button>
        </div>
      </article>
    </div>
    </Suspense>
      </main>
     {!hideHeaderFooter && <Footer />}
    </>
  );
};

export default BlogDetails;


// Add styles for blog content
const blogContentStyles = `
  .blog-content {
    line-height: 1.8;
    color: #374151;
  }
  
  .blog-content p {
    margin-bottom: 1.5rem;
    font-size: 16px;
  }
  
  .blog-content .container,
  .blog-content .page-single,
  .blog-content .psingle-content,
  .blog-content .row,
  .blog-content .col-md-9,
  .blog-content .psingle-left {
    all: unset;
    display: block;
    width: 100%;
  }
  
  .blog-content .col-md-3,
  .blog-content .psingle-right {
    display: none; /* Hide sidebar content */
  }
  
  .blog-content h1, .blog-content h2, .blog-content h3, .blog-content h4 {
    font-weight: 600;
    color: #1f2937;
    margin: 2rem 0 1rem 0;
  }
  
  .blog-content h1 { font-size: 2rem; }
  .blog-content h2 { font-size: 1.75rem; }
  .blog-content h3 { font-size: 1.5rem; }
  .blog-content h4 { font-size: 1.25rem; }
  
  .blog-content br {
    display: block;
    margin: 0.5rem 0;
  }
  
  .blog-content ul, .blog-content ol {
    margin: 1rem 0;
    padding-left: 2rem;
  }
  
  .blog-content li {
    margin-bottom: 0.5rem;
  }
  
  .blog-content img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    margin: 1rem 0;
  }
  
  .blog-content blockquote {
    border-left: 4px solid #3b82f6;
    padding-left: 1rem;
    margin: 1.5rem 0;
    font-style: italic;
    color: #6b7280;
  }
`;

