/**
 * Event Configuration for Boys Gotta Run – Discovery 5K
 * 
 * This eventId is set after event creation in the main backend (EventManagement).
 * Once an event is created, copy the eventId here.
 * 
 * This is a hardcoded config for this specific event instance.
 */

export const EVENT_CONFIG = {
  // Set this after creating the event in EventManagement
  // Format: 'clxxxxxxxxxxxxxx' (cuid from database)
  eventId: '', // TODO: Set this after event creation

  // Event details (for display, can be hydrated from backend)
  eventName: 'Boys Gotta Run – Discovery 5K',
  eventDate: '2025-11-12',
  eventTime: '7:55 AM',
  location: 'Discovery Elementary',
  address: '5275 N 36th St, Arlington, VA 22207',
  stravaRouteUrl: 'https://www.strava.com/routes/3420808564668746102',
};

/**
 * Get eventId from config or localStorage
 * Falls back to localStorage if config is empty (for dynamic setting)
 */
export const getEventId = (): string => {
  // Check config first
  if (EVENT_CONFIG.eventId) {
    return EVENT_CONFIG.eventId;
  }

  // Fallback to localStorage (can be set dynamically)
  const storedEventId = localStorage.getItem('boysGottaRunEventId');
  if (storedEventId) {
    return storedEventId;
  }

  // Return empty string if not set
  return '';
};

/**
 * Set eventId in localStorage (for dynamic setting)
 */
export const setEventId = (eventId: string): void => {
  localStorage.setItem('boysGottaRunEventId', eventId);
};

