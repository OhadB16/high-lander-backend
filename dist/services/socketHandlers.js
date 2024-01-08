"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGoalLocation = exports.setGoalLocation = exports.handleConnection = void 0;
const loggerService_1 = __importDefault(require("./loggerService"));
const goalService_1 = require("../services/goalService"); // Import the GoalService
const locationService_1 = require("./locationService");
const errorHandler_1 = require("../utils/errorHandler");
let goalLocation = null;
const handleConnection = (socket) => {
    loggerService_1.default.info('New client connected');
    socket.on('updateLocation', (locationData) => {
        try {
            if (typeof locationData.lat !== 'number' || typeof locationData.lng !== 'number') {
                throw new errorHandler_1.CustomError('Invalid location data', 400);
            }
            // Emit the updated location to all clients
            socket.emit('locationChanged', locationData);
            // Calculate the distance to the goal
            const distance = goalService_1.GoalService.calculateDistance(locationData);
            // If the ball is within a 10-meter radius of the goal, emit a goal event
            if (distance <= 100) {
                loggerService_1.default.info('goalEvent');
                socket.emit('goalEvent'); // Notify the specific client that reached the goal
            }
        }
        catch (error) {
            loggerService_1.default.error('Error updating location:', error);
        }
    });
    socket.on('requestGoalLocation', (userLocation) => {
        try {
            loggerService_1.default.info('Raw location data received:', userLocation);
            // Generate a new goal location
            const generatedGoalLocation = (0, locationService_1.generateGoalLocation)(userLocation);
            goalService_1.GoalService.setGoalLocation(generatedGoalLocation);
            // Emit the new goal location to the client
            socket.emit('goalLocation', generatedGoalLocation);
        }
        catch (error) {
            loggerService_1.default.error('Error generating goal location:', error);
        }
    });
    socket.on('disconnect', () => {
        loggerService_1.default.info('Client disconnected');
    });
};
exports.handleConnection = handleConnection;
const setGoalLocation = (location) => {
    goalLocation = location;
};
exports.setGoalLocation = setGoalLocation;
const getGoalLocation = () => goalLocation;
exports.getGoalLocation = getGoalLocation;
