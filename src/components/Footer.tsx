import React from 'react';
import { useJobContext } from '../context/JobContext';
import { Sparkles, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveView } = useJobContext();

  const handleNav = (view: 'home' | 'jobs' | 'dashboard' | 'about') => {
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0a192f] text-slate-300 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & Mission */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-teal-500 flex items-center justify-center text-slate-950 font-bold">
                <Sparkles className="w-4 h-4 text-slate-950" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                KaushalSetu <span className="text-teal-400">AI</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">
              Bridge Your Skills to Your Future.
            </p>
            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              An intelligent, transparent skill-matching engine built to empower rural Indian youth, ITI holders, and college graduates with verified career pathways and free government skilling roadmaps.
            </p>
            <div className="pt-2 text-[11px] text-teal-400 font-medium">
              B.Tech CSE Final Year Major Project
            </div>
          </div>

          {/* Quick Platform Navigation */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Platform Navigation</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="text-slate-400 hover:text-teal-300 transition-colors"
                >
                  Home Page
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('jobs')}
                  className="text-slate-400 hover:text-teal-300 transition-colors"
                >
                  Find Jobs & Internships
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('dashboard')}
                  className="text-slate-400 hover:text-teal-300 transition-colors"
                >
                  Candidate Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="text-slate-400 hover:text-teal-300 transition-colors"
                >
                  Project Architecture
                </button>
              </li>
            </ul>
          </div>

          {/* Government Skilling Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Free Skilling Portals</h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a
                  href="https://www.skillindiadigital.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-teal-300 transition-colors"
                >
                  Skill India Digital (NSDC)
                </a>
              </li>
              <li>
                <a
                  href="https://swayam.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-teal-300 transition-colors"
                >
                  SWAYAM Central Portal
                </a>
              </li>
              <li>
                <a
                  href="https://spoken-tutorial.org"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-teal-300 transition-colors"
                >
                  Spoken Tutorial (IIT Bombay)
                </a>
              </li>
              <li>
                <a
                  href="https://www.pmkvyofficial.org"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-teal-300 transition-colors"
                >
                  PMKVY 4.0 Skilling Scheme
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} KaushalSetu AI · B.Tech CSE Major Project Demonstration.
          </div>
          <div className="flex items-center gap-1">
            <span>Built with React, TypeScript & Tailwind CSS for Rural Youth Empowerment</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
