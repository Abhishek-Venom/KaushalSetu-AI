import React, { useMemo } from 'react';
import { useJobContext } from '../context/JobContext';
import { JobCard } from './JobCard';
import { calculateSkillMatch } from '../utils/skillMatcher';
import { Search, MapPin, Filter, RotateCcw, Sparkles, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

export const FindJobsView: React.FC = () => {
  const { jobs, filters, updateFilters, resetFilters, currentUser } = useJobContext();

  // Filter and sort jobs
  const filteredAndSortedJobs = useMemo(() => {
    return jobs
      .filter((job) => {
        // Keyword filter (title, skills, description, company)
        if (filters.keyword.trim()) {
          const kw = filters.keyword.toLowerCase();
          const matchTitle = job.title.toLowerCase().includes(kw);
          const matchCompany = job.company.toLowerCase().includes(kw);
          const matchSkills = job.requiredSkills.some((s) => s.toLowerCase().includes(kw));
          const matchDesc = job.description.toLowerCase().includes(kw);
          if (!matchTitle && !matchCompany && !matchSkills && !matchDesc) {
            return false;
          }
        }

        // Location filter (location, district, state)
        if (filters.location.trim()) {
          const loc = filters.location.toLowerCase();
          const matchLoc = job.location.toLowerCase().includes(loc);
          const matchDist = job.district.toLowerCase().includes(loc);
          const matchState = job.state.toLowerCase().includes(loc);
          if (!matchLoc && !matchDist && !matchState) {
            return false;
          }
        }

        // Category filter
        if (filters.category && job.category !== filters.category) {
          return false;
        }

        // Job Type filter
        if (filters.jobType && job.jobType !== filters.jobType) {
          return false;
        }

        // Experience Level filter
        if (filters.experienceLevel && job.experienceLevel !== filters.experienceLevel) {
          return false;
        }

        // Work mode filter
        if (filters.workMode && job.workMode !== filters.workMode) {
          return false;
        }

        // High Match Only (>= 60%)
        if (filters.onlyHighMatch && currentUser) {
          const match = calculateSkillMatch(currentUser.skills, job.requiredSkills, job.preferredSkills);
          if (match.score < 60) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'salary-high') {
          return b.salaryMinNum - a.salaryMinNum;
        }
        if (filters.sortBy === 'newest') {
          return a.postedDaysAgo - b.postedDaysAgo;
        }
        // Default: relevance / match score
        if (currentUser) {
          const scoreA = calculateSkillMatch(currentUser.skills, a.requiredSkills, a.preferredSkills).score;
          const scoreB = calculateSkillMatch(currentUser.skills, b.requiredSkills, b.preferredSkills).score;
          if (scoreB !== scoreA) {
            return scoreB - scoreA;
          }
        }
        return a.postedDaysAgo - b.postedDaysAgo;
      });
  }, [jobs, filters, currentUser]);

  const hasActiveFilters =
    Boolean(filters.keyword) ||
    Boolean(filters.location) ||
    Boolean(filters.category) ||
    Boolean(filters.jobType) ||
    Boolean(filters.experienceLevel) ||
    Boolean(filters.workMode) ||
    filters.onlyHighMatch;

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Breadcrumb & Title */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <span>KaushalSetu AI</span>
            <span>/</span>
            <span className="text-slate-800 font-medium">Find Jobs & Internships</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Explore Fresher Opportunities & Internships
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Browse verified openings tailored for rural college freshers and vocational diploma graduates.
          </p>
        </div>

        {/* 2-Column Layout: Sidebar Filters + Main Results */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Sidebar Filters (lg:col-span-4) */}
          <aside className="lg:col-span-4 bg-white rounded-xl border border-slate-200 p-5 shadow-xs sticky top-20">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-4">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                <SlidersHorizontal className="w-4 h-4 text-teal-600" />
                <span>Filters & Criteria</span>
              </div>
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="text-xs text-teal-700 hover:text-teal-900 font-medium flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset all
                </button>
              )}
            </div>

            <div className="space-y-4 text-xs">
              {/* Keyword Search */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Role, Skill, or Company
                </label>
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
                  <input
                    type="text"
                    value={filters.keyword}
                    onChange={(e) => updateFilters({ keyword: e.target.value })}
                    placeholder="e.g. React, Python, Excel, CSC"
                    className="w-full pl-8 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:border-teal-600 focus:bg-white outline-none"
                  />
                </div>
              </div>

              {/* Location Search */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Location or District
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
                  <input
                    type="text"
                    value={filters.location}
                    onChange={(e) => updateFilters({ location: e.target.value })}
                    placeholder="e.g. Gaya, Jhansi, Remote"
                    className="w-full pl-8 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:border-teal-600 focus:bg-white outline-none"
                  />
                </div>
              </div>

              {/* Sector / Category */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Job Sector
                </label>
                <select
                  value={filters.category}
                  onChange={(e) => updateFilters({ category: e.target.value })}
                  className="w-full px-2.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:border-teal-600 focus:bg-white outline-none text-slate-700"
                >
                  <option value="">All Sectors</option>
                  <option value="IT & Software Development">IT & Software Development</option>
                  <option value="Agri-Tech & Logistics">Agri-Tech & Logistics</option>
                  <option value="Digital Services & E-Governance">Digital Services & E-Governance</option>
                  <option value="Rural Banking & Finance">Rural Banking & Finance</option>
                  <option value="Solar & Renewable Energy">Solar & Renewable Energy</option>
                  <option value="Customer Support & Operations">Customer Support & Operations</option>
                  <option value="Data & Analytics">Data & Analytics</option>
                  <option value="Telecom & Networking">Telecom & Networking</option>
                </select>
              </div>

              {/* Job Type Segmented Selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Employment Type
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    { label: 'All Types', value: '' },
                    { label: 'Full-time', value: 'Full-time' },
                    { label: 'Internship', value: 'Internship' },
                    { label: 'Apprenticeship', value: 'Apprenticeship' },
                  ].map((item) => (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => updateFilters({ jobType: item.value })}
                      className={`py-1.5 px-2 rounded text-center text-xs transition-colors border ${
                        filters.jobType === item.value
                          ? 'bg-teal-50 border-teal-500 text-teal-800 font-semibold'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Work Mode */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Work Mode
                </label>
                <div className="flex gap-1.5">
                  {[
                    { label: 'Any', value: '' },
                    { label: 'On-site', value: 'On-site' },
                    { label: 'Hybrid', value: 'Hybrid' },
                    { label: 'Remote', value: 'Remote' },
                  ].map((item) => (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => updateFilters({ workMode: item.value })}
                      className={`flex-1 py-1 px-2 rounded text-xs transition-colors border ${
                        filters.workMode === item.value
                          ? 'bg-teal-50 border-teal-500 text-teal-800 font-semibold'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* AI High Match Toggle */}
              {currentUser && (
                <div className="pt-3 border-t border-slate-150">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.onlyHighMatch}
                      onChange={(e) => updateFilters({ onlyHighMatch: e.target.checked })}
                      className="mt-0.5 rounded text-teal-600 focus:ring-teal-500"
                    />
                    <div>
                      <span className="text-xs font-semibold text-slate-800 flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                        Only 60%+ AI Match
                      </span>
                      <span className="text-[11px] text-slate-500 block leading-tight">
                        Filtered against {currentUser.name}&apos;s profile skills
                      </span>
                    </div>
                  </label>
                </div>
              )}
            </div>
          </aside>

          {/* Right Main Results (lg:col-span-8) */}
          <main className="lg:col-span-8 space-y-4">
            {/* Controls Bar: Count, Active Filter Tags, Sort */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-900 font-mono tabular-nums">
                  {filteredAndSortedJobs.length}
                </span>
                <span className="text-xs text-slate-600">
                  {filteredAndSortedJobs.length === 1 ? 'job found' : 'jobs found'}
                </span>
              </div>

              {/* Sort By Dropdown */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-500 flex items-center gap-1">
                  <ArrowUpDown className="w-3.5 h-3.5" />
                  Sort by:
                </span>
                <select
                  value={filters.sortBy}
                  onChange={(e) =>
                    updateFilters({ sortBy: e.target.value as 'relevance' | 'newest' | 'salary-high' })
                  }
                  className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 text-xs font-medium focus:border-teal-600 outline-none"
                  aria-label="Sort jobs by"
                >
                  <option value="relevance">Best AI Match</option>
                  <option value="newest">Newest First</option>
                  <option value="salary-high">Salary: High to Low</option>
                </select>
              </div>
            </div>

            {/* Active Filters Pill Bar */}
            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="text-slate-400 font-medium">Active filters:</span>
                {filters.keyword && (
                  <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded flex items-center gap-1">
                    Keyword: &quot;{filters.keyword}&quot;
                    <button
                      onClick={() => updateFilters({ keyword: '' })}
                      className="hover:text-slate-900 font-bold ml-1"
                      aria-label="Clear keyword filter"
                    >
                      ×
                    </button>
                  </span>
                )}
                {filters.location && (
                  <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded flex items-center gap-1">
                    Location: &quot;{filters.location}&quot;
                    <button
                      onClick={() => updateFilters({ location: '' })}
                      className="hover:text-slate-900 font-bold ml-1"
                      aria-label="Clear location filter"
                    >
                      ×
                    </button>
                  </span>
                )}
                {filters.category && (
                  <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded flex items-center gap-1">
                    Sector: {filters.category}
                    <button
                      onClick={() => updateFilters({ category: '' })}
                      className="hover:text-slate-900 font-bold ml-1"
                      aria-label="Clear category filter"
                    >
                      ×
                    </button>
                  </span>
                )}
                {filters.jobType && (
                  <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded flex items-center gap-1">
                    Type: {filters.jobType}
                    <button
                      onClick={() => updateFilters({ jobType: '' })}
                      className="hover:text-slate-900 font-bold ml-1"
                      aria-label="Clear job type filter"
                    >
                      ×
                    </button>
                  </span>
                )}
                {filters.workMode && (
                  <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded flex items-center gap-1">
                    Mode: {filters.workMode}
                    <button
                      onClick={() => updateFilters({ workMode: '' })}
                      className="hover:text-slate-900 font-bold ml-1"
                      aria-label="Clear work mode filter"
                    >
                      ×
                    </button>
                  </span>
                )}
                {filters.onlyHighMatch && (
                  <span className="bg-teal-50 text-teal-800 px-2 py-0.5 rounded flex items-center gap-1 border border-teal-200">
                    High Match Only
                    <button
                      onClick={() => updateFilters({ onlyHighMatch: false })}
                      className="hover:text-teal-950 font-bold ml-1"
                      aria-label="Clear high match filter"
                    >
                      ×
                    </button>
                  </span>
                )}
              </div>
            )}

            {/* List of Job Cards */}
            {filteredAndSortedJobs.length > 0 ? (
              <div className="space-y-4">
                {filteredAndSortedJobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-slate-200 p-12 text-center shadow-xs">
                <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center mb-3">
                  <Filter className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900">No jobs match your current filters</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-5">
                  Try broadening your keyword, removing location constraints, or clearing filters to see all available fresher roles.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs rounded-lg transition-colors inline-flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset all filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
