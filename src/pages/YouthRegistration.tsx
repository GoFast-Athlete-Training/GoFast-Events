import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../config/firebase';
import api from '../lib/api';
import { getBGR5KEventId } from '../config/bgr5kConfig';
import { User, ArrowRight } from 'lucide-react';

const YouthRegistration = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    grade: '',
    school: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      const athleteId = localStorage.getItem('athleteId');
      const eventCode = getBGR5KEventId(); // Using eventId as eventCode

      if (!athleteId) {
        alert('Please complete parent profile first');
        navigate('/5k-results/parent-profile');
        return;
      }

      // Use axios - token automatically added by interceptor
      const response = await api.post('/young-athlete/register', {
        athleteId,
        eventCode,
        firstName: formData.firstName,
        lastName: formData.lastName,
        grade: formData.grade || null,
        school: formData.school || null
      });

      const data = response.data;
      if (data.success && data.data?.id) {
        localStorage.setItem('youngAthleteId', data.data.id);
        // Ensure eventId is stored (should already be from ParentProfile, but double-check)
        if (!localStorage.getItem('eventId')) {
          localStorage.setItem('eventId', eventCode);
        }
        navigate('/5k-results/goals');
      }
    } catch (error: any) {
      console.error('Error registering young athlete:', error);
      if (error.response?.status === 401) {
        navigate('/5k-results');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-white">
      <div className="mx-auto max-w-2xl px-6 py-12 sm:px-8 lg:px-10">
        <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-gray-100">
          <div className="text-center mb-6">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-100">
              <User className="h-8 w-8 text-purple-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Young Athlete Profile</h1>
            <p className="mt-2 text-gray-600">
              Tell us about your athlete.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                First Name *
              </label>
              <input
                type="text"
                id="firstName"
                required
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500"
              />
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                Last Name *
              </label>
              <input
                type="text"
                id="lastName"
                required
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500"
              />
            </div>

            <div>
              <label htmlFor="grade" className="block text-sm font-medium text-gray-700">
                Grade (optional)
              </label>
              <input
                type="text"
                id="grade"
                value={formData.grade}
                onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                placeholder="e.g., 5th, 6th"
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500"
              />
            </div>

            <div>
              <label htmlFor="school" className="block text-sm font-medium text-gray-700">
                School (optional)
              </label>
              <input
                type="text"
                id="school"
                value={formData.school}
                onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-purple-600 px-6 py-3 text-base font-semibold text-white transition hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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

export default YouthRegistration;

