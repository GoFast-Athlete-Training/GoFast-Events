import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Navigation, ArrowLeft, Route } from 'lucide-react';
import { buildApiUrl } from '../lib/api';
import { getBGR5KEventId } from '../config/bgr5kConfig';
import { getSlotsByCategory, getSlotMetadata, ROUTE_POINTS } from '../config/boysonrun5kvolunteerconfig';
import CourseTurnsModal from '../components/CourseTurnsModal';
import InlineSignupRow from '../components/InlineSignupRow';

type VolunteerEntry = {
  id: string;
  name: string;
  // email is NOT included in public page-hydrate endpoint for privacy
  role: string;
  note?: string | null;
  createdAt: string;
};

/**
 * RouteOverview - SignUpGenius-style inline signup for Course Marshals
 */
const RouteOverview = () => {
  const [showTurnsModal, setShowTurnsModal] = useState(false);
  const [volunteers, setVolunteers] = useState<VolunteerEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = 'BGR Discovery 5k - Course Marshals';
    fetchVolunteers();
  }, []);

  const fetchVolunteers = async () => {
    setIsLoading(true);
    try {
      const eventId = getBGR5KEventId();
      if (!eventId) return;

      // Use page-hydrate endpoint (public - no emails for privacy)
      const response = await fetch(buildApiUrl(`/api/event-volunteer/page-hydrate?eventId=${eventId}`));
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

  // Marshal slot IDs from config (marshal.1 through marshal.7)
  const marshalSlotIds = getSlotsByCategory('marshal');

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

          {/* SignUpGenius-style Inline Signup Rows */}
          <section className="space-y-3">
            {marshalSlotIds.map((slotId) => {
              // Get slot metadata from config
              const metadata = getSlotMetadata(slotId);
              if (!metadata) return null;

              // Find volunteer for this slot (match by backend role name)
              const volunteer = volunteers.find((v) => v.role === metadata.roleName);

              // Build description with route points and mile markers
              let displayDescription = metadata.description;
              if (metadata.details?.routePoints) {
                displayDescription = `${metadata.details.routePoints} • ${displayDescription}`;
              }
              if (metadata.details?.mileMarkers) {
                displayDescription = `${displayDescription} (${metadata.details.mileMarkers})`;
              }

              return (
                <InlineSignupRow
                  key={slotId}
                  slotId={slotId}
                  slotName={metadata.roleName}
                  description={displayDescription}
                  volunteer={volunteer}
                  onSignupSuccess={fetchVolunteers}
                />
              );
            })}
          </section>

          {/* Course Map Link */}
          <section className="mt-6 text-center">
            <Link
              to="/course"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-orange-600 transition"
            >
              <span>View course map and route details</span>
            </Link>
          </section>
        </div>
      </div>

      {/* Course Turns Modal */}
      <CourseTurnsModal
        isOpen={showTurnsModal}
        onClose={() => setShowTurnsModal(false)}
        routePoints={ROUTE_POINTS}
      />
    </>
  );
};

export default RouteOverview;
