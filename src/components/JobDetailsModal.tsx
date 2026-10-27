import React from 'react';
import { useJobContext } from '../context/JobContext';
import { calculateSkillMatch } from '../utils/skillMatcher';
import {
  X,
  Building2,
  MapPin,
  Briefcase,
  IndianRupee,
  Bookmark,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Check,
  Calendar,
  Users,
  Award,
} from 'lucide-react';

export const JobDetailsModal: React.FC = () => {
  const {
    selectedJob,
    setSelectedJob,
    setApplyJobModal,
    currentUser,
    toggleSaveJob,
    isJobSaved,
    applications,
    addSkillToProfile,
  } = useJobContext();

  if (!selectedJob) return null;

  const saved = isJobSaved(selectedJob.id);
  const alreadyApplied = applications.some((app) => app.jobId === selectedJob.id);

  const matchResult = currentUser
    ? calculateSkillMatch(currentUser.skills, selectedJob.requiredSkills, selectedJob.preferredSkills)
    : null;

  const matchScore = matchResult ? matchResult.score : null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div
        className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden relative my-8 animate-in fade-in duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="job-modal-title"
      >
        {/* Modal Top Header */}
        <div className="bg-[#0a192f] text-white p-6 relative">
          <button
            onClick={() => setSelectedJob(null)}
            className="absolute top-5 right-5 p-2 rounded-lg bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-start gap-4 pr-10">
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-lg shrink-0 shadow-sm"
              style={{ backgroundColor: selectedJob.logoBgColor || '#0f2744' }}
            >
              {selectedJob.companyLogoText}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 id="job-modal-title" className="text-xl sm:text-2xl font-extrabold text-white">
                  {selectedJob.title}
                </h2>
                {selectedJob.isRuralFriendly && (
                  <span className="text-xs font-semibold text-emerald-300 bg-emerald-950/80 px-2.5 py-0.5 rounded border border-emerald-800">
                    Rural Fresher Friendly
                  </span>
                )}
              </div>

              <div className="text-sm text-teal-300 font-medium flex items-center gap-2 mt-1">
                <span>{selectedJob.company}</span>
                <span aria-hidden="true">·</span>
                <span className="text-slate-300">{selectedJob.category}</span>
              </div>
            </div>
          </div>

          {/* Quick Metrics Strip */}
          <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-slate-800/80 p-3 rounded-xl border border-slate-700/80">
            <div>
              <span className="text-slate-400 block text-[11px]">Salary / Stipend</span>
              <span className="font-bold text-white font-mono tabular-nums">{selectedJob.salary}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Experience</span>
              <span className="font-semibold text-white">{selectedJob.experienceLevel}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Location</span>
              <span className="font-semibold text-white">{selectedJob.location}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Work Mode</span>
              <span className="font-semibold text-teal-300">{selectedJob.workMode}</span>
            </div>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* AI Skill Match & Gap Analysis Card */}
          {matchResult && currentUser && (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-teal-600" />
                  <span className="text-sm font-bold text-slate-900">
                    AI Skill Compatibility Score for {currentUser.name}
                  </span>
                </div>
                <span
                  className={`text-sm font-bold font-mono tabular-nums px-2.5 py-0.5 rounded-lg border ${
                    matchResult.score >= 70
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      : matchResult.score >= 40
                      ? 'bg-blue-50 text-blue-800 border-blue-200'
                      : 'bg-amber-50 text-amber-800 border-amber-200'
                  }`}
                >
                  {matchResult.score}% Match
                </span>
              </div>

              {/* Matched vs Missing breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs mt-3">
                {/* Acquired Skills */}
                <div className="bg-white p-3 rounded-lg border border-slate-200">
                  <div className="font-semibold text-emerald-800 flex items-center gap-1.5 mb-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Skills You Possess ({matchResult.matchedSkills.length})</span>
                  </div>
                  {matchResult.matchedSkills.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {matchResult.matchedSkills.map((s) => (
                        <span key={s} className="bg-emerald-50 text-emerald-900 px-2 py-0.5 rounded text-[11px]">
                          ✓ {s}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-slate-400 italic text-[11px]">None yet matched from profile</p>
                  )}
                </div>

                {/* Missing Skills */}
                <div className="bg-white p-3 rounded-lg border border-slate-200">
                  <div className="font-semibold text-amber-800 flex items-center gap-1.5 mb-2">
                    <AlertCircle className="w-4 h-4 text-amber-600" />
                    <span>Skills to Bridge ({matchResult.missingSkills.length})</span>
                  </div>
                  {matchResult.missingSkills.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {matchResult.missingSkills.map((s) => (
                        <span
                          key={s}
                          className="bg-amber-50 text-amber-900 px-2 py-0.5 rounded text-[11px] inline-flex items-center gap-1"
                        >
                          {s}
                          <button
                            type="button"
                            onClick={() => addSkillToProfile(s)}
                            title="Know this skill? Click to add to your profile"
                            className="text-amber-700 hover:text-amber-950 font-bold ml-0.5"
                          >
                            +
                          </button>
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-emerald-700 font-medium text-[11px]">Full skill match achieved!</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Job Overview */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-2">Role Overview</h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{selectedJob.description}</p>
          </div>

          {/* Key Responsibilities */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-2">Key Responsibilities</h3>
            <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700 list-disc list-inside">
              {selectedJob.responsibilities.map((resp, i) => (
                <li key={i} className="leading-relaxed">
                  {resp}
                </li>
              ))}
            </ul>
          </div>

          {/* Eligibility & Education */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs sm:text-sm">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">
              Eligibility & Academic Criteria
            </h3>
            <p className="text-slate-800 font-medium">{selectedJob.education}</p>
            <div className="mt-2 text-slate-500 text-xs flex items-center gap-3">
              <span>{selectedJob.vacancies} Available Vacancies</span>
              <span>·</span>
              <span>Posted {selectedJob.postedDaysAgo} days ago</span>
            </div>
          </div>

          {/* Perks & Benefits */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-2">Perks & Candidate Support</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {selectedJob.perks.map((perk, i) => (
                <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-teal-50/50 border border-teal-100 text-slate-800">
                  <Check className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                  <span>{perk}</span>
                </div>
              ))}
            </div>
          </div>

          {/* About Company */}
          <div className="border-t border-slate-100 pt-4">
            <h3 className="text-sm font-bold text-slate-900 mb-1">About {selectedJob.company}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{selectedJob.aboutCompany}</p>
          </div>
        </div>

        {/* Modal Bottom Action Bar */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => toggleSaveJob(selectedJob.id)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold border flex items-center gap-2 transition-colors ${
              saved
                ? 'bg-teal-50 border-teal-300 text-teal-800'
                : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${saved ? 'fill-teal-600' : ''}`} />
            <span>{saved ? 'Saved in Dashboard' : 'Save for Later'}</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setSelectedJob(null)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
            >
              Close
            </button>

            {alreadyApplied ? (
              <span className="px-5 py-2.5 bg-emerald-100 text-emerald-900 font-bold text-xs rounded-xl flex items-center gap-1.5 border border-emerald-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                Application Submitted
              </span>
            ) : (
              <button
                onClick={() => {
                  const jobToApply = selectedJob;
                  setSelectedJob(null);
                  setApplyJobModal(jobToApply);
                }}
                className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl transition-colors shadow-md flex items-center gap-2"
              >
                <span>Apply for this Job</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
