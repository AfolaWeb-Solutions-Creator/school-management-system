'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';  
import Logout from '@/components/Logout';

interface Subject {
  _id: string;
  subjectName: string;
  className: string;
  isCompulsory: boolean;
}

interface Teacher {
  userId: string;
  name: string;
  subjects: Subject[];  
}

const GetTeacherPage = () => {
  const [teacher, setTeacher] = useState<Teacher | null>(null);  
  const [loading, setLoading] = useState(true);  
  const [errorMessage, setErrorMessage] = useState('');  
  const router = useRouter();  
  const teacherId = localStorage.getItem('userId');  
 
  useEffect(() => {
    const fetchTeacherData = async () => {
      try {
        const token = Cookies.get('x-auth-token');
        if (!token || !teacherId) {
          throw new Error('User not authenticated');
        }

      
        const response = await axios.get(`http://localhost:5000/api/teacher/${teacherId}`, {
          headers: {
            'x-auth-token': token,
          },
        });

        console.log('Teacher Data:', response.data); 
        setTeacher(response.data);  
      } catch (error) {
        console.error('Error fetching teacher data:', error);
        setErrorMessage('Failed to fetch teacher data');
      } finally {
        setLoading(false);
      }
    };

    fetchTeacherData();
  }, [teacherId]);

 
  const handleUploadResultNavigation = () => {
    router.push('/UploadResult');  
  };

  
  if (loading) {
    return <div className="min-h-screen p-8">Loading data...</div>;
  }

  if (errorMessage) {
    return <div className="min-h-screen p-8 text-red-500">{errorMessage}</div>;
  }

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">Teacher Information</h1>

      {teacher && (
        <div>
          <p><strong>User ID:</strong> {teacher.userId}</p>
          <p><strong>Name:</strong> {teacher.name}</p>
          <p><strong>Subjects:</strong></p>

          {teacher.subjects.length > 0 ? (
            <ul className="list-disc list-inside">
              {teacher.subjects.map((subject) => (
                <li key={subject._id} className="mb-2">
                  <p><strong>Subject Name:</strong> {subject.subjectName}</p>
                  <p><strong>Class Name:</strong> {subject.className}</p>
                  <p><strong>Is Compulsory:</strong> {subject.isCompulsory ? 'Yes' : 'No'}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No subjects assigned</p>
          )}

          <button
            onClick={handleUploadResultNavigation}
            className="mt-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Upload Result
          </button>
        </div>
      )}

      <Logout />
    </div>
  );
};

export default GetTeacherPage;
