import { Request, Response } from 'express';
import { GoalLocationData } from '../models/GoalLocationData';
import { setGoalLocation } from '../services/socketHandlers';
import { generateGoalLocation } from '../services/locationService';
import { CustomError, handleError } from '../utils/errorHandler';
import logger from '../services/loggerService';

export class GoalController {
  static generateGoal(req: Request, res: Response) {
    try {
      const userLocation: GoalLocationData = req.body; // Assuming the user's location is sent in the request body
      const generatedLocation = generateGoalLocation(userLocation);

      setGoalLocation(generatedLocation);
      logger.info('Generated new goal location', generatedLocation);
      res.json({ goalLocation: generatedLocation });
    } catch (error) {
      logger.error('Error generating goal location:', error);
      handleError(new CustomError('Error generating goal location', 500), res);
    }
  }
}