import * as turf from '@turf/turf';
import { GoalLocationData } from '../models/GoalLocationData';

let goalLocation: GoalLocationData | null = null;

export class GoalService {
  static setGoalLocation(location: GoalLocationData) {
    goalLocation = location;
  }

  static getGoalLocation(): GoalLocationData | null {
    return goalLocation;
  }

  static calculateDistance(locationData: GoalLocationData): number {
    if (!goalLocation) {
      return Infinity;
    }

    const from = turf.point([locationData.lng, locationData.lat]);
    const to = turf.point([goalLocation.lng, goalLocation.lat]);
    const options = { units: 'meters' as const };
    return turf.distance(from, to, options);
  }
}
