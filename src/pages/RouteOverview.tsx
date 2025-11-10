import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navigation, MapPin, ArrowRight, Users, Droplet } from 'lucide-react';
import { BGR5K_CONFIG } from '../config/bgr5kConfig';

/**
 * RouteOverview - Detailed view for Course Marshals
 * Shows marshal positions, responsibilities, and signup options
 */
const RouteOverview = () => {
  useEffect(() => {
    document.title = 'BGR Discovery 5k - Course Marshals';
  }, []);

  // Marshal positions along the course (these would ideally come from backend/config)
  const marshalPositions = [
    {
      id: 'marshal-1',
      name: 'Marshal Position 1',
      location: 'Start/First Turn',
      description: 'Guide runners from the start and ensure they take the correct first turn.',
      needsGatorade: false,
    },
    {
      id: 'marshal-2',
      name: 'Marshal Position 2',
      location: 'Mid-Course Checkpoint',
      description: 'Cheer on runners at the midpoint and guide them through the course.',
      needsGatorade: true,
    },
    {
      id: 'marshal-3',
      name: 'Marshal Position 3',
      location: 'Final Turn',
      description: 'Direct runners toward the finish line and provide final encouragement.',
      needsGatorade: false,
    },
    {
      id: 'marshal-4',
      name: 'Marshal Position 4',
      location: 'Water Station',
      description: 'Manage the water station and cheer on runners as they pass.',
      needsGatorade: true,
    },
    {
      id: 'marshal-5',
      name: 'Marshal Position 5',
      location: 'Final Stretch',
      description: 'Encourage runners in the final stretch before the finish line.',
      needsGatorade: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-white">
      <div className="mx-auto max-w-5xl px-6 py-12 sm:px-8 lg:px-10">
        {/* Hero Section */}
        <header className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-gray-100">
          <p className="text-xs uppercase tracking-[0.3em] text-orange-500">Volunteer Role</p>
          <h1 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl">
            🚦 Course Marshals
          </h1>
          <p className="mt-4 max-w-2xl text-base text-gray-600">
            Course marshals are essential for guiding our young athletes and keeping them on the right path. 
            You'll be positioned at key points along the course to provide direction, encouragement, and support.
          </p>
        </header>

        {/* What Marshals Do */}
        <section className="mt-8 rounded-3xl border border-orange-100 bg-orange-50/60 p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">What Marshals Do</h2>
          <ul className="space-y-3 text-sm text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-orange-500 mt-1">•</span>
              <span><strong>Guide Runners:</strong> Direct athletes at turns and key course points</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-orange-500 mt-1">•</span>
              <span><strong>Provide Encouragement:</strong> Cheer on runners as they pass your position</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-orange-500 mt-1">•</span>
              <span><strong>Ensure Safety:</strong> Watch for any issues and help if needed</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-orange-500 mt-1">•</span>
              <span><strong>Manage Stations:</strong> Some positions include water/Gatorade stations</span>
            </li>
          </ul>
        </section>

        {/* Marshal Positions */}
        <section className="mt-8 rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">Marshal Positions</h2>
            <p className="mt-2 text-sm text-gray-600">
              We have 5 marshal positions along the course. Each position has specific responsibilities and some may need Gatorade.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {marshalPositions.map((position) => (
              <div
                key={position.id}
                className="rounded-2xl border border-gray-200 bg-gray-50 p-5 hover:border-orange-200 hover:shadow-md transition"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Navigation className="h-5 w-5 text-orange-500" />
                    <h3 className="font-semibold text-gray-900">{position.name}</h3>
                  </div>
                  {position.needsGatorade && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-700">
                      <Droplet className="h-3 w-3" />
                      <span>Gatorade</span>
                    </span>
                  )}
                </div>
                <div className="mb-3">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Location</p>
                  <p className="text-sm font-semibold text-gray-900">{position.location}</p>
                </div>
                <p className="text-sm text-gray-600 mb-4">{position.description}</p>
                {position.needsGatorade && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <p className="text-xs text-blue-700 font-medium">
                      💡 This position could use Gatorade - consider bringing some if you sign up!
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Gatorade Information */}
        <section className="mt-8 rounded-3xl border border-blue-100 bg-blue-50/60 p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="rounded-2xl bg-blue-500 p-3">
              <Droplet className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900">Bring Gatorade?</h2>
              <p className="mt-2 text-sm text-gray-600">
                Some marshal positions are near water stations where Gatorade would be helpful. 
                If you're able to bring Gatorade (or other sports drinks) for the runners, please note it in your signup!
              </p>
              <p className="mt-3 text-sm font-medium text-gray-700">
                Positions that could use Gatorade: Marshal Position 2, Marshal Position 4
              </p>
            </div>
          </div>
        </section>

        {/* Sign Up CTA */}
        <section className="mt-8 rounded-3xl border border-dashed border-orange-200 bg-orange-50/50 p-8 text-center shadow-sm">
          <h3 className="text-xl font-semibold text-gray-900">Ready to Help as a Marshal?</h3>
          <p className="mt-3 text-sm text-gray-600">
            Choose a marshal position that works for you and sign up below. Every position helps our young athletes succeed!
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              to="/volunteer/signup"
              className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
            >
              <Users className="h-4 w-4" />
              <span>Sign Up as a Marshal</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/course"
              className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-orange-200 hover:text-orange-600"
            >
              <MapPin className="h-4 w-4" />
              <span>View Course Map</span>
            </Link>
          </div>
        </section>

        {/* Navigation */}
        <section className="mt-8 flex flex-wrap gap-4">
          <Link
            to="/volunteer"
            className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-orange-200 hover:text-orange-600"
          >
            <ArrowRight className="h-4 w-4 rotate-180" />
            <span>Back to Volunteer Overview</span>
          </Link>
        </section>
      </div>
    </div>
  );
};

export default RouteOverview;

