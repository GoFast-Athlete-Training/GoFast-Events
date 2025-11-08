import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { CheckCircle2, Loader2, UserRoundPlus, Users, X } from 'lucide-react';

type VolunteerRoleOption = {
  value: string;
  label: string;
};

type VolunteerRecord = {
  id: string;
  eventSlug: string;
  name: string;
  email: string;
  role: string;
  notes?: string | null;
  createdAt: string;
};

export interface EventVolunteerModalProps {
  eventSlug: string;
  eventName: string;
  adminView?: boolean;
  apiBaseUrl?: string;
}

const VOLUNTEER_ROLES: VolunteerRoleOption[] = [
  { value: 'water-station', label: 'Water Station' },
  { value: 'course-marshal', label: 'Course Marshal' },
  { value: 'finish-line', label: 'Finish Line' },
  { value: 'setup-cleanup', label: 'Setup / Cleanup' },
];

const DEFAULT_API_BASE = 'https://gofastbackendv2-fall2025.onrender.com';

const EventVolunteerModal = ({
  eventSlug,
  eventName,
  adminView = false,
  apiBaseUrl,
}: EventVolunteerModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<string>(VOLUNTEER_ROLES[0]?.value ?? '');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const confirmationTimerRef = useRef<number | null>(null);

  const [volunteerList, setVolunteerList] = useState<VolunteerRecord[]>([]);
  const [loadingList, setLoadingList] = useState(false);
  const [listError, setListError] = useState<string | null>(null);

  const baseUrl = useMemo(() => {
    const envUrl = import.meta.env.VITE_API_BASE_URL as string | undefined;
    return (apiBaseUrl ?? envUrl ?? DEFAULT_API_BASE).replace(/\/$/, '');
  }, [apiBaseUrl]);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const resetForm = useCallback(() => {
    setName('');
    setEmail('');
    setRole(VOLUNTEER_ROLES[0]?.value ?? '');
    setNotes('');
    setSubmitError(null);
  }, []);

  const showSuccessToast = useCallback(() => {
    setShowConfirmation(true);
    if (confirmationTimerRef.current) {
      window.clearTimeout(confirmationTimerRef.current);
    }
    confirmationTimerRef.current = window.setTimeout(() => {
      setShowConfirmation(false);
    }, 4000);
  }, []);

  const fetchVolunteers = useCallback(async () => {
    setLoadingList(true);
    setListError(null);
    try {
      const response = await fetch(`${baseUrl}/api/event-volunteer?eventSlug=${encodeURIComponent(eventSlug)}`);
      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        const errorMessage =
          typeof payload?.error === 'string' ? payload.error : 'Unable to load volunteer list.';
        throw new Error(errorMessage);
      }

      const payload = (await response.json()) as { data?: VolunteerRecord[] };
      setVolunteerList(payload?.data ?? []);
    } catch (error) {
      console.error('EventVolunteerModal list error', error);
      setListError(error instanceof Error ? error.message : 'Unable to load volunteer list.');
    } finally {
      setLoadingList(false);
    }
  }, [baseUrl, eventSlug]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim() || !email.trim() || !role.trim()) {
      setSubmitError('Please provide your name, email, and volunteer role.');
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch(`${baseUrl}/api/event-volunteer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventSlug,
          name: name.trim(),
          email: email.trim(),
          role,
          notes: notes.trim() ? notes.trim() : undefined,
        }),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        const errorMessage =
          typeof payload?.error === 'string' ? payload.error : 'Unable to submit your volunteer signup. Please try again.';
        throw new Error(errorMessage);
      }

      resetForm();
      closeModal();
      showSuccessToast();

      if (adminView) {
        await fetchVolunteers();
      }
    } catch (error) {
      console.error('EventVolunteerModal submission error', error);
      setSubmitError(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (!adminView) return;
    fetchVolunteers();
  }, [adminView, fetchVolunteers]);

  useEffect(() => {
    return () => {
      if (confirmationTimerRef.current) {
        window.clearTimeout(confirmationTimerRef.current);
      }
    };
  }, []);

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
      >
        <UserRoundPlus className="h-4 w-4" />
        <span>Volunteer Now</span>
      </button>

      {showConfirmation && (
        <div className="mt-4 flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700 shadow-sm">
          <CheckCircle2 className="h-4 w-4" />
          <span>You’re signed up to volunteer!</span>
        </div>
      )}

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-8">
          <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-gray-100 px-6 py-4">
              <div>
                <p className="text-xs uppercase tracking-wide text-orange-500">Volunteer Signup</p>
                <h2 className="mt-1 text-xl font-semibold text-gray-900">{eventName}</h2>
                <p className="mt-1 text-sm text-gray-600">
                  Tell us how you’d like to help. We’ll follow up with details as race day approaches.
                </p>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="rounded-full p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form className="space-y-4 px-6 py-6" onSubmit={handleSubmit}>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col">
                  <label htmlFor="volunteer-name" className="text-sm font-semibold text-gray-800">
                    Name<span className="text-orange-500">*</span>
                  </label>
                  <input
                    id="volunteer-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full name"
                    className="mt-1 rounded-lg border border-gray-200 px-3 py-2 text-sm shadow-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-200"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="volunteer-email" className="text-sm font-semibold text-gray-800">
                    Email<span className="text-orange-500">*</span>
                  </label>
                  <input
                    id="volunteer-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="mt-1 rounded-lg border border-gray-200 px-3 py-2 text-sm shadow-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-200"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label htmlFor="volunteer-role" className="text-sm font-semibold text-gray-800">
                  Volunteer Role<span className="text-orange-500">*</span>
                </label>
                <select
                  id="volunteer-role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="mt-1 rounded-lg border border-gray-200 px-3 py-2 text-sm shadow-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-200"
                >
                  {VOLUNTEER_ROLES.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <label htmlFor="volunteer-notes" className="text-sm font-semibold text-gray-800">
                  Notes / Preferences
                  <span className="text-gray-400"> (optional)</span>
                </label>
                <textarea
                  id="volunteer-notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  placeholder="Let us know about any preferences or questions."
                  className="mt-1 rounded-lg border border-gray-200 px-3 py-2 text-sm shadow-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-200"
                />
              </div>

              {submitError && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-600">
                  {submitError}
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    resetForm();
                    closeModal();
                  }}
                  className="rounded-full px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-5 py-2 text-sm font-semibold text-white shadow-lg transition hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 disabled:cursor-not-allowed disabled:bg-orange-300"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Submitting…</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Submit</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {adminView && (
        <div className="mt-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-gray-500">
                <Users className="h-4 w-4" />
                <span>Volunteer Roster</span>
              </div>
              <h3 className="mt-1 text-lg font-semibold text-gray-900">{eventName}</h3>
              <p className="text-sm text-gray-500">event slug: {eventSlug}</p>
            </div>
            <button
              type="button"
              onClick={fetchVolunteers}
              disabled={loadingList}
              className="rounded-full border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loadingList ? 'Refreshing…' : 'Refresh'}
            </button>
          </div>

          <div className="mt-4">
            {listError && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-600">
                {listError}
              </div>
            )}

            {!listError && (
              <div className="mt-2 overflow-hidden rounded-xl border border-gray-100 shadow-sm">
                <table className="min-w-full divide-y divide-gray-100 text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-4 py-2 text-left font-semibold text-gray-600">
                        Name
                      </th>
                      <th scope="col" className="px-4 py-2 text-left font-semibold text-gray-600">
                        Email
                      </th>
                      <th scope="col" className="px-4 py-2 text-left font-semibold text-gray-600">
                        Role
                      </th>
                      <th scope="col" className="hidden px-4 py-2 text-left font-semibold text-gray-600 sm:table-cell">
                        Notes
                      </th>
                      <th scope="col" className="hidden px-4 py-2 text-left font-semibold text-gray-600 lg:table-cell">
                        Signed Up
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 bg-white">
                    {volunteerList.length === 0 && !loadingList ? (
                      <tr>
                        <td colSpan={5} className="px-4 py-6 text-center text-sm text-gray-500">
                          No volunteers yet. Share the link to spread the word!
                        </td>
                      </tr>
                    ) : (
                      volunteerList.map((volunteer) => {
                        const createdDate = new Date(volunteer.createdAt);
                        const formattedDate = Number.isNaN(createdDate.getTime())
                          ? '—'
                          : createdDate.toLocaleString(undefined, {
                              month: 'short',
                              day: 'numeric',
                              hour: 'numeric',
                              minute: '2-digit',
                            });
                        const roleLabel =
                          VOLUNTEER_ROLES.find((option) => option.value === volunteer.role)?.label ?? volunteer.role;

                        return (
                          <tr key={volunteer.id} className="hover:bg-orange-50/50">
                            <td className="px-4 py-3 font-medium text-gray-900">{volunteer.name}</td>
                            <td className="px-4 py-3 text-gray-700">{volunteer.email}</td>
                            <td className="px-4 py-3 text-gray-700">{roleLabel}</td>
                            <td className="hidden px-4 py-3 text-gray-500 sm:table-cell">
                              {volunteer.notes ? volunteer.notes : <span className="text-gray-400">—</span>}
                            </td>
                            <td className="hidden px-4 py-3 text-gray-500 lg:table-cell">{formattedDate}</td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventVolunteerModal;


