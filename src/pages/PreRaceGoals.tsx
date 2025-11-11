import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../config/firebase';
import api from '../lib/api';
import { getBGR5KEventId } from '../config/bgr5kConfig';
import { Target, ArrowRight } from 'lucide-react';

const PreRaceGoals = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    targetPace: '',
    targetDistance: '',
    motivation: '',
    feeling: ''
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
      const youngAthleteId = localStorage.getItem('youngAthleteId');
      const eventCode = getBGR5KEventId(); // Using eventId as eventCode

      if (!youngAthleteId) {
        alert('Please complete young athlete registration first');
        navigate('/5k-results/youth-registration');
        return;
      }

      // Use axios - token automatically added by interceptor
      const response = await api.post(`/young-athlete/${youngAthleteId}/goal`, {
        eventCode,
        targetPace: formData.targetPace || null,
        targetDistance: formData.targetDistance || null,
        motivation: formData.motivation || null,
        feeling: formData.feeling || null
      });

        const data = response.data;
        if (data.success) {
          navigate('/5k-results/home');
        }
      } catch (error: any) {
        console.error('Error saving goal:', error);
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
              <Target className="h-8 w-8 text-purple-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Set Your Goal</h1>
            <p className="mt-2 text-gray-600">
              Sit together and talk about what matters most for race day.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="targetPace" className="block text-sm font-medium text-gray-700">
                Target Pace (optional)
              </label>
              <input
                type="text"
                id="targetPace"
                value={formData.targetPace}
                onChange={(e) => setFormData({ ...formData, targetPace: e.target.value })}
                placeholder="e.g., 9:00 min/mile, comfortable pace"
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500"
              />
            </div>

            <div>
              <label htmlFor="targetDistance" className="block text-sm font-medium text-gray-700">
                Target Distance (optional)
              </label>
              <input
                type="text"
                id="targetDistance"
                value={formData.targetDistance}
                onChange={(e) => setFormData({ ...formData, targetDistance: e.target.value })}
                placeholder="e.g., 5K, finish strong"
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500"
              />
            </div>

            <div>
              <label htmlFor="motivation" className="block text-sm font-medium text-gray-700">
                Who are you running for? (optional)
              </label>
              <textarea
                id="motivation"
                rows={3}
                value={formData.motivation}
                onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                placeholder="e.g., Running for my family, to show myself I can do it..."
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500"
              />
            </div>

            <div>
              <label htmlFor="feeling" className="block text-sm font-medium text-gray-700">
                How do you want to feel? (optional)
              </label>
              <textarea
                id="feeling"
                rows={3}
                value={formData.feeling}
                onChange={(e) => setFormData({ ...formData, feeling: e.target.value })}
                placeholder="e.g., Strong, proud, accomplished..."
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
                  <span>Saving Goal...</span>
                </>
              ) : (
                <>
                  <span>Save Goal</span>
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

export default PreRaceGoals;

