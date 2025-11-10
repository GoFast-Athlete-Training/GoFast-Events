import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navigation, MapPin, ArrowRight, Users, Droplet, Flag, Route } from 'lucide-react';
import { BGR5K_CONFIG } from '../config/bgr5kConfig';

/**
 * RouteOverview - Detailed view for Course Marshals
 * Shows route points and volunteer marshal positions
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

  // Volunteer Marshal Positions (to be grouped by user)
  // Each volunteer position can cover one or more route points
  // TODO: User will provide groupings - placeholder structure for now
  const volunteerPositions = [
    {
      id: 'volunteer-1',
      name: 'Marshal Position 1',
      routePoints: ['route-1', 'route-2'], // Which route points this volunteer covers
      description: 'Covers the start and first section of the course.',
      needsGatorade: false,
      notes: 'TODO: User will specify which route points this position covers',
    },
    // More positions will be added based on user's groupings
  ];

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
            You'll be positioned at key points along the course to provide direction, encouragement, and support.
          </p>
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> The course has <strong>13 route points</strong> (turns and key locations). 
              Volunteers will be grouped into positions that cover one or more route points. 
              See the route points reference below, then the volunteer positions you can sign up for.
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
              These are shown below for reference. Volunteer positions will be grouped to cover these points.
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

        {/* Volunteer Positions (Grouped) */}
        <section className="mt-8 rounded-3xl border border-orange-100 bg-orange-50/30 p-8 shadow-sm">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <Users className="h-6 w-6 text-orange-500" />
              <h2 className="text-2xl font-semibold text-gray-900">Volunteer Marshal Positions</h2>
            </div>
            <p className="text-sm text-gray-600">
              <strong>Volunteer positions will be grouped from the route points above.</strong> 
              Each volunteer position covers one or more route points. 
              Sign up for a position below to help cover the course.
            </p>
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
              <p className="text-sm text-yellow-800">
                ⚠️ <strong>Position groupings pending:</strong> Volunteer positions will be configured based on how you want to group the 13 route points. 
                Once configured, each position will show which route points it covers.
              </p>
            </div>
          </div>

          {/* Placeholder for volunteer positions */}
          <div className="space-y-4">
            {volunteerPositions.length > 0 ? (
              volunteerPositions.map((position) => {
                const coveredPoints = routePoints.filter((p) => position.routePoints.includes(p.id));
                return (
                  <div
                    key={position.id}
                    className="rounded-2xl border-2 border-orange-200 bg-white p-6 hover:border-orange-300 hover:shadow-md transition"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="rounded-xl bg-orange-500 p-2">
                            <Navigation className="h-5 w-5 text-white" />
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900">{position.name}</h3>
                          {position.needsGatorade && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-700">
                              <Droplet className="h-3 w-3" />
                              <span>Gatorade</span>
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-4">{position.description}</p>
                        {coveredPoints.length > 0 && (
                          <div className="mt-4 pt-4 border-t border-gray-200">
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                              Covers Route Points:
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {coveredPoints.map((point, idx) => (
                                <span
                                  key={point.id}
                                  className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700"
                                >
                                  #{routePoints.indexOf(point) + 1} {point.location.split('→')[0].trim()}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        {position.notes && (
                          <p className="mt-3 text-xs text-gray-500 italic">{position.notes}</p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 p-8 text-center">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-sm font-medium text-gray-600 mb-2">
                  Volunteer positions will be configured here
                </p>
                <p className="text-xs text-gray-500">
                  Once you provide the groupings, volunteer positions will appear here with which route points they cover.
                </p>
              </div>
            )}
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
                Some marshal positions are ideal for water/Gatorade stations (e.g., around mile 1.09 at the mid-course point). 
                If you're able to bring Gatorade or other sports drinks for the runners, please note it in your signup!
              </p>
            </div>
          </div>
        </section>

        {/* Sign Up CTA */}
        <section className="mt-8 rounded-3xl border border-dashed border-orange-200 bg-orange-50/50 p-8 text-center shadow-sm">
          <h3 className="text-xl font-semibold text-gray-900">Ready to Help as a Marshal?</h3>
          <p className="mt-3 text-sm text-gray-600">
            Once volunteer positions are configured, you'll be able to sign up for a specific position that covers one or more route points.
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
