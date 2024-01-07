"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
const express_validator_1 = require("express-validator");
exports.validateRequest = [
    // query('').optional().isString().withMessage('Search must be a string.'),
    // query('').optional().isInt({ min: 1 }).withMessage('Page must be an integer greater than 0.'),
    // query('').optional().isInt({ min: 1 }).withMessage('Per_page must be an integer greater than 0.'),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
