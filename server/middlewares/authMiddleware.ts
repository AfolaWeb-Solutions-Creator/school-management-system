import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Define the payload interface for JWT token
interface JwtPayload {
  id: string;
  role: string;
}

// Extend the Express Request interface to include user
declare module 'express-serve-static-core' {
  interface Request {
    user?: JwtPayload;
  }
}

const ADMIN_ID = 'admin001';
const ADMIN_PASSWORD = 'afola2024';

export const adminLogin = (req: Request, res: Response) => {
  const { userId, password } = req.body;

  // Check if credentials match
  if (userId === ADMIN_ID && password === ADMIN_PASSWORD) {
    // Generate a JWT token for the admin
    const token = jwt.sign(
      { id: userId, role: 'admin' },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    );

    // Return the token to the admin
    res.status(200).json({ token });
  } else {
    // Invalid credentials
    res.status(401).json({ message: 'Invalid credentials' });
  }
};


// Admin Authentication Middleware
export const adminAuth = (req: Request, res: Response, next: NextFunction) => {
    // Get the token directly from the Authorization header
    const token = req.header('x-auth-token');
  
    if (!token) {
      return res.status(401).json({ message: 'Access denied: No token provided' });
    }
  
    try {
      const verified = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
  
      // Check if the role is admin
      if (verified.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied: Admins only' });
      }
  
      // Attach the verified user to the request object
      req.user = verified;
  
      // Continue to the next middleware
      next();
    } catch (err) {
      return res.status(400).json({ message: 'Invalid token' });
    }
  };
// Teacher Authentication Middleware
export const teacherAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ message: 'Access denied' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

    // Check if the role is teacher
    if (verified.role !== 'teacher') {
      return res.status(403).json({ message: 'Access denied: Teachers only' });
    }

    req.user = verified; // Set the user on the request
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

// Student Authentication Middleware
export const studentAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ message: 'Access denied' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

    // Check if the role is student
    if (verified.role !== 'student') {
      return res.status(403).json({ message: 'Access denied: Students only' });
    }

    req.user = verified; // Set the user on the request
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token' });
  }
};
