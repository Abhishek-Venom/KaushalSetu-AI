import React, { useState } from 'react';
import { useJobContext } from '../context/JobContext';
import { DEMO_PROFILES } from '../data/demoProfiles';
import { Briefcase, User, Bookmark, FileText, ChevronDown, Menu, X, LogIn, LogOut, Sparkles } from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    activeView,
    setActiveView,
    currentUser,
    savedJobIds,
    applications,
    switchPersona,
    logoutUser,
    setAuthModalOpen,
  } = useJobContext();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [personaDropdownOpen, setPersonaDropdownOpen] = useState(false);

  const handleNavClick = (view: 'home' | 'jobs' | 'dashboard' | 'about') => {
    setActiveView(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0a192f] text-white border-b border-slate-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-8">
          {/* Zone 1: Brand Wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2.5 text-left focus:outline-none group"
              aria-label="KaushalSetu AI Home"
            >
              <div className="w-10 h-10 rounded-lg bg-teal-500 flex items-center justify-center text-slate-950 font-bold shadow-sm">
                <Sparkles className="w-5 h-5 text-slate-950" />
              </div>
              <div>
                <span className="text-xl font-extrabold tracking-tight text-white block leading-tight">
                  KaushalSetu <span className="text-teal-400">AI</span>
                </span>
                <span className="text-[11px] text-slate-400 font-medium tracking-wide block">
                  Bridge Your Skills to Your Future
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Navigation Links (single-line, clean typography) */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
            <button
              onClick={() => handleNavClick('home')}
              className={`hover:text-teal-300 transition-colors whitespace-nowrap shrink-0 ${
                activeView === 'home' ? 'text-teal-400 font-semibold' : ''
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('jobs')}
              className={`hover:text-teal-300 transition-colors whitespace-nowrap shrink-0 ${
                activeView === 'jobs' ? 'text-teal-400 font-semibold' : ''
              }`}
            >
              Find Jobs & Internships
            </button>
            <button
              onClick={() => handleNavClick('dashboard')}
              className={`flex items-center gap-1.5 hover:text-teal-300 transition-colors whitespace-nowrap shrink-0 ${
                activeView === 'dashboard' ? 'text-teal-400 font-semibold' : ''
              }`}
            >
              Candidate Dashboard
              {applications.length > 0 && (
                <span className="bg-teal-500/20 text-teal-300 text-xs px-1.5 py-0.5 rounded font-mono tabular-nums">
                  {applications.length}
                </span>
              )}
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className={`hover:text-teal-300 transition-colors whitespace-nowrap shrink-0 ${
                activeView === 'about' ? 'text-teal-400 font-semibold' : ''
              }`}
            >
              Project Overview
            </button>
          </nav>

          {/* Zone 3: Primary Actions & Profile Switcher */}
          <div className="hidden md:flex items-center gap-4 shrink-0">
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setPersonaDropdownOpen(!personaDropdownOpen)}
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-xs text-slate-200 transition-colors"
                  aria-expanded={personaDropdownOpen}
                  aria-haspopup="true"
                >
                  <div className="w-6 h-6 rounded-full bg-teal-600/80 text-white flex items-center justify-center font-semibold text-[11px]">
                    {currentUser.name.charAt(0)}
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-slate-100 truncate max-w-[120px]">{currentUser.name}</div>
                    <div className="text-[10px] text-teal-400">{currentUser.district}, {currentUser.state}</div>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {personaDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-72 bg-slate-900 border border-slate-700 rounded-xl shadow-xl py-2 z-50 text-slate-200"
                    onMouseLeave={() => setPersonaDropdownOpen(false)}
                  >
                    <div className="px-4 py-2 border-b border-slate-800">
                      <p className="text-xs text-slate-400">Current Candidate Profile</p>
                      <p className="text-sm font-bold text-white">{currentUser.name}</p>
                      <p className="text-xs text-slate-400 truncate">{currentUser.education}</p>
                    </div>

                    <div className="px-4 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Switch Demo Candidate
                    </div>
                    {DEMO_PROFILES.map((profile) => (
                      <button
                        key={profile.id}
                        onClick={() => {
                          switchPersona(profile.id);
                          setPersonaDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-xs hover:bg-slate-800 transition-colors flex items-center justify-between ${
                          currentUser.id === profile.id ? 'bg-teal-950/40 text-teal-300 font-medium' : 'text-slate-300'
                        }`}
                      >
                        <div>
                          <div className="font-medium">{profile.name}</div>
                          <div className="text-[11px] text-slate-400">{profile.district} · {profile.targetRole}</div>
                        </div>
                        {currentUser.id === profile.id && <span className="text-teal-400 text-xs">Active</span>}
                      </button>
                    ))}

                    <div className="border-t border-slate-800 mt-2 pt-2 px-2 flex flex-col gap-1">
                      <button
                        onClick={() => {
                          handleNavClick('dashboard');
                          setPersonaDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-1.5 text-xs text-slate-300 hover:bg-slate-800 rounded flex items-center gap-2"
                      >
                        <User className="w-3.5 h-3.5 text-teal-400" />
                        Manage Profile & Skills
                      </button>
                      <button
                        onClick={() => {
                          logoutUser();
                          setPersonaDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-1.5 text-xs text-rose-300 hover:bg-rose-950/30 rounded flex items-center gap-2"
                      >
                        <LogOut className="w-3.5 h-3.5 text-rose-400" />
                        Log Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setAuthModalOpen(true, 'login')}
                className="flex items-center gap-1.5 text-xs font-medium text-slate-300 hover:text-white px-3 py-2 rounded-lg hover:bg-slate-800 transition-colors"
              >
                <LogIn className="w-4 h-4 text-teal-400" />
                Sign In
              </button>
            )}

            <button
              onClick={() => handleNavClick('jobs')}
              className="px-4 py-2 text-xs font-semibold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-lg transition-colors whitespace-nowrap shadow-sm flex items-center gap-1.5"
            >
              <Briefcase className="w-3.5 h-3.5" />
              Explore 18+ Openings
            </button>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white rounded-lg focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-[#0a192f] px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-2 text-sm">
            <button
              onClick={() => handleNavClick('home')}
              className={`text-left py-2 px-3 rounded-lg ${activeView === 'home' ? 'bg-teal-950 text-teal-300 font-semibold' : 'text-slate-300'}`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('jobs')}
              className={`text-left py-2 px-3 rounded-lg ${activeView === 'jobs' ? 'bg-teal-950 text-teal-300 font-semibold' : 'text-slate-300'}`}
            >
              Find Jobs & Internships
            </button>
            <button
              onClick={() => handleNavClick('dashboard')}
              className={`text-left py-2 px-3 rounded-lg flex items-center justify-between ${
                activeView === 'dashboard' ? 'bg-teal-950 text-teal-300 font-semibold' : 'text-slate-300'
              }`}
            >
              <span>Candidate Dashboard</span>
              {applications.length > 0 && (
                <span className="bg-teal-500/20 text-teal-300 text-xs px-2 py-0.5 rounded font-mono">
                  {applications.length} applied
                </span>
              )}
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className={`text-left py-2 px-3 rounded-lg ${activeView === 'about' ? 'bg-teal-950 text-teal-300 font-semibold' : 'text-slate-300'}`}
            >
              Project Overview
            </button>
          </div>

          <div className="pt-3 border-t border-slate-800">
            {currentUser ? (
              <div className="space-y-2">
                <div className="text-xs text-slate-400 px-3">Signed in as {currentUser.name} ({currentUser.district})</div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      handleNavClick('dashboard');
                      setMobileMenuOpen(false);
                    }}
                    className="flex-1 text-center py-2 bg-slate-800 text-xs text-slate-200 rounded-lg"
                  >
                    My Profile
                  </button>
                  <button
                    onClick={() => {
                      logoutUser();
                      setMobileMenuOpen(false);
                    }}
                    className="py-2 px-4 bg-slate-800 text-xs text-rose-300 rounded-lg"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => {
                  setAuthModalOpen(true, 'login');
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 bg-teal-400 text-slate-950 font-semibold text-xs rounded-lg"
              >
                Sign In / Sign Up
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
