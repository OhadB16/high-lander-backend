import { Request, Response } from 'express';
import { GoalLocationData } from '../models/GoalLocationData';
import { setGoalLocation } from '../services/socketHandlers';
import logger from '../services/loggerService';

export class GoalController {
  static generateGoal(req: Request, res: Response) {
    const generatedLocation: GoalLocationData = {
      lat: Math.random() * 0.018 + (-0.009), // Random latitude within ~1km range
      lng: Math.random() * 0.018 + (-0.009) // Random longitude within ~1km range
    };

    setGoalLocation(generatedLocation);
    logger.info('Generated new goal location', generatedLocation);
    res.json({ goalLocation: generatedLocation });
  }
}
