'use client';

import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { User, Lock, ChevronDown } from 'lucide-react';

const PortalsPage = () => {
  const [userId, setUserId] = useState('admin001');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('admin');
  const router = useRouter();  
  
  const handleLogin = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/api/${role}/login`, {
        userId, password
      });
      const { token } = response.data;
      
      Cookies.set('x-auth-token', token, { expires: 1, secure: true, sameSite: 'strict' });
      
      localStorage.setItem('userId', userId);
    
      if (role === 'admin') {
        router.push('/CreateUser');  
      } else if (role === 'student') {
        router.push(`/Student`); 
      } else if (role === 'teacher') {
        router.push('/Teacher');  
      }
      
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-teal-50 to-emerald-100">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-teal-600">Login to Your Portal</h1>
        <div className="space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-500" size={20} />
            <input
              type="text"
              placeholder="User ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-500" size={20} />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div className="relative">
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-teal-500 pointer-events-none" size={20} />
            <select 
              value={role} 
              onChange={(e) => setRole(e.target.value)} 
              className="w-full px-4 py-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button 
            onClick={handleLogin} 
            className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 text-white py-2 rounded-md hover:from-teal-600 hover:to-emerald-600 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default PortalsPage;