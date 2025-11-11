import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import api from '../lib/api';
import { getBGR5KEventId } from '../config/bgr5kConfig';
import ParentPreProfileExplainer from '../pages/ParentPreProfileExplainer';
import YoungAthleteWelcome from '../pages/YoungAthleteWelcome';

/**
 * Parent Splash Page - Auth Gate for Young Athlete Flow
 * Entry point from BGR event page → "Start Here" button
 * 
 * Flow:
 * 1. Loading: Show loading spinner while checking auth
 * 2. NO Firebase auth → Show ParentPreProfileExplainer (signup/signin flow)
 *    → After auth: ParentProfile → YouthRegistration → PreRaceGoals → YoungAthleteHome
 * 3. Firebase auth + Returner (has young athlete) → Show YoungAthleteWelcome → YoungAthleteHome
 * 4. Firebase auth + New → Create/get athleteId → redirect to ParentProfile (onboarding)
 */
const ParentSplash = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isReturner, setIsReturner] = useState(false);

  useEffect(() => {
    document.title = 'Pre & Post Race Engagement - BGR Discovery 5K';
    window.scrollTo(0, 0);

    // Check if user is authenticated (matches MVP1 pattern)
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is authenticated - create/get athleteId
        try {
          const response = await api.post('/athlete/create');
          const data = response.data;
          if (data.success && data.data?.id) {
            const athleteId = data.data.id;
            localStorage.setItem('athleteId', athleteId);
            
            // Store eventId for this flow
            const eventId = getBGR5KEventId();
            if (eventId) {
              localStorage.setItem('eventId', eventId);
            }

            // Check if they're a returner (have young athlete for this event)
            try {
              const youngAthletesResponse = await api.get(`/young-athlete/by-athlete/${athleteId}?eventCode=${eventId}`);
              const youngAthletesData = youngAthletesResponse.data;
              
              if (youngAthletesData.success && youngAthletesData.data?.length > 0) {
                // Returner! Store youngAthleteId and show welcome
                const youngAthlete = youngAthletesData.data[0];
                localStorage.setItem('youngAthleteId', youngAthlete.id);
                setIsReturner(true);
                setIsLoading(false);
                return;
              }
            } catch (error: any) {
              // If endpoint doesn't exist or error, assume new user
              console.log('No existing young athlete found, proceeding as new user');
            }

            // New user - go to parent-profile
            navigate('/5k-results/parent-profile');
            return;
          }
        } catch (error: any) {
          console.error('Error creating athlete:', error);
          // If 401, user might need to sign in again - show explainer
        }
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-white border-r-transparent"></div>
          <p className="mt-4 text-white">Loading...</p>
        </div>
      </div>
    );
  }

  // If returner, show MVP1-style welcome
  if (isReturner) {
    return <YoungAthleteWelcome />;
  }

  // If not authenticated, show signup/signin explainer
  return <ParentPreProfileExplainer />;
};

export default ParentSplash;

