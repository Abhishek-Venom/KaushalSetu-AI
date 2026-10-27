import React, { useState } from 'react';
import { useJobContext } from '../context/JobContext';
import { DEMO_PROFILES } from '../data/demoProfiles';
import { X, LogIn, UserPlus, Sparkles, Check, ArrowRight } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { authModalOpen, setAuthModalOpen, authModalMode, switchPersona, loginUser, signupUser } =
    useJobContext();

  const [mode, setMode] = useState<'login' | 'signup'>(authModalMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Sign up fields
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [district, setDistrict] = useState('');
  const [state, setState] = useState('Bihar');
  const [education, setEducation] = useState('B.Tech CSE');
  const [targetRole, setTargetRole] = useState('Junior Web Developer');
  const [selectedSkills, setSelectedSkills] = useState<string[]>(['HTML5 & CSS3', 'JavaScript']);

  if (!authModalOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginUser(email || 'ramesh.cse2026@gmail.com');
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signupUser({
      name: name || 'Demo Student',
      email: email || 'student@kaushalsetu.in',
      phone: phone || '+91 98000 12345',
      district: district || 'Darbhanga',
      state,
      education,
      targetRole,
      skills: selectedSkills,
    });
  };

  const toggleSkillSelection = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div
        className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 overflow-hidden relative my-8 animate-in fade-in duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
      >
        {/* Header */}
        <div className="bg-[#0a192f] text-white p-6 relative">
          <button
            onClick={() => setAuthModalOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <h2 id="auth-modal-title" className="text-xl font-extrabold text-white">
            {mode === 'login' ? 'Candidate Sign In' : 'Create Candidate Account'}
          </h2>
          <p className="text-xs text-teal-300 mt-1">
            Access AI skill recommendations, gap diagnostics, and verified rural jobs.
          </p>

          {/* Mode Switch Tabs */}
          <div className="flex gap-2 mt-4 bg-slate-800/80 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setMode('login')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                mode === 'login' ? 'bg-teal-500 text-slate-950 shadow-sm' : 'text-slate-300 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setMode('signup')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                mode === 'signup' ? 'bg-teal-500 text-slate-950 shadow-sm' : 'text-slate-300 hover:text-white'
              }`}
            >
              Sign Up (Free)
            </button>
          </div>
        </div>

        {/* 1-Click Demo Persona Strip */}
        <div className="bg-slate-50 p-4 border-b border-slate-200">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>Fast 1-Click Demo Login</span>
          </div>

          <div className="space-y-1.5">
            {DEMO_PROFILES.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => {
                  switchPersona(p.id);
                  setAuthModalOpen(false);
                }}
                className="w-full text-left p-2 rounded-lg bg-white hover:bg-teal-50 border border-slate-200 hover:border-teal-300 transition-colors flex items-center justify-between text-xs"
              >
                <div>
                  <span className="font-bold text-slate-900">{p.name}</span>
                  <span className="text-slate-500 ml-2">({p.district}, {p.education.split(' ')[0]})</span>
                </div>
                <span className="text-[11px] text-teal-700 font-semibold flex items-center gap-0.5">
                  Select <ArrowRight className="w-3 h-3" />
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {mode === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Email or Mobile Number</label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ramesh.cse2026@gmail.com"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:border-teal-600 focus:bg-white outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:border-teal-600 focus:bg-white outline-none"
                />
                <span className="text-[10px] text-slate-400 block mt-1">
                  Demo mode: Any password accepted. Or use 1-click persona above.
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl transition-colors shadow flex items-center justify-center gap-2"
              >
                <LogIn className="w-4 h-4" />
                <span>Sign In to Dashboard</span>
              </button>
            </form>
          ) : (
            <form onSubmit={handleSignupSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Anjali Sharma"
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg focus:border-teal-600 focus:bg-white outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">District</label>
                  <input
                    type="text"
                    required
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    placeholder="e.g. Gaya / Jhansi"
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg focus:border-teal-600 focus:bg-white outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">State</label>
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg focus:border-teal-600 outline-none text-slate-700"
                  >
                    <option value="Bihar">Bihar</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Jharkhand">Jharkhand</option>
                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Pan-India">Other / All India</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Highest Qualification</label>
                <select
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg focus:border-teal-600 outline-none text-slate-700"
                >
                  <option value="B.Tech Computer Science / IT">B.Tech Computer Science / IT</option>
                  <option value="Diploma in Engineering (CS/EE/Civil)">Diploma in Engineering</option>
                  <option value="BCA / MCA">BCA / MCA</option>
                  <option value="B.Sc / B.Com / Any Graduate">B.Sc / B.Com / Any Graduate</option>
                  <option value="ITI / Vocational Skill Certified">ITI / Vocational Skill Certified</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Select Initial Skills</label>
                <div className="flex flex-wrap gap-1.5">
                  {['HTML5 & CSS3', 'JavaScript', 'React', 'Python', 'MS Office / Excel', 'Git & GitHub', 'SQL'].map(
                    (s) => {
                      const selected = selectedSkills.includes(s);
                      return (
                        <button
                          key={s}
                          type="button"
                          onClick={() => toggleSkillSelection(s)}
                          className={`px-2 py-1 rounded text-[11px] transition-colors border ${
                            selected
                              ? 'bg-teal-50 border-teal-500 text-teal-800 font-semibold'
                              : 'bg-slate-50 border-slate-200 text-slate-600'
                          }`}
                        >
                          {selected ? '✓ ' : '+ '}
                          {s}
                        </button>
                      );
                    }
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl transition-colors shadow flex items-center justify-center gap-2"
              >
                <UserPlus className="w-4 h-4" />
                <span>Create Account & Start Matching</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
