/**
 * Event Configuration (Universal)
 * 
 * This file imports the BGR-specific config.
 * For Boys Gotta Run – Discovery 5K, see bgr5kConfig.js
 */

import { BGR5K_CONFIG, getBGR5KEventId } from './bgr5kConfig.js';

// Export BGR5K config as EVENT_CONFIG for backward compatibility
export const EVENT_CONFIG = BGR5K_CONFIG;

/**
 * Get eventId from BGR5K config
 */
export const getEventId = (): string => {
  return getBGR5KEventId();
};

