import { Link } from 'react-router-dom';
import { Heart, Target, Trophy, ArrowRight } from 'lucide-react';

const Engagement = () => {
  return (
    <section className="mt-8 rounded-3xl border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-red-50 p-8 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="rounded-2xl bg-gradient-to-br from-orange-600 to-red-600 p-4 shadow-lg">
          <Heart className="h-8 w-8 text-white" />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-900">
            Pre- and Post-Race Engagement
          </h2>
          <p className="mt-2 text-base text-gray-700">
            This isn't about signing up — it's about connecting. Take time to sit with your athlete, 
            set a goal, and see Garmin results after the race.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="flex items-start gap-3">
              <Target className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-900">Set Goals Together</p>
                <p className="mt-1 text-sm text-gray-600">
                  Talk about pace, how they want to feel, and who they're running for.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Trophy className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-900">See Results</p>
                <p className="mt-1 text-sm text-gray-600">
                  After race day, link your Garmin run and see it on the leaderboard.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              to="/5k-results"
              onClick={() => window.scrollTo(0, 0)}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-600 to-red-600 px-6 py-3 text-base font-semibold text-white transition hover:from-orange-700 hover:to-red-700 shadow-lg"
            >
              <span>Start Here</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              to="/5k-results/leaderboard"
              onClick={() => window.scrollTo(0, 0)}
              className="inline-flex items-center gap-2 rounded-xl border-2 border-orange-600 bg-white px-6 py-3 text-base font-semibold text-orange-600 transition hover:bg-orange-50 shadow-lg"
            >
              <Trophy className="h-5 w-5" />
              <span>See Results</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Engagement;

