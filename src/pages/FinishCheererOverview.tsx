import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trophy, ArrowRight, Users, Droplet } from 'lucide-react';

const FinishCheererOverview = () => {
  useEffect(() => {
    document.title = 'BGR Discovery 5k - Finish Line & Water Station';
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-lime-50 via-white to-white">
      <div className="mx-auto max-w-5xl px-6 py-12 sm:px-8 lg:px-10">
        {/* Hero Section */}
        <header className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-gray-100">
          <p className="text-xs uppercase tracking-[0.3em] text-lime-500">Volunteer Role</p>
          <h1 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl">
            🎉 Finish Line Cheerers & Water Station
          </h1>
          <p className="mt-4 max-w-2xl text-base text-gray-600">
            Be part of the celebration! Finish line cheerers hold the banner, cheer loudly, and celebrate every finish. 
            Water station volunteers keep runners hydrated and energized throughout the course.
          </p>
        </header>

        {/* What Finish Cheerers Do */}
        <section className="mt-8 rounded-3xl border border-lime-100 bg-lime-50/60 p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">What Finish Line Cheerers Do</h2>
          <ul className="space-y-3 text-sm text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-lime-500 mt-1">•</span>
              <span><strong>Hold the Banner:</strong> Create a memorable finish line experience</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-lime-500 mt-1">•</span>
              <span><strong>Celebrate Every Finish:</strong> Cheer loudly and enthusiastically for every runner</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-lime-500 mt-1">•</span>
              <span><strong>Create Energy:</strong> Build excitement and motivation for runners approaching the finish</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-lime-500 mt-1">•</span>
              <span><strong>Capture Moments:</strong> Help create lasting memories for our young athletes</span>
            </li>
          </ul>
        </section>

        {/* Water Station Info */}
        <section className="mt-8 rounded-3xl border border-blue-100 bg-blue-50/60 p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="rounded-2xl bg-blue-500 p-3">
              <Droplet className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900">Water Station Volunteers</h2>
              <p className="mt-2 text-sm text-gray-600">
                Water station volunteers set up cups, keep runners hydrated, and provide encouragement as athletes pass by. 
                Some stations may also need Gatorade or other sports drinks.
              </p>
              <div className="mt-4 p-4 bg-white rounded-xl border border-blue-200">
                <p className="text-sm font-medium text-blue-900 mb-2">💡 Can You Bring Gatorade?</p>
                <p className="text-sm text-blue-700">
                  If you're able to bring Gatorade or other sports drinks for the water station, please note it in your signup! 
                  This helps keep our runners hydrated and energized.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Roles Available */}
        <section className="mt-8 rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">Available Roles</h2>
            <p className="mt-2 text-sm text-gray-600">
              Choose the role that fits best for you.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 hover:border-lime-200 hover:shadow-md transition">
              <div className="flex items-center gap-3 mb-4">
                <Trophy className="h-6 w-6 text-lime-500" />
                <h3 className="font-semibold text-gray-900">Finish Line Holder</h3>
              </div>
              <p className="text-sm text-gray-600">
                Hold the finish line banner and cheer on every runner as they cross the finish line. 
                Create an unforgettable moment for our young athletes.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 hover:border-blue-200 hover:shadow-md transition">
              <div className="flex items-center gap-3 mb-4">
                <Droplet className="h-6 w-6 text-blue-500" />
                <h3 className="font-semibold text-gray-900">Water Station Crew</h3>
              </div>
              <p className="text-sm text-gray-600">
                Set up water stations, keep runners hydrated, and provide encouragement. 
                Option to bring Gatorade for extra support.
              </p>
            </div>
          </div>
        </section>

        {/* Sign Up CTA */}
        <section className="mt-8 rounded-3xl border border-dashed border-lime-200 bg-lime-50/50 p-8 text-center shadow-sm">
          <h3 className="text-xl font-semibold text-gray-900">Ready to Celebrate Our Runners?</h3>
          <p className="mt-3 text-sm text-gray-600">
            Help make the finish line memorable and keep our runners hydrated. Every role helps create an amazing experience!
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              to="/volunteer/signup"
              className="inline-flex items-center gap-2 rounded-full bg-lime-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:bg-lime-600 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:ring-offset-2"
            >
              <Users className="h-4 w-4" />
              <span>Sign Up for Finish Line / Water Station</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* Navigation */}
        <section className="mt-8 flex flex-wrap gap-4">
          <Link
            to="/volunteer"
            className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-lime-200 hover:text-lime-600"
          >
            <ArrowRight className="h-4 w-4 rotate-180" />
            <span>Back to Volunteer Overview</span>
          </Link>
        </section>
      </div>
    </div>
  );
};

export default FinishCheererOverview;

