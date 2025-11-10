import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, CheckCircle2, XCircle } from 'lucide-react';
import { activeVolunteerRoles, activeVolunteerSlots } from '../data/volunteerRoles';
import { buildApiUrl } from '../lib/api';
import { getBGR5KEventId } from '../config/bgr5kConfig';

type VolunteerEntry = {
  id: string;
  name: string;
  role: string;
};

const VolunteerOverview = () => {
  const [volunteers, setVolunteers] = useState<VolunteerEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = 'BGR Discovery 5k - Volunteer Opportunities';
  }, []);

  useEffect(() => {
    fetchVolunteers();
  }, []);

  const fetchVolunteers = async () => {
    setIsLoading(true);
    try {
      const eventId = getBGR5KEventId();
      if (!eventId) {
        console.error('Event ID not configured');
        return;
      }

      const response = await fetch(buildApiUrl(`/api/event-volunteer?eventId=${eventId}`));
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data) {
          setVolunteers(data.data);
        }
      }
    } catch (error) {
      console.error('Error fetching volunteers:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Group volunteers by role to show availability
  const getSlotAvailability = () => {
    const availability: Record<string, { filled: number; total: number; volunteers: VolunteerEntry[] }> = {};

    // Initialize all slots
    activeVolunteerSlots.forEach((slot) => {
      availability[slot.id] = {
        filled: 0,
        total: 1,
        volunteers: [],
      };
    });

    // Count filled slots
    volunteers.forEach((volunteer) => {
      // Find which slot this volunteer filled
      const slot = activeVolunteerSlots.find((s) => s.roleName === volunteer.role);
      if (slot && availability[slot.id]) {
        availability[slot.id].filled++;
        availability[slot.id].volunteers.push(volunteer);
      }
    });

    return availability;
  };

  // Group slots by role for display
  const getRolesWithSlots = () => {
    const rolesWithSlots = activeVolunteerRoles.map((role) => {
      const roleSlots = activeVolunteerSlots.filter((slot) => slot.roleId === role.id);
      return {
        role,
        slots: roleSlots,
      };
    });

    return rolesWithSlots;
  };

  const slotAvailability = getSlotAvailability();
  const rolesWithSlots = getRolesWithSlots();

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-white">
      <div className="mx-auto max-w-5xl px-6 py-12 sm:px-8 lg:px-10">
        <header className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-gray-100">
          <p className="text-xs uppercase tracking-[0.3em] text-orange-500">Volunteer Opportunities</p>
          <h1 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl">
            Help Make the Discovery 5K Special
          </h1>
          <p className="mt-4 max-w-2xl text-base text-gray-600">
            We need your help to make this final run memorable. Every role matters, and every volunteer makes a difference.
            Choose a role that fits your style and sign up below.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              to="/volunteer/signup"
              className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
            >
              <span>Sign Up to Volunteer</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/volunteer/roster"
              className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-orange-200 hover:text-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:ring-offset-2"
            >
              <Users className="h-4 w-4" />
              <span>View Roster</span>
            </Link>
          </div>
        </header>

        {/* Volunteer Roles with Individual Slots */}
        <section className="mt-8 rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-400">Available Roles</p>
              <h2 className="mt-2 text-2xl font-semibold text-gray-900">Where We Need You</h2>
              <p className="mt-3 max-w-2xl text-sm text-gray-600">
                Each role has specific slots available. Sign up for the slot that works best for you.
              </p>
            </div>
          </div>

          <div className="mt-8 space-y-8">
            {rolesWithSlots.map(({ role, slots }) => (
              <div key={role.id} className="rounded-2xl border border-gray-100 bg-gray-50/50 p-6">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{role.name}</h3>
                  <p className="mt-1 text-sm text-gray-600">{role.description}</p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {slots.map((slot) => {
                    const availability = slotAvailability[slot.id];
                    const isFilled = availability?.filled > 0;
                    const filledBy = availability?.volunteers[0];

                    return (
                      <div
                        key={slot.id}
                        className={`rounded-xl border-2 p-4 transition ${
                          isFilled
                            ? 'border-lime-200 bg-lime-50/50'
                            : 'border-orange-200 bg-white hover:border-orange-300 hover:shadow-sm'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">{slot.roleName}</p>
                            {isFilled && filledBy && (
                              <p className="mt-1 text-xs text-gray-600">
                                Filled by {filledBy.name}
                              </p>
                            )}
                          </div>
                          <div className="ml-3">
                            {isFilled ? (
                              <CheckCircle2 className="h-5 w-5 text-lime-600" />
                            ) : (
                              <XCircle className="h-5 w-5 text-orange-500" />
                            )}
                          </div>
                        </div>
                        <div className="mt-3">
                          {isFilled ? (
                            <span className="inline-flex items-center rounded-full bg-lime-100 px-2.5 py-1 text-xs font-semibold text-lime-700">
                              Filled
                            </span>
                          ) : (
                            <span className="inline-flex items-center rounded-full bg-orange-100 px-2.5 py-1 text-xs font-semibold text-orange-700">
                              Available
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-10 rounded-3xl border border-dashed border-orange-200 bg-orange-50/50 p-8 text-center shadow-sm">
          <h3 className="text-xl font-semibold text-gray-900">Ready to Help?</h3>
          <p className="mt-3 text-sm text-gray-600">
            Thank you for being part of the finish-line crew. Volunteers make this final run special.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              to="/volunteer/signup"
              className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
            >
              <span>Sign Up to Volunteer</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/volunteer/roster"
              className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-orange-200 hover:text-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:ring-offset-2"
            >
              <span>View Volunteer Roster</span>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default VolunteerOverview;
