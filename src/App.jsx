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

// Coach Portal Imports
import CoachLayout from './pages/CoachPortal/CoachLayout';
import CoachDashboard from './pages/CoachPortal/Dashboard';
import MyAthletes from './pages/CoachPortal/MyAthletes';
import PerformanceMonitoring from './pages/CoachPortal/PerformanceMonitoring';
import InjuryReports from './pages/CoachPortal/InjuryReports';
import TeamAnalytics from './pages/CoachPortal/TeamAnalytics';
import EventsManagement from './pages/CoachPortal/EventsManagement';
import OpportunitiesPosted from './pages/CoachPortal/OpportunitiesPosted';
import CoachMessages from './pages/CoachPortal/Messages';
import CoachSettings from './pages/CoachPortal/Settings';

// User Portal Imports
import UserLayout from './pages/UserPortal/UserLayout';
import UserDashboard from './pages/UserPortal/Dashboard';
import ExploreAthletes from './pages/UserPortal/ExploreAthletes';
import UserLeaderboard from './pages/UserPortal/Leaderboard';
import UserEvents from './pages/UserPortal/Events';
import AcademiesDirectory from './pages/UserPortal/Academies';
import UserOpportunities from './pages/UserPortal/Opportunities';
import Sponsorships from './pages/UserPortal/Sponsorships';
import UserMessages from './pages/UserPortal/Messages';
import UserSettings from './pages/UserPortal/Settings';

// Portal Mapping: Athlete (Data Tracking) | Coach (Monitoring) | User (Discovery)
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

            {/* Coach Portal Nested Routes */}
            <Route path="/coach" element={<CoachLayout />}>
              <Route index element={<Navigate to="/coach/dashboard" replace />} />
              <Route path="dashboard" element={<CoachDashboard />} />
              <Route path="athletes" element={<MyAthletes />} />
              <Route path="performance" element={<PerformanceMonitoring />} />
              <Route path="injury" element={<InjuryReports />} />
              <Route path="team-analytics" element={<TeamAnalytics />} />
              <Route path="events" element={<EventsManagement />} />
              <Route path="opportunities" element={<OpportunitiesPosted />} />
              <Route path="messages" element={<CoachMessages />} />
              <Route path="settings" element={<CoachSettings />} />
            </Route>

            {/* User Portal Nested Routes */}
            <Route path="/user" element={<UserLayout />}>
              <Route index element={<Navigate to="/user/dashboard" replace />} />
              <Route path="dashboard" element={<UserDashboard />} />
              <Route path="athletes" element={<ExploreAthletes />} />
              <Route path="leaderboard" element={<UserLeaderboard />} />
              <Route path="events" element={<UserEvents />} />
              <Route path="academies" element={<AcademiesDirectory />} />
              <Route path="opportunities" element={<UserOpportunities />} />
              <Route path="sponsorships" element={<Sponsorships />} />
              <Route path="messages" element={<UserMessages />} />
              <Route path="settings" element={<UserSettings />} />
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
