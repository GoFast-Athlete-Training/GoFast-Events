/**
 * Universal Event Mapper Service
 * 
 * Centralized service for mapping event-related data across the system.
 * Handles conversions between frontend IDs, backend strings, and display values.
 * 
 * This service is designed to be extensible for future event types and configurations.
 */

import { EVENT_DISTANCES, type EventDistance } from '../config/eventDistanceConfig';
import { volunteerRoles, activeVolunteerSlots, type VolunteerRole, type VolunteerSlot } from '../data/volunteerRoles';

// =====================================================
// ROLE/SLOT MAPPING
// =====================================================

/**
 * Map slot ID to role name string for backend
 * Now works with individual slots (e.g., 'course-marshal-1' -> 'Course Marshal 1')
 *
 * @param slotId - Frontend slot ID (e.g., 'course-marshal-1', 'course-marshals')
 * @returns Backend role name string (e.g., 'Course Marshal 1')
 */
export const mapRoleIdToRoleName = (slotId: string): string => {
  // First try to find as a slot
  const slot = activeVolunteerSlots.find((s) => s.id === slotId);
  if (slot) {
    return slot.roleName;
  }

  // Fallback to role lookup (for backward compatibility)
  const role = volunteerRoles.find((r) => r.id === slotId);
  if (role) {
    return role.name;
  }

  console.warn(`Slot/Role ID not found: ${slotId}, using as-is`);
  return slotId;
};

/**
 * Map role name string to slot ID (reverse mapping)
 * Now works with individual slots (e.g., 'Course Marshal 1' -> 'course-marshal-1')
 *
 * @param roleName - Backend role name string (e.g., 'Course Marshal 1')
 * @returns Frontend slot ID (e.g., 'course-marshal-1')
 */
export const mapRoleNameToRoleId = (roleName: string): string => {
  // First try to find as a slot
  const slot = activeVolunteerSlots.find((s) => s.roleName === roleName);
  if (slot) {
    return slot.id;
  }

  // Fallback to role lookup (for backward compatibility)
  const role = volunteerRoles.find((r) => r.name === roleName);
  if (role) {
    return role.id;
  }

  console.warn(`Role name not found: ${roleName}, using as-is`);
  return roleName;
};

/**
 * Get role by ID
 */
export const getRoleById = (roleId: string): VolunteerRole | null => {
  return volunteerRoles.find((r) => r.id === roleId) || null;
};

/**
 * Get slot by ID
 */
export const getSlotById = (slotId: string): VolunteerSlot | null => {
  return activeVolunteerSlots.find((s) => s.id === slotId) || null;
};

/**
 * Get role by name
 */
export const getRoleByName = (roleName: string): VolunteerRole | null => {
  return volunteerRoles.find((r) => r.name === roleName) || null;
};

/**
 * Get slot by name
 */
export const getSlotByName = (slotName: string): VolunteerSlot | null => {
  return activeVolunteerSlots.find((s) => s.roleName === slotName) || null;
};

/**
 * Validate slot/role ID exists
 */
export const isValidRoleId = (slotId: string): boolean => {
  return activeVolunteerSlots.some((s) => s.id === slotId) || volunteerRoles.some((r) => r.id === slotId);
};

/**
 * Validate role/slot name exists
 */
export const isValidRoleName = (roleName: string): boolean => {
  return activeVolunteerSlots.some((s) => s.roleName === roleName) || volunteerRoles.some((r) => r.name === roleName);
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

  return distance.trim(); // Return as-is if no normalization rule applies
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
