import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import Student from '../models/studentModel';
import Teacher from '../models/teacherModel';

// Admin creates students and teachers
export const createUser = async (req: Request, res: Response): Promise<void> => {
    const { name, userId, role, className, subjects } = req.body;

    try {
      const password = 'afola2024';
  
      if (role === 'student') {
        const studentExists = await Student.findOne({userId});
        if (studentExists) {
          res.status(400).json({ message: 'Student already exists' });
          return;
        }
  
        const newStudent = new Student({
          name,
          userId,
          className,
          password: bcrypt.hashSync(password, 10),
          results: [],
          currentTerm: 'first',
          promoted: false,
        });
  
        await newStudent.save();
        res.status(201).json({ message: 'Student created successfully' });
  
      } else if (role === 'teacher') {
        const teacherExists = await Teacher.findOne({ userId });
        if (teacherExists) {
          res.status(400).json({ message: 'Teacher already exists' });
          return;
        }
  
        const newTeacher = new Teacher({
            name,
            userId,
            password: bcrypt.hashSync(password, 10),
            subjects: subjects.map((subject: { subjectName: string, className: string, isCompulsory: boolean }) => ({
              subjectName: subject.subjectName,
              className: subject.className,
              isCompulsory: subject.isCompulsory,
            })),
          });
          
  
        await newTeacher.save();
        res.status(201).json({ message: 'Teacher created successfully' });
      } else {
        res.status(400).json({ message: 'Invalid role' });
      }
    } catch (error) {
      console.error('Error during user creation:', error);
      res.status(500).json({ message: 'Server error', error });
    }
  };
  