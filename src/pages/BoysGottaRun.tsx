import EventVolunteerModal from '../components/EventVolunteerModal';

const BoysGottaRun = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-white">
      <div className="mx-auto max-w-5xl px-6 py-12 sm:px-8 lg:px-10">
        <div className="rounded-3xl bg-white p-8 shadow-lg ring-1 ring-gray-100">
          <div className="flex flex-col gap-4 border-b border-gray-100 pb-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-orange-500">Community Race Series</p>
              <h1 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
                Boys Gotta Run – Discovery 5K
              </h1>
              <p className="mt-3 max-w-2xl text-base text-gray-600">
                Help us create an unforgettable race day for the Discovery Elementary running crew. We’re looking
                for friendly faces to cheer, hydrate, and guide our runners along the course.
              </p>
            </div>
            <div className="shrink-0">
              <EventVolunteerModal eventSlug="boys-gotta-run-2025" eventName="Boys Gotta Run – Discovery 5K" />
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            <div className="rounded-2xl border border-gray-100 bg-orange-50/60 p-6 shadow-sm">
              <p className="text-sm font-semibold text-orange-600">Race Day</p>
              <p className="mt-2 text-2xl font-bold text-gray-900">Saturday, March 22</p>
              <p className="mt-2 text-sm text-gray-600">Call time: 6:30 AM • First wave at 8:00 AM</p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-sky-50/60 p-6 shadow-sm">
              <p className="text-sm font-semibold text-sky-600">Location</p>
              <p className="mt-2 text-2xl font-bold text-gray-900">Discovery Elementary</p>
              <p className="mt-2 text-sm text-gray-600">5275 N 36th St, Arlington, VA 22207</p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-lime-50/60 p-6 shadow-sm">
              <p className="text-sm font-semibold text-lime-600">Volunteer Roles</p>
              <ul className="mt-3 space-y-2 text-sm text-gray-700">
                <li>• Water station crew</li>
                <li>• Course marshals along the 5K route</li>
                <li>• Finish line hype squad</li>
                <li>• Setup + teardown team</li>
              </ul>
            </div>
          </div>

          <div className="mt-10 rounded-2xl border border-gray-100 bg-gray-50 p-6">
            <h2 className="text-xl font-semibold text-gray-900">What to Expect</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-white p-5 shadow-sm">
                <h3 className="text-base font-semibold text-gray-900">1. Pre-race brief</h3>
                <p className="mt-2 text-sm text-gray-600">
                  You’ll receive your role assignment, timeline, and get to know the other volunteers before the
                  first runners arrive.
                </p>
              </div>
              <div className="rounded-xl bg-white p-5 shadow-sm">
                <h3 className="text-base font-semibold text-gray-900">2. Race support</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Keep energy high, keep course directions clear, and make sure every runner feels supported from
                  start to finish.
                </p>
              </div>
              <div className="rounded-xl bg-white p-5 shadow-sm">
                <h3 className="text-base font-semibold text-gray-900">3. Celebrate the crew</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Cheer on the Boy Scouts runners, help at the medal table, and share in the post-race celebration.
                </p>
              </div>
              <div className="rounded-xl bg-white p-5 shadow-sm">
                <h3 className="text-base font-semibold text-gray-900">4. Wrap-up</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Optional: stay to help reset the space and join the team for post-race coffee and gratitude shoutouts.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 rounded-2xl border border-dashed border-orange-200 bg-orange-50/40 p-6 text-center">
            <p className="text-base font-semibold text-gray-900">
              Want to bring a friend or teammate? They can sign up through the same link. The more, the faster we
              can stage the Boys Gotta Run 5K.
            </p>
            <div className="mt-4">
              <EventVolunteerModal
                eventSlug="boys-gotta-run-2025"
                eventName="Boys Gotta Run – Discovery 5K"
                adminView
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoysGottaRun;


