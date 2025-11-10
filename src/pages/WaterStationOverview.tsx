import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Droplet, ArrowLeft, MapPin } from 'lucide-react';
import { buildApiUrl } from '../lib/api';
import { getBGR5KEventId } from '../config/bgr5kConfig';
import { getSlotsByCategory, getSlotMetadata } from '../config/boysonrun5kvolunteerconfig';
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
 * WaterStationOverview - SignUpGenius-style inline signup for Water Stations
 */
const WaterStationOverview = () => {
  const [volunteers, setVolunteers] = useState<VolunteerEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = 'BGR Discovery 5k - Water Stations';
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

  // Water station slot IDs from config (water.1, water.2)
  const waterSlotIds = getSlotsByCategory('water');
  
  // Build description with location and setup info
  const getWaterStationDescription = (metadata: ReturnType<typeof getSlotMetadata>): string => {
    if (!metadata) return '';
    const mileMarker = metadata.details?.mileMarkers;
    const setupNotes = metadata.details?.setupNotes;
    let desc = metadata.description;
    if (mileMarker) {
      desc = `${mileMarker} - ${desc}`;
    }
    if (setupNotes) {
      desc = `${desc} ${setupNotes}`;
    }
    return desc;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-white">
      <div className="mx-auto max-w-4xl px-6 py-8 sm:px-8 lg:px-10">
        {/* Header */}
        <header className="mb-6">
          <Link
            to="/volunteer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Volunteer Overview</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            💧 Water Stations
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            We need volunteers at <strong>2 hydration stations</strong> to keep our runners hydrated and energized.
          </p>
        </header>

        {/* What Water Station Volunteers Do */}
        <section className="mb-6 rounded-xl border border-blue-100 bg-blue-50/60 p-4">
          <h2 className="text-sm font-semibold text-gray-900 mb-2">What Water Station Volunteers Do</h2>
          <ul className="space-y-1.5 text-xs text-gray-700 mb-3">
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-0.5">•</span>
              <span>Set up water station with cups before runners arrive</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-0.5">•</span>
              <span>Fill cups with half Gatorade and half water</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-0.5">•</span>
              <span>Plan for 16 boys - have enough cups ready</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-0.5">•</span>
              <span>Hand out cups and provide encouragement as runners pass by</span>
            </li>
          </ul>
          <div className="mt-3 p-3 bg-white rounded-lg border border-blue-200">
            <p className="text-xs font-medium text-blue-900 mb-1">💡 Hydration Mix</p>
            <p className="text-xs text-blue-700">
              Fill cups with <strong>half Gatorade and half water</strong> to provide both hydration and energy. 
              Plan for 16 boys, so have plenty of cups ready!
            </p>
          </div>
        </section>

        {/* SignUpGenius-style Inline Signup Rows */}
        <section className="space-y-3">
          {waterSlotIds.map((slotId) => {
            // Get slot metadata from config
            const metadata = getSlotMetadata(slotId);
            if (!metadata) return null;

            // Find volunteer for this slot (match by backend role name)
            const volunteer = volunteers.find((v) => v.role === metadata.roleName);
            const description = getWaterStationDescription(metadata);

            return (
              <InlineSignupRow
                key={slotId}
                slotId={slotId}
                slotName={metadata.roleName}
                description={description}
                volunteer={volunteer}
                onSignupSuccess={fetchVolunteers}
              />
            );
          })}
        </section>
      </div>
    </div>
  );
};

export default WaterStationOverview;
