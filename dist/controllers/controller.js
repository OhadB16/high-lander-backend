"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkGoal = exports.generateGoal = void 0;
const turf = __importStar(require("@turf/turf"));
const errorHandler_1 = require("../utils/errorHandler"); // Assuming errors.ts is in the same directory
const loggerService_1 = __importDefault(require("../services/loggerService"));
const generateGoal = (req, res) => {
    try {
        loggerService_1.default.info('generateGoal called with query:', req.query);
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
    }
    catch (err) {
        (0, errorHandler_1.handleError)(err, res);
    }
};
exports.generateGoal = generateGoal;
const checkGoal = (req, res) => {
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
    }
    catch (err) {
        loggerService_1.default.error('Error in checkGoal:', err);
        (0, errorHandler_1.handleError)(err, res);
    }
};
exports.checkGoal = checkGoal;
