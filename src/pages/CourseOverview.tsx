import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Map, ExternalLink, ChevronDown, ChevronUp, Navigation, ArrowRight, Users, Route } from 'lucide-react';
import { BGR5K_CONFIG } from '../config/bgr5kConfig';

const CourseOverview = () => {
  const [showMapDetails, setShowMapDetails] = useState(false);

  useEffect(() => {
    document.title = 'BGR Discovery 5k - Course Overview';
  }, []);

  // Google Maps search URL (no API key needed)
  const mapSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(BGR5K_CONFIG.address)}`;

  // YouTube embed URL - extract video ID from the full URL
  const youtubeVideoId = 'Xu6qPu2frNk';
  const youtubeEmbedUrl = `https://www.youtube.com/embed/${youtubeVideoId}`;

  // All route points along the course
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-white">
      <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8 lg:px-10">
        {/* Hero Section */}
        <header className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-gray-100">
          <p className="text-xs uppercase tracking-[0.3em] text-blue-500">Course Details</p>
          <h1 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl">
            🗺️ Discovery 5K Course Overview
          </h1>
          <p className="mt-4 max-w-2xl text-base text-gray-600">
            Get familiar with the course route, check out the video walkthrough, and see all the turns and key locations along the 5K course.
          </p>
        </header>

        {/* Video Explainer Section */}
        <section className="mt-8 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="mb-4">
            <h2 className="text-2xl font-semibold text-gray-900">Course Walkthrough Video</h2>
            <p className="mt-2 text-sm text-gray-600">
              Watch this video to see the course route and understand where volunteers will be positioned.
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden border border-gray-200 bg-black aspect-video">
            <iframe
              width="100%"
              height="100%"
              src={youtubeEmbedUrl}
              title="Discovery 5K Course Walkthrough"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="aspect-video"
            ></iframe>
          </div>
        </section>

        {/* Route Information */}
        <section className="mt-8 rounded-3xl border border-blue-100 bg-blue-50/60 p-6 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="rounded-2xl bg-blue-500 p-3">
                <Map className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">5K Course Route</h2>
                <p className="mt-1 text-sm text-gray-600">Boys on Run 5K Fall 2025</p>
                <div className="mt-3 flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-700">Distance:</span>
                    <span className="text-gray-600">{BGR5K_CONFIG.distance}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-700">Elevation:</span>
                    <span className="text-gray-600">{BGR5K_CONFIG.elevation}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-700">Difficulty:</span>
                    <span className="inline-flex items-center rounded-full bg-lime-100 px-2 py-1 text-xs font-semibold text-lime-700">
                      {BGR5K_CONFIG.difficulty}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <a
              href={BGR5K_CONFIG.stravaRouteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-2.5 text-sm font-semibold text-blue-600 transition hover:border-blue-300 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              <span>View Full Route</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </section>

        {/* Route Points Table */}
        <section className="mt-8 rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <Route className="h-6 w-6 text-gray-500" />
              <h2 className="text-2xl font-semibold text-gray-900">Course Route Points</h2>
            </div>
            <p className="text-sm text-gray-600">
              The 5K course has <strong>13 route points</strong> (turns and key locations) that need volunteer marshals.
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

        {/* Interactive Map Section */}
        <section className="mt-8 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-blue-500 p-3">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Race Location</h2>
                <p className="mt-1 text-sm text-gray-600">{BGR5K_CONFIG.location}</p>
                <p className="text-sm text-gray-500">{BGR5K_CONFIG.address}</p>
              </div>
            </div>
            <button
              onClick={() => setShowMapDetails(!showMapDetails)}
              className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition hover:border-blue-200 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              {showMapDetails ? (
                <>
                  <span>Hide Map</span>
                  <ChevronUp className="h-4 w-4" />
                </>
              ) : (
                <>
                  <span>Show Map</span>
                  <ChevronDown className="h-4 w-4" />
                </>
              )}
            </button>
          </div>

          {showMapDetails && (
            <div className="mt-6 rounded-2xl overflow-hidden border border-gray-200 bg-gray-50">
              <div className="aspect-video bg-gray-200 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-sm font-medium text-gray-600 mb-2">{BGR5K_CONFIG.location}</p>
                  <p className="text-xs text-gray-500 mb-4">{BGR5K_CONFIG.address}</p>
                  <a
                    href={mapSearchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-blue-500 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-blue-600 transition"
                  >
                    <Map className="h-4 w-4" />
                    <span>View on Google Maps</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
              <div className="bg-white px-4 py-3 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  Click the button above to open the location in Google Maps for directions and more details.
                </p>
              </div>
            </div>
          )}
        </section>

        {/* Marshal Volunteer CTA */}
        <section className="mt-8 rounded-3xl border border-orange-100 bg-orange-50/60 p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="rounded-2xl bg-orange-500 p-3">
              <Navigation className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900">Become a Course Marshal</h2>
              <p className="mt-2 text-sm text-gray-600">
                We need volunteers to position themselves at key points along the course to guide runners and provide encouragement. 
                Marshals help ensure runners stay on course and cheer them on at critical turns.
              </p>
              <div className="mt-4">
                <Link
                  to="/volunteer/marshal"
                  className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
                >
                  <Users className="h-4 w-4" />
                  <span>Sign Up as a Marshal</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation Links */}
        <section className="mt-8 flex flex-wrap gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-orange-200 hover:text-orange-600"
          >
            <ArrowRight className="h-4 w-4 rotate-180" />
            <span>Back to Welcome</span>
          </Link>
          <Link
            to="/volunteer"
            className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white shadow-lg transition hover:bg-orange-600"
          >
            <span>View All Volunteer Roles</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      </div>
    </div>
  );
};

export default CourseOverview;
