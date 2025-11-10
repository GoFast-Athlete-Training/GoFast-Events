import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Map, ExternalLink, ChevronDown, ChevronUp, Navigation, ArrowRight, Users } from 'lucide-react';
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-white">
      <div className="mx-auto max-w-5xl px-6 py-12 sm:px-8 lg:px-10">
        {/* Hero Section */}
        <header className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-gray-100">
          <p className="text-xs uppercase tracking-[0.3em] text-blue-500">Course Details</p>
          <h1 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl">
            🗺️ Discovery 5K Course Overview
          </h1>
          <p className="mt-4 max-w-2xl text-base text-gray-600">
            Get familiar with the course route, check out the video walkthrough, and see where our volunteer marshals will be positioned.
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

        {/* Marshal Volunteer Section */}
        <section className="mt-8 rounded-3xl border border-orange-100 bg-orange-50/60 p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="rounded-2xl bg-orange-500 p-3">
              <Navigation className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900">Course Marshals</h2>
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

