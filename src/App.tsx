/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { JobProvider, useJobContext } from './context/JobContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PopularCategories } from './components/PopularCategories';
import { FeaturedJobsSection } from './components/FeaturedJobsSection';
import { AIExplainerSection } from './components/AIExplainerSection';
import { FindJobsView } from './components/FindJobsView';
import { CandidateDashboard } from './components/CandidateDashboard';
import { AboutProjectView } from './components/AboutProjectView';
import { JobDetailsModal } from './components/JobDetailsModal';
import { ApplyJobModal } from './components/ApplyJobModal';
import { AuthModal } from './components/AuthModal';
import { Footer } from './components/Footer';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const AppContent: React.FC = () => {
  const { activeView, notification } = useJobContext();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased font-sans">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-5 right-5 z-50 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div
            className={`flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-lg border text-xs font-semibold ${
              notification.type === 'error'
                ? 'bg-rose-50 border-rose-200 text-rose-900'
                : notification.type === 'info'
                ? 'bg-blue-50 border-blue-200 text-blue-900'
                : 'bg-teal-50 border-teal-200 text-teal-900'
            }`}
          >
            {notification.type === 'error' ? (
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            ) : notification.type === 'info' ? (
              <Info className="w-4 h-4 text-blue-600 shrink-0" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
            )}
            <span>{notification.message}</span>
          </div>
        </div>
      )}

      {/* Navigation */}
      <Navbar />

      {/* Main View Router */}
      <div className="flex-1">
        {activeView === 'home' && (
          <main>
            <HeroSection />
            <PopularCategories />
            <FeaturedJobsSection />
            <AIExplainerSection />
          </main>
        )}

        {activeView === 'jobs' && <FindJobsView />}

        {activeView === 'dashboard' && <CandidateDashboard />}

        {activeView === 'about' && <AboutProjectView />}
      </div>

      {/* Interactive Global Modals */}
      <JobDetailsModal />
      <ApplyJobModal />
      <AuthModal />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <JobProvider>
      <AppContent />
    </JobProvider>
  );
}
