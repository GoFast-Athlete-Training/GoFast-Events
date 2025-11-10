# Boys Gotta Run – Discovery 5K Volunteer System (GoFast-Events Repo)

## Overview
This document details the specific implementation of the volunteer system for the "Boys Gotta Run – Discovery 5K" event, which is hosted on a dedicated frontend (`GoFast-Events` repository). This is a highly specific, one-off event that leverages a simplified volunteer flow without requiring user authentication.

## Key Characteristics
- **No User Authentication for Volunteers**: Volunteers are not required to create an account or log in. They simply provide their name, email, and selected role.
- **Event-Specific Configuration**: The `eventId` for this particular event is hardcoded in the frontend's `bgr5kConfig.ts` file. This allows the frontend to interact with the correct backend event without dynamic selection.
- **Simplified UI**: The frontend is streamlined to focus solely on the event overview, volunteer signup, and roster display.
- **Role Mapping**: A `UniversalEventMapperService` is used to translate human-readable role names (for display) to internal IDs (for backend submission) and vice-versa.
- **Individual Volunteer Slots**: Roles with multiple positions (like Course Marshals) are broken down into individual slots (Course Marshal 1, Course Marshal 2, etc.) for SignUpGenius-style signup.

---

## UX Flow & Architecture

### Page Flow

```
RaceOverview (/) 
  → CourseOverview (/course)
  → VolunteerOverview (/volunteer)
    → RouteOverview (/volunteer/marshal)
    → PacerOverview (/volunteer/pacer)
    → FinishCheererOverview (/volunteer/finish-cheerer)
  → VolunteerSignup (/volunteer/signup)
  → VolunteerRoster (/volunteer/roster)
```

### UX Thinking

#### 1. **RaceOverview (Welcome Page)** - `/`
**Purpose**: Landing page that sets the tone and provides quick access to key information.

**Key Elements**:
- Hero section with event title and description
- Quick info cards (Date & Time, Location, Tone)
- **Main Action Buttons**:
  - **Volunteer Opportunities** → Links to `/volunteer`
  - **See Course** → Links to `/course` (course map, video, details)
  - **Final Preps** → Placeholder for race day checklist (future)
- Course route preview with link to full course details
- CTA to volunteer

**UX Principle**: Give users clear, visual pathways to the information they need. Make it easy to understand what the event is about and how to get involved.

---

#### 2. **CourseOverview** - `/course`
**Purpose**: Provide detailed course information, map, and video walkthrough.

**Key Elements**:
- Course walkthrough video (YouTube embed)
- Route information (distance, elevation, difficulty)
- Interactive map (click to show/hide, links to Google Maps)
- **Marshal Volunteer Section**: Direct link to marshal signup (`/volunteer/marshal`)
- Links back to welcome and volunteer overview

**UX Principle**: Help volunteers and participants understand the course layout and see where they'll be positioned. The video provides visual context that text alone cannot.

**Video Embed**: 
- YouTube video ID: `Xu6qPu2frNk`
- Embedded using iframe with responsive aspect ratio
- Provides course walkthrough and marshal positioning information

---

#### 3. **VolunteerOverview** - `/volunteer`
**Purpose**: Overview of all volunteer roles with click-through to detailed role pages.

**Key Elements**:
- **Hero Message**: "The point of the day is to cheer on our young athletes"
- **Three Main Roles** (clickable cards):
  1. **Course Marshals** → `/volunteer/marshal`
  2. **Pacers** → `/volunteer/pacer`
  3. **Finish Line Cheerers & Water Station** → `/volunteer/finish-cheerer`
- Gatorade information (encouraging volunteers to bring Gatorade for specific positions)
- Quick signup CTA
- Link to volunteer roster

**UX Principle**: Make it easy for volunteers to understand what roles are available and learn more about each role before signing up. The click-through design allows for detailed role descriptions without overwhelming the initial overview.

---

#### 4. **RouteOverview (Course Marshals)** - `/volunteer/marshal`
**Purpose**: Detailed information about the Course Marshal role, including all 5 positions.

**Key Elements**:
- What marshals do (responsibilities)
- **5 Marshal Positions**:
  - Marshal Position 1: Start/First Turn
  - Marshal Position 2: Mid-Course Checkpoint (needs Gatorade)
  - Marshal Position 3: Final Turn
  - Marshal Position 4: Water Station (needs Gatorade)
  - Marshal Position 5: Final Stretch
- Gatorade information (which positions need Gatorade)
- Sign up CTA
- Link to course map

**UX Principle**: Provide detailed information about each marshal position so volunteers can choose the best fit. Highlight which positions need Gatorade to encourage volunteers to bring supplies.

---

#### 5. **PacerOverview** - `/volunteer/pacer`
**Purpose**: Detailed information about the Pacer role, including different pace options.

**Key Elements**:
- What pacers do (responsibilities)
- **Three Pacer Types**:
  - Pacers – Fast (sub-7 min/mile)
  - Pacers – Medium (7-9 min/mile)
  - Pacers – Finish Crew (any pace, focus on encouragement)
- Sign up CTA

**UX Principle**: Help volunteers understand the different pacing options and choose the one that matches their running style and the support they want to provide.

---

#### 6. **FinishCheererOverview** - `/volunteer/finish-cheerer`
**Purpose**: Detailed information about Finish Line Cheerers and Water Station volunteers.

**Key Elements**:
- What finish line cheerers do (hold banner, celebrate finishes)
- Water station information (set up cups, keep runners hydrated)
- **Gatorade Option**: Encouragement to bring Gatorade for water stations
- Available roles (Finish Line Holder, Water Station Crew)
- Sign up CTA

**UX Principle**: Emphasize the celebration aspect while also explaining the practical needs (water, Gatorade). Make it clear that both roles are important and needed.

---

#### 7. **VolunteerSignup** - `/volunteer/signup`
**Purpose**: Form for volunteers to sign up for specific slots.

**Key Elements**:
- Name, Email, Role/Slot selection, Notes (optional)
- Individual slots displayed (e.g., "Course Marshal 1", "Course Marshal 2", etc.)
- Notes field for volunteers to mention if they're bringing Gatorade
- Success message after submission

**UX Principle**: Make signup as simple as possible. Show individual slots so volunteers know exactly what they're signing up for. Allow notes for Gatorade or other important information.

---

#### 8. **VolunteerRoster** - `/volunteer/roster`
**Purpose**: Public display of all volunteers who have signed up.

**Key Elements**:
- List of volunteers with name and role
- Email is NOT displayed publicly (privacy)
- Refresh button to reload data
- Link to signup form

**UX Principle**: Show transparency (who's volunteering) while respecting privacy (no email addresses). Make it easy for volunteers to see who else is helping.

---

## Frontend Components (`GoFast-Events` Repo)

### 1. `RaceOverview.tsx` (`/`)
- **Purpose**: Landing/welcome page with quick access to course and volunteer information
- **CTA**: "Volunteer Opportunities", "See Course", "Final Preps" (placeholder)
- **Data Source**: Hydrates event details from `src/config/bgr5kConfig.ts`
- **Title**: Sets document title to "BGR Discovery 5k"

### 2. `CourseOverview.tsx` (`/course`)
- **Purpose**: Detailed course information with map, video, and marshal signup link
- **Features**: YouTube video embed, interactive map, route details
- **Marshal Link**: Direct link to `/volunteer/marshal` for course marshal signup
- **Title**: Sets document title to "BGR Discovery 5k - Course Overview"

### 3. `VolunteerOverview.tsx` (`/volunteer`)
- **Purpose**: Overview of all volunteer roles with click-through to detailed pages
- **Message**: "The point of the day is to cheer on our young athletes"
- **Roles**: Course Marshals, Pacers, Finish Line Cheerers & Water Station
- **Gatorade Info**: Encourages volunteers to bring Gatorade for specific positions
- **Title**: Sets document title to "BGR Discovery 5k - Volunteer Opportunities"

### 4. `RouteOverview.tsx` (`/volunteer/marshal`)
- **Purpose**: Detailed information about Course Marshal role and all 5 positions
- **Features**: Marshal positions, Gatorade needs, responsibilities
- **Title**: Sets document title to "BGR Discovery 5k - Course Marshals"

### 5. `PacerOverview.tsx` (`/volunteer/pacer`)
- **Purpose**: Detailed information about Pacer role and pace options
- **Features**: Fast, Medium, and Finish Crew pace options
- **Title**: Sets document title to "BGR Discovery 5k - Pacers"

### 6. `FinishCheererOverview.tsx` (`/volunteer/finish-cheerer`)
- **Purpose**: Detailed information about Finish Line Cheerers and Water Station
- **Features**: Finish line holder role, water station crew, Gatorade option
- **Title**: Sets document title to "BGR Discovery 5k - Finish Line & Water Station"

### 7. `VolunteerSignup.tsx` (`/volunteer/signup`)
- **Purpose**: Form for volunteers to sign up for specific slots
- **Fields**: Name, Email, Role (dropdown with individual slots), Notes (optional)
- **Backend Interaction**: Submits data to `POST /api/event-volunteer` using the hardcoded `eventId` from `bgr5kConfig.ts`
- **Role Mapping**: Uses `UniversalEventMapperService` to send the correct role string to the backend
- **Title**: Sets document title to "BGR Discovery 5k - Sign Up to Volunteer"

### 8. `VolunteerRoster.tsx` (`/volunteer/roster`)
- **Purpose**: Displays a read-only list of signed-up volunteers
- **Data Display**: Shows volunteer name and role. Email is NOT displayed publicly
- **Backend Interaction**: Fetches data from `GET /api/event-volunteer?eventId=xxx` using the hardcoded `eventId`
- **Title**: Sets document title to "BGR Discovery 5k - Volunteer Roster"

---

## Configuration (`GoFast-Events` Repo)

### `src/config/bgr5kConfig.ts`
- **Purpose**: Centralized configuration for the specific "Boys Gotta Run – Discovery 5K" event
- **Contents**:
  - `eventId`: The unique ID of the event from the backend. This is crucial for all API interactions.
  - `eventName`, `eventDate`, `eventTime`, `location`, `address`, `stravaRouteUrl`, `distance`, `elevation`, `difficulty`
- **Usage**: Imported by all pages to provide event context

### `src/data/volunteerRoles.ts`
- **Purpose**: Defines volunteer roles with individual slots
- **Structure**:
  - `VolunteerRole`: Role definition with `slotCount` (e.g., Course Marshals has 5 slots)
  - `VolunteerSlot`: Individual slots generated from roles (e.g., "Course Marshal 1", "Course Marshal 2")
  - `generateVolunteerSlots()`: Function that creates individual slots from role definitions
- **Usage**: Used by signup form and volunteer overview to display available slots

---

## Services (`GoFast-Events` Repo)

### `src/services/UniversalEventMapperService.ts`
- **Purpose**: Provides utility functions to map between slot IDs and role names
- **Functions**:
  - `mapRoleIdToRoleName(slotId: string): string` - Maps slot ID to role name for backend
  - `mapRoleNameToRoleId(roleName: string): string` - Maps role name to slot ID (reverse)
  - `getSlotById(slotId: string): VolunteerSlot | null` - Gets slot by ID
  - `getSlotByName(slotName: string): VolunteerSlot | null` - Gets slot by name
  - `isValidRoleId(slotId: string): boolean` - Validates slot/role ID
  - `isValidRoleName(roleName: string): boolean` - Validates role/slot name

---

## Public Assets (`GoFast-Events` Repo)

### `public/` folder
- **Purpose**: Hosts static assets like images and favicons
- `BGR_logo.avif`: The favicon for the application

---

## UX Enhancements
- **Favicon**: Updated to `BGR_logo.avif`
- **Document Titles**: Each page has a specific, descriptive title
- **Race Overview Landing**: The root path `/` now lands on `RaceOverview.tsx` with clear action buttons
- **Course Overview**: Interactive map and YouTube video embed for course walkthrough
- **Volunteer Overview**: Click-through design for detailed role information
- **Individual Slots**: SignUpGenius-style individual slots for roles with multiple positions
- **Gatorade Support**: Encouragement for volunteers to bring Gatorade for specific positions

---

## Future Enhancements
- **Final Preps Page**: Race day checklist and preparation information
- **Dynamic Marshal Positions**: Load marshal positions from backend/config instead of hardcoded
- **Gatorade Tracking**: Track which volunteers are bringing Gatorade and which positions need it
- **Role-Specific Signup**: Pre-fill role in signup form when coming from role-specific overview page
- **Volunteer Communication**: Email notifications for volunteers after signup
- **Volunteer Management**: Admin interface for managing volunteers (already exists in main app)

---

## Backend Integration
- **Event ID**: `cmht9p0800001p21xn5tjp5nc` (hardcoded in `bgr5kConfig.ts`)
- **API Endpoints**:
  - `POST /api/event-volunteer` - Create volunteer signup
  - `GET /api/event-volunteer?eventId=xxx` - Get volunteer roster
- **Authentication**: No auth required for volunteer signup (public endpoint)
- **Data Model**: Volunteers stored with `eventId`, `name`, `email`, `role`, `notes`

---

## Video Integration
- **YouTube Video**: Course walkthrough video embedded in `CourseOverview.tsx`
- **Video ID**: `Xu6qPu2frNk`
- **Embed URL**: `https://www.youtube.com/embed/Xu6qPu2frNk`
- **Purpose**: Provides visual course walkthrough and marshal positioning information

---

## Gatorade Support
- **Positions Needing Gatorade**:
  - Marshal Position 2: Mid-Course Checkpoint
  - Marshal Position 4: Water Station
  - Water Station Crew (general)
- **UX**: Volunteers are encouraged to note in their signup if they're bringing Gatorade
- **Future**: Could track Gatorade needs and display which positions still need supplies
