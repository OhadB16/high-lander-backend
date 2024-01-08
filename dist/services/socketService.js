"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSocketIO = void 0;
const locationService_1 = require("../services/locationService");
let goalLocation = null;
const setupSocketIO = (io) => {
    io.on('connection', (socket) => {
        console.log('New client connected');
        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
        socket.on('updateLocation', (locationData) => {
            try {
                console.log('Raw location data received:', locationData);
                // Generate the goal location and emit it to the client
                goalLocation = (0, locationService_1.generateGoalLocation)(locationData);
                socket.emit('goalLocation', goalLocation);
            }
            catch (error) {
                console.error('Error generating goal location:', error);
            }
        });
    });
};
exports.setupSocketIO = setupSocketIO;
