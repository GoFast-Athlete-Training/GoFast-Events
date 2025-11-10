import { FormEvent, useState } from 'react';
import { CheckCircle2, Loader2, User } from 'lucide-react';
import { buildApiUrl } from '../lib/api';
import { mapRoleIdToRoleName } from '../services/UniversalEventMapperService';
import { getBGR5KEventId } from '../config/bgr5kConfig';

type VolunteerEntry = {
  id: string;
  name: string;
  email: string;
  role: string;
  note?: string | null;
  createdAt: string;
};

type InlineSignupRowProps = {
  slotId: string;
  slotName: string;
  description?: string;
  volunteer?: VolunteerEntry;
  onSignupSuccess: () => void;
  className?: string;
};

/**
 * InlineSignupRow - SignUpGenius-style inline signup component
 * Shows volunteer name if filled, or inline form if empty
 */
const InlineSignupRow = ({
  slotId,
  slotName,
  description,
  volunteer,
  onSignupSuccess,
  className = '',
}: InlineSignupRowProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim() || !email.trim()) {
      setErrorMessage('Please fill in your name and email.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const eventId = getBGR5KEventId();
      if (!eventId) {
        throw new Error('Event ID not configured.');
      }

      const mappedRoleName = mapRoleIdToRoleName(slotId);

      const response = await fetch(buildApiUrl('/api/event-volunteer'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventId: eventId,
          name: name.trim(),
          email: email.trim(),
          role: mappedRoleName,
        }),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        const message =
          typeof payload?.error === 'string'
            ? payload.error
            : payload?.message || 'Something went wrong. Please try again.';
        throw new Error(message);
      }

      const payload = await response.json();
      if (!payload.success) {
        throw new Error(payload.error || 'Failed to submit signup');
      }

      // Reset form
      setName('');
      setEmail('');
      setErrorMessage(null);

      // Refresh parent data
      onSignupSuccess();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to submit your signup right now.';
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`rounded-lg border border-gray-200 bg-white p-4 ${className}`}>
      {/* Slot Info */}
      <div className="mb-3">
        <h3 className="text-sm font-semibold text-gray-900">{slotName}</h3>
        {description && <p className="mt-1 text-xs text-gray-500">{description}</p>}
      </div>

      {/* Filled State */}
      {volunteer ? (
        <div className="flex items-center gap-2 rounded-lg bg-green-50 border border-green-200 px-3 py-2">
          <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-green-900">{volunteer.name}</p>
            <p className="text-xs text-green-700">{volunteer.email}</p>
          </div>
        </div>
      ) : (
        /* Empty State - Inline Form */
        <form onSubmit={handleSubmit} className="space-y-2">
          {errorMessage && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-600">
              {errorMessage}
            </div>
          )}
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-200"
              required
              disabled={isSubmitting}
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-200"
              required
              disabled={isSubmitting}
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-orange-300 whitespace-nowrap"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Signing up...</span>
                </>
              ) : (
                <>
                  <User className="h-4 w-4" />
                  <span>Take This Role</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default InlineSignupRow;

