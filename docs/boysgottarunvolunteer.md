# Boys Gotta Run – Discovery 5K Volunteer System

**Event**: Boys Gotta Run – Discovery 5K (Final Run)  
**Date**: Wednesday, November 12, 2025 – 7:55 AM  
**Location**: Discovery Elementary, 5275 N 36th St, Arlington, VA 22207

---

## Overview

This is a **unique, event-specific volunteer system** for the Boys Gotta Run Discovery 5K. This system is designed as a **standalone, no-auth volunteer signup** flow specifically for this race.

---

## Architecture

### Event Identification
- **Primary Identifier**: `eventId` (database ID from main backend)
- **Storage**: `eventId` stored in localStorage/config for this specific event
- **No Auth Required**: Volunteers are just name/email strings (no user accounts)

### Flow
1. **Race Overview** (`/`) → Landing page about the race, CTA to volunteer
2. **Volunteer Overview** (`/volunteer`) → Event details, volunteer roles, signup CTA
3. **Volunteer Signup** (`/volunteer/signup`) → Form (name, email, role, notes)
4. **Volunteer Roster** (`/volunteer/roster`) → Public roster (name + role only)

### EventId Configuration
- `eventId` is stored in `src/config/eventConfig.ts`
- Set when event is created in main backend (EventManagement)
- Hardcoded for this specific event instance
- Falls back to localStorage if config is empty (for dynamic setting)

### Distance Configuration
- Standard distances defined in `src/config/eventDistanceConfig.ts`
- Distances: 5K, 10K, 5 mile, 10 mile, Half Marathon, Marathon
- For now, stored as string in backend (e.g., "5K")
- Future: Can use distance IDs with validation

---

## Role Mapping

### Frontend Role IDs → Backend Role Strings

The `UniversalEventMapperService` maps frontend role IDs to backend role strings:

| Frontend ID | Frontend Name | Backend Role String |
|------------|---------------|---------------------|
| `course-marshals` | Course Marshals (5) | `Course Marshals (5)` |
| `pacers-fast` | Pacers – Fast | `Pacers – Fast` |
| `pacers-medium` | Pacers – Medium | `Pacers – Medium` |
| `pacers-finish` | Pacers – Finish Crew | `Pacers – Finish Crew` |
| `finish-line-holders` | Finish Line Holders (2) | `Finish Line Holders (2)` |
| `water-station-crew` | Water Station Crew | `Water Station Crew` |
| `setup-teardown` | Setup & Teardown | `Setup & Teardown` |

**Note**: Backend receives the **role name string** (e.g., "Course Marshals (5)"), not the ID.

**Service**: `UniversalEventMapperService.mapRoleIdToRoleName()` handles the mapping.

---

## API Integration

### Backend Endpoints
- `POST /api/event-volunteer` → Create volunteer signup
  - Body: `{ eventId, name, email, role, notes? }`
  - `role` = role name string (e.g., "Course Marshals (5)")

- `GET /api/event-volunteer?eventId=xxx` → Get volunteers for event
  - Returns: `{ success, data: [{ id, name, email, role, notes, createdAt }] }`

### EventId Source
- **Configuration**: `src/config/eventConfig.ts`
- **Storage**: localStorage key: `boysGottaRunEventId`
- **Set by**: Event organizer (manually set after event creation)

---

## Component Structure

### RaceOverview.jsx (`/`)
- **Purpose**: Landing page about the race
- **Content**: Race details, date, location, description
- **CTA**: "Volunteer Opportunities" → links to `/volunteer`

### VolunteerOverview.tsx (`/volunteer`)
- **Purpose**: Event overview with volunteer roles
- **Hydrates**: Event details from backend using `eventId`
- **Shows**: Date, time, location, route info, volunteer roles table
- **CTAs**: "Sign Up to Help" → `/volunteer/signup`, "View Roster" → `/volunteer/roster`

### VolunteerSignup.tsx (`/volunteer/signup`)
- **Purpose**: Volunteer signup form
- **Fields**: Name, email, role (dropdown), notes (optional)
- **Submission**: Maps role ID to role name string via `VolunteerRoleMapperService`
- **API**: `POST /api/event-volunteer` with `eventId` from config

### VolunteerRoster.tsx (`/volunteer/roster`)
- **Purpose**: Public volunteer roster
- **Shows**: Name, role (no email - public view)
- **API**: `GET /api/event-volunteer?eventId=xxx`

---

## Data Flow

### 1. Event Creation (Main Backend)
```
EventManagement (gofastfrontend-mvp1)
  → Creates event
  → Gets eventId from response
  → Manual step: Copy eventId to GoFast-Events/config/eventConfig.ts
```

### 2. Volunteer Signup Flow
```
RaceOverview → VolunteerOverview → VolunteerSignup
  → Reads eventId from config
  → Submits: { eventId, name, email, role: "Course Marshals (5)", notes? }
  → Backend saves to EventVolunteer table
```

### 3. Volunteer Roster Display
```
VolunteerRoster
  → Reads eventId from config
  → Fetches: GET /api/event-volunteer?eventId=xxx
  → Displays: name, role (no email)
```

---

## Configuration

### eventConfig.ts
```typescript
export const EVENT_CONFIG = {
  eventId: 'YOUR_EVENT_ID_HERE', // Set after event creation
  eventName: 'Boys Gotta Run – Discovery 5K',
  eventDate: '2025-11-12',
  eventTime: '7:55 AM',
};
```

### Setting EventId
1. Create event in EventManagement (main backend)
2. Copy the `eventId` from the created event
3. Update `src/config/eventConfig.ts` with the `eventId`
4. Deploy or run locally

---

## Role Mapping Service

### VolunteerRoleMapperService
- **Purpose**: Map frontend role IDs to backend role name strings
- **Input**: Role ID (e.g., `'course-marshals'`)
- **Output**: Role name string (e.g., `'Course Marshals (5)'`)
- **Usage**: Used in VolunteerSignup before API submission

---

## Key Features

1. ✅ **No Auth Required** - Volunteers just provide name/email
2. ✅ **EventId-Based** - Uses database ID, not slug
3. ✅ **Role Mapping** - Frontend IDs → Backend role strings
4. ✅ **Public Roster** - Shows name + role (no email)
5. ✅ **Race Overview** - Landing page before volunteer flow
6. ✅ **Config-Based** - eventId stored in config file

---

## Future Enhancements

1. **Auto-Hydration**: Automatically fetch event details from backend using eventId
2. **Role Customization**: Allow event organizers to customize roles per event
3. **Email Notifications**: Send confirmation emails to volunteers
4. **Volunteer Management**: Allow organizers to edit volunteer details
5. **Multiple Events**: Support multiple events in same repo (future)

---

**Last Updated**: January 2025  
**Status**: Event-Specific Implementation  
**Event**: Boys Gotta Run – Discovery 5K (Final Run)

