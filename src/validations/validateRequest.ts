import { query, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const validateRequest = [
    // query('').optional().isString().withMessage('Search must be a string.'),
    // query('').optional().isInt({ min: 1 }).withMessage('Page must be an integer greater than 0.'),
    // query('').optional().isInt({ min: 1 }).withMessage('Per_page must be an integer greater than 0.'),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
