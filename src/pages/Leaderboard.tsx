import { useState, useEffect } from 'react';
import { buildApiUrl } from '../lib/api';
import { getBGR5KEventId } from '../config/bgr5kConfig';
import { Trophy, Medal, Clock, MapPin } from 'lucide-react';

interface LeaderboardEntry {
  id: string;
  youngAthlete: {
    firstName: string;
    lastName: string;
    grade?: string;
    school?: string;
  };
  activity: {
    activityName: string;
    startTime: string;
    duration: number;
    distance: number;
    averageSpeed: number;
  };
  goals?: Array<{
    targetPace?: string;
    motivation?: string;
  }>;
}

const Leaderboard = () => {
  const [loading, setLoading] = useState(true);
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    document.title = 'Leaderboard - BGR Discovery 5K';
    window.scrollTo(0, 0);

    const loadLeaderboard = async () => {
      try {
        const eventCode = getBGR5KEventId(); // Using eventId as eventCode
        const response = await fetch(buildApiUrl(`/api/events/${eventCode}/leaderboard`));
        const data = await response.json();

        if (data.success) {
          setEntries(data.data || []);
        }
      } catch (error) {
        console.error('Error loading leaderboard:', error);
      } finally {
        setLoading(false);
      }
    };

    loadLeaderboard();
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDistance = (meters: number) => {
    const miles = meters / 1609.34;
    return `${miles.toFixed(2)} mi`;
  };

  const formatPace = (speedMps: number) => {
    if (speedMps === 0) return 'N/A';
    const paceSecondsPerMile = 1609.34 / speedMps;
    const mins = Math.floor(paceSecondsPerMile / 60);
    const secs = Math.floor(paceSecondsPerMile % 60);
    return `${mins}:${secs.toString().padStart(2, '0')} min/mile`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-purple-600 border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Loading leaderboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-white">
      <div className="mx-auto max-w-4xl px-6 py-12 sm:px-8 lg:px-10">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-100">
            <Trophy className="h-8 w-8 text-purple-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Race Leaderboard</h1>
          <p className="mt-2 text-gray-600">
            See how everyone did on race day
          </p>
        </div>

        {entries.length === 0 ? (
          <div className="rounded-3xl border border-gray-200 bg-white p-12 text-center">
            <p className="text-gray-600">No results yet. Check back after race day!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {entries.map((entry, index) => {
              const distanceMiles = formatDistance(entry.activity.distance);
              const pace = formatPace(entry.activity.averageSpeed);
              const time = formatTime(entry.activity.duration);
              const date = new Date(entry.activity.startTime).toLocaleDateString();

              return (
                <div
                  key={entry.id}
                  className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-xl font-bold text-purple-600">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {entry.youngAthlete.firstName} {entry.youngAthlete.lastName}
                      </h3>
                      {(entry.youngAthlete.grade || entry.youngAthlete.school) && (
                        <p className="text-sm text-gray-600">
                          {entry.youngAthlete.grade && entry.youngAthlete.school
                            ? `${entry.youngAthlete.grade} • ${entry.youngAthlete.school}`
                            : entry.youngAthlete.grade || entry.youngAthlete.school}
                        </p>
                      )}
                      
                      <div className="mt-4 grid gap-2 sm:grid-cols-3">
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <Clock className="h-4 w-4 text-purple-600" />
                          <span><strong>Time:</strong> {time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <MapPin className="h-4 w-4 text-purple-600" />
                          <span><strong>Distance:</strong> {distanceMiles}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <Medal className="h-4 w-4 text-purple-600" />
                          <span><strong>Pace:</strong> {pace}</span>
                        </div>
                      </div>

                      {entry.goals?.[0]?.motivation && (
                        <div className="mt-4 rounded-lg bg-purple-50 p-3">
                          <p className="text-sm text-gray-700">
                            <strong>Running for:</strong> {entry.goals[0].motivation}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;

