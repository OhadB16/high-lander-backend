"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = exports.CustomError = void 0;
const loggerService_1 = __importDefault(require("../services/loggerService"));
class CustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, CustomError.prototype);
    }
}
exports.CustomError = CustomError;
const handleError = (error, res) => {
    loggerService_1.default.error(`Error handled: ${error.message}`);
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
exports.handleError = handleError;
