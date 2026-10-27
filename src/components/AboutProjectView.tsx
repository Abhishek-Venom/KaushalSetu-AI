import React from 'react';
import { useJobContext } from '../context/JobContext';
import { Sparkles, GraduationCap, Code2, Database, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

export const AboutProjectView: React.FC = () => {
  const { setActiveView } = useJobContext();

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header Hero */}
        <div className="bg-[#0a192f] text-white rounded-2xl p-8 border border-slate-800 shadow-md">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-xs font-semibold mb-3">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>B.Tech CSE Major Project (Final Year)</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            KaushalSetu AI
          </h1>
          <p className="text-teal-300 font-medium text-sm sm:text-base mt-1">
            Bridge Your Skills to Your Future — AI-Based Skill-to-Job Recommendation Platform for Rural Youth
          </p>

          <p className="text-xs sm:text-sm text-slate-300 mt-4 leading-relaxed max-w-3xl">
            In India, millions of aspiring engineering, diploma, and degree students in Tier-2, Tier-3, and rural districts face a critical employability bottleneck. While job opportunities exist in IT, digital governance, fintech, and renewable energy, standard recruitment portals filter candidates based on college tier rather than granular skill proficiency. KaushalSetu AI resolves this through transparent skill mapping, instant skill-gap diagnostics, and free bridge learning modules.
          </p>
        </div>

        {/* Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center mb-3">
              <Code2 className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1.5">Algorithmic Skill Matching</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Calculates real-time compatibility scores by comparing candidate skills against recruiter specifications, eliminating subjective filtering.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1.5">Transparent Skill Gap Diagnostic</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Provides candidate clarity on exact missing competencies and maps them directly to free government certification programs (PMKVY & SWAYAM).
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center mb-3">
              <Database className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1.5">Rural-Friendly Verified Jobs</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Features 18+ verified fresher roles and internships from startups and organizations actively recruiting outside metro centers.
            </p>
          </div>
        </div>

        {/* Architecture & Methodology */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <h2 className="text-lg font-bold text-slate-900">System Architecture & Engineering Methodology</h2>
          <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <p>
              1. <strong>Frontend Presentation Layer:</strong> Built with React 19, TypeScript, and modern Tailwind CSS. Follows clean accessibility principles and responsive design suitable for entry-level mobile devices.
            </p>
            <p>
              2. <strong>Client-Authoritative State & Storage:</strong> Utilizes a decoupled React Context store with localStorage persistence, allowing seamless demo testing across multiple candidate personas (Ramesh Kumar, Pooja Verma, Amit Patel).
            </p>
            <p>
              3. <strong>Skill Matcher & Recommendation Engine:</strong> Encapsulated in <code>src/utils/skillMatcher.ts</code> with 100% unit test coverage via Node.js native test runner (<code>node:test</code>). Supports skill normalization, alias equivalencies, and weighted scoring.
            </p>
            <p>
              4. <strong>Future Extension Readiness:</strong> Structured modularly to connect with real backend databases (PostgreSQL/Cloud SQL or Firestore) and LLM-powered resume parsing via Google Gemini API.
            </p>
          </div>
        </div>

        {/* Call to action */}
        <div className="bg-teal-50 border border-teal-200 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold text-teal-950">Ready to test the platform in action?</h3>
            <p className="text-xs text-teal-800 mt-0.5">
              Explore 18+ fresher jobs, test skill filters, and submit a demo application.
            </p>
          </div>
          <button
            onClick={() => setActiveView('jobs')}
            className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow transition-colors flex items-center gap-1.5 whitespace-nowrap"
          >
            <span>Explore Jobs Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
