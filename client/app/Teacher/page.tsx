'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';  
import Logout from '@/components/Logout';
import { User, Book, CheckCircle, XCircle, Upload, Loader } from 'lucide-react';

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
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-400 to-emerald-600">
        <Loader className="w-16 h-16 text-white animate-spin" />
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-400 to-emerald-600">
        <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full animate-fade-in-up">
          <p className="text-red-500 text-center font-semibold">{errorMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-400 to-emerald-600 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white bg-opacity-90 rounded-3xl shadow-2xl p-8 mb-8 backdrop-blur-lg animate-fade-in-up">
          <h1 className="text-4xl font-bold mb-8 text-teal-600 text-center">Teacher Dashboard</h1>

          {teacher && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-teal-50 rounded-2xl p-6 shadow-lg transform hover:scale-105 transition-transform duration-300 animate-fade-in-left">
                  <div className="flex items-center space-x-4">
                    <User className="text-teal-500" size={32} />
                    <div>
                      <p className="text-sm text-teal-600 font-semibold">User ID</p>
                      <p className="text-xl font-bold">{teacher.userId}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-emerald-50 rounded-2xl p-6 shadow-lg transform hover:scale-105 transition-transform duration-300 animate-fade-in-right">
                  <div className="flex items-center space-x-4">
                    <User className="text-emerald-500" size={32} />
                    <div>
                      <p className="text-sm text-emerald-600 font-semibold">Name</p>
                      <p className="text-xl font-bold">{teacher.name}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-xl overflow-hidden animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                <h2 className="text-2xl font-semibold mb-4 p-6 bg-teal-100 text-teal-700">Assigned Subjects</h2>
                {teacher.subjects.length > 0 ? (
                  <div className="divide-y divide-gray-200">
                    {teacher.subjects.map((subject) => (
                      <div key={subject._id} className="p-6 hover:bg-gray-50 transition-colors duration-200">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <Book className="text-teal-500" size={24} />
                            <div>
                              <p className="font-semibold text-lg text-teal-700">{subject.subjectName}</p>
                              <p className="text-sm text-gray-600">Class: {subject.className}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {subject.isCompulsory ? (
                              <CheckCircle className="text-green-500" size={20} />
                            ) : (
                              <XCircle className="text-red-500" size={20} />
                            )}
                            <span className="text-sm font-medium">
                              {subject.isCompulsory ? 'Compulsory' : 'Optional'}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="p-6 text-center text-gray-500">No subjects assigned</p>
                )}
              </div>

              <div className="flex justify-center animate-bounce">
                <button
                  onClick={handleUploadResultNavigation}
                  className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-bold py-3 px-6 rounded-full hover:from-teal-600 hover:to-emerald-600 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl flex items-center space-x-2"
                >
                  <Upload size={20} />
                  <span>Upload Result</span>
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="absolute top-2 right-7">
        <Logout />
      </div>
      </div>
    </div>
  );
};

export default GetTeacherPage;