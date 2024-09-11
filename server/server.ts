import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db'; 
import adminRoutes from './routes/adminRoutes';
import studentRoutes from './routes/studentRoutes';
import teacherRoutes from './routes/teacherRoutes';

dotenv.config();

const app = express();
app.use(cors());

connectDB();

app.use(express.json());

app.use('/api/admin', adminRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/teacher', teacherRoutes);


const PORT = process.env.PORT || 5000;



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});




