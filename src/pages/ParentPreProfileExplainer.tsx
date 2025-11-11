import { useState } from 'react';
import { signInWithGoogle } from '../config/firebase';
import { Heart, ArrowRight } from 'lucide-react';

const ParentPreProfileExplainer = () => {
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    try {
      setLoading(true);
      await signInWithGoogle();
      // Navigation will happen automatically via auth state change
    } catch (error) {
      console.error('Sign up error:', error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-white">
      <div className="mx-auto max-w-2xl px-6 py-12 sm:px-8 lg:px-10">
        <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-gray-100">
          <div className="text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-100">
              <Heart className="h-8 w-8 text-purple-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">
              Connect with Your Athlete
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              This isn't about signing up — it's about connecting. We'll help you set goals 
              together and celebrate results after race day.
            </p>
          </div>

          <div className="mt-8 space-y-4">
            <div className="rounded-xl border border-purple-100 bg-purple-50/50 p-4">
              <h3 className="font-semibold text-gray-900">What You'll Do</h3>
              <ul className="mt-2 space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-purple-600">✓</span>
                  <span>Create a quick parent profile (just your name and email)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600">✓</span>
                  <span>Add your young athlete's info (name, grade, school)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600">✓</span>
                  <span>Sit together and set a goal for race day</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600">✓</span>
                  <span>After the race, link your Garmin run to see results</span>
                </li>
              </ul>
            </div>

            <button
              onClick={handleSignUp}
              disabled={loading}
              className="w-full rounded-xl bg-purple-600 px-6 py-4 text-base font-semibold text-white transition hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign In with Google</span>
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </button>

            <p className="text-center text-xs text-gray-500">
              We'll use your Google account to securely store your information. 
              You can sign out anytime.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentPreProfileExplainer;

