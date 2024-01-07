import express from 'express';
import { generateGoal, checkGoal } from '../controllers/controller';

const router = express.Router();

router.get('/generate-goal', generateGoal);
router.post('/check-goal', checkGoal);

export default router;