import express from 'express';
import { createUser } from '../controllers/adminController';
import { adminAuth, adminLogin } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/login', adminLogin);

router.post('/create-user', adminAuth, createUser);

export default router;
