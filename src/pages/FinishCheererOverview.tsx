import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Trophy, ArrowLeft, CheckCircle2, Users } from 'lucide-react';
import { buildApiUrl } from '../lib/api';
import { getBGR5KEventId } from '../config/bgr5kConfig';
import { activeVolunteerSlots } from '../data/volunteerRoles';
import InlineSignupModal from '../components/InlineSignupModal';

type VolunteerEntry = {
  id: string;
  name: string;
  email: string;
  role: string;
  note?: string | null;
  createdAt: string;
};

type FinishLineHolder = {
  id: string;
  slotId: string;
  name: string;
  description: string;
  volunteer?: VolunteerEntry;
};

const FinishCheererOverview = () => {
  const [volunteers, setVolunteers] = useState<VolunteerEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [signupRoleId, setSignupRoleId] = useState('');
  const [signupRoleName, setSignupRoleName] = useState('');

  useEffect(() => {
    document.title = 'BGR Discovery 5k - Finish Line Holders';
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

  // Finish Line Holders - get slots from activeVolunteerSlots
  const finishLineHolders: FinishLineHolder[] = activeVolunteerSlots
    .filter((slot) => slot.roleId === 'finish-line-holders')
    .map((slot) => {
      // Find volunteer for this position
      const volunteer = volunteers.find((v) => v.role === slot.roleName);

      return {
        id: slot.id,
        slotId: slot.id,
        name: slot.roleName,
        description: 'Hold the finish line banner and cheer on every runner as they cross the finish line.',
        volunteer,
      };
    });

  const handleSignupClick = (holder: FinishLineHolder) => {
    setSignupRoleId(holder.slotId);
    setSignupRoleName(holder.name);
    setShowSignupModal(true);
  };

  const handleSignupSuccess = () => {
    fetchVolunteers();
  };

  return (
    <>
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
              <li className="flex items-start gap-2">
                <span className="text-lime-500 mt-0.5">•</span>
                <span>Help create lasting memories for our young athletes</span>
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

          {/* Finish Line Holder Positions - Compact List */}
          <section className="space-y-3">
            {finishLineHolders.map((holder, index) => (
              <div
                key={holder.id}
                className="rounded-xl border border-gray-200 bg-white p-4 hover:border-lime-200 hover:shadow-sm transition"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-2">
                      <div className="rounded-lg bg-lime-500 px-2.5 py-1.5 flex-shrink-0">
                        <Trophy className="h-3 w-3 text-white" />
                      </div>
                      <h3 className="text-sm font-semibold text-gray-900">{holder.name}</h3>
                      {holder.volunteer && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                          <CheckCircle2 className="h-3 w-3" />
                          <span>{holder.volunteer.name}</span>
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-600">{holder.description}</p>
                  </div>
                  <div className="flex-shrink-0">
                    {holder.volunteer ? (
                      <span className="rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600">
                        Filled
                      </span>
                    ) : (
                      <button
                        onClick={() => handleSignupClick(holder)}
                        className="rounded-lg bg-lime-500 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-lime-600"
                      >
                        Sign Up
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </section>

          {/* Additional Info */}
          <section className="mt-6 rounded-xl border border-gray-200 bg-white p-4">
            <p className="text-xs text-gray-600">
              <strong>Note:</strong> Finish line holders should be at the finish line area by the time the first runners are expected to finish. 
              If you're marshalling and finish early, you're welcome to join the finish line crew!
            </p>
          </section>
        </div>
      </div>

      {/* Signup Modal */}
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

export default FinishCheererOverview;
