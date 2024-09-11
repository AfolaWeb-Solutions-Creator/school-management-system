import express from 'express';
import { studentLogin, getStudent } from '../controllers/studentController';
import { studentAuth } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/login', studentLogin);
router.get('/:userId', studentAuth, getStudent);

export default router;
