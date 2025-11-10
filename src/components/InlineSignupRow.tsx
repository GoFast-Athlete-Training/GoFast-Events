import { FormEvent, useState, useEffect } from 'react';
import { CheckCircle2, Loader2, User, Edit2, Trash2, X } from 'lucide-react';
import { buildApiUrl } from '../lib/api';
import { mapRoleIdToRoleName } from '../services/UniversalEventMapperService';
import { getBGR5KEventId } from '../config/bgr5kConfig';

type VolunteerEntry = {
  id: string;
  name: string;
  email?: string; // Optional - not included in public page-hydrate endpoint for privacy
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
 * 
 * PUBLIC PAGE - No authentication required
 * Edit/Remove buttons are available to everyone (honor system)
 * Backend verifies email on PUT/DELETE for security
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
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Reset editing state when volunteer changes
  useEffect(() => {
    if (!volunteer) {
      setIsEditing(false);
    }
  }, [volunteer]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim() || !email.trim()) {
      setErrorMessage('Please fill in your name and email.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const currentEventId = getBGR5KEventId();
      if (!currentEventId) {
        throw new Error('Event ID not configured.');
      }

      const mappedRoleName = mapRoleIdToRoleName(slotId);

      const apiUrl = buildApiUrl('/api/event-volunteer');
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventId: currentEventId,
          name: name.trim(),
          email: email.trim(),
          role: mappedRoleName,
        }),
      });

      // Check if response is OK before parsing
      const contentType = response.headers.get('content-type');
      const isJson = contentType && contentType.includes('application/json');
      
      if (!response.ok) {
        // Try to parse error response
        let errorMessage = `Server error: ${response.status} ${response.statusText}`;
        if (isJson) {
          try {
            const payload = await response.json();
            errorMessage = payload?.error || payload?.message || errorMessage;
          } catch (parseError) {
            console.error('Failed to parse JSON error response:', parseError);
          }
        } else {
          // Response is not JSON (might be HTML error page)
          const errorText = await response.text();
          console.error('Non-JSON error response:', errorText.substring(0, 200));
        }
        throw new Error(errorMessage);
      }

      // Response is OK - parse JSON
      if (!isJson) {
        throw new Error('Server returned non-JSON response');
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

  const handleEdit = () => {
    if (volunteer) {
      setName(volunteer.name);
      // Email will need to be re-entered for verification
      setEmail('');
      setIsEditing(true);
      setErrorMessage(null);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setName('');
    setEmail('');
    setErrorMessage(null);
  };

  const handleUpdate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim() || !email.trim()) {
      setErrorMessage('Please fill in your name and email.');
      return;
    }

    if (!volunteer) {
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const apiUrl = buildApiUrl(`/api/event-volunteer/${volunteer.id}`);
      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
        }),
      });

      const contentType = response.headers.get('content-type');
      const isJson = contentType && contentType.includes('application/json');

      if (!response.ok) {
        let errorMessage = `Server error: ${response.status} ${response.statusText}`;
        if (isJson) {
          try {
            const payload = await response.json();
            errorMessage = payload?.error || payload?.message || errorMessage;
          } catch (parseError) {
            console.error('Failed to parse JSON error response:', parseError);
          }
        }
        throw new Error(errorMessage);
      }

      if (!isJson) {
        throw new Error('Server returned non-JSON response');
      }

      const payload = await response.json();
      if (!payload.success) {
        throw new Error(payload.error || 'Failed to update signup');
      }

      setIsEditing(false);
      setName('');
      setEmail('');
      setErrorMessage(null);
      onSignupSuccess();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to update your signup right now.';
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!volunteer) return;

    // Prompt user for their email to verify deletion
    const userEmail = prompt('Please enter your email to confirm deletion:');
    if (!userEmail || !userEmail.trim()) {
      setShowDeleteWarning(false);
      return;
    }

    setIsDeleting(true);
    setErrorMessage(null);

    try {
      const apiUrl = buildApiUrl(`/api/event-volunteer/${volunteer.id}?email=${encodeURIComponent(userEmail.trim())}`);
      const response = await fetch(apiUrl, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const contentType = response.headers.get('content-type');
      const isJson = contentType && contentType.includes('application/json');

      if (!response.ok) {
        let errorMessage = `Server error: ${response.status} ${response.statusText}`;
        if (isJson) {
          try {
            const payload = await response.json();
            errorMessage = payload?.error || payload?.message || errorMessage;
          } catch (parseError) {
            console.error('Failed to parse JSON error response:', parseError);
          }
        }
        throw new Error(errorMessage);
      }

      setShowDeleteWarning(false);
      onSignupSuccess();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to delete your signup right now.';
      setErrorMessage(message);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className={`rounded-lg border border-gray-200 bg-white p-4 ${className}`}>
      {/* Slot Info */}
      <div className="mb-3">
        <div className="flex items-start gap-2 mb-2">
          <h3 className="text-sm font-semibold text-gray-900 flex-1">{slotName}</h3>
          {description && description.includes(' • ') && (
            <span className="text-xs font-semibold text-orange-600 bg-orange-50 px-2 py-0.5 rounded">
              {description.split(' • ')[0]}
            </span>
          )}
        </div>
        {description && (
          <p className="text-xs text-gray-600 leading-relaxed">
            {description.includes(' • ') ? (
              <>
                <span className="text-gray-700">{description.split(' • ').slice(1).join(' • ')}</span>
              </>
            ) : (
              <span className="text-gray-700">{description}</span>
            )}
          </p>
        )}
      </div>

      {/* Filled State */}
      {volunteer && !isEditing ? (
        <div className="space-y-2">
          <div className="flex items-center gap-2 rounded-lg bg-green-50 border border-green-200 px-3 py-2">
            <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-green-900">{volunteer.name}</p>
              {volunteer.email && (
                <p className="text-xs text-green-700">{volunteer.email}</p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleEdit}
                className="inline-flex items-center gap-1 rounded px-2 py-1 text-xs font-medium text-blue-600 hover:bg-blue-50 transition"
                title="Edit your signup"
              >
                <Edit2 className="h-3 w-3" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => setShowDeleteWarning(true)}
                className="inline-flex items-center gap-1 rounded px-2 py-1 text-xs font-medium text-red-600 hover:bg-red-50 transition"
                title="Remove your signup"
              >
                <Trash2 className="h-3 w-3" />
                <span>Remove</span>
              </button>
            </div>
          </div>
          {showDeleteWarning && (
            <div className="rounded-lg border-2 border-red-200 bg-red-50 p-3">
              <p className="text-xs font-semibold text-red-900 mb-2">
                ⚠️ Remove your signup?
              </p>
              <p className="text-xs text-red-700 mb-3">
                Please only remove your own signup. You'll confirm with your email. This can't be undone.
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="inline-flex items-center gap-1 rounded px-3 py-1.5 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isDeleting ? (
                    <>
                      <Loader2 className="h-3 w-3 animate-spin" />
                      <span>Removing...</span>
                    </>
                  ) : (
                    <>
                      <Trash2 className="h-3 w-3" />
                      <span>Yes, Remove My Signup</span>
                    </>
                  )}
                </button>
                <button
                  onClick={() => setShowDeleteWarning(false)}
                  disabled={isDeleting}
                  className="inline-flex items-center gap-1 rounded px-3 py-1.5 text-xs font-semibold text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 transition disabled:opacity-50"
                >
                  <X className="h-3 w-3" />
                  <span>Cancel</span>
                </button>
              </div>
            </div>
          )}
          {errorMessage && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-600">
              {errorMessage}
            </div>
          )}
        </div>
      ) : volunteer && isEditing ? (
        /* Edit State */
        <form onSubmit={handleUpdate} className="space-y-2">
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
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-orange-300 whitespace-nowrap"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <span>Save</span>
                )}
              </button>
              <button
                type="button"
                onClick={handleCancelEdit}
                disabled={isSubmitting}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 whitespace-nowrap"
              >
                <X className="h-4 w-4" />
                <span>Cancel</span>
              </button>
            </div>
          </div>
        </form>
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

