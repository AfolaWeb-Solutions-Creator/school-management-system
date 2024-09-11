import { Request, Response } from 'express';
import Student from '../models/studentModel';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


export const studentLogin = async (req: Request, res: Response): Promise<void> => {
    const { userId, password } = req.body;
  
    try {
      const student = await Student.findOne({ userId });
      if (!student) {
        res.status(404).json({ message: 'Student not found' });
        return;
      }

      const isMatch = await bcrypt.compare(password, student.password);
      console.log('Password Match Result:', isMatch); 
      if (!isMatch) {
        res.status(400).json({ message: 'Invalid credentials' });
        return;
      }
  
      const token = jwt.sign(
        { id: student._id, role: 'student' },
        process.env.JWT_SECRET as string,
        { expiresIn: '1h' }
      );
  
      res.json({ token, userId: student.userId, name: student.name, className: student.className });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };

export const getStudent = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;

  try {
    const student = await Student.findOne({ userId });
    if (!student) {
      res.status(404).json({ message: 'Student not found' });
      return;
    }

    res.json({
      userId: student.userId,
      className: student.className,
      results: student.results,
      currentTerm: student.currentTerm,
      promoted: student.promoted,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
