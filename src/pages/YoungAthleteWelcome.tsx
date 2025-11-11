import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../config/firebase';

/**
 * Young Athlete Welcome Page - MVP1 Style
 * Shown to returners who already have a young athlete set up
 * Matches MVP1 AthleteWelcome pattern
 */
const YoungAthleteWelcome = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/5k-results');
      return;
    }

    // Small delay to show welcome message, then hydrate
    const timer = setTimeout(() => {
      setIsHydrated(true);
    }, 500);

    return () => clearTimeout(timer);
  }, [user, navigate]);

  const handleLetsGo = () => {
    navigate('/5k-results/home');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 flex items-center justify-center">
      <div className="text-center animate-fade-in">
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 animate-pulse">
          Let's Go <span className="text-orange-300">Crush</span> Goals!
        </h1>
        <p className="text-2xl md:text-3xl text-orange-100 font-medium mb-8">
          Ready to see your athlete's progress?
        </p>
        
        {!isHydrated && (
          <div className="mt-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-xl text-orange-100">Loading...</p>
          </div>
        )}

        {isHydrated && (
          <div className="mt-8">
            <button
              onClick={handleLetsGo}
              className="bg-gradient-to-r from-orange-600 to-orange-500 text-white px-12 py-4 rounded-xl font-bold text-2xl hover:from-orange-700 hover:to-orange-600 transition shadow-2xl transform hover:scale-105"
            >
              Let's Go! →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default YoungAthleteWelcome;

