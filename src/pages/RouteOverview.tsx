import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navigation, ArrowRight, Users, Droplet, Repeat, ArrowLeft } from 'lucide-react';

/**
 * RouteOverview - Simplified view for Course Marshal signup
 * Focus on the 7 volunteer positions with clear signup CTAs
 */
const RouteOverview = () => {
  useEffect(() => {
    document.title = 'BGR Discovery 5k - Course Marshals';
  }, []);

  // Volunteer Marshal Positions (7 groups with repositioning logic)
  const volunteerPositions = [
    {
      id: 'volunteer-1',
      name: 'Starter + Finisher Crew',
      description: 'Handle the first turn, then reposition to guide runners to the finish.',
      repositioning: 'After pack clears first turn, return to Discovery for final straight.',
      needsGatorade: false,
      routePoints: 'Routes 1 + 13',
    },
    {
      id: 'volunteer-2',
      name: 'Valleywood + John Marshall Crew',
      description: 'Cover early Valleywood stretch, then reposition to final turn.',
      repositioning: 'Start on Valleywood, loop back to cover John Marshall right.',
      needsGatorade: false,
      routePoints: 'Routes 2 + 12',
    },
    {
      id: 'volunteer-3',
      name: 'Vermont + 35th Street North Crew',
      description: 'Guide at Vermont turn, then reposition to 35th Street turn.',
      repositioning: 'Park at Vermont, re-post at 35th left when clear.',
      needsGatorade: false,
      routePoints: 'Routes 3 + 11',
    },
    {
      id: 'volunteer-4',
      name: 'Massachusetts + Nottingham / 35th Crew',
      description: 'Cover Massachusetts turn (watch for traffic), then reposition to Nottingham/35th.',
      repositioning: 'Cover Mass left, reposition via Rockingham to Nottingham/35th.',
      needsGatorade: false,
      routePoints: 'Routes 4 + 10',
    },
    {
      id: 'volunteer-5',
      name: 'Massachusetts / Rhode Island + Rockingham Crew',
      description: 'Station at Rhode Island turn (ideal for Gatorade), then reposition to Rockingham interchange.',
      repositioning: 'Station at Rhode Island right, reposition via Rockingham to Nottingham interchange.',
      needsGatorade: true,
      routePoints: 'Routes 5 + 9',
    },
    {
      id: 'volunteer-6',
      name: 'Virginia Avenue Entry Crew',
      description: 'Cover Virginia Avenue entry and stay in place along early Virginia segment.',
      repositioning: 'Stays in place at Rhode Island to Virginia left.',
      needsGatorade: false,
      routePoints: 'Routes 6 + 7',
    },
    {
      id: 'volunteer-7',
      name: 'Virginia / Nottingham Crew',
      description: 'Single post at right turn onto Nottingham, marking final neighborhood stretch.',
      repositioning: 'Single post at Virginia to Nottingham right turn.',
      needsGatorade: false,
      routePoints: 'Route 8',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-white">
      <div className="mx-auto max-w-4xl px-6 py-12 sm:px-8 lg:px-10">
        {/* Header */}
        <header className="mb-8">
          <Link
            to="/volunteer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-orange-600 hover:text-orange-700 transition mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Volunteer Overview</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            🚦 Course Marshals
          </h1>
          <p className="mt-4 text-base text-gray-600">
            We need <strong>7 volunteer groups</strong> to cover the course. Each position involves repositioning to maximize coverage.
          </p>
        </header>

        {/* Quick Info */}
        <div className="mb-8 rounded-2xl border border-blue-100 bg-blue-50/60 p-4">
          <p className="text-sm text-blue-800">
            <strong>Most positions involve repositioning:</strong> You'll start at an early position, then move to a later position once the pack clears. 
            This maximizes coverage with fewer volunteers!
          </p>
        </div>

        {/* Volunteer Positions */}
        <section className="space-y-4">
          {volunteerPositions.map((position, index) => (
            <div
              key={position.id}
              className={`rounded-2xl border-2 p-6 transition ${
                position.needsGatorade
                  ? 'border-blue-200 bg-blue-50/50 hover:border-blue-300 hover:shadow-md'
                  : 'border-gray-200 bg-white hover:border-orange-200 hover:shadow-md'
              }`}
            >
              <div className="flex items-start justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                    <div className={`rounded-xl p-2.5 ${
                      position.needsGatorade
                        ? 'bg-blue-500'
                        : 'bg-orange-500'
                    }`}>
                      <span className="text-white font-bold text-lg">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="text-lg font-semibold text-gray-900">{position.name}</h3>
                        {position.needsGatorade && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2.5 py-1 text-xs font-semibold text-blue-700">
                            <Droplet className="h-3 w-3" />
                            <span>Gatorade Station</span>
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{position.routePoints}</p>
                    </div>
                  </div>

                  <p className="text-sm text-gray-700 mb-3">{position.description}</p>

                  <div className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg">
                    <Repeat className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-gray-600">{position.repositioning}</p>
                  </div>
                </div>

                <div className="flex-shrink-0">
                  <Link
                    to="/volunteer/signup"
                    className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 whitespace-nowrap"
                  >
                    <Users className="h-4 w-4" />
                    <span>Take This Role</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Gatorade Info */}
        <section className="mt-8 rounded-2xl border border-blue-100 bg-blue-50/60 p-5">
          <div className="flex items-start gap-3">
            <Droplet className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Bring Gatorade?</h3>
              <p className="text-sm text-gray-600">
                Position 5 (Massachusetts / Rhode Island + Rockingham Crew) is ideal for a mid-course Gatorade station. 
                If you can bring Gatorade, note it in your signup!
              </p>
            </div>
          </div>
        </section>

        {/* Course Map Link */}
        <section className="mt-6 text-center">
          <Link
            to="/course"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-orange-600 transition"
          >
            <span>View course map and route details</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      </div>
    </div>
  );
};

export default RouteOverview;
