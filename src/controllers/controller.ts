import { Request, Response } from 'express';
import * as turf from '@turf/turf';
import { CustomError, handleError } from '../utils/errorHandler'; // Assuming errors.ts is in the same directory
import  loggerService from '../services/loggerService';

export const generateGoal = (req: Request, res: Response) => {
    try {
        loggerService.info('generateGoal called with query:', req.query);

        const userLat = typeof req.query.lat === 'string' ? parseFloat(req.query.lat) : null;
        const userLng = typeof req.query.lng === 'string' ? parseFloat(req.query.lng) : null;
    
        if (userLat === null || userLng === null || isNaN(userLat) || isNaN(userLng)) {
            return res.status(400).send('Invalid or missing user location');
        }
    
        const center = turf.point([userLng, userLat]);
        const radius = 1;
        const randomPoint = turf.randomPoint(1, { bbox: turf.bbox(turf.buffer(center, radius)) });
    
        const goalPosition = randomPoint.features[0].geometry.coordinates;
        res.json({ lat: goalPosition[1], lng: goalPosition[0] });
    } catch (err) {
        handleError(err, res);
    }
};

export const checkGoal = (req: Request, res: Response) => {
    try {
        console.log('checkGoal called with body:', req.body);
        const userPosition = req.body.userPosition;
        const goalPosition = req.body.goalPosition;

        if (!userPosition || !goalPosition) {
            return res.status(400).send('Both user position and goal position are required');
        }

        const from = turf.point([userPosition.lng, userPosition.lat]);
        const to = turf.point([goalPosition.lng, goalPosition.lat]);
        const distance = turf.distance(from, to, { units: 'meters' });

        res.json({ isGoalReached: distance <= 10 });
    } catch (err) {
        loggerService.error('Error in checkGoal:', err);
        handleError(err, res);
    }

};