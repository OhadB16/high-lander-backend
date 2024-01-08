import { Socket } from 'socket.io';
import logger from './loggerService';
import { GoalLocationData } from '../models/GoalLocationData';
import { LocationData } from '../models/LocationData';
import { GoalService } from '../services/goalService'; // Import the GoalService
import { generateGoalLocation } from './locationService';
import { CustomError } from '../utils/errorHandler';

let goalLocation: GoalLocationData | null = null;

export const handleConnection = (socket: Socket) => {
    logger.info('New client connected');
  
    socket.on('updateLocation', (locationData: LocationData) => {
      try {
        if (typeof locationData.lat !== 'number' || typeof locationData.lng !== 'number') {
          throw new CustomError('Invalid location data', 400);
        }
  
        // Emit the updated location to all clients
        socket.emit('locationChanged', locationData);
  
        // Calculate the distance to the goal
        const distance = GoalService.calculateDistance(locationData);
  
        // If the ball is within a 10-meter radius of the goal, emit a goal event
        if (distance <= 100) {
          logger.info('goalEvent');
          socket.emit('goalEvent'); // Notify the specific client that reached the goal
        }
      } catch (error) {
        logger.error('Error updating location:', error);
      }
    });
  
    socket.on('requestGoalLocation', (userLocation: LocationData) => {
      try {
        logger.info('Raw location data received:', userLocation);
  
        // Generate a new goal location
        const generatedGoalLocation = generateGoalLocation(userLocation);
        GoalService.setGoalLocation(generatedGoalLocation);
  
        // Emit the new goal location to the client
        socket.emit('goalLocation', generatedGoalLocation);
      } catch (error) {
        logger.error('Error generating goal location:', error);
      }
    });
  
    socket.on('disconnect', () => {
      logger.info('Client disconnected');
    });
  };

export const setGoalLocation = (location: GoalLocationData) => {
  goalLocation = location;
};

export const getGoalLocation = () => goalLocation;
