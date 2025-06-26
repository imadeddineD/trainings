"use client"
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';


const Login = () => {
  const navigate = useRouter();
  const [error, setError] = useState('');

   const VITE_API_LINK="https://api.euptc.com"

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      navigate.push('/quizz');
    }
  }, []);

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setError('');

    const formData = new FormData(e.target);
    const id = formData.get('id');
    const password = formData.get('password');

    try {
      const response = await fetch(
        `${VITE_API_LINK}/api/users/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id, password }), // <-- confirm your backend expects 'id'
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          setError('Not authorized, please contact the admin.');
        } else {
          setError('Login failed. Please try again.');
        }
        return;
      }

      const data = await response.json();

      // Fix: use data.user, not undefined 'user'
      const tipsResponse = await fetch(
        `${VITE_API_LINK}/api/sections/finalResults/${
          data.user.user_id
        }`
      );
      if (tipsResponse.ok) {
        const tipsData = await tipsResponse.json();
        localStorage.setItem('tips', JSON.stringify(tipsData));
      } else {
        console.warn('Tips fetch failed');
      }

      localStorage.setItem('user', JSON.stringify(data.user));
      navigate.push('/quizz');
    } catch (err) {
      setError('Network error, please try again later.');
      console.error('Login error:', err);
    }
  };

  return (
    <div className='bg-[#eef1f1] min-h-screen' lang='ar' dir='rtl'>
      <main className='container-px py-20 flex-center'>
        <form
          onSubmit={handleSubmit}
          className='max-w-[650px] w-full sm:h-[400px] h-[300px] rounded-xl drop-shadow-[-4.226px_9.063px_5px_rgba(117,116,113,0.65)]
          bg-[#e7e8e8] border border-[#067a86] sm:py-9 sm:px-16 py-8 px-10 text-[17px]'
        >
          <input
            className='w-full leading-none h-[45px] bg-white border border-[#024954] p-4 text-[#024954] placeholder:text-[#024954] mb-2'
            type='text'
            name='id'
            id='id'
            placeholder='رقم الموظف'
            required
          />
          <input
            className='w-full leading-none h-[45px] bg-white border border-[#024954] p-4 text-[#024954] placeholder:text-[#024954] mb-2'
            type='password'
            name='password'
            id='password'
            placeholder='كلمة المرور'
            required
          />
          {error && (
            <p className='text-red-600 text-center mb-2 font-semibold'>
              {error}
            </p>
          )}
          <button className='assessment-btn sm:mt-20 mt-10' type='submit'>
            تسجيل الدخول
          </button>
        </form>
      </main>
    </div>
  );
};

export default Login;
