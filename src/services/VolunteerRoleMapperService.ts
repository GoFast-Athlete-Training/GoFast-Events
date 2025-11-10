import { volunteerRoles, type VolunteerRole } from '../data/volunteerRoles';

/**
 * VolunteerRoleMapperService
 * 
 * Maps frontend role IDs to backend role name strings.
 * 
 * The frontend uses role IDs (e.g., 'course-marshals') for UI,
 * but the backend expects role name strings (e.g., 'Course Marshals (5)').
 * 
 * This service handles the conversion.
 */

/**
 * Map role ID to role name string for backend
 * 
 * @param roleId - Frontend role ID (e.g., 'course-marshals')
 * @returns Backend role name string (e.g., 'Course Marshals (5)')
 */
export const mapRoleIdToRoleName = (roleId: string): string => {
  const role = volunteerRoles.find((r) => r.id === roleId);
  
  if (!role) {
    // Fallback: return the roleId if not found (shouldn't happen, but safety)
    console.warn(`Role ID not found: ${roleId}, using as-is`);
    return roleId;
  }

  // Return the role name string (what backend expects)
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
    // Fallback: return the roleName if not found
    console.warn(`Role name not found: ${roleName}, using as-is`);
    return roleName;
  }

  return role.id;
};

/**
 * Get role by ID
 * 
 * @param roleId - Frontend role ID
 * @returns VolunteerRole object or null
 */
export const getRoleById = (roleId: string): VolunteerRole | null => {
  return volunteerRoles.find((r) => r.id === roleId) || null;
};

/**
 * Get role by name
 * 
 * @param roleName - Backend role name string
 * @returns VolunteerRole object or null
 */
export const getRoleByName = (roleName: string): VolunteerRole | null => {
  return volunteerRoles.find((r) => r.name === roleName) || null;
};

/**
 * Validate role ID exists
 * 
 * @param roleId - Frontend role ID
 * @returns boolean
 */
export const isValidRoleId = (roleId: string): boolean => {
  return volunteerRoles.some((r) => r.id === roleId);
};

/**
 * Validate role name exists
 * 
 * @param roleName - Backend role name string
 * @returns boolean
 */
export const isValidRoleName = (roleName: string): boolean => {
  return volunteerRoles.some((r) => r.name === roleName);
};

