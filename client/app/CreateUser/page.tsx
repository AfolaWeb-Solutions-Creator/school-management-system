'use client'

import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Logout from '@/components/Logout';
import { User, UserPlus, Book, ChevronDown, Plus} from 'lucide-react';

// Define the structure for a subject
interface Subject {
  subjectName: string;
  className: string;
  isCompulsory: boolean;
}

const CreateUserPage = () => {
  const [name, setName] = useState('');
  const [userId, setUserId] = useState('');
  const [role, setRole] = useState('student');
  const [className, setClassName] = useState('');
  const [subjects, setSubjects] = useState<Subject[]>([{ subjectName: '', className: '', isCompulsory: false }]);

  const handleCreateUser = async () => {
    try {
      const token = Cookies.get('x-auth-token');
      await axios.post(`http://localhost:5000/api/admin/create-user`, {
        name, userId, role, className, subjects
      }, {
        headers: {
          'x-auth-token': token  
        }
      });
      alert('User created successfully');
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const addSubject = () => {
    setSubjects([...subjects, { subjectName: '', className: '', isCompulsory: false }]);
  };

  const updateSubject = <K extends keyof Subject>(index: number, key: K, value: Subject[K]) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[index][key] = value;
    setSubjects(updatedSubjects);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-teal-50 to-emerald-100 p-4 relative">
      <div className="absolute top-4 right-4">
        <Logout />
      </div>
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md animate-fade-in-up">
        <h1 className="text-3xl font-bold mb-6 text-center text-teal-600">Create User</h1>
        <div className="space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-500" size={20} />
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300 ease-in-out"
            />
          </div>
          <div className="relative">
            <UserPlus className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-500" size={20} />
            <input
              type="text"
              placeholder="User ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300 ease-in-out"
            />
          </div>
          <div className="relative">
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-teal-500 pointer-events-none" size={20} />
            <select 
              value={role} 
              onChange={(e) => setRole(e.target.value)} 
              className="w-full px-4 py-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300 ease-in-out"
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
          </div>
          {role === 'student' && (
            <div className="relative">
              <Book className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-500" size={20} />
              <input
                type="text"
                placeholder="Class Name"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300 ease-in-out"
              />
            </div>
          )}

          {role === 'teacher' && subjects.map((subject, index) => (
            <div key={index} className="space-y-2 animate-fade-in">
              <input
                type="text"
                placeholder="Subject Name"
                value={subject.subjectName}
                onChange={(e) => updateSubject(index, 'subjectName', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300 ease-in-out"
              />
              <input
                type="text"
                placeholder="Class Name"
                value={subject.className}
                onChange={(e) => updateSubject(index, 'className', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300 ease-in-out"
              />
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={subject.isCompulsory}
                  onChange={(e) => updateSubject(index, 'isCompulsory', e.target.checked)}
                  className="form-checkbox h-5 w-5 text-teal-500 transition duration-300 ease-in-out"
                />
                <span className="text-gray-700">Is Compulsory</span>
              </label>
            </div>
          ))}

          {role === 'teacher' && (
            <button 
              onClick={addSubject} 
              className="w-full flex items-center justify-center bg-emerald-500 text-white py-2 rounded-md hover:bg-emerald-600 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
            >
              <Plus size={20} className="mr-2" />
              Add Subject
            </button>
          )}

          <button 
            onClick={handleCreateUser} 
            className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 text-white py-2 rounded-md hover:from-teal-600 hover:to-emerald-600 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
          >
            Create User
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateUserPage;