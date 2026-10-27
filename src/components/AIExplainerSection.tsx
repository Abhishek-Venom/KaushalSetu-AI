import React from 'react';
import { useJobContext } from '../context/JobContext';
import { Cpu, Target, BookOpen, CheckCircle2, ArrowRight } from 'lucide-react';

export const AIExplainerSection: React.FC = () => {
  const { setActiveView } = useJobContext();

  return (
    <section className="py-16 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-xs font-semibold mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>Explainable Recommendation Architecture</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            How KaushalSetu AI Recommends Jobs for Rural Youth
          </h2>
          <p className="text-sm text-slate-300 mt-2 leading-relaxed">
            Unlike traditional job portals that favor candidates with elite city credentials, our platform focuses strictly on demonstrable skill competencies and actionable gap bridging.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Step 1 */}
          <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-5 flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-300 flex items-center justify-center font-mono font-bold text-sm mb-4">
                01
              </div>
              <h3 className="text-base font-semibold text-white mb-2">Skill Profile Mapping</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                We normalize regional technical terms, ITI trade certifications, diploma courses, and practical project skills into a unified skill taxonomy.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-700/60 text-[11px] text-teal-400 font-medium">
              Supports vernacular backgrounds
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-5 flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-300 flex items-center justify-center font-mono font-bold text-sm mb-4">
                02
              </div>
              <h3 className="text-base font-semibold text-white mb-2">Transparent Match Score</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Every job card shows a real-time match percentage (0–100%) calculated by comparing your profile skills against verified job requirements.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-700/60 text-[11px] text-teal-400 font-medium">
              Zero black-box obscurity
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-5 flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-300 flex items-center justify-center font-mono font-bold text-sm mb-4">
                03
              </div>
              <h3 className="text-base font-semibold text-white mb-2">Skill-Gap Diagnostic</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Candidates instantly see what skills they already have (green) and what missing skills (amber) are keeping them from higher-paying roles.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-700/60 text-[11px] text-teal-400 font-medium">
              Clear diagnostic feedback
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-5 flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-300 flex items-center justify-center font-mono font-bold text-sm mb-4">
                04
              </div>
              <h3 className="text-base font-semibold text-white mb-2">Free Bridge Courses</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Direct curation of zero-cost government training programs (PMKVY, SWAYAM, IIT Spoken Tutorial) to close candidate skill gaps in 2-4 weeks.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-700/60 text-[11px] text-teal-400 font-medium">
              No expensive bootcamps required
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="mt-10 p-6 rounded-2xl bg-gradient-to-r from-teal-900/60 via-slate-800 to-slate-800 border border-teal-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-base font-semibold text-white">
              Want to see your personalized AI match score?
            </h4>
            <p className="text-xs text-slate-300 mt-1">
              Test with our demo personas (Ramesh Kumar, Pooja Verma, or Amit Patel) or build your custom profile.
            </p>
          </div>
          <button
            onClick={() => {
              setActiveView('dashboard');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-5 py-2.5 bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-xs rounded-xl transition-colors whitespace-nowrap flex items-center gap-2 shadow"
          >
            <span>Open Candidate Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
