import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import RaceOverview from './pages/RaceOverview';
import CourseOverview from './pages/CourseOverview';
import VolunteerOverview from './pages/VolunteerOverview';
import VolunteerSignup from './pages/VolunteerSignup';
import VolunteerRoster from './pages/VolunteerRoster';
import RouteOverview from './pages/RouteOverview';
import PacerOverview from './pages/PacerOverview';
import FinishCheererOverview from './pages/FinishCheererOverview';

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
        <Route path="/volunteer/signup" element={<VolunteerSignup />} />
        <Route path="/volunteer/roster" element={<VolunteerRoster />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;


