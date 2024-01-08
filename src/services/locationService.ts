import * as turf from '@turf/turf';
import { GoalLocationData } from '../models/GoalLocationData';
import { LocationData } from '../models/LocationData';

export const generateGoalLocation = (locationData: LocationData): GoalLocationData => {
    const bearing = Math.random() * 360; // Random bearing in degrees
    const distance = Math.random() * 1000; // Random distance in meters, up to 1km

    // Use the turf library to calculate the destination point
    const startingPoint = turf.point([locationData.lng, locationData.lat]);
    const options = { units: 'meters' as const };
    const destination = turf.destination(startingPoint, distance, bearing, options);

    // Extract the latitude and longitude from the destination point
    const [longitude, latitude] = destination.geometry.coordinates;

    // Create the goal location object
    const generatedGoalLocation: GoalLocationData = {
        lat: latitude,
        lng: longitude
    };

    return generatedGoalLocation;
};