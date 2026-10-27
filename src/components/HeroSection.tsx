import React, { useState } from 'react';
import { useJobContext } from '../context/JobContext';
import { Search, MapPin, Briefcase, Sparkles, ArrowRight, ShieldCheck, Award, Users } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { updateFilters, setActiveView } = useJobContext();
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters({
      keyword,
      location,
      category,
    });
    setActiveView('jobs');
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  const handleQuickTagClick = (tagKeyword: string) => {
    updateFilters({ keyword: tagKeyword });
    setActiveView('jobs');
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  return (
    <section className="relative bg-gradient-to-b from-[#0a192f] via-[#0f2744] to-[#132d4b] text-white pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
      <div className="max-w-6xl mx-auto">
        {/* Editorial Subtitle & Headline */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-semibold tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-teal-400" />
            <span>AI-Driven Career Pathways for Rural Youth</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Bridge Your Skills to <span className="text-teal-400">Your Future</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            An intelligent skill-matching engine designed for B.Tech, Diploma, BCA, and vocational graduates from rural & Tier-2/Tier-3 districts. Discover verified fresher jobs, measure your skill gaps, and access free certified learning modules.
          </p>
        </div>

        {/* Integrated Search Bar (Naukri-inspired clean layout) */}
        <div className="mt-8 bg-white rounded-2xl p-3 sm:p-4 shadow-2xl text-slate-800 border border-slate-200/80 max-w-5xl mx-auto">
          <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            {/* Input 1: Skills & Titles */}
            <div className="md:col-span-5 relative flex items-center">
              <Search className="w-5 h-5 text-slate-400 absolute left-3 pointer-events-none" />
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Skills, designations, companies (e.g. React, Python, Excel)"
                className="w-full pl-10 pr-3 py-3 text-sm text-slate-900 bg-slate-50 hover:bg-slate-100/80 focus:bg-white rounded-xl border border-slate-200 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 outline-none transition-colors"
                aria-label="Search by skills or job title"
              />
            </div>

            {/* Input 2: Location / District */}
            <div className="md:col-span-3 relative flex items-center">
              <MapPin className="w-5 h-5 text-slate-400 absolute left-3 pointer-events-none" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="District, City (e.g. Patna, Jhansi, Remote)"
                className="w-full pl-10 pr-3 py-3 text-sm text-slate-900 bg-slate-50 hover:bg-slate-100/80 focus:bg-white rounded-xl border border-slate-200 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 outline-none transition-colors"
                aria-label="Search by location or district"
              />
            </div>

            {/* Input 3: Sector / Category */}
            <div className="md:col-span-2 relative flex items-center">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-3 text-sm text-slate-700 bg-slate-50 hover:bg-slate-100/80 focus:bg-white rounded-xl border border-slate-200 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 outline-none transition-colors"
                aria-label="Filter by Job Sector"
              >
                <option value="">All Sectors</option>
                <option value="IT & Software Development">IT & Software</option>
                <option value="Agri-Tech & Logistics">Agri-Tech</option>
                <option value="Digital Services & E-Governance">Digital / CSC</option>
                <option value="Rural Banking & Finance">Rural Banking</option>
                <option value="Solar & Renewable Energy">Solar Energy</option>
                <option value="Telecom & Networking">Telecom</option>
              </select>
            </div>

            {/* Submit CTA */}
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full py-3 px-4 bg-teal-600 hover:bg-teal-500 active:bg-teal-700 text-white font-semibold text-sm rounded-xl transition-all shadow-md hover:shadow-teal-600/30 flex items-center justify-center gap-2"
              >
                <span>Find Jobs</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Quick Search Tags */}
          <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <span className="font-medium text-slate-700">Popular searches:</span>
            {['React Developer', 'Python Trainee', 'AgriTech IoT', 'CSC Coordinator', 'Micro-Banking', 'Solar Technician', 'Remote Intern'].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => handleQuickTagClick(tag)}
                className="text-slate-600 hover:text-teal-700 hover:underline px-1.5 py-0.5 rounded transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* 4-Item Proof & Trust Grid */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-4 text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-teal-400 font-mono tabular-nums">18+</div>
            <div className="text-xs text-slate-300 mt-1 font-medium">Verified Fresher Jobs</div>
            <div className="text-[11px] text-slate-400">Rural & Tier-2 hubs</div>
          </div>

          <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-4 text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-teal-400 font-mono tabular-nums">100%</div>
            <div className="text-xs text-slate-300 mt-1 font-medium">Transparent Matching</div>
            <div className="text-[11px] text-slate-400">Real skill-gap breakdown</div>
          </div>

          <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-4 text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-teal-400 font-mono tabular-nums">Free</div>
            <div className="text-xs text-slate-300 mt-1 font-medium">Govt. Skilling Links</div>
            <div className="text-[11px] text-slate-400">PMKVY, SWAYAM & NPTEL</div>
          </div>

          <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-4 text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-teal-400 font-mono tabular-nums">3</div>
            <div className="text-xs text-slate-300 mt-1 font-medium">Ready Demo Personas</div>
            <div className="text-[11px] text-slate-400">Instant test candidate profiles</div>
          </div>
        </div>
      </div>
    </section>
  );
};
