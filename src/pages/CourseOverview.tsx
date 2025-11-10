import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Map, ChevronDown, ChevronUp, Navigation, ArrowRight, Users, Route, Video, Play, ExternalLink } from 'lucide-react';
import { BGR5K_CONFIG } from '../config/bgr5kConfig';
import { ROUTE_POINTS } from '../config/boysonrun5kvolunteerconfig';
import CourseTurnsModal from '../components/CourseTurnsModal';

const CourseOverview = () => {
  const [showMapDetails, setShowMapDetails] = useState(false);
  const [showTurnsModal, setShowTurnsModal] = useState(false);

  useEffect(() => {
    document.title = 'BGR Discovery 5k - Course Overview';
  }, []);

  // Google Maps search URL (no API key needed)
  const mapSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(BGR5K_CONFIG.address)}`;

  // YouTube embed URL - extract video ID from the full URL
  const youtubeVideoId = 'Xu6qPu2frNk';
  const youtubeEmbedUrl = `https://www.youtube.com/embed/${youtubeVideoId}`;
  const youtubeWatchUrl = `https://youtu.be/${youtubeVideoId}`;

  // Extract route ID from Strava URL for embed
  // URL format: https://www.strava.com/routes/3420808564668746102
  const stravaRouteId = BGR5K_CONFIG.stravaRouteUrl.split('/routes/')[1]?.split('?')[0] || '';
  const stravaEmbedUrl = stravaRouteId 
    ? `https://www.strava.com/routes/${stravaRouteId}/embed`
    : null;

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-white">
        <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8 lg:px-10">
          {/* Hero Section */}
          <header className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-gray-100">
            <p className="text-xs uppercase tracking-[0.3em] text-blue-500">Course Details</p>
            <h1 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl">
              🗺️ Discovery 5K Course Overview
            </h1>
            <p className="mt-4 max-w-2xl text-base text-gray-600">
              Get familiar with the course route, check out the video walkthrough, see the Strava route map, and explore all the turns and key locations along the 5K course.
            </p>
          </header>

          {/* Strava Route Map Embed - Above Video */}
          {stravaEmbedUrl && (
            <section className="mt-8 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <Map className="h-5 w-5 text-orange-500" />
                  Course Route Map
                </h2>
                <p className="mt-1 text-sm text-gray-600">
                  Interactive course map with elevation profile and turn-by-turn navigation.
                </p>
                <div className="mt-3 flex flex-wrap gap-3 text-xs text-gray-500">
                  <span>Distance: {BGR5K_CONFIG.distance}</span>
                  <span>•</span>
                  <span>Elevation: {BGR5K_CONFIG.elevation}</span>
                </div>
              </div>
              <div className="rounded-xl overflow-hidden border border-gray-200 bg-white">
                <iframe
                  height="405"
                  width="100%"
                  frameBorder="0"
                  allowTransparency={true}
                  scrolling="no"
                  src={stravaEmbedUrl}
                  title="Strava Route Map"
                  className="w-full"
                  style={{ minHeight: '405px' }}
                />
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs text-gray-500">
                  Interactive map powered by Strava
                </span>
                <a
                  href={BGR5K_CONFIG.stravaRouteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-orange-600 hover:text-orange-700 font-medium transition"
                >
                  <span>Open in Strava</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </section>
          )}

          {/* Video Explainer Section - Smaller */}
          <section className="mt-6 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
            <div className="mb-3">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Video className="h-5 w-5 text-blue-500" />
                Course Walkthrough Video
              </h2>
              <p className="mt-1 text-xs text-gray-600">
                Watch this video to see the course route and understand where volunteers will be positioned.
              </p>
            </div>
            <div className="rounded-xl overflow-hidden border border-gray-200 bg-black" style={{ maxWidth: '560px', margin: '0 auto' }}>
              <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
                <iframe
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                  src={youtubeEmbedUrl}
                  title="Discovery 5K Course Walkthrough"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </section>

          {/* Route Information - Simplified */}
          <section className="mt-6 rounded-xl border border-blue-100 bg-blue-50/60 p-4 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-blue-500 p-2">
                  <Map className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-gray-900">5K Course Route</h2>
                  <div className="mt-1 flex flex-wrap gap-3 text-xs">
                    <span className="text-gray-600">Distance: {BGR5K_CONFIG.distance}</span>
                    <span className="text-gray-600">Elevation: {BGR5K_CONFIG.elevation}</span>
                    <span className="inline-flex items-center rounded-full bg-lime-100 px-2 py-0.5 text-xs font-semibold text-lime-700">
                      {BGR5K_CONFIG.difficulty}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowTurnsModal(true)}
                className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-3 py-1.5 text-xs font-semibold text-blue-600 transition hover:border-blue-300 hover:bg-blue-50"
              >
                <Route className="h-3 w-3" />
                <span>View All Turns</span>
              </button>
            </div>
          </section>

          {/* Specific Turn Outlook */}
          <section className="mt-8 rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Route className="h-6 w-6 text-gray-500" />
                  <h2 className="text-2xl font-semibold text-gray-900">Course Route Points</h2>
                </div>
                <button
                  onClick={() => setShowTurnsModal(true)}
                  className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-orange-200 hover:text-orange-600"
                >
                  <span>View All 13 Turns</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-2 text-sm text-gray-600">
                The 5K course has <strong>13 route points</strong> (turns and key locations) that need volunteer marshals. 
                Click "View All 13 Turns" to see the complete breakdown.
              </p>
            </div>

            {/* Preview of first 5 turns */}
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
                  {ROUTE_POINTS.slice(0, 5).map((point, index) => (
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
            <div className="mt-4 text-center">
              <button
                onClick={() => setShowTurnsModal(true)}
                className="inline-flex items-center gap-2 text-sm font-semibold text-orange-600 hover:text-orange-700 transition"
              >
                <span>View all 13 route points →</span>
              </button>
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

          {/* Additional CTAs */}
          <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* Marshal Volunteer CTA */}
            <Link
              to="/volunteer/marshal"
              className="group rounded-3xl border-2 border-orange-200 bg-white p-6 shadow-sm transition hover:border-orange-400 hover:shadow-md"
            >
              <div className="flex items-center gap-4">
                <div className="rounded-2xl bg-orange-500 p-3 group-hover:bg-orange-600 transition">
                  <Navigation className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">Become a Marshal</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Sign up to guide runners at key turns
                  </p>
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-orange-600 transition" />
              </div>
            </Link>

            {/* Volunteer Overview CTA */}
            <Link
              to="/volunteer"
              className="group rounded-3xl border-2 border-purple-200 bg-white p-6 shadow-sm transition hover:border-purple-400 hover:shadow-md"
            >
              <div className="flex items-center gap-4">
                <div className="rounded-2xl bg-purple-500 p-3 group-hover:bg-purple-600 transition">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">All Volunteer Roles</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    See all ways to help
                  </p>
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-purple-600 transition" />
              </div>
            </Link>

            {/* Race Overview CTA */}
            <Link
              to="/"
              className="group rounded-3xl border-2 border-blue-200 bg-white p-6 shadow-sm transition hover:border-blue-400 hover:shadow-md"
            >
              <div className="flex items-center gap-4">
                <div className="rounded-2xl bg-blue-500 p-3 group-hover:bg-blue-600 transition">
                  <Play className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">Race Overview</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Back to welcome page
                  </p>
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition" />
              </div>
            </Link>
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

      {/* Course Turns Modal */}
      <CourseTurnsModal
        isOpen={showTurnsModal}
        onClose={() => setShowTurnsModal(false)}
        routePoints={ROUTE_POINTS}
      />
    </>
  );
};

export default CourseOverview;
