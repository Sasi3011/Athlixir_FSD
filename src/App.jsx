import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ResetKey from './pages/ResetKey';
import Portal from './pages/Portal';
import { AuthProvider } from './context/AuthContext';

// Athlete Portal Imports
import AthleteLayout from './pages/AthletePortal/AthleteLayout';
import Dashboard from './pages/AthletePortal/Dashboard';
import Profile from './pages/AthletePortal/Profile';
import PerformanceLog from './pages/AthletePortal/PerformanceLog';
import InjuryRecovery from './pages/AthletePortal/InjuryRecovery';
import Leaderboard from './pages/AthletePortal/Leaderboard';
import Opportunities from './pages/AthletePortal/Opportunities';
import AcademyLocator from './pages/AthletePortal/AcademyLocator';
import Events from './pages/AthletePortal/Events';
import Messages from './pages/AthletePortal/Messages';
import Funding from './pages/AthletePortal/Funding';
import SettingsPage from './pages/AthletePortal/Settings';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-background text-white font-sans selection:bg-primary selection:text-black">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Navbar />
                  <Home />
                </>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/reset-key" element={<ResetKey />} />
            <Route path="/portal" element={<Portal />} />

            {/* Athlete Portal Nested Routes */}
            <Route path="/athlete" element={<AthleteLayout />}>
              <Route index element={<Navigate to="/athlete/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="profile" element={<Profile />} />
              <Route path="performance" element={<PerformanceLog />} />
              <Route path="injury" element={<InjuryRecovery />} />
              <Route path="leaderboard" element={<Leaderboard />} />
              <Route path="opportunities" element={<Opportunities />} />
              <Route path="academies" element={<AcademyLocator />} />
              <Route path="events" element={<Events />} />
              <Route path="messages" element={<Messages />} />
              <Route path="funding" element={<Funding />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
