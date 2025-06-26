"use client"
import { useEffect, useState } from 'react';

interface User {
  user_id: string;
  first_name: string;
}

interface UserProviderProps {
  children: (user: User | null) => React.ReactNode;
}

const UserProvider = ({ children }: UserProviderProps) => {
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

  return <>{children(user)}</>;
};

export default UserProvider;