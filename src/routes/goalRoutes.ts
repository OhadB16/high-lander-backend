import { Router } from 'express';
import { GoalController } from '../controllers/controller';

const router = Router();

router.post('/generate-goal', GoalController.generateGoal);

export default router;
