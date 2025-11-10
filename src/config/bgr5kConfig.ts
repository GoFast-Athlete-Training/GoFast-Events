/**
 * Boys Gotta Run – Discovery 5K Event Configuration
 * 
 * This is the specific configuration for the "Boys Gotta Run – Discovery 5K" event.
 * The eventId is set after event creation in the main backend (EventManagement).
 * 
 * This is a hardcoded config for this specific event instance.
 */

export const BGR5K_CONFIG = {
  // Event ID from database (created in EventManagement)
  eventId: 'cmht9p0800001p21xn5tjp5nc', // Boys Gotta Run – Discovery 5K event

  // Event details (for display)
  eventName: 'Boys Gotta Run – Discovery 5K',
  eventDate: '2025-11-12',
  eventTime: '7:55 AM',
  location: 'Discovery Elementary',
  address: '5275 N 36th St, Arlington, VA 22207',
  stravaRouteUrl: 'https://www.strava.com/routes/3420808564668746102',
  distance: '3.2 mi',
  elevation: '300 ft',
  difficulty: 'Easy',
} as const;

/**
 * Get eventId from BGR5K config
 */
export const getBGR5KEventId = (): string => {
  return BGR5K_CONFIG.eventId;
};

