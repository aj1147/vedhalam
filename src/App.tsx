import { useState } from 'react';
import { SplashScreen } from './components/SplashScreen';
import { Navbar } from './components/Navbar';
import { DashboardHub } from './components/DashboardHub';
import { SmartNotes } from './components/SmartNotes';
import { HealthCheckAI } from './components/HealthCheckAI';
import { DisruptiveNotifications } from './components/DisruptiveNotifications';

export function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentView, setCurrentView] = useState<'hub' | 'notes' | 'health'>('hub');

  return (
    <div className="min-h-screen bg-[#0a0d14] text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* 1. Initial Splash Screen */}
      {showSplash ? (
        <SplashScreen onComplete={() => setShowSplash(false)} />
      ) : (
        <>
          {/* 2. Top Navigation Bar */}
          <Navbar
            currentView={currentView}
            onSelectView={(view) => setCurrentView(view)}
          />

          {/* 3. Main Workspace Content */}
          <main className="flex-1 pb-16">
            {currentView === 'hub' && (
              <DashboardHub
                onSelectView={(view) => setCurrentView(view)}
              />
            )}

            {currentView === 'notes' && <SmartNotes />}

            {currentView === 'health' && <HealthCheckAI />}
          </main>

          {/* 4. Global Disruptive Toast & Movie Poster Notifications */}
          <DisruptiveNotifications />
        </>
      )}

    </div>
  );
}

export default App;
