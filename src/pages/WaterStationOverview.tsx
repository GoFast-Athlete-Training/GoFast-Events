import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Droplet, ArrowLeft, CheckCircle2, MapPin } from 'lucide-react';
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

type WaterStation = {
  id: string;
  slotId: string;
  name: string;
  location: string;
  mile: string;
  description: string;
  volunteer?: VolunteerEntry;
};

const WaterStationOverview = () => {
  const [volunteers, setVolunteers] = useState<VolunteerEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [signupRoleId, setSignupRoleId] = useState('');
  const [signupRoleName, setSignupRoleName] = useState('');

  useEffect(() => {
    document.title = 'BGR Discovery 5k - Water Stations';
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

  // Water Stations - get slots from activeVolunteerSlots
  const waterStations: WaterStation[] = activeVolunteerSlots
    .filter((slot) => slot.roleId === 'water-station-crew')
    .map((slot) => {
      // Find volunteer for this station
      const volunteer = volunteers.find((v) => v.role === slot.roleName);

      // Extract location and mile from slot name
      let location = '';
      let mile = '';
      if (slot.roleName.includes('Massachusetts → Rhode Island')) {
        location = 'Massachusetts → Rhode Island';
        mile = 'approx. mile 1.1';
      } else if (slot.roleName.includes('Nottingham → 35th')) {
        location = 'Nottingham → 35th';
        mile = 'approx. mile 2.3';
      }

      return {
        id: slot.id,
        slotId: slot.id,
        name: slot.roleName,
        location,
        mile,
        description: 'Set up water station with cups, keep everyone hydrated. Plan for 16 boys.',
        volunteer,
      };
    });

  const handleSignupClick = (station: WaterStation) => {
    setSignupRoleId(station.slotId);
    setSignupRoleName(station.name);
    setShowSignupModal(true);
  };

  const handleSignupSuccess = () => {
    fetchVolunteers();
  };

  return (
    <>
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
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-0.5">•</span>
                <span>Keep the station organized and clean up after</span>
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

          {/* Water Station Positions - Compact List */}
          <section className="space-y-3">
            {waterStations.map((station, index) => (
              <div
                key={station.id}
                className="rounded-xl border border-gray-200 bg-white p-4 hover:border-blue-200 hover:shadow-sm transition"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-2">
                      <div className="rounded-lg bg-blue-500 px-2.5 py-1.5 flex-shrink-0">
                        <Droplet className="h-3 w-3 text-white" />
                      </div>
                      <h3 className="text-sm font-semibold text-gray-900">{station.name}</h3>
                      {station.volunteer && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                          <CheckCircle2 className="h-3 w-3" />
                          <span>{station.volunteer.name}</span>
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                      <MapPin className="h-3 w-3" />
                      <span>{station.location}</span>
                      <span>•</span>
                      <span>{station.mile}</span>
                    </div>
                    <p className="text-xs text-gray-600">{station.description}</p>
                  </div>
                  <div className="flex-shrink-0">
                    {station.volunteer ? (
                      <span className="rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600">
                        Filled
                      </span>
                    ) : (
                      <button
                        onClick={() => handleSignupClick(station)}
                        className="rounded-lg bg-blue-500 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-blue-600"
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
              <strong>Setup Tips:</strong> Arrive early to set up your station. Have cups pre-filled with the 
              Gatorade/water mix (half and half). Plan for 16 boys, so prepare plenty of cups. 
              Encourage runners as they pass by, and be ready to hand out cups quickly!
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

export default WaterStationOverview;

