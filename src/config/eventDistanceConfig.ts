/**
 * Event Distance Configuration
 * 
 * Standard distance options for events (races, runs, etc.)
 * Used for consistent distance display and mapping across the system.
 */

export type EventDistance = {
  id: string;
  name: string;
  value: string; // Display value (e.g., "5K", "10K", "Half Marathon")
  distanceMiles?: number; // Optional: distance in miles for calculations
  distanceKilometers?: number; // Optional: distance in kilometers
  category: 'short' | 'medium' | 'long' | 'ultra'; // Distance category
};

export const EVENT_DISTANCES: EventDistance[] = [
  {
    id: '5k',
    name: '5K',
    value: '5K',
    distanceMiles: 3.1,
    distanceKilometers: 5.0,
    category: 'short',
  },
  {
    id: '10k',
    name: '10K',
    value: '10K',
    distanceMiles: 6.2,
    distanceKilometers: 10.0,
    category: 'short',
  },
  {
    id: '5-mile',
    name: '5 Mile',
    value: '5 mile',
    distanceMiles: 5.0,
    distanceKilometers: 8.05,
    category: 'short',
  },
  {
    id: '10-mile',
    name: '10 Mile',
    value: '10 mile',
    distanceMiles: 10.0,
    distanceKilometers: 16.1,
    category: 'medium',
  },
  {
    id: 'half-marathon',
    name: 'Half Marathon',
    value: 'Half Marathon',
    distanceMiles: 13.1,
    distanceKilometers: 21.1,
    category: 'medium',
  },
  {
    id: 'marathon',
    name: 'Marathon',
    value: 'Marathon',
    distanceMiles: 26.2,
    distanceKilometers: 42.2,
    category: 'long',
  },
];

/**
 * Get distance by ID
 */
export const getDistanceById = (id: string): EventDistance | null => {
  return EVENT_DISTANCES.find((d) => d.id === id) || null;
};

/**
 * Get distance by value (display string)
 */
export const getDistanceByValue = (value: string): EventDistance | null => {
  return EVENT_DISTANCES.find((d) => d.value === value) || null;
};

/**
 * Get all distances in a category
 */
export const getDistancesByCategory = (category: EventDistance['category']): EventDistance[] => {
  return EVENT_DISTANCES.filter((d) => d.category === category);
};

/**
 * Get distance options for dropdowns/selects
 */
export const getDistanceOptions = (): Array<{ value: string; label: string }> => {
  return EVENT_DISTANCES.map((d) => ({
    value: d.value,
    label: d.name,
  }));
};

/**
 * Validate if a distance value is valid
 */
export const isValidDistance = (value: string): boolean => {
  return EVENT_DISTANCES.some((d) => d.value === value || d.id === value);
};

