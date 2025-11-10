import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import RaceOverview from './pages/RaceOverview';
import VolunteerOverview from './pages/VolunteerOverview';
import VolunteerSignup from './pages/VolunteerSignup';
import VolunteerRoster from './pages/VolunteerRoster';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RaceOverview />} />
        <Route path="/volunteer" element={<VolunteerOverview />} />
        <Route path="/volunteer/signup" element={<VolunteerSignup />} />
        <Route path="/volunteer/roster" element={<VolunteerRoster />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;


