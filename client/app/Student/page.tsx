'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Logout from '@/components/Logout';

interface Result {
  subjectName: string;
  score: string;
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
  const [showResults, setShowResults] = useState(false); // State to toggle results display
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

        console.log('Response Data:', response.data); // Log response to check structure
        setStudent(response.data); // Save all student data, including results
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
    return <div className="min-h-screen p-8">Loading data...</div>;
  }

  if (errorMessage) {
    return <div className="min-h-screen p-8 text-red-500">{errorMessage}</div>;
  }

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">Student Information</h1>

      {/* Display other student information */}
      {student && (
        <div>
          <p><strong>User ID:</strong> {student.userId}</p>
          <p><strong>Class Name:</strong> {student.className}</p>
          <p><strong>Current Term:</strong> {student.currentTerm}</p>
          <p><strong>Promoted:</strong> {student.promoted ? 'Yes' : 'No'}</p>

          {/* Button to toggle results display */}
          <button
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setShowResults(!showResults)}
          >
            {showResults ? 'Hide Results' : 'Show Results'}
          </button>

          {/* Conditionally display results based on showResults state */}
          {showResults && (
            <div className="mt-4">
              <h2 className="text-2xl font-semibold mb-4">Results</h2>
              {student.results.length > 0 ? (
                <ul>
                  {student.results.map((result, index) => (
                    <li key={index}>
                      {result.subjectName}: {result.score}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No results available</p>
              )}
            </div>
          )}
        </div>
      )}

      <Logout />
    </div>
  );
};

export default GetStudentPage;



