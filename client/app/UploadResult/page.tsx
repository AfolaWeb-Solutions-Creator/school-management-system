'use client'

import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'; 
import Logout from '@/components/Logout';
import { User, Book, Award, Calendar, Upload, AlertCircle } from 'lucide-react';

const UploadResultsPage = () => {
  const [userId, setUserId] = useState('');
  const [subjectName, setSubjectName] = useState('');
  const [score, setScore] = useState('');
  const [term, setTerm] = useState('');
  const [message, setMessage] = useState({ type: '', content: '' });
  const teacherId = localStorage.getItem('userId'); 

  const handleUploadResult = async () => {
    try {
      const token = Cookies.get('x-auth-token');
      await axios.post(`http://localhost:5000/api/teacher/${teacherId}/upload-results`, {
        userId, subjectName, score, term
      }, {
        headers: {
          'x-auth-token': token  
        }
      });
      setMessage({ type: 'success', content: 'Result uploaded successfully' });
    } catch (error) {
      console.error('Error uploading result:', error);
      setMessage({ type: 'error', content: 'Result upload failed' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-400 to-emerald-600 p-8 flex flex-col items-center justify-center relative">
      <div className="bg-white bg-opacity-90 rounded-3xl shadow-2xl p-8 w-full max-w-md backdrop-blur-lg animate-fade-in-up">
        <h1 className="text-3xl font-bold mb-8 text-teal-600 text-center">Upload Results</h1>
        <div className="space-y-6">
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-500" size={20} />
            <input
              type="text"
              placeholder="Student ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300 ease-in-out"
            />
          </div>
          <div className="relative">
            <Book className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-500" size={20} />
            <input
              type="text"
              placeholder="Subject Name"
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300 ease-in-out"
            />
          </div>
          <div className="relative">
            <Award className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-500" size={20} />
            <input
              type="text"
              placeholder="Score"
              value={score}
              onChange={(e) => setScore(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300 ease-in-out"
            />
          </div>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-500" size={20} />
            <input
              type="text"
              placeholder="Term (e.g. first, second, third)"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300 ease-in-out"
            />
          </div>
          <button 
            onClick={handleUploadResult} 
            className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-bold py-3 px-4 rounded-md hover:from-teal-600 hover:to-emerald-600 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg flex items-center justify-center"
          >
            <Upload className="mr-2" size={20} />
            Upload Result
          </button>
        </div>
        {message.content && (
          <div className={`mt-4 p-3 rounded-md ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} flex items-center animate-fade-in`}>
            <AlertCircle className="mr-2" size={20} />
            {message.content}
          </div>
        )}
      </div>
      <div className="absolute top-4 right-4">
        <Logout />
      </div>
    </div>
  );
};

export default UploadResultsPage;