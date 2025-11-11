import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import RaceOverview from './pages/RaceOverview';
import CourseOverview from './pages/CourseOverview';
import VolunteerOverview from './pages/VolunteerOverview';
import VolunteerSignup from './pages/VolunteerSignup';
import VolunteerRoster from './pages/VolunteerRoster';
import RouteOverview from './pages/RouteOverview';
import PacerOverview from './pages/PacerOverview';
import FinishCheererOverview from './pages/FinishCheererOverview';
import WaterStationOverview from './pages/WaterStationOverview';
import FinalPreps from './pages/FinalPreps';
// Young Athlete Engagement Flow
import ParentSplash from './pages/ParentSplash';
import YoungAthleteWelcome from './pages/YoungAthleteWelcome';
import ParentPreProfileExplainer from './pages/ParentPreProfileExplainer';
import ParentProfile from './pages/ParentProfile';
import YouthRegistration from './pages/YouthRegistration';
import PreRaceGoals from './pages/PreRaceGoals';
import YoungAthleteHome from './pages/YoungAthleteHome';
import Leaderboard from './pages/Leaderboard';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RaceOverview />} />
        <Route path="/course" element={<CourseOverview />} />
        <Route path="/volunteer" element={<VolunteerOverview />} />
        <Route path="/volunteer/marshal" element={<RouteOverview />} />
        <Route path="/volunteer/pacer" element={<PacerOverview />} />
        <Route path="/volunteer/finish-cheerer" element={<FinishCheererOverview />} />
        <Route path="/volunteer/water-station" element={<WaterStationOverview />} />
        <Route path="/volunteer/signup" element={<VolunteerSignup />} />
        <Route path="/volunteer/roster" element={<VolunteerRoster />} />
        <Route path="/final-preps" element={<FinalPreps />} />
        {/* Young Athlete Flow - 5K Results */}
        <Route path="/5k-results" element={<ParentSplash />} />
        <Route path="/5k-results/parent-profile" element={<ParentProfile />} />
        <Route path="/5k-results/youth-registration" element={<YouthRegistration />} />
        <Route path="/5k-results/goals" element={<PreRaceGoals />} />
        <Route path="/5k-results/home" element={<YoungAthleteHome />} />
        <Route path="/5k-results/leaderboard" element={<Leaderboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;


