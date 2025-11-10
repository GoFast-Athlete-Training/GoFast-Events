import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Trophy, ArrowLeft } from 'lucide-react';
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
 * FinishCheererOverview - SignUpGenius-style inline signup for Finish Line Holders
 */
const FinishCheererOverview = () => {
  const [volunteers, setVolunteers] = useState<VolunteerEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = 'BGR Discovery 5k - Finish Line Holders';
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

  // Finish line holder slot IDs from config (finish.1, finish.2)
  const finishSlotIds = getSlotsByCategory('finish');

  return (
    <div className="min-h-screen bg-gradient-to-b from-lime-50 via-white to-white">
      <div className="mx-auto max-w-4xl px-6 py-8 sm:px-8 lg:px-10">
        {/* Header */}
        <header className="mb-6">
          <Link
            to="/volunteer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-lime-600 hover:text-lime-700 transition mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Volunteer Overview</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            🎉 Finish Line Holders
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            We need <strong>2 people</strong> to hold the finish line banner and cheer on every runner as they cross the finish line.
          </p>
        </header>

        {/* What Finish Line Holders Do */}
        <section className="mb-6 rounded-xl border border-lime-100 bg-lime-50/60 p-4">
          <h2 className="text-sm font-semibold text-gray-900 mb-2">What Finish Line Holders Do</h2>
          <ul className="space-y-1.5 text-xs text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-lime-500 mt-0.5">•</span>
              <span>Hold the finish line banner to create a memorable finish experience</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-lime-500 mt-0.5">•</span>
              <span>Cheer loudly and enthusiastically for every runner as they finish</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-lime-500 mt-0.5">•</span>
              <span>Create energy and excitement for runners approaching the finish</span>
            </li>
          </ul>
        </section>

        {/* Marshal Note */}
        <section className="mb-6 rounded-xl border border-blue-100 bg-blue-50/60 p-4">
          <p className="text-xs text-blue-800">
            <strong>💡 Finished marshalling early?</strong> If you're done with your marshal position and the pack has cleared, 
            you can come help hold the finish line banner! Just let us know.
          </p>
        </section>

        {/* SignUpGenius-style Inline Signup Rows */}
        <section className="space-y-3">
          {finishSlotIds.map((slotId) => {
            // Get slot metadata from config
            const metadata = getSlotMetadata(slotId);
            if (!metadata) return null;

            // Find volunteer for this slot (match by backend role name)
            const volunteer = volunteers.find((v) => v.role === metadata.roleName);

            return (
              <InlineSignupRow
                key={slotId}
                slotId={slotId}
                slotName={metadata.roleName}
                description={metadata.description}
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

export default FinishCheererOverview;
