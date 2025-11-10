import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

const FinalPreps = () => {
  useEffect(() => {
    document.title = 'BGR Discovery 5k - Final Preps';
  }, []);

  const preps = [
    'Stretch',
    'Drink water',
    'Know your pace',
    "Don't go out too fast",
    'Remember - half of running is mental',
    'Have fun!',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-white">
      <div className="mx-auto max-w-4xl px-6 py-12 sm:px-8 lg:px-10">
        {/* Header */}
        <header className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-orange-600 hover:text-orange-700 transition mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Race Overview</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            🎯 Final Preps
          </h1>
          <p className="mt-4 text-base text-gray-600">
            Get ready for race day! Here's your checklist to make sure you're prepared and ready to have fun.
          </p>
        </header>

        {/* Preps List */}
        <section className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
          <div className="space-y-4">
            {preps.map((prep, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-gray-50 transition"
              >
                <div className="flex-shrink-0 mt-0.5">
                  <CheckCircle2 className="h-6 w-6 text-orange-500" />
                </div>
                <p className="text-lg font-medium text-gray-900 flex-1">
                  {prep}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Encouragement */}
        <section className="mt-8 rounded-3xl border border-dashed border-orange-200 bg-orange-50/50 p-8 text-center shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900">You've Got This!</h2>
          <p className="mt-3 text-sm text-gray-600">
            You've worked hard for 7 weeks. This is your moment to show what you can do. 
            Trust your training, trust yourself, and most importantly - have fun!
          </p>
        </section>

        {/* Navigation */}
        <section className="mt-8 flex flex-wrap gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-orange-200 hover:text-orange-600"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Race Overview</span>
          </Link>
        </section>
      </div>
    </div>
  );
};

export default FinalPreps;

