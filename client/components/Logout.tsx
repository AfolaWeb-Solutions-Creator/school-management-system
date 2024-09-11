'use client';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const Logout = () => {
  const router = useRouter();

  const handleLogout = () => {
    // Clear cookies
    Cookies.remove('x-auth-token');

    // Clear local storage if needed
    localStorage.removeItem('userId');

    // Redirect to home page
    router.push('/');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <p>Are you sure you want to log out?</p>
      <button onClick={handleLogout} className="bg-blue-500 text-white py-2 px-4 rounded">
        Log Out
      </button>
    </div>
  );
};

export default Logout;
