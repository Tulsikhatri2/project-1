import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard';
import { TodoProvider } from './context/TodoContext';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem('todo-user');
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

import LandingPage from './pages/LandingPage';
import AuthPage from './auth/AuthPage';

// Public Route (redirects to dashboard if already logged in, BUT allows access to Landing Page '/')
// Actually, bitrix style usually keeps landing page accessible.
// Let's make '/' public always, but 'Get Started' checks auth.
// Or, if user is logged in, '/' text might say "Go to Dashboard".
// For now, let's keep it simple: '/' is public. '/auth' is the login page (redirects to dashboard if logged in).

const AuthRoute = ({ children }) => {
  const user = localStorage.getItem('todo-user');
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};

import Reports from './pages/Reports';
import Calendar from './pages/Calendar';
import TimeTracker from './pages/TimeTracker';
import Projects from './pages/Projects';
import Teams from './pages/Teams';
import Settings from './pages/Settings';

import Layout from './components/Layout';

import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <TodoProvider>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route 
          path="/auth" 
          element={
            <AuthRoute>
              <AuthPage />
            </AuthRoute>
          } 
        />
        <Route 
          path="/login" 
          element={<Navigate to="/auth" replace />} 
        />
        
        {/* Protected Routes wrapped in Layout */}
        <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/time-tracker" element={<TimeTracker />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </TodoProvider>
  );
}

export default App;


