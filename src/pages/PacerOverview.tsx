import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Zap, ArrowRight, Users, ArrowLeft, CheckCircle2 } from 'lucide-react';
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

type PacerType = {
  id: string;
  slotId: string;
  name: string;
  description: string;
  pace: string;
  volunteer?: VolunteerEntry;
};

const PacerOverview = () => {
  const [volunteers, setVolunteers] = useState<VolunteerEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [signupRoleId, setSignupRoleId] = useState('');
  const [signupRoleName, setSignupRoleName] = useState('');

  useEffect(() => {
    document.title = 'BGR Discovery 5k - Pacers';
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

  const pacerTypes: PacerType[] = [
    {
      id: 'pacers-fast',
      slotId: 'pacers-fast',
      name: 'Pacers – Fast',
      description: 'Lead the front group and keep the energy high from the first stride. Help fast runners maintain their pace.',
      pace: '8-9 min/mile (they will get tired)',
    },
    {
      id: 'pacers-medium',
      slotId: 'pacers-medium',
      name: 'Pacers – Medium',
      description: 'Support steady runners and help them hold a comfortable pace. Perfect for runners aiming for a consistent effort.',
      pace: '9-10 min/mile',
    },
    {
      id: 'pacers-finish',
      slotId: 'pacers-finish',
      name: 'Pacers – Finish Crew',
      description: 'Stay positive with runners who are focused on finishing strong. Provide encouragement and support for all paces.',
      pace: '10+ min/mile with lots of stops',
    },
  ].map((pacer) => {
    // Find volunteer for this pacer type
    const slot = activeVolunteerSlots.find((s) => s.id === pacer.slotId);
    const volunteer = slot
      ? volunteers.find((v) => v.role === slot.roleName)
      : undefined;

    return {
      ...pacer,
      volunteer,
    };
  });

  const handleSignupClick = (pacer: PacerType) => {
    setSignupRoleId(pacer.slotId);
    setSignupRoleName(pacer.name);
    setShowSignupModal(true);
  };

  const handleSignupSuccess = () => {
    fetchVolunteers();
  };

  return (
    <>
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

          {/* Pacer Types - Compact List */}
          <section className="space-y-3">
            {pacerTypes.map((pacer) => (
              <div
                key={pacer.id}
                className="rounded-xl border border-gray-200 bg-white p-4 hover:border-purple-200 hover:shadow-sm transition"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-2">
                      <Zap className="h-4 w-4 text-purple-500 flex-shrink-0" />
                      <h3 className="text-sm font-semibold text-gray-900">{pacer.name}</h3>
                      <span className="text-xs font-medium text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
                        {pacer.pace}
                      </span>
                      {pacer.volunteer && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                          <CheckCircle2 className="h-3 w-3" />
                          <span>{pacer.volunteer.name}</span>
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-600">{pacer.description}</p>
                  </div>
                  <div className="flex-shrink-0">
                    {pacer.volunteer ? (
                      <span className="rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600">
                        Filled
                      </span>
                    ) : (
                      <button
                        onClick={() => handleSignupClick(pacer)}
                        className="rounded-lg bg-purple-500 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-purple-600"
                      >
                        Sign Up
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
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

export default PacerOverview;
