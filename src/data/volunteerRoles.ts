/**
 * Volunteer Roles - Legacy compatibility layer
 * 
 * This file now uses the mapper config from boysonrun5kvolunteerconfig.ts
 * The actual slot mappings are in the config file using the mapper pattern.
 */

import {
  VOLUNTEER_SLOT_MAP,
  getSlotMetadata,
  getSlotsByCategory,
  getAllSlotIds,
  mapSlotIdToRoleName,
  type SlotMetadata,
} from '../config/boysonrun5kvolunteerconfig';

export type VolunteerRole = {
  id: string;
  name: string;
  description: string;
  slotCount: number;
  isActive: boolean;
};

export type VolunteerSlot = {
  id: string; // Frontend slot ID from mapper (e.g., "marshal.1", "pacer.fast")
  roleId: string; // Category (e.g., "marshal", "pacer")
  roleName: string; // Backend role name from mapper (e.g., "Starter + Finisher Crew")
  description: string;
  isActive: boolean;
};

/**
 * Generate volunteer slots from the mapper config
 * Uses the mapper pattern: slot ID → role name
 */
export const generateVolunteerSlots = (): VolunteerSlot[] => {
  const slots: VolunteerSlot[] = [];
  const allSlotIds = getAllSlotIds();

  allSlotIds.forEach((slotId) => {
    const metadata = getSlotMetadata(slotId);
    if (!metadata) return;

    slots.push({
      id: slotId,
      roleId: metadata.category,
      roleName: metadata.roleName, // From mapper
      description: metadata.description,
      isActive: true,
    });
  });

  return slots;
};

/**
 * Get all active volunteer slots
 */
export const activeVolunteerSlots = generateVolunteerSlots();

/**
 * Legacy role definitions (for backward compatibility only)
 */
export const volunteerRoles: VolunteerRole[] = [
  {
    id: 'course-marshals',
    name: 'Course Marshals',
    description: 'Cheer and guide runners at assigned corners so nobody takes a wrong turn. 7 volunteer groups cover 13 route points with repositioning.',
    slotCount: 7,
    isActive: true,
  },
  {
    id: 'pacers-fast',
    name: 'Pacers – Fast',
    description: 'Lead the front group and keep the energy high from the first stride.',
    slotCount: 1,
    isActive: true,
  },
  {
    id: 'pacers-medium',
    name: 'Pacers – Medium',
    description: 'Support steady runners and help them hold a comfortable pace.',
    slotCount: 1,
    isActive: true,
  },
  {
    id: 'pacers-finish',
    name: 'Pacers – Finish Crew',
    description: 'Stay positive with runners who are focused on finishing strong.',
    slotCount: 1,
    isActive: true,
  },
  {
    id: 'finish-line-holders',
    name: 'Finish Line Holders',
    description: 'Hold the banner, cheer loudly, and celebrate every finish.',
    slotCount: 2,
    isActive: true,
  },
  {
    id: 'water-station-crew',
    name: 'Water Station Crew',
    description: 'Set up water stations with cups, keep everyone hydrated. Plan for 16 boys - fill cups with half Gatorade and half water.',
    slotCount: 2,
    isActive: true,
  },
  {
    id: 'setup-teardown',
    name: 'Setup & Teardown',
    description: 'Optional future role to help set up the start/finish and pack up gear.',
    slotCount: 1,
    isActive: false,
  },
];

/**
 * Get active volunteer roles (for backward compatibility)
 */
export const activeVolunteerRoles = volunteerRoles.filter((role) => role.isActive);

/**
 * Get role by ID
 */
export const getRoleById = (roleId: string): VolunteerRole | undefined => {
  return volunteerRoles.find((role) => role.id === roleId);
};

/**
 * Get slot by ID
 */
export const getSlotById = (slotId: string): VolunteerSlot | undefined => {
  return activeVolunteerSlots.find((slot) => slot.id === slotId);
};
