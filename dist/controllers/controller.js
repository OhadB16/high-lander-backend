"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoalController = void 0;
const socketHandlers_1 = require("../services/socketHandlers");
const loggerService_1 = __importDefault(require("../services/loggerService"));
class GoalController {
    static generateGoal(req, res) {
        const generatedLocation = {
            lat: Math.random() * 0.018 + (-0.009), // Random latitude within ~1km range
            lng: Math.random() * 0.018 + (-0.009) // Random longitude within ~1km range
        };
        (0, socketHandlers_1.setGoalLocation)(generatedLocation);
        loggerService_1.default.info('Generated new goal location', generatedLocation);
        res.json({ goalLocation: generatedLocation });
    }
}
exports.GoalController = GoalController;
