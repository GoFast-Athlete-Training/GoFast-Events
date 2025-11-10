# Universal Event Mapper Service

**Last Updated**: January 2025  
**Purpose**: Centralized mapping service for event-related data across the GoFast Events system

---

## Overview

The `UniversalEventMapperService` provides a centralized way to map and convert event-related data between different formats:
- **Frontend IDs** → **Backend strings**
- **Backend strings** → **Frontend IDs**
- **Display values** → **Internal IDs**
- **Validation** of IDs and values

This service ensures consistency across the system and makes it easy to extend for new event types and configurations.

---

## Architecture

### Service Location
- **File**: `src/services/UniversalEventMapperService.ts`
- **Config**: `src/config/eventDistanceConfig.ts`

### Design Principles
1. **Centralized Mapping** - All mappings in one place
2. **Type Safety** - TypeScript types for all mappings
3. **Extensible** - Easy to add new mappings
4. **Validation** - Built-in validation helpers
5. **Backward Compatible** - Falls back to original value if mapping not found

---

## Current Mappings

### 1. Role Mapping

**Purpose**: Map volunteer role IDs to role name strings for backend API

**Frontend → Backend**:
```typescript
mapRoleIdToRoleName('course-marshals') → 'Course Marshals (5)'
mapRoleIdToRoleName('pacers-fast') → 'Pacers – Fast'
```

**Backend → Frontend**:
```typescript
mapRoleNameToRoleId('Course Marshals (5)') → 'course-marshals'
mapRoleNameToRoleId('Pacers – Fast') → 'pacers-fast'
```

**Usage**:
```typescript
import { mapRoleIdToRoleName } from '../services/UniversalEventMapperService';

// When submitting to backend
const backendRole = mapRoleIdToRoleName(formState.roleId);
// Send: { role: backendRole } to API
```

### 2. Distance Mapping

**Purpose**: Map distance IDs to display values and vice versa

**Distance Options**:
- `5k` → `5K` (3.1 miles)
- `10k` → `10K` (6.2 miles)
- `5-mile` → `5 mile` (5.0 miles)
- `10-mile` → `10 mile` (10.0 miles)
- `half-marathon` → `Half Marathon` (13.1 miles)
- `marathon` → `Marathon` (26.2 miles)

**Usage**:
```typescript
import { getDistanceOptions, mapDistanceIdToValue } from '../services/UniversalEventMapperService';

// Get options for dropdown
const distanceOptions = getDistanceOptions();
// [{ value: '5K', label: '5K' }, { value: '10K', label: '10K' }, ...]

// Map ID to value
const displayValue = mapDistanceIdToValue('5k'); // → '5K'
```

### 3. Event Type Mapping (Future)

**Purpose**: Map event type IDs to display names

**Event Types**:
- `race` → `Race`
- `community-run` → `Community Run`
- `training` → `Training Run`
- `fun-run` → `Fun Run`
- `charity-run` → `Charity Run`

---

## Configuration Files

### eventDistanceConfig.ts

**Location**: `src/config/eventDistanceConfig.ts`

**Structure**:
```typescript
export type EventDistance = {
  id: string;                    // Internal ID (e.g., '5k')
  name: string;                  // Display name (e.g., '5K')
  value: string;                 // Backend value (e.g., '5K')
  distanceMiles?: number;        // Distance in miles
  distanceKilometers?: number;   // Distance in kilometers
  category: 'short' | 'medium' | 'long' | 'ultra';
};
```

**Usage**:
```typescript
import { EVENT_DISTANCES, getDistanceById } from '../config/eventDistanceConfig';

// Get all distances
const distances = EVENT_DISTANCES;

// Get specific distance
const fiveK = getDistanceById('5k');
// { id: '5k', name: '5K', value: '5K', distanceMiles: 3.1, ... }
```

---

## Usage Examples

### Example 1: Volunteer Signup Form

```typescript
import { mapRoleIdToRoleName } from '../services/UniversalEventMapperService';

const handleSubmit = async (formData) => {
  const backendRole = mapRoleIdToRoleName(formData.roleId);
  
  await fetch('/api/event-volunteer', {
    method: 'POST',
    body: JSON.stringify({
      eventId: eventId,
      name: formData.name,
      email: formData.email,
      role: backendRole, // Mapped role name string
    }),
  });
};
```

### Example 2: Distance Dropdown

```typescript
import { getDistanceOptions } from '../services/UniversalEventMapperService';

const DistanceSelector = () => {
  const options = getDistanceOptions();
  
  return (
    <select>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
```

### Example 3: Display Distance with Miles

```typescript
import { getDistanceByValue } from '../services/UniversalEventMapperService';

const DistanceDisplay = ({ distanceValue }) => {
  const distance = getDistanceByValue(distanceValue);
  
  return (
    <div>
      <span>{distance?.name}</span>
      {distance?.distanceMiles && (
        <span className="text-gray-500">({distance.distanceMiles} miles)</span>
      )}
    </div>
  );
};
```

---

## Validation

### Role Validation

```typescript
import { isValidRoleId, isValidRoleName } from '../services/UniversalEventMapperService';

// Validate role ID
if (!isValidRoleId(formData.roleId)) {
  throw new Error('Invalid role ID');
}

// Validate role name (from backend)
if (!isValidRoleName(backendRole)) {
  console.warn('Unknown role name from backend');
}
```

### Distance Validation

```typescript
import { isValidDistance } from '../services/UniversalEventMapperService';

// Validate distance value
if (!isValidDistance(eventForm.distance)) {
  throw new Error('Invalid distance');
}
```

---

## Future Enhancements

### 1. Event Status Mapping
```typescript
// Future: Map event status
mapEventStatus('draft') → 'Draft'
mapEventStatus('published') → 'Published'
mapEventStatus('cancelled') → 'Cancelled'
```

### 2. Registration Type Mapping
```typescript
// Future: Map registration types
mapRegistrationType('open') → 'Open Registration'
mapRegistrationType('closed') → 'Registration Closed'
mapRegistrationType('waitlist') → 'Waitlist Only'
```

### 3. Location Format Mapping
```typescript
// Future: Map location formats
mapLocationFormat({ address: '...' }) → 'Address'
mapLocationFormat({ lat: ..., lng: ... }) → 'Coordinates'
mapLocationFormat({ venue: '...' }) → 'Venue'
```

### 4. Time Zone Mapping
```typescript
// Future: Map time zones
mapTimeZone('America/New_York') → 'Eastern Time'
mapTimeZone('America/Los_Angeles') → 'Pacific Time'
```

---

## Integration Points

### Frontend (GoFast-Events)
- **VolunteerSignup.tsx** - Maps role ID to role name before API submission
- **VolunteerRoster.tsx** - Maps role name to role ID for display
- **EventManagement.jsx** (main frontend) - Uses distance config for event creation

### Backend (gofastbackendv2-fall2025)
- **Event Model** - Stores distance as string (e.g., "5K", "10K")
- **EventVolunteer Model** - Stores role as string (e.g., "Course Marshals (5)")

---

## Key Takeaways

1. ✅ **Centralized Mapping** - All mappings in one service
2. ✅ **Type Safe** - TypeScript types for all mappings
3. ✅ **Extensible** - Easy to add new mappings
4. ✅ **Validation** - Built-in validation helpers
5. ✅ **Backward Compatible** - Falls back gracefully
6. ✅ **Documented** - Clear documentation for all mappings

---

## Migration Path

### Current State
- Roles: Frontend IDs → Backend strings (working)
- Distances: String values (e.g., "5K") stored in backend

### Future State
- Roles: Configurable per event (future)
- Distances: Standardized IDs with validation
- Event Types: Mapped and validated
- Status: Mapped and validated
- Registration Types: Mapped and validated

---

**Last Updated**: January 2025  
**Status**: MVP Implementation  
**Next Steps**: Add event type mapping, status mapping, registration type mapping

