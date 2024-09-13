'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { LogOut } from 'lucide-react';

const Logout = () => {
  const router = useRouter();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleLogout = () => {
    // Clear cookies
    Cookies.remove('x-auth-token');

    // Clear local storage if needed
    localStorage.removeItem('userId');

    // Redirect to home page
    router.push('/');
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowConfirmation(true)}
        className="flex items-center justify-center bg-gradient-to-r from-teal-500 to-emerald-500 text-white py-2 px-4 rounded-full hover:from-teal-600 hover:to-emerald-600 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
      >
        <LogOut size={18} className="mr-2" />
        Log Out
      </button>

      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-lg p-8 max-w-sm w-full mx-4 shadow-2xl animate-scale-in">
            <h2 className="text-2xl font-bold mb-4 text-teal-600">Confirm Logout</h2>
            <p className="text-gray-700 mb-6">Are you sure you want to log out?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowConfirmation(false)}
                className="px-4 py-2 rounded-md text-gray-600 hover:bg-gray-100 transition duration-300 ease-in-out"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-md bg-gradient-to-r from-teal-500 to-emerald-500 text-white hover:from-teal-600 hover:to-emerald-600 transition duration-300 ease-in-out"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Logout;