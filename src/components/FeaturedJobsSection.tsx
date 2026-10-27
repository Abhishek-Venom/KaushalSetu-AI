import React from 'react';
import { useJobContext } from '../context/JobContext';
import { JobCard } from './JobCard';
import { ArrowRight, Sparkles } from 'lucide-react';

export const FeaturedJobsSection: React.FC = () => {
  const { jobs, setActiveView } = useJobContext();

  // Featured jobs: show top 4 verified fresher roles
  const featured = jobs.slice(0, 4);

  return (
    <section className="py-14 bg-slate-50 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Verified Openings</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Featured Jobs & Internships for Freshers
            </h2>
          </div>
          <button
            onClick={() => {
              setActiveView('jobs');
              window.scrollTo({ top: 300, behavior: 'smooth' });
            }}
            className="text-xs font-semibold text-teal-700 hover:text-teal-900 flex items-center gap-1 group self-start md:self-auto"
          >
            <span>View all 18 openings</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="space-y-4">
          {featured.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => {
              setActiveView('jobs');
              window.scrollTo({ top: 300, behavior: 'smooth' });
            }}
            className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl transition-colors shadow-md inline-flex items-center gap-2"
          >
            <span>Explore All 18 Opportunities with Filters</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
