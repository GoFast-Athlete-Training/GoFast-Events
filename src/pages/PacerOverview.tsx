import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Zap, ArrowLeft } from 'lucide-react';
import { buildApiUrl } from '../lib/api';
import { getBGR5KEventId } from '../config/bgr5kConfig';
import { getSlotsByCategory, getSlotMetadata } from '../config/boysonrun5kvolunteerconfig';
import InlineSignupRow from '../components/InlineSignupRow';

type VolunteerEntry = {
  id: string;
  name: string;
  email: string;
  role: string;
  note?: string | null;
  createdAt: string;
};

/**
 * PacerOverview - SignUpGenius-style inline signup for Pacers
 */
const PacerOverview = () => {
  const [volunteers, setVolunteers] = useState<VolunteerEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = 'BGR Discovery 5k - Pacers';
    fetchVolunteers();
  }, []);

  const fetchVolunteers = async () => {
    setIsLoading(true);
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

  // Pacer slot IDs from config (pacer.fast, pacer.medium, pacer.slow)
  const pacerSlotIds = getSlotsByCategory('pacer');
  
  // Build description with pace info
  const getPacerDescription = (metadata: ReturnType<typeof getSlotMetadata>): string => {
    if (!metadata) return '';
    const paceInfo = metadata.details?.pace;
    if (paceInfo) {
      return `${paceInfo} - ${metadata.description}`;
    }
    return metadata.description;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-white">
      <div className="mx-auto max-w-4xl px-6 py-8 sm:px-8 lg:px-10">
        {/* Header */}
        <header className="mb-6">
          <Link
            to="/volunteer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-purple-600 hover:text-purple-700 transition mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Volunteer Overview</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            ⚡ Pacers
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Pacers help our 4th and 5th grade athletes maintain their pace, stay motivated, and finish strong.
          </p>
        </header>

        {/* What Pacers Do */}
        <section className="mb-6 rounded-xl border border-purple-100 bg-purple-50/60 p-4">
          <h2 className="text-sm font-semibold text-gray-900 mb-2">What Pacers Do</h2>
          <ul className="space-y-1.5 text-xs text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-purple-500 mt-0.5">•</span>
              <span>Set an appropriate pace for 4th and 5th graders</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-500 mt-0.5">•</span>
              <span>Provide motivation and encouragement throughout the course</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-500 mt-0.5">•</span>
              <span>Help runners finish strong with lots of support</span>
            </li>
          </ul>
        </section>

        {/* SignUpGenius-style Inline Signup Rows */}
        <section className="space-y-3">
          {pacerSlotIds.map((slotId) => {
            // Get slot metadata from config
            const metadata = getSlotMetadata(slotId);
            if (!metadata) return null;

            // Find volunteer for this slot (match by backend role name)
            const volunteer = volunteers.find((v) => v.role === metadata.roleName);
            const description = getPacerDescription(metadata);

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

export default PacerOverview;
