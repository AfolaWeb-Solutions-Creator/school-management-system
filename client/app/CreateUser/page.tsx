'use client'
import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Logout from '@/components/Logout';

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

  // Add a new subject input
  const addSubject = () => {
    setSubjects([...subjects, { subjectName: '', className: '', isCompulsory: false }]);
  };

  // Update a subject field
  const updateSubject = <K extends keyof Subject>(index: number, key: K, value: Subject[K]) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[index][key] = value; // Type-safe update
    setSubjects(updatedSubjects);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8">Create User</h1>
      <div className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded-md"
        />
        <input
          type="text"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="border p-2 rounded-md"
        />
        <select value={role} onChange={(e) => setRole(e.target.value)} className="border p-2 rounded-md">
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>
        <input
          type="text"
          placeholder="Class Name (for student)"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
          className="border p-2 rounded-md"
        />

        {/* Only display subjects input when role is teacher */}
        {role === 'teacher' && subjects.map((subject, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="Subject Name"
              value={subject.subjectName}
              onChange={(e) => updateSubject(index, 'subjectName', e.target.value)}
              className="border p-2 rounded-md"
            />
            <input
              type="text"
              placeholder="Class Name"
              value={subject.className}
              onChange={(e) => updateSubject(index, 'className', e.target.value)}
              className="border p-2 rounded-md"
            />
            <label>
              Is Compulsory:
              <input
                type="checkbox"
                checked={subject.isCompulsory}
                onChange={(e) => updateSubject(index, 'isCompulsory', e.target.checked)}
              />
            </label>
          </div>
        ))}

        {role === 'teacher' && (
          <button onClick={addSubject} className="bg-green-500 text-white py-2 rounded-md">
            Add Subject
          </button>
        )}

        <button onClick={handleCreateUser} className="bg-blue-500 text-white py-2 rounded-md">
          Create User
        </button>
      </div>
      <Logout />
    </div>
  );
};

export default CreateUserPage;
