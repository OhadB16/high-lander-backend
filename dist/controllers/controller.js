"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoalController = void 0;
const socketHandlers_1 = require("../services/socketHandlers");
const locationService_1 = require("../services/locationService");
const errorHandler_1 = require("../utils/errorHandler");
const loggerService_1 = __importDefault(require("../services/loggerService"));
class GoalController {
    static generateGoal(req, res) {
        try {
            const userLocation = req.body; // Assuming the user's location is sent in the request body
            const generatedLocation = (0, locationService_1.generateGoalLocation)(userLocation);
            (0, socketHandlers_1.setGoalLocation)(generatedLocation);
            loggerService_1.default.info('Generated new goal location', generatedLocation);
            res.json({ goalLocation: generatedLocation });
        }
        catch (error) {
            loggerService_1.default.error('Error generating goal location:', error);
            (0, errorHandler_1.handleError)(new errorHandler_1.CustomError('Error generating goal location', 500), res);
        }
    }
}
exports.GoalController = GoalController;
