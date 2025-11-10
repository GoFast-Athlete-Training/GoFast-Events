/**
 * Boys Gotta Run – Discovery 5K Volunteer Mapper
 * 
 * This is a MAPPER that maps frontend slot IDs to backend role names.
 * Format: marshal.1, marshal.2, pacer.fast, pacer.medium, pacer.slow, water.1, water.2, finish.1, finish.2
 * 
 * When submitting: slot ID → backend role name
 * When hydrating: backend role name → slot ID
 */

// =====================================================
// EVENT CONFIGURATION
// =====================================================

export const BGR5K_EVENT_CONFIG = {
  eventId: 'cmht9p0800001p21xn5tjp5nc',
  eventName: 'Boys Gotta Run – Discovery 5K',
  eventDate: '2025-11-12',
  eventTime: '7:55 AM',
  location: 'Discovery Elementary',
  address: '5275 N 36th St, Arlington, VA 22207',
  stravaRouteUrl: 'https://www.strava.com/routes/3420808564668746102',
  distance: '3.2 mi',
  elevation: '300 ft',
  difficulty: 'Easy',
  expectedParticipants: 16,
} as const;

// =====================================================
// VOLUNTEER SLOT → BACKEND ROLE NAME MAPPER
// =====================================================

/**
 * Main mapper: Frontend slot ID → Backend role name
 * This is what gets sent to the backend when submitting volunteer signups
 */
export const VOLUNTEER_SLOT_MAP: Record<string, string> = {
  // Marshals (7 positions)
  'marshal.1': 'Starter + Finisher Crew',
  'marshal.2': 'Valleywood + John Marshall Crew',
  'marshal.3': 'Vermont + 35th Street North Crew',
  'marshal.4': 'Massachusetts + Nottingham / 35th Crew',
  'marshal.5': 'Massachusetts / Rhode Island + Rockingham Crew',
  'marshal.6': 'Virginia Avenue Entry Crew',
  'marshal.7': 'Virginia / Nottingham Crew',
  
  // Pacers (3 positions)
  'pacer.fast': 'Pacers – Fast',
  'pacer.medium': 'Pacers – Medium',
  'pacer.slow': 'Pacers – Finish Crew',
  
  // Water stations (2 positions)
  'water.1': 'Water Stop #1 — Massachusetts → Rhode Island',
  'water.2': 'Water Stop #2 — Nottingham → 35th',
  
  // Finish line holders (2 positions)
  'finish.1': 'Finish Line Holders 1',
  'finish.2': 'Finish Line Holders 2',
};

// =====================================================
// REVERSE MAPPER (Backend Role Name → Frontend Slot ID)
// =====================================================

/**
 * Reverse mapper: Backend role name → Frontend slot ID
 * This is used when hydrating from backend to find which slot a volunteer belongs to
 */
export const BACKEND_ROLE_TO_SLOT_MAP: Record<string, string> = Object.fromEntries(
  Object.entries(VOLUNTEER_SLOT_MAP).map(([slotId, roleName]) => [roleName, slotId])
);

// =====================================================
// MAPPER FUNCTIONS
// =====================================================

/**
 * Map frontend slot ID to backend role name
 * @param slotId - Frontend slot ID (e.g., "marshal.1", "pacer.fast")
 * @returns Backend role name (e.g., "Starter + Finisher Crew", "Pacers – Fast")
 */
export const mapSlotIdToRoleName = (slotId: string): string => {
  return VOLUNTEER_SLOT_MAP[slotId] || slotId;
};

/**
 * Map backend role name to frontend slot ID
 * @param roleName - Backend role name (e.g., "Starter + Finisher Crew")
 * @returns Frontend slot ID (e.g., "marshal.1")
 */
export const mapRoleNameToSlotId = (roleName: string): string => {
  return BACKEND_ROLE_TO_SLOT_MAP[roleName] || roleName;
};

// =====================================================
// SLOT METADATA (for display only - optional)
// =====================================================

export type SlotMetadata = {
  slotId: string;
  roleName: string;
  description: string;
  category: 'marshal' | 'pacer' | 'water' | 'finish';
  details?: {
    routePoints?: string;
    repositioning?: string;
    mileMarkers?: string;
    pace?: string;
    location?: string;
    setupNotes?: string;
  };
};

/**
 * Optional metadata for display purposes
 * This is separate from the mapper - just for UI descriptions
 */
export const SLOT_METADATA: Record<string, Omit<SlotMetadata, 'slotId' | 'roleName'>> = {
  // Marshals
  'marshal.1': {
    description: 'Handle the first turn, then reposition to guide runners to the finish.',
    category: 'marshal',
    details: {
      routePoints: 'Routes 1 + 13',
      repositioning: 'After pack clears first turn (0.22 mi), return to Discovery for final straight (2.7–3.2 mi).',
      mileMarkers: '0.22 mi, 2.7–3.2 mi',
    },
  },
  'marshal.2': {
    description: 'Cover early Valleywood stretch, then reposition to final turn.',
    category: 'marshal',
    details: {
      routePoints: 'Routes 2 + 12',
      repositioning: 'Start on Valleywood (0.3–0.7 mi), loop back via Valleywood to cover John Marshall right (2.5 mi).',
      mileMarkers: '0.3–0.7 mi, 2.5 mi',
    },
  },
  'marshal.3': {
    description: 'Guide at Vermont turn, then reposition to 35th Street turn.',
    category: 'marshal',
    details: {
      routePoints: 'Routes 3 + 11',
      repositioning: 'Park at Vermont (0.75 mi), re-post at 35th left (2.4 mi) when clear.',
      mileMarkers: '0.75 mi, 2.4 mi',
    },
  },
  'marshal.4': {
    description: 'Cover Massachusetts turn (watch for traffic), then reposition to Nottingham/35th.',
    category: 'marshal',
    details: {
      routePoints: 'Routes 4 + 10',
      repositioning: 'Cover Mass left (0.82 mi), reposition via Rockingham to Nottingham/35th (2.3 mi).',
      mileMarkers: '0.82 mi, 2.3 mi',
    },
  },
  'marshal.5': {
    description: 'Station at Rhode Island turn, then reposition to Rockingham interchange.',
    category: 'marshal',
    details: {
      routePoints: 'Routes 5 + 9',
      repositioning: 'Station at Rhode Island right (1.09 mi), reposition via Rockingham to Nottingham interchange (2.1 mi).',
      mileMarkers: '1.09 mi, 2.1 mi',
    },
  },
  'marshal.6': {
    description: 'Cover Virginia Avenue entry and stay in place along early Virginia segment.',
    category: 'marshal',
    details: {
      routePoints: 'Routes 6 + 7',
      repositioning: 'Stays in place at Rhode Island to Virginia left (≈1.17 mi) along early Virginia segment.',
      mileMarkers: '≈1.17 mi, 1.31 mi',
    },
  },
  'marshal.7': {
    description: 'Single post at right turn onto Nottingham, marking final neighborhood stretch.',
    category: 'marshal',
    details: {
      routePoints: 'Route 8',
      repositioning: 'Single post at Virginia to Nottingham right turn (≈2.0 mi).',
      mileMarkers: '≈2.0 mi',
    },
  },
  
  // Pacers
  'pacer.fast': {
    description: 'Lead the front group and keep the energy high from the first stride.',
    category: 'pacer',
    details: {
      pace: '8-9 min/mile (they will get tired)',
    },
  },
  'pacer.medium': {
    description: 'Support steady runners and help them hold a comfortable pace.',
    category: 'pacer',
    details: {
      pace: '9-10 min/mile',
    },
  },
  'pacer.slow': {
    description: 'Stay positive with runners who are focused on finishing strong.',
    category: 'pacer',
    details: {
      pace: '10+ min/mile with lots of stops',
    },
  },
  
  // Water stations
  'water.1': {
    description: 'Set up water station with cups, keep everyone hydrated. Plan for 16 boys.',
    category: 'water',
    details: {
      location: 'Massachusetts → Rhode Island',
      mileMarkers: 'approx. mile 1.1',
      setupNotes: 'Fill cups with half Gatorade and half water. Have plenty of cups ready for 16 boys.',
    },
  },
  'water.2': {
    description: 'Set up water station with cups, keep everyone hydrated. Plan for 16 boys.',
    category: 'water',
    details: {
      location: 'Nottingham → 35th',
      mileMarkers: 'approx. mile 2.3',
      setupNotes: 'Fill cups with half Gatorade and half water. Have plenty of cups ready for 16 boys.',
    },
  },
  
  // Finish line holders
  'finish.1': {
    description: 'Hold the finish line banner and cheer on every runner as they cross the finish line.',
    category: 'finish',
    details: {
      setupNotes: 'Can be filled by marshals who finish early',
    },
  },
  'finish.2': {
    description: 'Hold the finish line banner and cheer on every runner as they cross the finish line.',
    category: 'finish',
    details: {
      setupNotes: 'Can be filled by marshals who finish early',
    },
  },
};

/**
 * Get slot metadata (with slotId and roleName filled in from mapper)
 */
export const getSlotMetadata = (slotId: string): SlotMetadata | undefined => {
  const roleName = mapSlotIdToRoleName(slotId);
  const meta = SLOT_METADATA[slotId];
  if (!meta) return undefined;
  
  return {
    slotId,
    roleName,
    ...meta,
  };
};

/**
 * Get all slots by category
 */
export const getSlotsByCategory = (category: 'marshal' | 'pacer' | 'water' | 'finish'): string[] => {
  return Object.keys(VOLUNTEER_SLOT_MAP).filter((slotId) => {
    const meta = SLOT_METADATA[slotId];
    return meta?.category === category;
  });
};

/**
 * Get all slot IDs
 */
export const getAllSlotIds = (): string[] => {
  return Object.keys(VOLUNTEER_SLOT_MAP);
};

// =====================================================
// ROUTE POINTS (for course overview)
// =====================================================

export type RoutePoint = {
  id: string;
  location: string;
  description: string;
  mile: string;
};

export const ROUTE_POINTS: RoutePoint[] = [
  { id: 'route-1', location: 'Kensington → 37th St', description: 'Right turn uphill from Kensington onto 37th.', mile: '0.22' },
  { id: 'route-2', location: 'Along Valleywood Dr', description: 'Long gradual curve; steady residential stretch.', mile: '0.30–0.75' },
  { id: 'route-3', location: 'Valleywood → Vermont Ave', description: 'Left turn just before Old Dominion Dr; short section on Vermont.', mile: '0.75' },
  { id: 'route-4', location: 'Vermont → Massachusetts Ave', description: 'Left turn onto Massachusetts; cars may approach downhill from the right.', mile: '0.82' },
  { id: 'route-5', location: 'Massachusetts → Rhode Island Ave (via Rockingham)', description: 'Right turn where Rockingham connects into Rhode Island.', mile: '1.09' },
  { id: 'route-6', location: 'Rhode Island → Virginia Ave', description: 'Left turn continuing through residential area.', mile: '1.17' },
  { id: 'route-7', location: 'Virginia Ave corner (Virginia → Virginia transition)', description: 'Gentle bend keeping runners on Virginia Ave alignment.', mile: '1.31' },
  { id: 'route-8', location: 'Virginia → Nottingham St', description: 'Right turn beginning final neighborhood stretch.', mile: '~2.00' },
  { id: 'route-9', location: 'Rockingham interchange on Nottingham', description: 'Brief left-then-right transition staying on Nottingham.', mile: '2.10' },
  { id: 'route-10', location: 'Nottingham → 35th St', description: 'Left turn beginning final sequence toward finish.', mile: '2.33' },
  { id: 'route-11', location: '35th → N. John Marshall Dr', description: 'Left turn continuing finish approach.', mile: '2.41' },
  { id: 'route-12', location: 'N. John Marshall Dr → 36th St', description: 'Right turn guiding runners toward school area.', mile: '2.50' },
  { id: 'route-13', location: '36th St → Kensington (Finish approach)', description: 'Final straight back to Discovery; finish area visible from corner.', mile: '2.70–3.20' },
];

// =====================================================
// VOLUNTEER COUNTS
// =====================================================

export const VOLUNTEER_COUNTS = {
  marshals: Object.keys(VOLUNTEER_SLOT_MAP).filter((id) => id.startsWith('marshal')).length, // 7
  pacers: Object.keys(VOLUNTEER_SLOT_MAP).filter((id) => id.startsWith('pacer')).length, // 3
  waterStations: Object.keys(VOLUNTEER_SLOT_MAP).filter((id) => id.startsWith('water')).length, // 2
  finishLineHolders: Object.keys(VOLUNTEER_SLOT_MAP).filter((id) => id.startsWith('finish')).length, // 2
  total: Object.keys(VOLUNTEER_SLOT_MAP).length, // 14
} as const;

// =====================================================
// HELPER FUNCTIONS
// =====================================================

export const getEventId = (): string => {
  return BGR5K_EVENT_CONFIG.eventId;
};

/**
 * Validate slot ID exists in mapper
 */
export const isValidSlotId = (slotId: string): boolean => {
  return slotId in VOLUNTEER_SLOT_MAP;
};

/**
 * Validate role name exists in reverse mapper
 */
export const isValidRoleName = (roleName: string): boolean => {
  return roleName in BACKEND_ROLE_TO_SLOT_MAP;
};
