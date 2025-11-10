import { FormEvent, useState } from 'react';
import { X, CheckCircle2, Loader2 } from 'lucide-react';
import { buildApiUrl } from '../lib/api';
import { mapRoleIdToRoleName } from '../services/UniversalEventMapperService';
import { getBGR5KEventId } from '../config/bgr5kConfig';

type InlineSignupModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  roleId: string;
  roleName: string;
};

const InlineSignupModal = ({ isOpen, onClose, onSuccess, roleId, roleName }: InlineSignupModalProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [note, setNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

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

      const mappedRoleName = mapRoleIdToRoleName(roleId);

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
          notes: note.trim() ? note.trim() : undefined,
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
      setNote('');
      setErrorMessage(null);
      
      // Call success callback to refresh data
      onSuccess();
      onClose();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to submit your signup right now.';
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="relative w-full max-w-md rounded-3xl bg-white shadow-xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Sign Up for This Role</h2>
            <p className="mt-1 text-sm text-gray-600">{roleName}</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {errorMessage && (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
              {errorMessage}
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label htmlFor="inline-name" className="text-sm font-semibold text-gray-800">
              Name<span className="text-orange-500">*</span>
            </label>
            <input
              id="inline-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name"
              className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm shadow-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-200"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="inline-email" className="text-sm font-semibold text-gray-800">
              Email<span className="text-orange-500">*</span>
            </label>
            <input
              id="inline-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm shadow-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-200"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="inline-note" className="text-sm font-semibold text-gray-800">
              Notes (optional)
            </label>
            <textarea
              id="inline-note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
              placeholder="Any questions or preferences?"
              className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm shadow-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-200"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-full border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-orange-300"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Submitting…</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Sign Up</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InlineSignupModal;

