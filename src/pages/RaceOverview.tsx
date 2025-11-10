import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, MapPin, Medal, ArrowRight, Map, Users, ExternalLink } from 'lucide-react';
import { BGR5K_CONFIG } from '../config/bgr5kConfig';

const RaceOverview = () => {
  const [showInteractiveMap, setShowInteractiveMap] = useState(false);

  useEffect(() => {
    document.title = 'BGR Discovery 5k';
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-white">
      <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8 lg:px-10">
        {/* Hero Section */}
        <header className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-gray-100">
          <div className="flex items-start gap-6 flex-col sm:flex-row">
            <img 
              src="/BGR_logo.avif" 
              alt="Boys Gotta Run Logo" 
              className="w-24 h-24 rounded-2xl shadow-md object-cover flex-shrink-0"
            />
            <div className="flex-1">
              <p className="text-xs uppercase tracking-[0.3em] text-orange-500">Final Run</p>
              <h1 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl">
                🏃‍♂️ Boys Gotta Run – Discovery 5K
              </h1>
              <p className="mt-4 max-w-2xl text-base text-gray-600">
                It's the final week of our Boys Gotta Run season. We're keeping it low-key, warm, and all about the kids.
                Join us for a celebratory 5K run that honors the journey and celebrates every finish.
              </p>
            </div>
          </div>
        </header>

        {/* Strava Route Map - Static image with interactive option */}
        <section className="mt-8 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <Map className="h-5 w-5 text-orange-500" />
              Course Route Map
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              {showInteractiveMap ? 'Interactive course map with elevation profile and turn-by-turn navigation.' : 'View the course route and elevation profile.'}
            </p>
            <div className="mt-3 flex flex-wrap gap-3 text-xs text-gray-500">
              <span>Distance: {BGR5K_CONFIG.distance}</span>
              <span>•</span>
              <span>Elevation: {BGR5K_CONFIG.elevation}</span>
            </div>
          </div>
          
          {!showInteractiveMap ? (
            /* Static Image */
            <div
              style={{
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              <img
                src="/StravaMap-BGR5K.png"
                alt="BGR Discovery 5K Course Map"
                className="w-full h-auto"
              />
            </div>
          ) : (
            /* Interactive Iframe */
            <div
              style={{
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              <iframe
                src="https://www.strava.com/routes/3420808564668746102/embed"
                width="100%"
                height="405"
                frameBorder="0"
                allowTransparency={true}
                scrolling="no"
                title="Strava Course Map"
              />
            </div>
          )}
          
          <div className="mt-3 flex items-center justify-between">
            <span className="text-xs text-gray-500">
              {showInteractiveMap ? 'Interactive map powered by Strava' : 'Static course preview'}
            </span>
            <div className="flex items-center gap-3">
              {!showInteractiveMap && (
                <button
                  onClick={() => setShowInteractiveMap(true)}
                  className="inline-flex items-center gap-1 text-xs text-orange-600 hover:text-orange-700 font-semibold transition"
                >
                  <Map className="h-3 w-3" />
                  <span>View Interactive Map</span>
                </button>
              )}
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
          </div>
        </section>

        {/* Quick Info Cards */}
        <section className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl border border-orange-100 bg-orange-50/60 p-6 shadow-sm">
            <CalendarDays className="h-6 w-6 text-orange-500" />
            <p className="mt-3 text-sm font-semibold uppercase tracking-wide text-orange-600">Date & Time</p>
            <p className="mt-2 text-2xl font-bold text-gray-900">Wednesday, November 12, 2025 – 7:55 AM</p>
            <p className="mt-3 text-sm text-gray-600">
              Meet at our normal spot, do a 10-minute warm-up, then start the 5K course together.
            </p>
          </div>
          <div className="rounded-3xl border border-sky-100 bg-sky-50/60 p-6 shadow-sm">
            <MapPin className="h-6 w-6 text-sky-500" />
            <p className="mt-3 text-sm font-semibold uppercase tracking-wide text-sky-600">Location</p>
            <p className="mt-2 text-2xl font-bold text-gray-900">{BGR5K_CONFIG.location}</p>
            <p className="mt-3 text-sm text-gray-600">{BGR5K_CONFIG.address}</p>
          </div>
          <div className="rounded-3xl border border-lime-100 bg-lime-50/60 p-6 shadow-sm">
            <Medal className="h-6 w-6 text-lime-500" />
            <p className="mt-3 text-sm font-semibold uppercase tracking-wide text-lime-600">Tone</p>
            <p className="mt-2 text-lg font-semibold text-gray-900">Supportive & Celebratory</p>
            <p className="mt-3 text-sm text-gray-600">
              This isn't a public race. It's our team's victory lap. Keep the vibes easy, encouraging, and fun.
            </p>
          </div>
        </section>

        {/* Main Action Buttons */}
        <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Volunteer Opportunities */}
          <Link
            to="/volunteer"
            className="group rounded-3xl border-2 border-orange-200 bg-white p-6 shadow-sm transition hover:border-orange-400 hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              <div className="rounded-2xl bg-orange-500 p-3 group-hover:bg-orange-600 transition">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">Volunteer Opportunities</h3>
                <p className="mt-1 text-sm text-gray-600">
                  Help make this run special for our young athletes
                </p>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-orange-600 transition" />
            </div>
          </Link>

          {/* Course Overview */}
          <Link
            to="/course"
            className="group rounded-3xl border-2 border-blue-200 bg-white p-6 shadow-sm transition hover:border-blue-400 hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              <div className="rounded-2xl bg-blue-500 p-3 group-hover:bg-blue-600 transition">
                <Map className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">See Course</h3>
                <p className="mt-1 text-sm text-gray-600">
                  View the route, map, and video walkthrough
                </p>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition" />
            </div>
          </Link>

          {/* Final Preps */}
          <div className="rounded-3xl border-2 border-dashed border-gray-300 bg-gray-50 p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-2xl bg-gray-400 p-3">
                <Medal className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-700">Final Preps</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Coming soon - race day checklist
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default RaceOverview;
