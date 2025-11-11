import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../config/firebase';
import api from '../lib/api';
import { getBGR5KEventId } from '../config/bgr5kConfig';
import { ArrowRight } from 'lucide-react';

const ParentProfile = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.displayName?.split(' ')[0] || '',
    lastName: user?.displayName?.split(' ').slice(1).join(' ') || '',
    email: user?.email || ''
  });

  useEffect(() => {
    if (!user) {
      navigate('/5k-results');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      // Use axios - token automatically added by interceptor
      // Backend extracts data from Firebase token, but we can send firstName/lastName in body
      const response = await api.post('/athlete/create', {
        // Backend gets firebaseId, email from token, but we send firstName/lastName for updates
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email
      });

      const data = response.data;
      if (data.success) {
        if (data.data?.id) {
          localStorage.setItem('athleteId', data.data.id);
        }
        // Store eventId for this flow
        const eventId = getBGR5KEventId();
        if (eventId) {
          localStorage.setItem('eventId', eventId);
        }
        navigate('/5k-results/youth-registration');
      }
    } catch (error: any) {
      console.error('Error saving profile:', error);
      if (error.response?.status === 401) {
        navigate('/5k-results');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-500 via-red-500 to-pink-500">
      <div className="mx-auto max-w-2xl px-6 py-12 sm:px-8 lg:px-10">
        <div className="rounded-3xl bg-white p-8 shadow-xl ring-1 ring-gray-100">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Parent Profile</h1>
          <p className="mt-2 text-gray-600">
            Let's get your basic information set up.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                required
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
              />
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                required
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-gradient-to-r from-orange-600 to-red-600 px-6 py-3 text-base font-semibold text-white transition hover:from-orange-700 hover:to-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
            >
              {loading ? (
                <>
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <span>Next</span>
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ParentProfile;

