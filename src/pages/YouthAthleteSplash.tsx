import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, getCurrentUser } from '../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import ParentPreProfileExplainer from '../pages/ParentPreProfileExplainer';
import ParentWelcome from '../pages/ParentWelcome';

const YouthAthleteSplash = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Pre & Post Race Engagement - BGR Discovery 5K';
    window.scrollTo(0, 0);

    // Check auth state
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-purple-600 border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If signed in, show welcome page
  if (user) {
    return <ParentWelcome />;
  }

  // If not signed in, show explainer
  return <ParentPreProfileExplainer />;
};

export default YouthAthleteSplash;

