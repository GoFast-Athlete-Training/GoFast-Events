import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Navigation, Zap, Trophy, Droplet, Home } from 'lucide-react';

const VolunteerOverview = () => {
  useEffect(() => {
    document.title = 'BGR Discovery 5k - Volunteer Opportunities';
    // Scroll to top on page load to prevent "cursor going to the middle"
    window.scrollTo(0, 0);
  }, []);

  const volunteerRoles = [
    {
      id: 'marshal',
      name: 'Course Marshals',
      icon: Navigation,
      color: 'orange',
      description: 'Guide runners at key points along the course and ensure they stay on track.',
      link: '/volunteer/marshal',
      details: '7 positions available with repositioning',
    },
    {
      id: 'pacer',
      name: 'Pacers',
      icon: Zap,
      color: 'purple',
      description: 'Help runners maintain their pace and stay motivated. Available for fast, medium, and finish crew paces.',
      link: '/volunteer/pacer',
      details: 'Fast, Medium, and Finish Crew options',
    },
    {
      id: 'finish-cheerer',
      name: 'Finish Line Holders',
      icon: Trophy,
      color: 'lime',
      description: 'Hold the banner and cheer on every runner as they cross the finish line.',
      link: '/volunteer/finish-cheerer',
      details: '2 positions available',
    },
    {
      id: 'water-station',
      name: 'Water Stations',
      icon: Droplet,
      color: 'blue',
      description: 'Set up water stations with cups, keep everyone hydrated. Plan for 16 boys - half Gatorade, half water.',
      link: '/volunteer/water-station',
      details: '2 hydration stations available',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-white">
      {/* Sticky Top Navigation - Always visible at top */}
      <div className="sticky top-0 z-50 w-full bg-white border-b-2 border-orange-200 shadow-lg backdrop-blur-sm bg-opacity-95">
        <div className="mx-auto max-w-5xl px-6 py-4 sm:px-8 lg:px-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-orange-600 transition"
                onClick={() => window.scrollTo(0, 0)}
              >
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Link>
              <span className="text-gray-300">|</span>
              <span className="text-sm font-bold text-orange-600">Volunteer Opportunities</span>
            </div>
            <div className="flex items-center gap-3">
              <Link
                to="/volunteer/roster"
                className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-gray-700 shadow-sm transition hover:border-orange-200 hover:text-orange-600"
                onClick={() => window.scrollTo(0, 0)}
              >
                <span>View Roster</span>
              </Link>
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-4 py-2 text-xs font-semibold text-white shadow-md transition hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
                onClick={() => window.scrollTo(0, 0)}
              >
                <Users className="h-3 w-3" />
                <span>Back to Race</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-8 sm:px-8 lg:px-10">
        {/* Hero Section */}
        <header className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-gray-100 mt-4">
          <p className="text-xs uppercase tracking-[0.3em] text-orange-500">Volunteer Opportunities</p>
          <h1 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl">
            Help Make the Discovery 5K Special
          </h1>
          <p className="mt-4 max-w-2xl text-base text-gray-600">
            <strong>The point of the day is to cheer on our young athletes.</strong> Please see below for the roles available. 
            Every volunteer makes a difference in creating an amazing experience for our runners.
          </p>
        </header>

        {/* Volunteer Roles */}
        <section className="mt-8 space-y-6">
          {volunteerRoles.map((role) => {
            const Icon = role.icon;
            const colorClasses = {
              orange: 'border-orange-200 bg-orange-50/60 hover:border-orange-400 hover:shadow-md',
              purple: 'border-purple-200 bg-purple-50/60 hover:border-purple-400 hover:shadow-md',
              lime: 'border-lime-200 bg-lime-50/60 hover:border-lime-400 hover:shadow-md',
            };
            const iconColorClasses = {
              orange: 'bg-orange-500 text-white',
              purple: 'bg-purple-500 text-white',
              lime: 'bg-lime-500 text-white',
            };

            return (
              <Link
                key={role.id}
                to={role.link}
                className={`group block rounded-3xl border-2 ${colorClasses[role.color as keyof typeof colorClasses]} p-6 shadow-sm transition`}
              >
                <div className="flex items-start gap-6">
                  <div className={`rounded-2xl ${iconColorClasses[role.color as keyof typeof iconColorClasses]} p-4 group-hover:scale-110 transition`}>
                    <Icon className="h-8 w-8" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h2 className="text-2xl font-semibold text-gray-900">{role.name}</h2>
                        <p className="mt-2 text-sm text-gray-600">{role.description}</p>
                        <p className="mt-2 text-xs font-medium text-gray-500 uppercase tracking-wide">
                          {role.details}
            </p>
          </div>
                      <ArrowRight className="h-6 w-6 text-gray-400 group-hover:text-gray-600 transition flex-shrink-0 mt-1" />
                    </div>
          </div>
          </div>
              </Link>
            );
          })}
        </section>

        {/* Quick Sign Up CTA */}
        <section className="mt-8 rounded-3xl border border-dashed border-orange-200 bg-orange-50/50 p-8 text-center shadow-sm">
          <h3 className="text-xl font-semibold text-gray-900">Ready to Help?</h3>
          <p className="mt-3 text-sm text-gray-600">
            Click on any role above to learn more, or sign up directly below.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              to="/volunteer/signup"
              className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
            >
              <Users className="h-4 w-4" />
              <span>Sign Up to Volunteer</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/volunteer/roster"
              className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-orange-200 hover:text-orange-600"
            >
              <span>View Volunteer Roster</span>
            </Link>
          </div>
        </section>

        {/* Navigation */}
        <section className="mt-8 mb-8 flex flex-wrap gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-orange-200 hover:text-orange-600"
            onClick={() => window.scrollTo(0, 0)}
          >
            <ArrowRight className="h-4 w-4 rotate-180" />
            <span>Back to Welcome</span>
          </Link>
        </section>
      </div>
    </div>
  );
};

export default VolunteerOverview;
