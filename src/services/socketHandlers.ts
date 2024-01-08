import { Socket } from 'socket.io';
import logger from './loggerService';
import { GoalLocationData } from '../models/GoalLocationData';
import { LocationData } from '../models/LocationData';
import { GoalService } from '../services/goalService'; // Import the GoalService
import { generateGoalLocation } from './locationService';

let goalLocation: GoalLocationData | null = null;

export const handleConnection = (socket: Socket) => {
  console.log('New client connected');

  socket.on('updateLocation', (locationData: LocationData) => {
    console.log('updateLocation');
    if (typeof locationData.lat !== 'number' || typeof locationData.lng !== 'number') {
        console.error('Invalid location data:', locationData);
        return;
    }

    // Emit the updated location to all clients
    socket.emit('locationChanged', locationData);

    // Calculate the distance to the goal
    const distance = GoalService.calculateDistance(locationData);

    // If the ball is within a 10-meter radius of the goal, emit a goal event
    if (distance <= 100) {
      console.log('goalEvent');
      socket.emit('goalEvent'); // Notify the specific client that reached the goal
    }
  });

  socket.on('requestGoalLocation', (userLocation: LocationData) => {
    try {
      console.log('Raw location data received:', userLocation);

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
    console.log('Client disconnected');
  });
};

export const setGoalLocation = (location: GoalLocationData) => {
  goalLocation = location;
};

export const getGoalLocation = () => goalLocation;
