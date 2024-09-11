import express from 'express';
import { uploadResults, teacherLogin , getTeacher} from '../controllers/teacherController';
import { teacherAuth } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/login', teacherLogin)
router.get('/:userId', teacherAuth, getTeacher);
router.post('/:userId/upload-results', teacherAuth, uploadResults);

export default router;
