import React, { useState } from 'react';
import { useJobContext } from '../context/JobContext';
import { X, Send, FileCheck, Building2, Phone, Mail, User, IndianRupee, CheckCircle2 } from 'lucide-react';

export const ApplyJobModal: React.FC = () => {
  const { applyJobModal, setApplyJobModal, currentUser, submitApplication, setActiveView } = useJobContext();

  const [name, setName] = useState(currentUser?.name || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [expectedSalary, setExpectedSalary] = useState('');
  const [note, setNote] = useState('');
  const [resumeName, setResumeName] = useState(currentUser?.resumeFileName || 'Candidate_Resume_Verified.pdf');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!applyJobModal) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!phone.trim() || phone.trim().length < 8) {
      setErrorMsg('Please enter a valid mobile number for recruiter SMS updates.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    setTimeout(() => {
      const success = submitApplication(applyJobModal, {
        name,
        phone,
        note,
        expectedSalary: expectedSalary || applyJobModal.salary,
      });

      setIsSubmitting(false);
      if (success) {
        setSubmittedSuccess(true);
      }
    }, 600);
  };

  const handleClose = () => {
    setApplyJobModal(null);
    setSubmittedSuccess(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div
        className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden relative my-8 animate-in fade-in duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="apply-modal-title"
      >
        {/* Header */}
        <div className="bg-[#0a192f] text-white p-5 relative">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <h2 id="apply-modal-title" className="text-lg font-bold text-white">
            Apply to {applyJobModal.company}
          </h2>
          <p className="text-xs text-teal-300 mt-0.5">{applyJobModal.title}</p>
        </div>

        {submittedSuccess ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Application Submitted!</h3>
            <p className="text-xs text-slate-600 leading-relaxed max-w-sm mx-auto">
              Your profile and demo resume have been transmitted to the HR team at <strong>{applyJobModal.company}</strong>. You can monitor your application review status live in your dashboard.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row gap-2 justify-center">
              <button
                onClick={() => {
                  handleClose();
                  setActiveView('dashboard');
                }}
                className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs rounded-xl shadow"
              >
                Go to Candidate Dashboard
              </button>
              <button
                onClick={handleClose}
                className="px-4 py-2.5 border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs rounded-xl"
              >
                Continue Browsing Jobs
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
            {errorMsg && (
              <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs">
                {errorMsg}
              </div>
            )}

            {/* Candidate Name */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Candidate Full Name <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ramesh Kumar"
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:border-teal-600 focus:bg-white outline-none"
                />
              </div>
            </div>

            {/* Phone & Email Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Mobile Number (SMS/WhatsApp) <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98350 41234"
                    className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:border-teal-600 focus:bg-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="candidate@gmail.com"
                    className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:border-teal-600 focus:bg-white outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Expected Salary / Stipend */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Expected Salary / Stipend
              </label>
              <div className="relative">
                <IndianRupee className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={expectedSalary}
                  onChange={(e) => setExpectedSalary(e.target.value)}
                  placeholder={`As per post: ${applyJobModal.salary}`}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:border-teal-600 focus:bg-white outline-none"
                />
              </div>
            </div>

            {/* Attached Demo Resume */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Attached Resume</label>
              <div className="p-3 rounded-lg border border-teal-200 bg-teal-50/50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-teal-700" />
                  <div>
                    <div className="font-semibold text-slate-800 text-xs">{resumeName}</div>
                    <div className="text-[10px] text-slate-500">Auto-synced with profile verified skills</div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const customName = prompt('Enter customized resume file label:', resumeName);
                    if (customName) setResumeName(customName);
                  }}
                  className="text-xs text-teal-800 font-semibold hover:underline"
                >
                  Change
                </button>
              </div>
            </div>

            {/* Cover Note */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Message to Recruiter (Optional)
              </label>
              <textarea
                rows={3}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Briefly state your village/district, education background, and why you are excited for this opportunity..."
                className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:border-teal-600 focus:bg-white outline-none resize-none"
              />
            </div>

            {/* Submit & Close Buttons */}
            <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 border border-slate-300 rounded-xl font-medium text-slate-700 hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl transition-colors shadow flex items-center gap-1.5 disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmitting ? 'Submitting...' : 'Send Application'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
