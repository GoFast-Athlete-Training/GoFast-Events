import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, MapPin, Medal, ArrowRight, Map } from 'lucide-react';
import { BGR5K_CONFIG } from '../config/bgr5kConfig.js';

const RaceOverview = () => {
  useEffect(() => {
    document.title = 'BGR Discovery 5k';
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-white">
      <div className="mx-auto max-w-5xl px-6 py-12 sm:px-8 lg:px-10">
        {/* Hero Section */}
        <header className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-gray-100">
          <p className="text-xs uppercase tracking-[0.3em] text-orange-500">Final Run</p>
          <h1 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl">
            🏃‍♂️ Boys Gotta Run – Discovery 5K
          </h1>
          <p className="mt-4 max-w-2xl text-base text-gray-600">
            It's the final week of our Boys Gotta Run season. We're keeping it low-key, warm, and all about the kids.
            Join us for a celebratory 5K run that honors the journey and celebrates every finish.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              to="/volunteer"
              className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
            >
              <span>Volunteer Opportunities</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
                   <a
                     href={BGR5K_CONFIG.stravaRouteUrl}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-orange-200 hover:text-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:ring-offset-2"
                   >
                     <Map className="h-4 w-4" />
                     <span>View 5K Course Map</span>
                   </a>
          </div>
        </header>

        {/* Race Details */}
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
                    <span className="text-gray-600">3.2 mi</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-700">Elevation:</span>
                    <span className="text-gray-600">300 ft</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-700">Difficulty:</span>
                    <span className="inline-flex items-center rounded-full bg-lime-100 px-2 py-1 text-xs font-semibold text-lime-700">
                      Easy
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <a
              href={EVENT_CONFIG.stravaRouteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-2.5 text-sm font-semibold text-blue-600 transition hover:border-blue-300 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              <span>View Full Route</span>
            </a>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-10 rounded-3xl border border-dashed border-orange-200 bg-orange-50/50 p-8 text-center shadow-sm">
          <h3 className="text-xl font-semibold text-gray-900">Volunteers Make This Run Special</h3>
          <p className="mt-3 text-sm text-gray-600">
            We need volunteers to help guide, cheer, and celebrate our runners. Every role matters, and every volunteer makes a difference.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              to="/volunteer"
              className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
            >
              <span>View Volunteer Opportunities</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default RaceOverview;

