import { query, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const validateRequest = [
    query('lat').isFloat({ min: -90, max: 90 }).withMessage('Latitude must be a float between -90 and 90.'),
    query('lng').isFloat({ min: -180, max: 180 }).withMessage('Longitude must be a float between -180 and 180.'),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
