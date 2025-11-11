import { Link } from 'react-router-dom';
import { Heart, Target, Trophy, ArrowRight } from 'lucide-react';

const Engagement = () => {
  return (
    <section className="mt-8 rounded-3xl border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50 p-8 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="rounded-2xl bg-purple-500 p-4">
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
              <Target className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-900">Set Goals Together</p>
                <p className="mt-1 text-sm text-gray-600">
                  Talk about pace, how they want to feel, and who they're running for.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Trophy className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-900">See Results</p>
                <p className="mt-1 text-sm text-gray-600">
                  After race day, link your Garmin run and see it on the leaderboard.
                </p>
              </div>
            </div>
          </div>
          <Link
            to="/engagement"
            onClick={() => window.scrollTo(0, 0)}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-purple-600 px-6 py-3 text-base font-semibold text-white transition hover:bg-purple-700"
          >
            <span>Start Here</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Engagement;

