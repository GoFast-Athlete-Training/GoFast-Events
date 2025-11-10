import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navigation, MapPin, ArrowRight, Users, Droplet, Flag, Route, Repeat } from 'lucide-react';
import { BGR5K_CONFIG } from '../config/bgr5kConfig';

/**
 * RouteOverview - Detailed view for Course Marshals
 * Shows route points and volunteer marshal positions with repositioning logic
 */
const RouteOverview = () => {
  useEffect(() => {
    document.title = 'BGR Discovery 5k - Course Marshals';
  }, []);

  // All route points along the course (for reference - these are the actual turns/locations)
  const routePoints = [
    {
      id: 'route-1',
      location: 'Kensington → 37th St',
      description: 'Right turn uphill from Kensington onto 37th.',
      mile: '0.22',
    },
    {
      id: 'route-2',
      location: 'Along Valleywood Dr',
      description: 'Long gradual curve; steady residential stretch.',
      mile: '0.30–0.75',
    },
    {
      id: 'route-3',
      location: 'Valleywood → Vermont Ave',
      description: 'Left turn just before Old Dominion Dr; short section on Vermont.',
      mile: '0.75',
    },
    {
      id: 'route-4',
      location: 'Vermont → Massachusetts Ave',
      description: 'Left turn onto Massachusetts; cars may approach downhill from the right.',
      mile: '0.82',
    },
    {
      id: 'route-5',
      location: 'Massachusetts → Rhode Island Ave (via Rockingham)',
      description: 'Right turn where Rockingham connects into Rhode Island.',
      mile: '1.09',
    },
    {
      id: 'route-6',
      location: 'Rhode Island → Virginia Ave',
      description: 'Left turn continuing through residential area.',
      mile: '1.17',
    },
    {
      id: 'route-7',
      location: 'Virginia Ave corner (Virginia → Virginia transition)',
      description: 'Gentle bend keeping runners on Virginia Ave alignment.',
      mile: '1.31',
    },
    {
      id: 'route-8',
      location: 'Virginia → Nottingham St',
      description: 'Right turn beginning final neighborhood stretch.',
      mile: '~2.00',
    },
    {
      id: 'route-9',
      location: 'Rockingham interchange on Nottingham',
      description: 'Brief left-then-right transition staying on Nottingham.',
      mile: '2.10',
    },
    {
      id: 'route-10',
      location: 'Nottingham → 35th St',
      description: 'Left turn beginning final sequence toward finish.',
      mile: '2.33',
    },
    {
      id: 'route-11',
      location: '35th → N. John Marshall Dr',
      description: 'Left turn continuing finish approach.',
      mile: '2.41',
    },
    {
      id: 'route-12',
      location: 'N. John Marshall Dr → 36th St',
      description: 'Right turn guiding runners toward school area.',
      mile: '2.50',
    },
    {
      id: 'route-13',
      location: '36th St → Kensington (Finish approach)',
      description: 'Final straight back to Discovery; finish area visible from corner.',
      mile: '2.70–3.20',
    },
  ];

  // Volunteer Marshal Positions (7 groups with repositioning logic)
  const volunteerPositions = [
    {
      id: 'volunteer-1',
      name: 'Starter + Finisher Crew',
      routePoints: ['route-1', 'route-13'],
      description: 'Handles the first right turn at the start, then repositions to guide runners on the final straight to the finish line.',
      repositioning: 'After the pack clears the first turn (0.22 mi), returns to Discovery to guide the final straight (2.7–3.2 mi).',
      needsGatorade: false,
      importance: 'Start & Finish - High visibility',
    },
    {
      id: 'volunteer-2',
      name: 'Valleywood + John Marshall Crew',
      routePoints: ['route-2', 'route-12'],
      description: 'Covers the early Valleywood stretch, then repositions to guide runners on the final turn before the finish.',
      repositioning: 'Starts on Valleywood (0.3–0.7 mi); after last runner, loops back via Valleywood to cover John Marshall right (2.5 mi).',
      needsGatorade: false,
      importance: 'Early course + Final turn',
    },
    {
      id: 'volunteer-3',
      name: 'Vermont + 35th Street North Crew',
      routePoints: ['route-3', 'route-11'],
      description: 'Guides runners at the Vermont turn, then repositions to cover the 35th Street turn in the final stretch.',
      repositioning: 'Parks near Vermont (0.75 mi); when clear, re-posts at 35th left (2.4 mi).',
      needsGatorade: false,
      importance: 'Mid-course + Finish approach',
    },
    {
      id: 'volunteer-4',
      name: 'Massachusetts + Nottingham / 35th Crew',
      routePoints: ['route-4', 'route-10'],
      description: 'Covers the important Massachusetts turn (watch for traffic), then repositions to the Nottingham/35th turn.',
      repositioning: 'Covers left onto Mass (0.82 mi); after cleared, repositions via Rockingham to Nottingham/35th (2.3 mi).',
      needsGatorade: false,
      importance: 'Safety position + Finish sequence',
    },
    {
      id: 'volunteer-5',
      name: 'Massachusetts / Rhode Island + Rockingham Crew',
      routePoints: ['route-5', 'route-9'],
      description: 'Stations at the Rhode Island turn (ideal for Gatorade station), then repositions to cover the Rockingham interchange.',
      repositioning: 'Stations at right onto Rhode Island (1.09 mi); then repositions via Rockingham to cover Nottingham interchange (2.1 mi).',
      needsGatorade: true,
      importance: 'Mid-course hydration + Final section',
    },
    {
      id: 'volunteer-6',
      name: 'Virginia Avenue Entry Crew',
      routePoints: ['route-6', 'route-7'],
      description: 'Covers the Virginia Avenue entry and stays in place along the early Virginia segment.',
      repositioning: 'One person stationed at the Rhode Island to Virginia left (≈ 1.17 mi); remains there along early Virginia segment.',
      needsGatorade: false,
      importance: 'Mid-course - Stays in place',
    },
    {
      id: 'volunteer-7',
      name: 'Virginia / Nottingham Crew',
      routePoints: ['route-8'],
      description: 'Single post at the right turn onto Nottingham, marking the beginning of the final neighborhood stretch.',
      repositioning: 'Single post at right turn onto Nottingham (≈ 2.0 mi).',
      needsGatorade: false,
      importance: 'Final section start',
    },
  ];

  // Helper to get route point details
  const getRoutePointDetails = (routePointId: string) => {
    return routePoints.find((p) => p.id === routePointId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-white">
      <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8 lg:px-10">
        {/* Hero Section */}
        <header className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-gray-100">
          <p className="text-xs uppercase tracking-[0.3em] text-orange-500">Volunteer Role</p>
          <h1 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl">
            🚦 Course Marshals
          </h1>
          <p className="mt-4 max-w-2xl text-base text-gray-600">
            Course marshals are essential for guiding our young athletes and keeping them on the right path. 
            We need <strong>7 volunteer groups</strong> to cover all 13 route points along the 5K course.
          </p>
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> Most marshal positions involve <strong>repositioning</strong> to cover multiple route points. 
              You'll start at an early position, then move to a later position once the pack clears. This maximizes coverage with fewer volunteers!
            </p>
          </div>
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
              <span><strong>Reposition:</strong> Most positions move to a second location after the pack clears</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-orange-500 mt-1">•</span>
              <span><strong>Ensure Safety:</strong> Watch for traffic and help if runners need assistance</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-orange-500 mt-1">•</span>
              <span><strong>Manage Stations:</strong> Some positions include water/Gatorade stations</span>
            </li>
          </ul>
        </section>

        {/* Route Points Reference */}
        <section className="mt-8 rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <Route className="h-6 w-6 text-gray-500" />
              <h2 className="text-2xl font-semibold text-gray-900">Course Route Points (Reference)</h2>
            </div>
            <p className="text-sm text-gray-600">
              The 5K course has <strong>13 route points</strong> (turns and key locations). 
              Volunteer positions are grouped to cover these points efficiently with repositioning.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                    #
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                    Location / Turn
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                    Course Description
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                    Approx. Mile
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {routePoints.map((point, index) => (
                  <tr key={point.id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                      {index + 1}
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">
                      {point.location}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {point.description}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {point.mile}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Volunteer Positions */}
        <section className="mt-8 rounded-3xl border border-orange-100 bg-orange-50/30 p-8 shadow-sm">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <Users className="h-6 w-6 text-orange-500" />
              <h2 className="text-2xl font-semibold text-gray-900">Volunteer Marshal Positions</h2>
            </div>
            <p className="text-sm text-gray-600">
              <strong>7 volunteer groups needed.</strong> Each group covers specific route points, with most involving repositioning to maximize coverage.
            </p>
          </div>

          <div className="space-y-6">
            {volunteerPositions.map((position, index) => {
              const coveredPoints = position.routePoints
                .map((id) => getRoutePointDetails(id))
                .filter((p) => p !== undefined);

              return (
                <div
                  key={position.id}
                  className={`rounded-2xl border-2 p-6 transition ${
                    position.needsGatorade
                      ? 'border-blue-200 bg-blue-50/50 hover:border-blue-300 hover:shadow-md'
                      : position.importance.includes('Finish') || position.importance.includes('High visibility')
                      ? 'border-orange-200 bg-orange-50/40 hover:border-orange-300 hover:shadow-md'
                      : 'border-gray-200 bg-white hover:border-orange-200 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <div className={`rounded-xl p-3 ${
                          position.importance.includes('Finish') || position.importance.includes('High visibility')
                            ? 'bg-orange-500'
                            : position.needsGatorade
                            ? 'bg-blue-500'
                            : 'bg-gray-500'
                        }`}>
                          <span className="text-white font-bold text-lg">{index + 1}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 flex-wrap">
                            <h3 className="text-xl font-semibold text-gray-900">{position.name}</h3>
                            {position.needsGatorade && (
                              <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2.5 py-1 text-xs font-semibold text-blue-700">
                                <Droplet className="h-3 w-3" />
                                <span>Gatorade Station</span>
                              </span>
                            )}
                            {position.importance.includes('Safety') && (
                              <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2.5 py-1 text-xs font-semibold text-red-700">
                                <span>⚠️ Safety</span>
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-500 mt-1">{position.importance}</p>
                        </div>
                      </div>

                      <p className="text-sm text-gray-700 mb-4">{position.description}</p>

                      {/* Repositioning Info */}
                      <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="flex items-start gap-2">
                          <Repeat className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">
                              Repositioning Plan
                            </p>
                            <p className="text-sm text-gray-700">{position.repositioning}</p>
                          </div>
                        </div>
                      </div>

                      {/* Covered Route Points */}
                      {coveredPoints.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-3">
                            Covers Route Points:
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {coveredPoints.map((point) => {
                              const routeIndex = routePoints.findIndex((p) => p.id === point!.id);
                              return (
                                <div
                                  key={point!.id}
                                  className="inline-flex items-center gap-2 rounded-lg bg-gray-100 border border-gray-200 px-3 py-2"
                                >
                                  <span className="text-xs font-bold text-gray-700">#{routeIndex + 1}</span>
                                  <span className="text-xs font-medium text-gray-700">{point!.location.split('→')[0].trim()}</span>
                                  <span className="text-xs text-gray-500">({point!.mile} mi)</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* CTA Button */}
                      <div className="mt-6">
                        <Link
                          to="/volunteer/signup"
                          className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
                        >
                          <Users className="h-4 w-4" />
                          <span>Take This Role</span>
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Key Information */}
        <section className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-blue-200 bg-blue-50/60 p-4">
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Droplet className="h-4 w-4 text-blue-600" />
              Gatorade Station
            </h3>
            <p className="text-sm text-gray-600">Position 5: Massachusetts / Rhode Island + Rockingham Crew</p>
            <p className="text-xs text-gray-500 mt-1">Ideal location at mile 1.09 for mid-course hydration</p>
          </div>
          <div className="rounded-2xl border border-red-200 bg-red-50/60 p-4">
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <span>⚠️</span>
              Safety Position
            </h3>
            <p className="text-sm text-gray-600">Position 4: Massachusetts + Nottingham / 35th Crew</p>
            <p className="text-xs text-gray-500 mt-1">Watch for traffic at Vermont → Massachusetts turn</p>
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
                <strong>Position 5 (Massachusetts / Rhode Island + Rockingham Crew)</strong> is an ideal location for a mid-course water/Gatorade station at mile 1.09. 
                If you're able to bring Gatorade or other sports drinks for the runners, please note it in your signup!
              </p>
            </div>
          </div>
        </section>

        {/* Sign Up CTA */}
        <section className="mt-8 rounded-3xl border border-dashed border-orange-200 bg-orange-50/50 p-8 text-center shadow-sm">
          <h3 className="text-xl font-semibold text-gray-900">Ready to Help as a Marshal?</h3>
          <p className="mt-3 text-sm text-gray-600">
            Choose a position above and click "Take This Role" to sign up. Every position helps our young athletes succeed! 
            We need all 7 positions filled to ensure a safe and supportive race experience.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              to="/volunteer/signup"
              className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
            >
              <Users className="h-4 w-4" />
              <span>View All Volunteer Roles</span>
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
