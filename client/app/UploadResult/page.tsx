'use client'
import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'; 
import Logout from '@/components/Logout';

const UploadResultsPage = () => {
  const [userId, setUserId] = useState('');
  const [subjectName, setSubjectName] = useState('');
  const [score, setScore] = useState('');
  const [term, setTerm] = useState('');  // Add term input
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
      alert('Result uploaded successfully');
    } catch (error) {
      console.error('Error uploading result:', error);
      alert('Result upload failed');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8">Upload Results</h1>
      <div className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Student ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="border p-2 rounded-md"
        />
        <input
          type="text"
          placeholder="Subject Name"
          value={subjectName}
          onChange={(e) => setSubjectName(e.target.value)}
          className="border p-2 rounded-md"
        />
        <input
          type="text"
          placeholder="Score"
          value={score}
          onChange={(e) => setScore(e.target.value)}
          className="border p-2 rounded-md"
        />
        <input
          type="text"
          placeholder="Term (e.g. first, second, third)"  
          value={term}
          onChange={(e) => setTerm(e.target.value)}  
          className="border p-2 rounded-md"
        />
        <button onClick={handleUploadResult} className="bg-blue-500 text-white py-2 rounded-md">Upload Result</button>
      </div>
      <Logout/>
    </div>
  );
};

export default UploadResultsPage;
