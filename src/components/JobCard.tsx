import React from 'react';
import { Job } from '../types';
import { useJobContext } from '../context/JobContext';
import { calculateSkillMatch } from '../utils/skillMatcher';
import { MapPin, Briefcase, IndianRupee, Bookmark, Sparkles, CheckCircle2, Building2 } from 'lucide-react';

interface JobCardProps {
  job: Job;
}

export const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const {
    currentUser,
    setSelectedJob,
    setApplyJobModal,
    toggleSaveJob,
    isJobSaved,
    applications,
  } = useJobContext();

  const saved = isJobSaved(job.id);
  const alreadyApplied = applications.some((app) => app.jobId === job.id);

  // Calculate live match against current user skills
  const matchResult = currentUser
    ? calculateSkillMatch(currentUser.skills, job.requiredSkills, job.preferredSkills)
    : null;

  const matchScore = matchResult ? matchResult.score : null;

  return (
    <article className="bg-white rounded-xl border border-slate-200 hover:border-teal-400 p-5 shadow-xs hover:shadow-md transition-all group relative">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        {/* Company Avatar & Primary Info */}
        <div className="flex items-start gap-3.5">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-base shrink-0 shadow-xs"
            style={{ backgroundColor: job.logoBgColor || '#0f2744' }}
            aria-hidden="true"
          >
            {job.companyLogoText}
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setSelectedJob(job)}
                className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors text-left"
              >
                {job.title}
              </button>
              {job.isRuralFriendly && (
                <span className="text-[11px] font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Rural Fresher Friendly
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-600 mt-1">
              <span className="font-semibold text-slate-800 flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5 text-slate-400" />
                {job.company}
              </span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-500">{job.category}</span>
            </div>
          </div>
        </div>

        {/* Right Match Badge & Save Button */}
        <div className="flex items-center gap-2 self-start">
          {matchScore !== null && (
            <div
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold font-mono tabular-nums flex items-center gap-1.5 border ${
                matchScore >= 75
                  ? 'bg-teal-50 text-teal-800 border-teal-200'
                  : matchScore >= 40
                  ? 'bg-blue-50 text-blue-800 border-blue-200'
                  : 'bg-slate-100 text-slate-700 border-slate-200'
              }`}
              title={`Based on your profile skills match for ${job.title}`}
            >
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span>{matchScore}% Match</span>
            </div>
          )}

          <button
            onClick={() => toggleSaveJob(job.id)}
            className={`p-2 rounded-lg border transition-colors ${
              saved
                ? 'bg-teal-50 border-teal-300 text-teal-700'
                : 'border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50'
            }`}
            title={saved ? 'Remove from saved jobs' : 'Save job to dashboard'}
            aria-label={saved ? `Unsave ${job.title}` : `Save ${job.title}`}
          >
            <Bookmark className={`w-4 h-4 ${saved ? 'fill-teal-600' : ''}`} />
          </button>
        </div>
      </div>

      {/* Naukri-style 3-Point Meta Line: Experience, Salary, Location */}
      <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-600">
        <div className="flex items-center gap-1.5">
          <Briefcase className="w-4 h-4 text-slate-400 shrink-0" />
          <span className="truncate">{job.experienceLevel}</span>
        </div>
        <div className="flex items-center gap-1.5 font-medium text-slate-900">
          <IndianRupee className="w-4 h-4 text-slate-400 shrink-0" />
          <span className="font-mono tabular-nums">{job.salary}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
          <span className="truncate">{job.location} ({job.workMode})</span>
        </div>
      </div>

      {/* Brief Snippet */}
      <p className="mt-3 text-xs text-slate-600 line-clamp-2 leading-relaxed">
        {job.description}
      </p>

      {/* Skills breakdown - highlighting candidate matched skills */}
      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        <span className="text-[11px] text-slate-400 font-medium mr-1">Skills:</span>
        {job.requiredSkills.map((skill) => {
          const isMatched = matchResult?.matchedSkills.includes(skill);
          return (
            <span
              key={skill}
              className={`text-[11px] px-2 py-0.5 rounded transition-colors ${
                isMatched
                  ? 'bg-teal-50 text-teal-800 font-medium border border-teal-200'
                  : 'bg-slate-100 text-slate-700'
              }`}
            >
              {isMatched && <span className="mr-1 text-teal-600 font-bold">✓</span>}
              {skill}
            </span>
          );
        })}
      </div>

      {/* Footer Actions: Posted date & CTA buttons */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="text-slate-400 text-[11px] flex items-center gap-2">
          <span>Posted {job.postedDaysAgo === 1 ? '1 day ago' : `${job.postedDaysAgo} days ago`}</span>
          <span aria-hidden="true">·</span>
          <span>{job.vacancies} Vacancies</span>
          <span aria-hidden="true">·</span>
          <span className="font-medium text-slate-600">{job.education}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setSelectedJob(job)}
            className="px-3 py-1.5 border border-slate-300 text-slate-700 hover:bg-slate-50 font-medium rounded-lg transition-colors"
          >
            View Details
          </button>

          {alreadyApplied ? (
            <span className="px-3 py-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold rounded-lg flex items-center gap-1 text-[11px]">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Applied
            </span>
          ) : (
            <button
              onClick={() => setApplyJobModal(job)}
              className="px-3.5 py-1.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg transition-colors shadow-xs"
            >
              Apply Now
            </button>
          )}
        </div>
      </div>
    </article>
  );
};
