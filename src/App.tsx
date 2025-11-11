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
import YouthAthleteSplash from './pages/YouthAthleteSplash';
import ParentPreProfileExplainer from './pages/ParentPreProfileExplainer';
import ParentWelcome from './pages/ParentWelcome';
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
        {/* Young Athlete Engagement Flow */}
        <Route path="/engagement" element={<YouthAthleteSplash />} />
        <Route path="/engagement/parent-profile" element={<ParentProfile />} />
        <Route path="/engagement/youth-registration" element={<YouthRegistration />} />
        <Route path="/engagement/goals" element={<PreRaceGoals />} />
        <Route path="/engagement/home" element={<YoungAthleteHome />} />
        <Route path="/engagement/leaderboard" element={<Leaderboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;


