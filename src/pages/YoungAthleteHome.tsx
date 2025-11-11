import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../config/firebase';
import { buildApiUrl } from '../lib/api';
import { getBGR5KEventId } from '../config/bgr5kConfig';
import { Target, Trophy, Wand2, Activity } from 'lucide-react';

interface Activity {
  id: string;
  activityName: string;
  startTime: string;
  duration: number;
  distance: number;
  averageSpeed: number;
}

interface Goal {
  targetPace?: string;
  targetDistance?: string;
  motivation?: string;
  feeling?: string;
}

const YoungAthleteHome = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [loading, setLoading] = useState(true);
  const [claiming, setClaiming] = useState<string | null>(null);
  const [youngAthlete, setYoungAthlete] = useState<any>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [goal, setGoal] = useState<Goal | null>(null);

  useEffect(() => {
    if (!user) {
      navigate('/engagement');
      return;
    }

    const loadData = async () => {
      try {
        const token = await user.getIdToken();
        const youngAthleteId = localStorage.getItem('youngAthleteId');
        const athleteId = localStorage.getItem('athleteId');

        if (!youngAthleteId) {
          navigate('/engagement/youth-registration');
          return;
        }

        // Load young athlete with goals and results
        const youngAthleteResponse = await fetch(buildApiUrl(`/api/young-athlete/${youngAthleteId}`), {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const youngAthleteData = await youngAthleteResponse.json();
        if (youngAthleteData.success) {
          setYoungAthlete(youngAthleteData.data);
          if (youngAthleteData.data.goals?.length > 0) {
            setGoal(youngAthleteData.data.goals[0]);
          }
        }

        // Load parent's activities
        if (athleteId) {
          const activitiesResponse = await fetch(buildApiUrl(`/api/athlete/${athleteId}/activities`), {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          const activitiesData = await activitiesResponse.json();
          if (activitiesData.success) {
            // Filter for running activities
            const runningActivities = (activitiesData.activities || [])
              .filter((a: any) => a.activityType === 'running')
              .slice(0, 10); // Show last 10 runs
            setActivities(runningActivities);
          }
        }
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user, navigate]);

  const handleClaimActivity = async (activityId: string) => {
    if (!user) return;

    setClaiming(activityId);
    try {
      const token = await user.getIdToken();
      const youngAthleteId = localStorage.getItem('youngAthleteId');
      const athleteId = localStorage.getItem('athleteId');
      const eventCode = getBGR5KEventId(); // Using eventId as eventCode

      if (!youngAthleteId || !athleteId) return;

      const response = await fetch(buildApiUrl('/api/event-result/claim'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          eventCode,
          youngAthleteId,
          authorAthleteId: athleteId,
          activityId
        })
      });

      const data = await response.json();
      if (data.success) {
        alert('Race result claimed! Check the leaderboard.');
        navigate('/engagement/leaderboard');
      }
    } catch (error) {
      console.error('Error claiming activity:', error);
    } finally {
      setClaiming(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-purple-600 border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-white">
      <div className="mx-auto max-w-4xl px-6 py-12 sm:px-8 lg:px-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {youngAthlete?.firstName}'s Race Dashboard
          </h1>
          <p className="mt-2 text-gray-600">
            View your goal and claim your race result
          </p>
        </div>

        {/* Goal Summary */}
        {goal && (
          <div className="mb-8 rounded-3xl border border-purple-100 bg-purple-50/50 p-6">
            <div className="flex items-start gap-4">
              <Target className="h-6 w-6 text-purple-600 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-900">Your Goal</h2>
                {goal.targetPace && (
                  <p className="mt-2 text-gray-700"><strong>Pace:</strong> {goal.targetPace}</p>
                )}
                {goal.targetDistance && (
                  <p className="mt-1 text-gray-700"><strong>Distance:</strong> {goal.targetDistance}</p>
                )}
                {goal.motivation && (
                  <p className="mt-2 text-gray-700"><strong>Running for:</strong> {goal.motivation}</p>
                )}
                {goal.feeling && (
                  <p className="mt-1 text-gray-700"><strong>Want to feel:</strong> {goal.feeling}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Activities */}
        <div className="mb-8 rounded-3xl border border-gray-200 bg-white p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Activity className="h-5 w-5 text-purple-600" />
            Recent Runs
          </h2>
          {activities.length === 0 ? (
            <p className="text-gray-600">No runs found. Connect your Garmin to sync activities.</p>
          ) : (
            <div className="space-y-3">
              {activities.map((activity) => {
                const distanceMiles = (activity.distance / 1609.34).toFixed(2);
                const paceMinPerMile = activity.averageSpeed > 0 
                  ? (1609.34 / activity.averageSpeed / 60).toFixed(2)
                  : 'N/A';
                const date = new Date(activity.startTime).toLocaleDateString();

                return (
                  <div
                    key={activity.id}
                    className="flex items-center justify-between rounded-lg border border-gray-200 p-4 hover:bg-gray-50"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{activity.activityName || 'Run'}</p>
                      <p className="text-sm text-gray-600">{date}</p>
                      <p className="text-sm text-gray-600">
                        {distanceMiles} miles • {paceMinPerMile} min/mile
                      </p>
                    </div>
                    <button
                      onClick={() => handleClaimActivity(activity.id)}
                      disabled={claiming === activity.id}
                      className="ml-4 flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-purple-700 disabled:opacity-50"
                    >
                      {claiming === activity.id ? (
                        <>
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                          <span>Claiming...</span>
                        </>
                      ) : (
                        <>
                          <Wand2 className="h-4 w-4" />
                          <span>Make this my 5K</span>
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Leaderboard Link */}
        <div className="text-center">
          <button
            onClick={() => navigate('/engagement/leaderboard')}
            className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-6 py-3 text-base font-semibold text-white transition hover:bg-purple-700"
          >
            <Trophy className="h-5 w-5" />
            <span>View Leaderboard</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default YoungAthleteHome;

