/**
 * Boys Gotta Run – Discovery 5K Event Configuration
 * 
 * This file imports from the comprehensive volunteer config.
 * For detailed volunteer positions, see boysonrun5kvolunteerconfig.ts
 */

import { BGR5K_EVENT_CONFIG, getEventId } from './boysonrun5kvolunteerconfig';

// Export for backward compatibility
export const BGR5K_CONFIG = BGR5K_EVENT_CONFIG;

/**
 * Get eventId from BGR5K config (backward compatibility)
 */
export const getBGR5KEventId = (): string => {
  return getEventId();
};

