export type VolunteerRole = {
  id: string;
  name: string;
  description: string;
  slotCount: number; // Number of individual slots for this role
  isActive: boolean;
};

export type VolunteerSlot = {
  id: string; // Unique slot ID (e.g., "course-marshal-1", "course-marshal-2")
  roleId: string; // Parent role ID
  roleName: string; // Display name for backend (e.g., "Course Marshal 1")
  description: string;
  isActive: boolean;
};

// Role definitions with slot counts
export const volunteerRoles: VolunteerRole[] = [
  {
    id: 'course-marshals',
    name: 'Course Marshals',
    description: 'Cheer and guide runners at assigned corners so nobody takes a wrong turn.',
    slotCount: 5,
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
    description: 'Optional future role to set up cups and keep everyone hydrated.',
    slotCount: 1,
    isActive: false,
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
 * Generate individual slots from role definitions
 * This creates SignUpGenius-style individual slots for each role
 */
export const generateVolunteerSlots = (): VolunteerSlot[] => {
  const slots: VolunteerSlot[] = [];

  volunteerRoles.forEach((role) => {
    if (role.isActive) {
      for (let i = 1; i <= role.slotCount; i++) {
        const slotId = role.slotCount > 1 ? `${role.id}-${i}` : role.id;
        const slotName = role.slotCount > 1 ? `${role.name} ${i}` : role.name;

        slots.push({
          id: slotId,
          roleId: role.id,
          roleName: slotName, // This is what gets sent to backend
          description: role.description,
          isActive: true,
        });
      }
    }
  });

  return slots;
};

/**
 * Get all active volunteer slots
 */
export const activeVolunteerSlots = generateVolunteerSlots();

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
