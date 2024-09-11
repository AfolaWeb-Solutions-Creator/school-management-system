'use client';
import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

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
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8">Login to Your Portal</h1>
      <div className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="border p-2 rounded-md"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded-md"
        />
        <select value={role} onChange={(e) => setRole(e.target.value)} className="border p-2 rounded-md">
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="admin">Admin</option>
        </select>
        <button onClick={handleLogin} className="bg-blue-500 text-white py-2 rounded-md">Login</button>
      </div>
    </div>
  );
};

export default PortalsPage;
