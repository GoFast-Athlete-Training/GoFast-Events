import { useState } from 'react';
import { signInWithGoogle, signInWithEmail, signUpWithEmail } from '../config/firebase';
import { Heart, ArrowRight, Mail } from 'lucide-react';

const ParentPreProfileExplainer = () => {
  const [loading, setLoading] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError('');
      await signInWithGoogle();
      // Navigation will happen automatically via auth state change
    } catch (error: any) {
      console.error('Google sign in error:', error);
      setError(error.message || 'Failed to sign in with Google');
      setLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter email and password');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      if (isSignUp) {
        await signUpWithEmail(email, password);
      } else {
        await signInWithEmail(email, password);
      }
      // Navigation will happen automatically via auth state change
    } catch (error: any) {
      console.error('Email auth error:', error);
      setError(error.message || `Failed to ${isSignUp ? 'sign up' : 'sign in'}`);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-500 via-red-500 to-pink-500">
      <div className="mx-auto max-w-2xl px-6 py-12 sm:px-8 lg:px-10">
        <div className="rounded-3xl bg-white p-8 shadow-xl ring-1 ring-gray-100">
          <div className="text-center">
            {/* Young Racer Image */}
            <div className="mx-auto mb-6 overflow-hidden rounded-2xl">
              <img 
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&crop=center" 
                alt="Young runner" 
                className="w-full h-48 object-cover"
              />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Before We Connect
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Before we get you to the connect form, we need to create an account for privacy and security. 
              This keeps your family's information safe.
            </p>
          </div>

          <div className="mt-8 space-y-4">
            <div className="rounded-xl border border-orange-100 bg-orange-50/50 p-4">
              <h3 className="font-semibold text-gray-900">What You'll Do</h3>
              <ul className="mt-2 space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 font-bold">✓</span>
                  <span>Create a quick parent profile (just your name and email)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 font-bold">✓</span>
                  <span>Add your young athlete's info (name, grade, school)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 font-bold">✓</span>
                  <span>Sit together and set a goal for race day</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 font-bold">✓</span>
                  <span>After the race, link your Garmin run to see results</span>
                </li>
              </ul>
            </div>

            {!showEmailForm ? (
              <>
                <button
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                  className="w-full rounded-xl bg-gradient-to-r from-orange-600 to-red-600 px-6 py-4 text-base font-semibold text-white transition hover:from-orange-700 hover:to-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
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

                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or</span>
                  </div>
                </div>

                <button
                  onClick={() => setShowEmailForm(true)}
                  disabled={loading}
                  className="w-full rounded-xl border-2 border-orange-600 bg-white px-6 py-4 text-base font-semibold text-orange-600 transition hover:bg-orange-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Mail className="h-5 w-5" />
                  <span>Sign In with Email</span>
                </button>
              </>
            ) : (
              <form onSubmit={handleEmailAuth} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
                    placeholder="••••••••"
                  />
                </div>

                {error && (
                  <div className="rounded-lg bg-red-50 border border-red-200 p-3">
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-gradient-to-r from-orange-600 to-red-600 px-6 py-4 text-base font-semibold text-white transition hover:from-orange-700 hover:to-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
                >
                  {loading ? (
                    <>
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      <span>{isSignUp ? 'Signing up...' : 'Signing in...'}</span>
                    </>
                  ) : (
                    <>
                      <span>{isSignUp ? 'Sign Up' : 'Sign In'}</span>
                      <ArrowRight className="h-5 w-5" />
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowEmailForm(false);
                    setError('');
                    setEmail('');
                    setPassword('');
                  }}
                  className="w-full text-sm text-gray-600 hover:text-gray-900"
                >
                  ← Back to Google Sign In
                </button>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setIsSignUp(!isSignUp)}
                    className="text-sm text-orange-600 hover:text-orange-700"
                  >
                    {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
                  </button>
                </div>
              </form>
            )}

            <p className="text-center text-xs text-gray-500">
              Your account keeps your family's information private and secure. 
              You can sign out anytime.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentPreProfileExplainer;

