import React from 'react';
import { useJobContext } from '../context/JobContext';
import { POPULAR_CATEGORIES } from '../data/sampleJobs';
import { Code, Sprout, Globe, Landmark, Sun, Radio, ArrowUpRight } from 'lucide-react';

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  Code: <Code className="w-5 h-5" />,
  Sprout: <Sprout className="w-5 h-5" />,
  Globe: <Globe className="w-5 h-5" />,
  Landmark: <Landmark className="w-5 h-5" />,
  Sun: <Sun className="w-5 h-5" />,
  Radio: <Radio className="w-5 h-5" />,
};

export const PopularCategories: React.FC = () => {
  const { updateFilters, setActiveView } = useJobContext();

  const handleCategorySelect = (categoryTitle: string) => {
    updateFilters({ category: categoryTitle });
    setActiveView('jobs');
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  return (
    <section className="py-14 bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold text-teal-700 uppercase tracking-wider block mb-1">
              Employment Sectors
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Popular Job Categories for Rural Freshers
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md">
            Targeted roles curated for students with IT, vocational, diploma, and degree backgrounds.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {POPULAR_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategorySelect(cat.title)}
              className="group text-left p-5 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-teal-500 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center group-hover:bg-teal-600 group-hover:text-white transition-colors">
                    {CATEGORY_ICONS[cat.iconName]}
                  </div>
                  <span className="text-xs font-semibold text-slate-500 font-mono tabular-nums group-hover:text-teal-700 transition-colors">
                    {cat.count} Openings
                  </span>
                </div>

                <h3 className="text-base font-semibold text-slate-900 group-hover:text-teal-800 transition-colors">
                  {cat.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed line-clamp-2">
                  {cat.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-medium text-teal-700">
                <span>Browse Jobs</span>
                <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
