/**
 * Universal Event Mapper Service
 * 
 * Centralized service for mapping event-related data across the system.
 * Handles conversions between frontend IDs, backend strings, and display values.
 * 
 * This service is designed to be extensible for future event types and configurations.
 */

import { EVENT_DISTANCES, type EventDistance } from '../config/eventDistanceConfig';
import { volunteerRoles, type VolunteerRole } from '../data/volunteerRoles';

// =====================================================
// ROLE MAPPING
// =====================================================

/**
 * Map role ID to role name string for backend
 * 
 * @param roleId - Frontend role ID (e.g., 'course-marshals')
 * @returns Backend role name string (e.g., 'Course Marshals (5)')
 */
export const mapRoleIdToRoleName = (roleId: string): string => {
  const role = volunteerRoles.find((r) => r.id === roleId);
  
  if (!role) {
    console.warn(`Role ID not found: ${roleId}, using as-is`);
    return roleId;
  }

  return role.name;
};

/**
 * Map role name string to role ID (reverse mapping)
 * 
 * @param roleName - Backend role name string (e.g., 'Course Marshals (5)')
 * @returns Frontend role ID (e.g., 'course-marshals')
 */
export const mapRoleNameToRoleId = (roleName: string): string => {
  const role = volunteerRoles.find((r) => r.name === roleName);
  
  if (!role) {
    console.warn(`Role name not found: ${roleName}, using as-is`);
    return roleName;
  }

  return role.id;
};

/**
 * Get role by ID
 */
export const getRoleById = (roleId: string): VolunteerRole | null => {
  return volunteerRoles.find((r) => r.id === roleId) || null;
};

/**
 * Get role by name
 */
export const getRoleByName = (roleName: string): VolunteerRole | null => {
  return volunteerRoles.find((r) => r.name === roleName) || null;
};

// =====================================================
// DISTANCE MAPPING
// =====================================================

/**
 * Map distance ID to distance value (display string)
 * 
 * @param distanceId - Distance ID (e.g., '5k')
 * @returns Distance value string (e.g., '5K')
 */
export const mapDistanceIdToValue = (distanceId: string): string => {
  const distance = EVENT_DISTANCES.find((d) => d.id === distanceId);
  
  if (!distance) {
    console.warn(`Distance ID not found: ${distanceId}, using as-is`);
    return distanceId;
  }

  return distance.value;
};

/**
 * Map distance value to distance ID
 * 
 * @param distanceValue - Distance value string (e.g., '5K')
 * @returns Distance ID (e.g., '5k')
 */
export const mapDistanceValueToId = (distanceValue: string): string => {
  const distance = EVENT_DISTANCES.find((d) => d.value === distanceValue);
  
  if (!distance) {
    console.warn(`Distance value not found: ${distanceValue}, using as-is`);
    return distanceValue;
  }

  return distance.id;
};

/**
 * Get distance by ID
 */
export const getDistanceById = (distanceId: string): EventDistance | null => {
  return EVENT_DISTANCES.find((d) => d.id === distanceId) || null;
};

/**
 * Get distance by value
 */
export const getDistanceByValue = (distanceValue: string): EventDistance | null => {
  return EVENT_DISTANCES.find((d) => d.value === distanceValue) || null;
};

/**
 * Get distance options for dropdowns
 */
export const getDistanceOptions = (): Array<{ value: string; label: string }> => {
  return EVENT_DISTANCES.map((d) => ({
    value: d.value,
    label: d.name,
  }));
};

// =====================================================
// EVENT TYPE MAPPING (Future)
// =====================================================

export type EventType = 'race' | 'community-run' | 'training' | 'fun-run' | 'charity-run';

export const EVENT_TYPES: EventType[] = [
  'race',
  'community-run',
  'training',
  'fun-run',
  'charity-run',
];

/**
 * Map event type to display name
 */
export const mapEventTypeToDisplayName = (eventType: string): string => {
  const typeMap: Record<string, string> = {
    'race': 'Race',
    'community-run': 'Community Run',
    'training': 'Training Run',
    'fun-run': 'Fun Run',
    'charity-run': 'Charity Run',
  };

  return typeMap[eventType] || eventType;
};

/**
 * Validate event type
 */
export const isValidEventType = (eventType: string): boolean => {
  return EVENT_TYPES.includes(eventType as EventType);
};

// =====================================================
// VALIDATION HELPERS
// =====================================================

/**
 * Validate role ID
 */
export const isValidRoleId = (roleId: string): boolean => {
  return volunteerRoles.some((r) => r.id === roleId);
};

/**
 * Validate role name
 */
export const isValidRoleName = (roleName: string): boolean => {
  return volunteerRoles.some((r) => r.name === roleName);
};

/**
 * Validate distance value
 */
export const isValidDistance = (distanceValue: string): boolean => {
  return EVENT_DISTANCES.some((d) => d.value === distanceValue || d.id === distanceValue);
};

// =====================================================
// FUTURE: Additional Mappers
// =====================================================

/**
 * Future: Map event status (draft, published, cancelled, etc.)
 */
// export const mapEventStatus = (status: string): string => { ... }

/**
 * Future: Map event registration type (open, closed, waitlist, etc.)
 */
// export const mapRegistrationType = (type: string): string => { ... }

/**
 * Future: Map event location format (address, coordinates, venue, etc.)
 */
// export const mapLocationFormat = (location: any): string => { ... }

