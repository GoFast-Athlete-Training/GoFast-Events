/**
 * Universal Event Mapper Service
 * 
 * This service uses the BGR5K volunteer config mapper to handle
 * role ID to role name mappings and other event-related transformations.
 * 
 * The mapper pattern: frontend slot ID (e.g., "marshal.1") → backend role name (e.g., "Starter + Finisher Crew")
 */

import {
  mapSlotIdToRoleName,
  mapRoleNameToSlotId,
  getSlotMetadata,
  isValidSlotId,
  isValidRoleName,
} from '../config/boysonrun5kvolunteerconfig';
import { EVENT_DISTANCES, type EventDistance } from '../config/eventDistanceConfig';

// =====================================================
// ROLE MAPPING (uses BGR5K config mapper)
// =====================================================

/**
 * Map role ID (slot ID) to role name string for backend
 * Uses the BGR5K mapper: frontend slot ID → backend role name
 * 
 * @param slotId - Frontend slot ID (e.g., 'marshal.1', 'pacer.fast')
 * @returns Backend role name string (e.g., 'Starter + Finisher Crew', 'Pacers – Fast')
 */
export const mapRoleIdToRoleName = (slotId: string): string => {
  return mapSlotIdToRoleName(slotId);
};

/**
 * Map role name string to role ID (reverse mapping)
 * Uses the BGR5K reverse mapper: backend role name → frontend slot ID
 * 
 * @param roleName - Backend role name string (e.g., 'Starter + Finisher Crew')
 * @returns Frontend slot ID (e.g., 'marshal.1')
 */
export const mapRoleNameToRoleId = (roleName: string): string => {
  return mapRoleNameToSlotId(roleName);
};

/**
 * Get role metadata by slot ID
 */
export const getRoleMetadata = (slotId: string) => {
  return getSlotMetadata(slotId);
};

/**
 * Validate role ID (slot ID) exists in mapper
 */
export const isValidRoleId = (slotId: string): boolean => {
  return isValidSlotId(slotId);
};

// =====================================================
// DISTANCE MAPPING
// =====================================================

/**
 * Normalize a distance string to a standard format.
 *
 * @param distance - The distance string (e.g., "5k", "5 kilometers", "3.1 miles")
 * @returns Normalized distance string (e.g., "5K") or original if no match
 */
export const normalizeDistance = (distance: string): string => {
  const lowerCaseDistance = distance.toLowerCase().trim();

  if (lowerCaseDistance.includes('5k') || lowerCaseDistance.includes('5 kilometers') || lowerCaseDistance.includes('3.1 miles')) {
    return '5K';
  }
  if (lowerCaseDistance.includes('10k') || lowerCaseDistance.includes('10 kilometers') || lowerCaseDistance.includes('6.2 miles')) {
    return '10K';
  }
  if (lowerCaseDistance.includes('half marathon') || lowerCaseDistance.includes('13.1 miles') || lowerCaseDistance.includes('21.1k')) {
    return 'Half Marathon';
  }
  if (lowerCaseDistance.includes('marathon') || lowerCaseDistance.includes('26.2 miles') || lowerCaseDistance.includes('42.2k')) {
    return 'Marathon';
  }

  // Fallback to check against predefined list
  const found = EVENT_DISTANCES.find(d => 
    d.value.toLowerCase() === lowerCaseDistance || 
    d.id.toLowerCase() === lowerCaseDistance ||
    d.name.toLowerCase() === lowerCaseDistance
  );
  if (found) return found.value;

  return distance.trim();
};

/**
 * Validate if a distance string is in the predefined list of event distances.
 *
 * @param distance - The distance string to validate.
 * @returns boolean
 */
export const isValidEventDistance = (distance: string): boolean => {
  const normalized = normalizeDistance(distance);
  return EVENT_DISTANCES.some(d => d.value === normalized || d.id === normalized || d.name === normalized);
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

/**
 * Validate distance value
 */
export const isValidDistance = (distanceValue: string): boolean => {
  return EVENT_DISTANCES.some((d) => d.value === distanceValue || d.id === distanceValue);
};
