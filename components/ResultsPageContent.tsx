"use client"
import { useEffect, useState } from 'react';
import SectionsNav from '@/components/SectionNav';
import ResultsClient from '@/components/ResultsClients';

interface User {
  user_id: string;
  first_name: string;
  role_id: number;
}

interface ResultsPageContentProps {
  currentSection: number;
  sections: any;
  progress: number;
}

const ResultsPageContent = ({ currentSection, sections, progress }: ResultsPageContentProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const userString = localStorage.getItem('user');
      const userData = userString ? JSON.parse(userString) : null;
      setUser(userData);
    } catch (error) {
      console.error('Error parsing user data from localStorage:', error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return (
      <div className='flex items-center justify-center py-20'>
        <div className='animate-spin rounded-full h-16 w-16 border-b-2 border-[#03727d]'></div>
      </div>
    );
  }

  return (
    <>
      <SectionsNav
        currentSection={currentSection}
        user={user}
        sections={sections}
        progress={progress}
      />
      
      <section className='py-14'>
        <div className='flex items-start gap-4 font-bold text-[29px] max-sm:text-[24px] max-xs:text-[20px]'>
          <h1>نتائج تقييم الموظف {user?.first_name || 'غير محدد'}</h1>
        </div>
        
        <ResultsClient user={user} />
      </section>
    </>
  );
};

export default ResultsPageContent;