import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../config/firebase';
import { buildApiUrl } from '../lib/api';
import { User, ArrowRight } from 'lucide-react';

const ParentWelcome = () => {
  const navigate = useNavigate();
  const [athleteId, setAthleteId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const user = getCurrentUser();

  useEffect(() => {
    if (!user) {
      navigate('/engagement');
      return;
    }

    // Check if athlete exists, create if not
    const checkOrCreateAthlete = async () => {
      try {
        const token = await user.getIdToken();
        
        // Try to find or create athlete
        const response = await fetch(buildApiUrl('/api/athlete/create'), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            firebaseId: user.uid,
            email: user.email,
            firstName: user.displayName?.split(' ')[0] || '',
            lastName: user.displayName?.split(' ').slice(1).join(' ') || ''
          })
        });

        const data = await response.json();
        if (data.success && data.data?.id) {
          setAthleteId(data.data.id);
          localStorage.setItem('athleteId', data.data.id);
        }
      } catch (error) {
        console.error('Error checking athlete:', error);
      } finally {
        setLoading(false);
      }
    };

    checkOrCreateAthlete();
  }, [user, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-purple-600 border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Setting up your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-white">
      <div className="mx-auto max-w-2xl px-6 py-12 sm:px-8 lg:px-10">
        <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-gray-100">
          <div className="text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-100">
              <User className="h-8 w-8 text-purple-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome!
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Let's get your young athlete set up for the race.
            </p>
          </div>

          <div className="mt-8">
            <button
              onClick={() => navigate('/engagement/parent-profile')}
              className="w-full rounded-xl bg-purple-600 px-6 py-4 text-base font-semibold text-white transition hover:bg-purple-700 flex items-center justify-center gap-2"
            >
              <span>Continue</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentWelcome;

