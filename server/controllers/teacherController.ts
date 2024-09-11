import { Request, Response } from 'express';
import Student from '../models/studentModel';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Teacher from '../models/teacherModel';

export const teacherLogin = async (req: Request, res: Response): Promise<void> => {
    const { userId, password } = req.body;
  
    try {
      const teacher = await Teacher.findOne({ userId });
  
      if (!teacher) {
        res.status(404).json({ message: 'Teacher not found' });
        return;
      }
  
      const isPasswordValid = await bcrypt.compare(password, teacher.password);
  
      if (!isPasswordValid) {
        res.status(400).json({ message: 'Invalid credentials' });
        return;
      }
  
      const token = jwt.sign(
        { id: teacher.userId, role: 'teacher' },
        process.env.JWT_SECRET as string,
        { expiresIn: '1h' }
      );
  
      res.status(200).json({ token, name: teacher.name,
        subjects: teacher.subjects});
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };

  export const getTeacher = async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.params;
  
    try {
      const teacher = await Teacher.findOne({ userId });
      if (!teacher) {
        res.status(404).json({ message: 'Student not found' });
        return;
      }
  
      res.json({
        userId: teacher.userId,
        name: teacher.name,
        subjects: teacher.subjects,
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };
  
  export const uploadResults = async (req: Request, res: Response): Promise<void> => {
    const { userId, subjectName, term, score } = req.body;
  
    try {
      const student = await Student.findOne({ userId });
  
      if (!student) {
        res.status(404).json({ message: 'Student not found' });
        return;
      }
  
      student.results.push({ subjectName, term, score });
  
      if (term === 'third') {
        student.currentTerm = 'first';
        const currentClass = parseInt(student.className.match(/\d+/)?.[0] || '1');
        student.className = `JSS${currentClass + 1}`;
        student.promoted = true;
      } else {
        student.currentTerm = term === 'first' ? 'second' : 'third';
      }
  
      await student.save();
      res.status(200).json({ message: 'Result uploaded successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };