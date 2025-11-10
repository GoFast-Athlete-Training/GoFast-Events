import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Zap, ArrowRight, Users } from 'lucide-react';

const PacerOverview = () => {
  useEffect(() => {
    document.title = 'BGR Discovery 5k - Pacers';
  }, []);

  const pacerTypes = [
    {
      id: 'pacers-fast',
      name: 'Pacers – Fast',
      description: 'Lead the front group and keep the energy high from the first stride. Help fast runners maintain their pace and push through.',
      pace: 'Fast pace (sub-7 min/mile)',
    },
    {
      id: 'pacers-medium',
      name: 'Pacers – Medium',
      description: 'Support steady runners and help them hold a comfortable pace. Perfect for runners aiming for a consistent effort.',
      pace: 'Medium pace (7-9 min/mile)',
    },
    {
      id: 'pacers-finish',
      name: 'Pacers – Finish Crew',
      description: 'Stay positive with runners who are focused on finishing strong. Provide encouragement and support for all paces.',
      pace: 'Any pace - focus on encouragement',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-white">
      <div className="mx-auto max-w-5xl px-6 py-12 sm:px-8 lg:px-10">
        {/* Hero Section */}
        <header className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-gray-100">
          <p className="text-xs uppercase tracking-[0.3em] text-purple-500">Volunteer Role</p>
          <h1 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl">
            ⚡ Pacers
          </h1>
          <p className="mt-4 max-w-2xl text-base text-gray-600">
            Pacers help our young athletes maintain their pace, stay motivated, and finish strong. 
            Whether you're leading the front pack or encouraging runners at the back, your support makes a difference.
          </p>
        </header>

        {/* What Pacers Do */}
        <section className="mt-8 rounded-3xl border border-purple-100 bg-purple-50/60 p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">What Pacers Do</h2>
          <ul className="space-y-3 text-sm text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-purple-500 mt-1">•</span>
              <span><strong>Set the Pace:</strong> Help runners maintain a consistent, appropriate pace</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-purple-500 mt-1">•</span>
              <span><strong>Provide Motivation:</strong> Encourage runners throughout the course</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-purple-500 mt-1">•</span>
              <span><strong>Offer Support:</strong> Be a friendly presence and help if runners need assistance</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-purple-500 mt-1">•</span>
              <span><strong>Celebrate Finishes:</strong> Help runners feel accomplished when they cross the finish line</span>
            </li>
          </ul>
        </section>

        {/* Pacer Types */}
        <section className="mt-8 rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">Pacer Types</h2>
            <p className="mt-2 text-sm text-gray-600">
              Choose the pacing role that matches your running style and the support you want to provide.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {pacerTypes.map((pacer) => (
              <div
                key={pacer.id}
                className="rounded-2xl border border-gray-200 bg-gray-50 p-6 hover:border-purple-200 hover:shadow-md transition"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Zap className="h-6 w-6 text-purple-500" />
                  <h3 className="font-semibold text-gray-900">{pacer.name}</h3>
                </div>
                <p className="text-sm font-medium text-purple-700 mb-3">{pacer.pace}</p>
                <p className="text-sm text-gray-600">{pacer.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Sign Up CTA */}
        <section className="mt-8 rounded-3xl border border-dashed border-purple-200 bg-purple-50/50 p-8 text-center shadow-sm">
          <h3 className="text-xl font-semibold text-gray-900">Ready to Pace Our Runners?</h3>
          <p className="mt-3 text-sm text-gray-600">
            Help our young athletes achieve their goals by pacing them through the 5K course.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              to="/volunteer/signup"
              className="inline-flex items-center gap-2 rounded-full bg-purple-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2"
            >
              <Users className="h-4 w-4" />
              <span>Sign Up as a Pacer</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* Navigation */}
        <section className="mt-8 flex flex-wrap gap-4">
          <Link
            to="/volunteer"
            className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-purple-200 hover:text-purple-600"
          >
            <ArrowRight className="h-4 w-4 rotate-180" />
            <span>Back to Volunteer Overview</span>
          </Link>
        </section>
      </div>
    </div>
  );
};

export default PacerOverview;

