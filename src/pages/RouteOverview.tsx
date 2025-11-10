import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Navigation, ArrowRight, ArrowLeft, Route, ChevronRight, Users, CheckCircle2 } from 'lucide-react';
import { buildApiUrl } from '../lib/api';
import { getBGR5KEventId } from '../config/bgr5kConfig';
import { activeVolunteerSlots } from '../data/volunteerRoles';
import CourseTurnsModal from '../components/CourseTurnsModal';
import MarshalDetailsModal from '../components/MarshalDetailsModal';
import InlineSignupModal from '../components/InlineSignupModal';

type VolunteerEntry = {
  id: string;
  name: string;
  email: string;
  role: string;
  note?: string | null;
  createdAt: string;
};

type MarshalPosition = {
  id: string;
  slotId: string;
  name: string;
  description: string;
  repositioning: string;
  routePoints: string;
  volunteer?: VolunteerEntry;
};

/**
 * RouteOverview - Compact list view for Course Marshal signup
 */
const RouteOverview = () => {
  const [showTurnsModal, setShowTurnsModal] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<MarshalPosition | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [signupRoleId, setSignupRoleId] = useState('');
  const [signupRoleName, setSignupRoleName] = useState('');
  const [volunteers, setVolunteers] = useState<VolunteerEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = 'BGR Discovery 5k - Course Marshals';
    fetchVolunteers();
  }, []);

  const fetchVolunteers = async () => {
    try {
      const eventId = getBGR5KEventId();
      if (!eventId) return;

      const response = await fetch(buildApiUrl(`/api/event-volunteer?eventId=${eventId}`));
      if (!response.ok) return;

      const payload = (await response.json()) as { success?: boolean; data?: VolunteerEntry[] };
      if (payload.success && payload.data) {
        setVolunteers(payload.data);
      }
    } catch (error) {
      console.error('Failed to fetch volunteers:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Marshal positions data
  const marshalPositions: MarshalPosition[] = [
    {
      id: 'volunteer-1',
      slotId: 'course-marshal-1',
      name: 'Starter + Finisher Crew',
      description: 'Handle the first turn, then reposition to guide runners to the finish.',
      repositioning: 'After pack clears first turn (0.22 mi), return to Discovery for final straight (2.7–3.2 mi).',
      routePoints: 'Routes 1 + 13',
    },
    {
      id: 'volunteer-2',
      slotId: 'course-marshal-2',
      name: 'Valleywood + John Marshall Crew',
      description: 'Cover early Valleywood stretch, then reposition to final turn.',
      repositioning: 'Start on Valleywood (0.3–0.7 mi), loop back via Valleywood to cover John Marshall right (2.5 mi).',
      routePoints: 'Routes 2 + 12',
    },
    {
      id: 'volunteer-3',
      slotId: 'course-marshal-3',
      name: 'Vermont + 35th Street North Crew',
      description: 'Guide at Vermont turn, then reposition to 35th Street turn.',
      repositioning: 'Park at Vermont (0.75 mi), re-post at 35th left (2.4 mi) when clear.',
      routePoints: 'Routes 3 + 11',
    },
    {
      id: 'volunteer-4',
      slotId: 'course-marshal-4',
      name: 'Massachusetts + Nottingham / 35th Crew',
      description: 'Cover Massachusetts turn (watch for traffic), then reposition to Nottingham/35th.',
      repositioning: 'Cover Mass left (0.82 mi), reposition via Rockingham to Nottingham/35th (2.3 mi).',
      routePoints: 'Routes 4 + 10',
    },
    {
      id: 'volunteer-5',
      slotId: 'course-marshal-5',
      name: 'Massachusetts / Rhode Island + Rockingham Crew',
      description: 'Station at Rhode Island turn, then reposition to Rockingham interchange.',
      repositioning: 'Station at Rhode Island right (1.09 mi), reposition via Rockingham to Nottingham interchange (2.1 mi).',
      routePoints: 'Routes 5 + 9',
    },
    {
      id: 'volunteer-6',
      slotId: 'course-marshal-6',
      name: 'Virginia Avenue Entry Crew',
      description: 'Cover Virginia Avenue entry and stay in place along early Virginia segment.',
      repositioning: 'Stays in place at Rhode Island to Virginia left (≈1.17 mi) along early Virginia segment.',
      routePoints: 'Routes 6 + 7',
    },
    {
      id: 'volunteer-7',
      slotId: 'course-marshal-7',
      name: 'Virginia / Nottingham Crew',
      description: 'Single post at right turn onto Nottingham, marking final neighborhood stretch.',
      repositioning: 'Single post at Virginia to Nottingham right turn (≈2.0 mi).',
      routePoints: 'Route 8',
    },
  ].map((pos) => {
    // Find volunteer for this position
    const slot = activeVolunteerSlots.find((s) => s.id === pos.slotId);
    const volunteer = slot
      ? volunteers.find((v) => v.role === slot.roleName)
      : undefined;

    return {
      ...pos,
      volunteer,
    };
  });

  // Route points for modal
  const routePoints = [
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

  const handleDetailsClick = (position: MarshalPosition) => {
    setSelectedPosition(position);
    setShowDetailsModal(true);
  };

  const handleSignupClick = (position: MarshalPosition) => {
    setSignupRoleId(position.slotId);
    setSignupRoleName(position.name);
    setShowSignupModal(true);
  };

  const handleSignupSuccess = () => {
    fetchVolunteers();
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-white">
        <div className="mx-auto max-w-4xl px-6 py-8 sm:px-8 lg:px-10">
          {/* Header */}
          <header className="mb-6">
            <Link
              to="/volunteer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-orange-600 hover:text-orange-700 transition mb-4"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Volunteer Overview</span>
            </Link>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                  🚦 Course Marshals
                </h1>
                <p className="mt-2 text-sm text-gray-600">
                  <strong>Important role!</strong> We need 7 volunteer groups to cover the course.
                </p>
              </div>
              <button
                onClick={() => setShowTurnsModal(true)}
                className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-700 shadow-sm transition hover:border-orange-200 hover:text-orange-600"
              >
                <Route className="h-3 w-3" />
                <span>View Turns</span>
              </button>
            </div>
          </header>

          {/* Quick Info */}
          <div className="mb-6 rounded-xl border border-blue-100 bg-blue-50/60 p-3">
            <p className="text-xs text-blue-800">
              <strong>Most positions involve repositioning:</strong> Start at an early position, then move to a later position once the pack clears.
            </p>
          </div>

          {/* Compact List */}
          <section className="space-y-2">
            {marshalPositions.map((position, index) => (
              <div
                key={position.id}
                className="rounded-xl border border-gray-200 bg-white p-4 hover:border-orange-200 hover:shadow-sm transition"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="rounded-lg bg-orange-500 px-2.5 py-1.5 flex-shrink-0">
                      <span className="text-white font-bold text-sm">{index + 1}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-sm font-semibold text-gray-900">{position.name}</h3>
                        {position.volunteer && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                            <CheckCircle2 className="h-3 w-3" />
                            <span>{position.volunteer.name}</span>
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">{position.routePoints}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => handleDetailsClick(position)}
                      className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 transition hover:border-orange-200 hover:text-orange-600"
                    >
                      Details
                    </button>
                    {position.volunteer ? (
                      <span className="rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600">
                        Filled
                      </span>
                    ) : (
                      <button
                        onClick={() => handleSignupClick(position)}
                        className="rounded-lg bg-orange-500 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-orange-600"
                      >
                        Sign Up
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </section>

          {/* Course Map Link */}
          <section className="mt-6 text-center">
            <Link
              to="/course"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-orange-600 transition"
            >
              <span>View course map and route details</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </section>
        </div>
      </div>

      {/* Modals */}
      <CourseTurnsModal
        isOpen={showTurnsModal}
        onClose={() => setShowTurnsModal(false)}
        routePoints={routePoints}
      />
      <MarshalDetailsModal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        position={selectedPosition}
      />
      <InlineSignupModal
        isOpen={showSignupModal}
        onClose={() => setShowSignupModal(false)}
        onSuccess={handleSignupSuccess}
        roleId={signupRoleId}
        roleName={signupRoleName}
      />
    </>
  );
};

export default RouteOverview;
