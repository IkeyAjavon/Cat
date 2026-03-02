import { Routes, Route } from 'react-router-dom';
import { useApp } from './context/AppContext';
import Navigation from './components/Navigation';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import Logger from './pages/Logger';
import Prompts from './pages/Prompts';
import Stats from './pages/Stats';
import SettingsPage from './pages/SettingsPage';

export default function App() {
  const { onboarded } = useApp();

  if (!onboarded) {
    return <Onboarding />;
  }

  return (
    <div className="app">
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/logger" element={<Logger />} />
          <Route path="/prompts" element={<Prompts />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </main>
      <Navigation />
    </div>
  );
}
