'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Logout from '@/components/Logout';
import { User, Book, Calendar, Award, ChevronDown, ChevronUp, BarChart2, Check, X } from 'lucide-react';

interface Result {
  subjectName: string;
  score: string;
  isCompulsory: boolean;
}

interface Student {
  userId: string;
  className: string;
  currentTerm: string;
  promoted: boolean;
  results: Result[];
}

const GetStudentPage = () => {
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [showResults, setShowResults] = useState(false);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const token = Cookies.get('x-auth-token');
        if (!token || !userId) {
          throw new Error('User not authenticated');
        }

        const response = await axios.get(`http://localhost:5000/api/student/${userId}`, {
          headers: {
            'x-auth-token': token,
          },
        });

        console.log('Response Data:', response.data);
        setStudent(response.data);
      } catch (error) {
        console.error('Error fetching student data:', error);
        setErrorMessage('Failed to fetch student data');
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [userId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-400 to-emerald-600">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-white"></div>
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
          <h1 className="text-4xl font-bold mb-8 text-teal-600 text-center animate-bounce">Student Dashboard</h1>

          {student && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-teal-50 rounded-2xl p-6 shadow-lg transform hover:scale-105 transition-transform duration-300 animate-fade-in-left">
                <div className="flex items-center space-x-4">
                  <User className="text-teal-500" size={32} />
                  <div>
                    <p className="text-sm text-teal-600 font-semibold">User ID</p>
                    <p className="text-xl font-bold">{student.userId}</p>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-50 rounded-2xl p-6 shadow-lg transform hover:scale-105 transition-transform duration-300 animate-fade-in-right">
                <div className="flex items-center space-x-4">
                  <Book className="text-emerald-500" size={32} />
                  <div>
                    <p className="text-sm text-emerald-600 font-semibold">Class Name</p>
                    <p className="text-xl font-bold">{student.className}</p>
                  </div>
                </div>
              </div>

              <div className="bg-teal-50 rounded-2xl p-6 shadow-lg transform hover:scale-105 transition-transform duration-300 animate-fade-in-left" style={{animationDelay: '0.2s'}}>
                <div className="flex items-center space-x-4">
                  <Calendar className="text-teal-500" size={32} />
                  <div>
                    <p className="text-sm text-teal-600 font-semibold">Current Term</p>
                    <p className="text-xl font-bold">{student.currentTerm}</p>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-50 rounded-2xl p-6 shadow-lg transform hover:scale-105 transition-transform duration-300 animate-fade-in-right" style={{animationDelay: '0.2s'}}>
                <div className="flex items-center space-x-4">
                  <Award className="text-emerald-500" size={32} />
                  <div>
                    <p className="text-sm text-emerald-600 font-semibold">Promoted</p>
                    <p className="text-xl font-bold">{student.promoted ? 'Yes' : 'No'}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <button
            className="w-full mt-8 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-bold py-4 px-6 rounded-full hover:from-teal-600 hover:to-emerald-600 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl flex items-center justify-center animate-pulse"
            onClick={() => setShowResults(!showResults)}
          >
            {showResults ? 'Hide Results' : 'Show Results'}
            {showResults ? <ChevronUp className="ml-2" size={24} /> : <ChevronDown className="ml-2" size={24} />}
          </button>

          {showResults && student && (
            <div className="mt-8 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
              <h2 className="text-3xl font-semibold mb-6 text-teal-600 flex items-center">
                <BarChart2 className="mr-2" size={28} />
                Academic Results
              </h2>
              {student.results.length > 0 ? (
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-teal-100">
                        <th className="py-3 px-4 text-left text-teal-700">Subject</th>
                        <th className="py-3 px-4 text-left text-teal-700">Score</th>
                        <th className="py-3 px-4 text-left text-teal-700">Compulsory</th>
                      </tr>
                    </thead>
                    <tbody>
                      {student.results.map((result, index) => (
                        <tr 
                          key={index} 
                          className={`${index % 2 === 0 ? 'bg-teal-50' : 'bg-emerald-50'} hover:bg-opacity-80 transition-colors duration-300`}
                        >
                          <td className="py-3 px-4 font-medium text-teal-700">{result.subjectName}</td>
                          <td className="py-3 px-4">
                            <span className="text-emerald-600 font-bold text-lg bg-white px-3 py-1 rounded-full shadow">
                              {result.score}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            {result.isCompulsory ? (
                              <Check className="text-green-500" size={24} />
                            ) : (
                              <X className="text-red-500" size={24} />
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-center text-gray-500 text-lg animate-pulse">No results available</p>
              )}
            </div>
          )}
        </div>

        <div className="flex justify-center animate-bounce">
          <Logout />
        </div>
      </div>
    </div>
  );
};

export default GetStudentPage;
