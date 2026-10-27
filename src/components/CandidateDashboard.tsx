import React, { useState } from 'react';
import { useJobContext } from '../context/JobContext';
import { calculateSkillGap, rankJobsByMatch, ROLE_SKILL_REQUIREMENTS } from '../utils/skillMatcher';
import { JobCard } from './JobCard';
import {
  User,
  Sparkles,
  BookOpen,
  Bookmark,
  FileCheck,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  ExternalLink,
  Briefcase,
  MapPin,
  GraduationCap,
  Calendar,
  Layers,
  Award,
  ChevronRight,
  Send,
} from 'lucide-react';

export const CandidateDashboard: React.FC = () => {
  const {
    currentUser,
    jobs,
    savedJobIds,
    applications,
    withdrawApplication,
    addSkillToProfile,
    removeSkillFromProfile,
    updateTargetRole,
    setAuthModalOpen,
    setActiveView,
  } = useJobContext();

  const [activeTab, setActiveTab] = useState<'recommended' | 'saved' | 'applications'>('recommended');
  const [newSkillInput, setNewSkillInput] = useState('');

  if (!currentUser) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-6 bg-slate-50">
        <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center max-w-md shadow-sm">
          <div className="w-12 h-12 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center mx-auto mb-4">
            <User className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Sign in to Candidate Dashboard</h2>
          <p className="text-xs text-slate-500 mb-6 leading-relaxed">
            Create or select a candidate profile to view personalized skill-to-job recommendations, calculate your skill gap, and track applications.
          </p>
          <button
            onClick={() => setAuthModalOpen(true, 'login')}
            className="w-full py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs rounded-xl transition-colors shadow"
          >
            Sign In / Switch Demo Persona
          </button>
        </div>
      </div>
    );
  }

  // Calculate skill gap analysis for user's target role
  const skillGap = calculateSkillGap(currentUser.skills, currentUser.targetRole);

  // Ranked jobs
  const rankedJobs = rankJobsByMatch(jobs, currentUser.skills);
  const savedJobs = jobs.filter((j) => savedJobIds.includes(j.id));

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSkillInput.trim()) {
      addSkillToProfile(newSkillInput.trim());
      setNewSkillInput('');
    }
  };

  const commonSkillSuggestions = [
    'HTML5 & CSS3',
    'JavaScript',
    'React',
    'Python',
    'Git & GitHub',
    'SQL',
    'MS Office / Excel',
    'KYC Documentation',
    'Farmer Communication',
    'Basic Computer Operations',
  ].filter((s) => !currentUser.skills.includes(s));

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <button onClick={() => setActiveView('home')} className="hover:underline">
            KaushalSetu AI
          </button>
          <span>/</span>
          <span className="text-slate-800 font-medium">Candidate Dashboard</span>
        </div>

        {/* Top Profile Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            {/* User Meta */}
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl bg-[#0a192f] text-teal-400 font-extrabold text-2xl flex items-center justify-center shrink-0 shadow-sm border border-slate-700">
                {currentUser.name.charAt(0)}
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2.5">
                  <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                    {currentUser.name}
                  </h1>
                  <span className="text-xs bg-teal-50 text-teal-800 px-2.5 py-0.5 rounded-full font-medium border border-teal-200">
                    Verified Rural Talent
                  </span>
                </div>

                <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600">
                  <span className="flex items-center gap-1">
                    <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                    {currentUser.education} ({currentUser.passingYear})
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {currentUser.district}, {currentUser.state}
                  </span>
                  <span className="text-slate-500">{currentUser.college}</span>
                </div>
              </div>
            </div>

            {/* Target Role Selector */}
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 max-w-sm w-full">
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Target Career Pathway
              </label>
              <select
                value={currentUser.targetRole}
                onChange={(e) => updateTargetRole(e.target.value)}
                className="w-full text-xs font-semibold text-slate-900 bg-white border border-slate-300 rounded-lg p-2 focus:border-teal-600 outline-none"
                aria-label="Target Career Pathway"
              >
                {Object.keys(ROLE_SKILL_REQUIREMENTS).map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
              <span className="text-[10px] text-slate-400 block mt-1">
                Recommendation engine tailors skill gaps to this role.
              </span>
            </div>
          </div>

          {/* User Skills Manager */}
          <div className="mt-6 pt-5 border-t border-slate-100">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <div>
                <span className="text-xs font-bold text-slate-900 block">
                  My Verified Skills ({currentUser.skills.length})
                </span>
                <span className="text-[11px] text-slate-500">
                  Click the &quot;×&quot; to remove, or add new skills below. All job match percentages update dynamically.
                </span>
              </div>

              {/* Add Skill Form */}
              <form onSubmit={handleAddSkill} className="flex gap-1.5">
                <input
                  type="text"
                  value={newSkillInput}
                  onChange={(e) => setNewSkillInput(e.target.value)}
                  placeholder="Add skill (e.g. Git, SQL)"
                  className="px-2.5 py-1 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:border-teal-600 focus:bg-white outline-none w-44"
                />
                <button
                  type="submit"
                  className="px-3 py-1 bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add
                </button>
              </form>
            </div>

            {/* Current Skills Tags */}
            <div className="flex flex-wrap gap-1.5 items-center">
              {currentUser.skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 text-slate-800 border border-slate-200"
                >
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => removeSkillFromProfile(skill)}
                    className="text-slate-400 hover:text-rose-600 font-bold ml-1"
                    title={`Remove ${skill}`}
                    aria-label={`Remove skill ${skill}`}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>

            {/* Quick Add Suggestions */}
            {commonSkillSuggestions.length > 0 && (
              <div className="mt-2.5 flex flex-wrap items-center gap-1.5 text-[11px] text-slate-500">
                <span className="font-medium text-slate-600">Quick add:</span>
                {commonSkillSuggestions.slice(0, 5).map((sugg) => (
                  <button
                    key={sugg}
                    type="button"
                    onClick={() => addSkillToProfile(sugg)}
                    className="text-teal-700 hover:text-teal-900 bg-teal-50 hover:bg-teal-100/80 px-2 py-0.5 rounded border border-teal-200 transition-colors"
                  >
                    + {sugg}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* AI Skill-Gap Analysis Card */}
        <div className="bg-gradient-to-br from-slate-900 via-[#0f2744] to-[#0a192f] text-white rounded-2xl p-6 shadow-md border border-slate-800">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-800">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 text-[11px] font-semibold mb-1">
                <Sparkles className="w-3 h-3 text-teal-400" />
                <span>AI Skill-Gap Diagnostic</span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                Skill Readiness for: <span className="text-teal-400">{skillGap.targetRole}</span>
              </h2>
              <p className="text-xs text-slate-300 mt-0.5">
                Comparing your active profile against standard entry-level industry expectations.
              </p>
            </div>

            {/* Radial / Progress Score */}
            <div className="flex items-center gap-4 bg-slate-800/80 px-5 py-3 rounded-xl border border-slate-700">
              <div className="text-right">
                <div className="text-2xl font-extrabold text-teal-400 font-mono tabular-nums">
                  {skillGap.matchScore}%
                </div>
                <div className="text-[10px] text-slate-400 font-medium">Readiness Index</div>
              </div>
              <div className="w-20 bg-slate-700 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-teal-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${skillGap.matchScore}%` }}
                />
              </div>
            </div>
          </div>

          {/* Acquired vs Missing Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
            {/* Acquired Skills */}
            <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/80">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Acquired Competencies ({skillGap.acquiredSkills.length})
                </span>
                <span className="text-[10px] text-slate-400">Validated</span>
              </div>
              {skillGap.acquiredSkills.length > 0 ? (
                <div className="flex flex-wrap gap-1.5">
                  {skillGap.acquiredSkills.map((s) => (
                    <span
                      key={s}
                      className="text-xs px-2.5 py-1 bg-emerald-950/60 text-emerald-200 border border-emerald-800/60 rounded-lg"
                    >
                      ✓ {s}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400 italic">No skills matched yet. Add skills to your profile.</p>
              )}
            </div>

            {/* Missing Skills */}
            <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/80">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-amber-400" />
                  Identified Gaps to Bridge ({skillGap.missingSkills.length})
                </span>
                <span className="text-[10px] text-slate-400">Click &apos;+&apos; if acquired</span>
              </div>
              {skillGap.missingSkills.length > 0 ? (
                <div className="flex flex-wrap gap-1.5">
                  {skillGap.missingSkills.map((s) => (
                    <span
                      key={s}
                      className="text-xs px-2.5 py-1 bg-amber-950/60 text-amber-200 border border-amber-800/60 rounded-lg inline-flex items-center gap-1.5"
                    >
                      <span>{s}</span>
                      <button
                        type="button"
                        onClick={() => addSkillToProfile(s)}
                        title={`Add ${s} to my profile`}
                        className="text-amber-300 hover:text-white font-bold"
                      >
                        +
                      </button>
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-emerald-300 font-medium">All target skills acquired! You are fully qualified.</p>
              )}
            </div>
          </div>

          {/* Recommended Free Govt & Open Courses */}
          {skillGap.recommendedCourses.length > 0 && (
            <div className="mt-5 pt-4 border-t border-slate-800">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="w-4 h-4 text-teal-400" />
                <span className="text-xs font-bold text-white">
                  Recommended Free Skill Bridge Modules (Govt & Open Source)
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {skillGap.recommendedCourses.map((course, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-slate-800/80 border border-slate-700 hover:border-teal-500 transition-colors flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-[10px] text-teal-300 mb-1">
                        <span>{course.provider}</span>
                        <span className="font-mono">{course.duration}</span>
                      </div>
                      <div className="text-xs font-bold text-white line-clamp-1">{course.title}</div>
                      <div className="text-[11px] text-slate-400 mt-1">Focus Skill: {course.skill}</div>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-700/60 flex items-center justify-between text-[11px]">
                      <span className="text-emerald-400 font-semibold">100% Free</span>
                      <span className="text-teal-300 hover:text-white font-medium flex items-center gap-1 cursor-pointer">
                        {course.linkText}
                        <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Tabbed Navigation: Recommended vs Saved vs Applications */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="border-b border-slate-200 px-6 pt-3 flex gap-4 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('recommended')}
              className={`pb-3 border-b-2 flex items-center gap-2 transition-colors ${
                activeTab === 'recommended'
                  ? 'border-teal-600 text-teal-700'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Recommended Jobs For You ({rankedJobs.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('saved')}
              className={`pb-3 border-b-2 flex items-center gap-2 transition-colors ${
                activeTab === 'saved'
                  ? 'border-teal-600 text-teal-700'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Bookmark className="w-4 h-4" />
              <span>Saved Jobs ({savedJobs.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('applications')}
              className={`pb-3 border-b-2 flex items-center gap-2 transition-colors ${
                activeTab === 'applications'
                  ? 'border-teal-600 text-teal-700'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <FileCheck className="w-4 h-4" />
              <span>Application Status ({applications.length})</span>
            </button>
          </div>

          <div className="p-6">
            {/* Tab 1: Recommended Jobs */}
            {activeTab === 'recommended' && (
              <div className="space-y-4">
                <div className="text-xs text-slate-500 flex items-center justify-between">
                  <span>Sorted by highest skill match percentage with {currentUser.name}&apos;s profile.</span>
                  <button
                    onClick={() => setActiveView('jobs')}
                    className="text-teal-700 hover:underline font-semibold"
                  >
                    View All 18 Openings →
                  </button>
                </div>

                <div className="space-y-4">
                  {rankedJobs.slice(0, 6).map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>
              </div>
            )}

            {/* Tab 2: Saved Jobs */}
            {activeTab === 'saved' && (
              <div className="space-y-4">
                {savedJobs.length > 0 ? (
                  <div className="space-y-4">
                    {savedJobs.map((job) => (
                      <JobCard key={job.id} job={job} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-slate-500">
                    <Bookmark className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                    <p className="text-xs font-medium">No saved jobs yet.</p>
                    <p className="text-[11px] text-slate-400 mt-1 mb-4">
                      Bookmark jobs from the search list to review or apply to them later.
                    </p>
                    <button
                      onClick={() => setActiveView('jobs')}
                      className="px-4 py-2 bg-teal-600 text-white rounded-lg text-xs font-semibold"
                    >
                      Browse Openings
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Tab 3: Applications Status */}
            {activeTab === 'applications' && (
              <div className="space-y-4">
                {applications.length > 0 ? (
                  <div className="divide-y divide-slate-100">
                    {applications.map((app) => (
                      <div
                        key={app.id}
                        className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div>
                          <div className="flex items-center gap-2.5">
                            <h4 className="text-sm font-bold text-slate-900">{app.jobTitle}</h4>
                            <span
                              className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${
                                app.status === 'Interview Shortlisted'
                                  ? 'bg-purple-50 text-purple-800 border-purple-200'
                                  : app.status === 'Under Review'
                                  ? 'bg-blue-50 text-blue-800 border-blue-200'
                                  : 'bg-teal-50 text-teal-800 border-teal-200'
                              }`}
                            >
                              {app.status}
                            </span>
                          </div>

                          <div className="text-xs text-slate-600 mt-1 flex flex-wrap items-center gap-3">
                            <span className="font-semibold text-slate-800">{app.company}</span>
                            <span>·</span>
                            <span>Applied: {app.appliedDate}</span>
                            <span>·</span>
                            <span>Candidate: {app.applicantName}</span>
                          </div>

                          {app.coverNote && (
                            <p className="text-[11px] text-slate-500 italic mt-1.5 bg-slate-50 p-2 rounded">
                              &quot;{app.coverNote}&quot;
                            </p>
                          )}
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          <button
                            onClick={() => withdrawApplication(app.id)}
                            className="text-xs text-slate-400 hover:text-rose-600 transition-colors flex items-center gap-1"
                            title="Withdraw application"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Withdraw</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-slate-500">
                    <FileCheck className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                    <p className="text-xs font-medium">You haven&apos;t submitted any job applications yet.</p>
                    <p className="text-[11px] text-slate-400 mt-1 mb-4">
                      Browse recommended roles and click &quot;Apply Now&quot; to begin your application tracking.
                    </p>
                    <button
                      onClick={() => setActiveView('jobs')}
                      className="px-4 py-2 bg-teal-600 text-white rounded-lg text-xs font-semibold"
                    >
                      Find Jobs to Apply
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
