import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navigation, MapPin, ArrowRight, Users, Droplet, Flag } from 'lucide-react';
import { BGR5K_CONFIG } from '../config/bgr5kConfig';

/**
 * RouteOverview - Detailed view for Course Marshals
 * Shows marshal positions, responsibilities, and signup options
 */
const RouteOverview = () => {
  useEffect(() => {
    document.title = 'BGR Discovery 5k - Course Marshals';
  }, []);

  // Marshal positions along the course (based on actual course route)
  const marshalPositions = [
    {
      id: 'marshal-1',
      name: 'Marshal Position 1',
      location: 'Kensington → 37th St',
      description: 'Right turn uphill from Kensington onto 37th. Guide runners through the first turn and encourage them up the hill.',
      mile: '0.22',
      needsGatorade: false,
      importance: 'Start - First turn',
    },
    {
      id: 'marshal-2',
      name: 'Marshal Position 2',
      location: 'Along Valleywood Dr',
      description: 'Long gradual curve; steady residential stretch. Cheer on runners through this extended section.',
      mile: '0.30–0.75',
      needsGatorade: false,
      importance: 'Early course',
    },
    {
      id: 'marshal-3',
      name: 'Marshal Position 3',
      location: 'Valleywood → Vermont Ave',
      description: 'Left turn just before Old Dominion Dr; short section on Vermont. Guide runners through this turn.',
      mile: '0.75',
      needsGatorade: false,
      importance: 'Key turn',
    },
    {
      id: 'marshal-4',
      name: 'Marshal Position 4',
      location: 'Vermont → Massachusetts Ave',
      description: 'Left turn onto Massachusetts; cars may approach downhill from the right. Important safety position - watch for traffic.',
      mile: '0.82',
      needsGatorade: false,
      importance: 'Safety - Traffic intersection',
    },
    {
      id: 'marshal-5',
      name: 'Marshal Position 5',
      location: 'Massachusetts → Rhode Island Ave (via Rockingham)',
      description: 'Right turn where Rockingham connects into Rhode Island. Guide runners through this connection.',
      mile: '1.09',
      needsGatorade: true,
      importance: 'Mid-course - Water station opportunity',
    },
    {
      id: 'marshal-6',
      name: 'Marshal Position 6',
      location: 'Rhode Island → Virginia Ave',
      description: 'Left turn continuing through residential area. Encourage runners as they approach the halfway point.',
      mile: '1.17',
      needsGatorade: false,
      importance: 'Mid-course',
    },
    {
      id: 'marshal-7',
      name: 'Marshal Position 7',
      location: 'Virginia Ave corner (Virginia → Virginia transition)',
      description: 'Gentle bend keeping runners on Virginia Ave alignment. Help runners stay on course through this transition.',
      mile: '1.31',
      needsGatorade: false,
      importance: 'Course alignment',
    },
    {
      id: 'marshal-8',
      name: 'Marshal Position 8',
      location: 'Virginia → Nottingham St',
      description: 'Right turn beginning final neighborhood stretch. Encourage runners as they enter the final section.',
      mile: '~2.00',
      needsGatorade: false,
      importance: 'Final section start',
    },
    {
      id: 'marshal-9',
      name: 'Marshal Position 9',
      location: 'Rockingham interchange on Nottingham',
      description: 'Brief left-then-right transition staying on Nottingham. Guide runners through this quick transition.',
      mile: '2.10',
      needsGatorade: false,
      importance: 'Final section',
    },
    {
      id: 'marshal-10',
      name: 'Marshal Position 10',
      location: 'Nottingham → 35th St',
      description: 'Left turn beginning final sequence toward finish. Build excitement as runners approach the finish.',
      mile: '2.33',
      needsGatorade: false,
      importance: 'Finish approach',
    },
    {
      id: 'marshal-11',
      name: 'Marshal Position 11',
      location: '35th → N. John Marshall Dr',
      description: 'Left turn continuing finish approach. Keep energy high as runners near the finish line.',
      mile: '2.41',
      needsGatorade: false,
      importance: 'Final stretch',
    },
    {
      id: 'marshal-12',
      name: 'Marshal Position 12',
      location: 'N. John Marshall Dr → 36th St',
      description: 'Right turn guiding runners toward school area. Final turn before the finish - celebrate every runner!',
      mile: '2.50',
      needsGatorade: false,
      importance: 'Final turn - High energy',
    },
    {
      id: 'marshal-13',
      name: 'Marshal Position 13',
      location: '36th St → Kensington (Finish approach)',
      description: 'Final straight back to Discovery; finish area visible from corner. Cheer loudly as runners complete their 5K!',
      mile: '2.70–3.20',
      needsGatorade: false,
      importance: 'Finish line - Maximum energy',
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
            We have <strong>13 marshal positions</strong> covering the entire 5K route.
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
              <span><strong>Ensure Safety:</strong> Watch for traffic and help if runners need assistance</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-orange-500 mt-1">•</span>
              <span><strong>Manage Stations:</strong> Some positions include water/Gatorade stations</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-orange-500 mt-1">•</span>
              <span><strong>Build Energy:</strong> Especially important at final positions near the finish line</span>
            </li>
          </ul>
        </section>

        {/* Course Overview */}
        <section className="mt-8 rounded-3xl border border-blue-100 bg-blue-50/60 p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="rounded-2xl bg-blue-500 p-3">
              <Flag className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900">Course Route Overview</h2>
              <p className="mt-2 text-sm text-gray-600">
                The 5K course starts on Kensington, winds through residential neighborhoods, and finishes back at Discovery Elementary. 
                Marshals are positioned at all 13 key turns and transitions to ensure runners stay on course and receive encouragement throughout.
              </p>
              <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-semibold text-gray-700">Total Distance:</p>
                  <p className="text-gray-600">3.2 miles (5K)</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-700">Marshal Positions:</p>
                  <p className="text-gray-600">13 positions</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Marshal Positions */}
        <section className="mt-8 rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">All 13 Marshal Positions</h2>
            <p className="mt-2 text-sm text-gray-600">
              Each position has specific responsibilities. Click on a position to see details, or sign up below to choose your preferred spot.
            </p>
          </div>

          <div className="space-y-4">
            {marshalPositions.map((position, index) => (
              <div
                key={position.id}
                className={`rounded-2xl border-2 p-5 transition ${
                  position.needsGatorade
                    ? 'border-blue-200 bg-blue-50/50 hover:border-blue-300 hover:shadow-md'
                    : position.importance.includes('Finish') || position.importance.includes('High energy')
                    ? 'border-orange-200 bg-orange-50/30 hover:border-orange-300 hover:shadow-md'
                    : 'border-gray-200 bg-gray-50 hover:border-orange-200 hover:shadow-sm'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className={`rounded-xl p-2 ${
                      position.importance.includes('Finish') || position.importance.includes('High energy')
                        ? 'bg-orange-500'
                        : position.needsGatorade
                        ? 'bg-blue-500'
                        : 'bg-gray-400'
                    }`}>
                      <span className="text-white font-bold text-sm">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-gray-900">{position.name}</h3>
                        {position.needsGatorade && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-700">
                            <Droplet className="h-3 w-3" />
                            <span>Gatorade</span>
                          </span>
                        )}
                        {position.importance.includes('Safety') && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2 py-1 text-xs font-semibold text-red-700">
                            <span>⚠️ Safety</span>
                          </span>
                        )}
                        {position.importance.includes('High energy') && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-orange-100 px-2 py-1 text-xs font-semibold text-orange-700">
                            <span>🎉 High Energy</span>
                          </span>
                        )}
                      </div>
                      <div className="mb-2">
                        <p className="text-sm font-medium text-gray-700">{position.location}</p>
                        <p className="text-xs text-gray-500 mt-1">Mile {position.mile} • {position.importance}</p>
                      </div>
                      <p className="text-sm text-gray-600">{position.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Key Positions Highlight */}
        <section className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-red-200 bg-red-50/60 p-4">
            <h3 className="font-semibold text-gray-900 mb-2">⚠️ Safety Position</h3>
            <p className="text-sm text-gray-600">Position 4: Vermont → Massachusetts Ave</p>
            <p className="text-xs text-gray-500 mt-1">Watch for traffic approaching from the right</p>
          </div>
          <div className="rounded-2xl border border-blue-200 bg-blue-50/60 p-4">
            <h3 className="font-semibold text-gray-900 mb-2">💧 Gatorade Station</h3>
            <p className="text-sm text-gray-600">Position 5: Massachusetts → Rhode Island</p>
            <p className="text-xs text-gray-500 mt-1">Mid-course hydration opportunity</p>
          </div>
          <div className="rounded-2xl border border-orange-200 bg-orange-50/60 p-4">
            <h3 className="font-semibold text-gray-900 mb-2">🎉 Finish Line Energy</h3>
            <p className="text-sm text-gray-600">Positions 12-13: Final stretch</p>
            <p className="text-xs text-gray-500 mt-1">Maximum celebration and encouragement!</p>
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
                <strong>Marshal Position 5</strong> (Massachusetts → Rhode Island Ave, mile 1.09) is an ideal location for a mid-course water/Gatorade station. 
                If you're able to bring Gatorade or other sports drinks for the runners, please note it in your signup!
              </p>
              <p className="mt-3 text-sm font-medium text-gray-700">
                This position is at the midpoint of the race, making it perfect for keeping runners hydrated and energized for the second half.
              </p>
            </div>
          </div>
        </section>

        {/* Sign Up CTA */}
        <section className="mt-8 rounded-3xl border border-dashed border-orange-200 bg-orange-50/50 p-8 text-center shadow-sm">
          <h3 className="text-xl font-semibold text-gray-900">Ready to Help as a Marshal?</h3>
          <p className="mt-3 text-sm text-gray-600">
            Choose a marshal position that works for you and sign up below. Every position helps our young athletes succeed! 
            We need all 13 positions filled to ensure a safe and supportive race experience.
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
