import { Response } from 'express';
import loggerService from '../services/loggerService';

export class CustomError extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, CustomError.prototype);
    }
}

export const handleError = (error: any, res: Response) => {
    loggerService.error(`Error handled: ${error.message}`);
    let { statusCode = 500, message } = error;

    if (!(error instanceof CustomError)) {
        message = 'An unexpected error occurred';
    }

    res.status(statusCode).json({
        status: 'error',
        statusCode,
        message
    });
};
