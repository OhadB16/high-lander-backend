"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
const express_validator_1 = require("express-validator");
exports.validateRequest = [
    (0, express_validator_1.query)('lat').isFloat({ min: -90, max: 90 }).withMessage('Latitude must be a float between -90 and 90.'),
    (0, express_validator_1.query)('lng').isFloat({ min: -180, max: 180 }).withMessage('Longitude must be a float between -180 and 180.'),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
