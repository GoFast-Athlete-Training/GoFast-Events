import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Loader2, RefreshCcw, Users } from 'lucide-react';
import { activeVolunteerSlots } from '../data/volunteerRoles';
import { buildApiUrl } from '../lib/api';
import { getBGR5KEventId } from '../config/bgr5kConfig';

type VolunteerEntry = {
  id: string;
  name: string;
  // email is NOT included in public page-hydrate endpoint for privacy
  role: string;
  note?: string | null;
  createdAt: string;
};

const formatTimestamp = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return '—';
  }
  return date.toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
};

// Create a map from backend role names to display names
const roleLabelMap = activeVolunteerSlots.reduce<Record<string, string>>((acc, slot) => {
  acc[slot.roleName] = slot.roleName; // Backend stores slot.roleName, so we use it directly
  return acc;
}, {});

const VolunteerRoster = () => {
  useEffect(() => {
    document.title = 'BGR Discovery 5k - Volunteer Roster';
  }, []);

  const [volunteers, setVolunteers] = useState<VolunteerEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchRoster = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      // Get eventId from BGR5K config
      const eventId = getBGR5KEventId();
      if (!eventId) {
        throw new Error('Event ID not configured. Please set eventId in bgr5kConfig.js');
      }

      // Use page-hydrate endpoint (public - no emails for privacy)
      const response = await fetch(buildApiUrl(`/api/event-volunteer/page-hydrate?eventId=${eventId}`));
      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        const message =
          typeof payload?.error === 'string'
            ? payload.error
            : payload?.message || 'Unable to load volunteer roster right now.';
        throw new Error(message);
      }

      const payload = (await response.json()) as { success?: boolean; data?: VolunteerEntry[] };
      if (payload.success && payload.data) {
        setVolunteers(payload.data);
      } else {
        setVolunteers([]);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to load volunteer roster right now.';
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRoster();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const rosterSummary = useMemo(() => {
    if (volunteers.length === 0) {
      return 'No volunteers yet — share the signup link!';
    }
    return `${volunteers.length} volunteer${volunteers.length === 1 ? '' : 's'} signed up`;
  }, [volunteers]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white">
      <div className="mx-auto max-w-5xl px-6 py-12 sm:px-8 lg:px-10">
        <div className="flex items-center gap-3 text-sm text-orange-600">
          <ArrowLeft className="h-4 w-4" />
          <Link to="/volunteer" className="font-semibold transition hover:text-orange-700">
            Back to overview
          </Link>
        </div>

        <div className="mt-6 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-gray-100">
          <div className="flex flex-col gap-6 md:flex-row md:items-baseline md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-orange-500">Volunteer Roster</p>
              <h1 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl">
                Boys Gotta Run – Discovery 5K Helpers
              </h1>
              <p className="mt-3 text-sm text-gray-600">{rosterSummary}</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={fetchRoster}
                disabled={isLoading}
                className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wide text-gray-600 transition hover:border-orange-200 hover:text-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-200 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <RefreshCcw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>
              <Link
                to="/volunteer/signup"
                className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white shadow-lg transition hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
              >
                <Users className="h-4 w-4" />
                <span>Share Signup</span>
              </Link>
            </div>
          </div>

          <div className="mt-6 overflow-hidden rounded-2xl border border-gray-100">
            {errorMessage ? (
              <div className="p-6 text-sm font-medium text-red-600">{errorMessage}</div>
            ) : (
              <table className="min-w-full divide-y divide-gray-100 text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-left font-semibold text-gray-600">
                      Name
                    </th>
                    <th scope="col" className="px-4 py-3 text-left font-semibold text-gray-600">
                      Role
                    </th>
                    <th scope="col" className="hidden px-4 py-3 text-left font-semibold text-gray-600 lg:table-cell">
                      Notes
                    </th>
                    <th scope="col" className="hidden px-4 py-3 text-left font-semibold text-gray-600 lg:table-cell">
                      Submitted
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                  {isLoading ? (
                    <tr>
                      <td colSpan={4} className="px-4 py-10 text-center text-sm text-gray-500">
                        <span className="inline-flex items-center gap-2 text-gray-500">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Loading roster…
                        </span>
                      </td>
                    </tr>
                  ) : volunteers.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-4 py-10 text-center text-sm text-gray-500">
                        No volunteers yet. Share the signup link to fill the roles.
                      </td>
                    </tr>
                  ) : (
                    volunteers.map((volunteer) => (
                      <tr key={volunteer.id} className="transition hover:bg-orange-50/40">
                        <td className="px-4 py-4 font-medium text-gray-900">{volunteer.name}</td>
                        <td className="px-4 py-4 text-gray-700">
                                {volunteer.role}
                        </td>
                        <td className="hidden px-4 py-4 text-gray-500 lg:table-cell">
                          {volunteer.note ? volunteer.note : <span className="text-gray-400">—</span>}
                        </td>
                        <td className="hidden px-4 py-4 text-gray-500 lg:table-cell">
                          {formatTimestamp(volunteer.createdAt)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerRoster;

