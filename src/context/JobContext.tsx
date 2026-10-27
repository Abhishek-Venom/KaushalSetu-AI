import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Job, UserProfile, Application } from '../types';
import { SAMPLE_JOBS } from '../data/sampleJobs';
import { DEMO_PROFILES, INITIAL_APPLICATIONS } from '../data/demoProfiles';

interface JobFiltersState {
  keyword: string;
  location: string;
  category: string;
  jobType: string;
  experienceLevel: string;
  minSalary: number;
  workMode: string;
  onlyHighMatch: boolean;
  sortBy: 'relevance' | 'newest' | 'salary-high';
}

interface JobContextType {
  jobs: Job[];
  currentUser: UserProfile | null;
  savedJobIds: string[];
  applications: Application[];
  filters: JobFiltersState;
  activeView: 'home' | 'jobs' | 'dashboard' | 'about';
  selectedJob: Job | null;
  applyJobModal: Job | null;
  authModalOpen: boolean;
  authModalMode: 'login' | 'signup';
  notification: { message: string; type: 'success' | 'info' | 'error' } | null;

  // Actions
  setActiveView: (view: 'home' | 'jobs' | 'dashboard' | 'about') => void;
  setSelectedJob: (job: Job | null) => void;
  setApplyJobModal: (job: Job | null) => void;
  setAuthModalOpen: (open: boolean, mode?: 'login' | 'signup') => void;
  updateFilters: (partial: Partial<JobFiltersState>) => void;
  resetFilters: () => void;
  toggleSaveJob: (jobId: string) => void;
  isJobSaved: (jobId: string) => boolean;
  submitApplication: (
    job: Job,
    details: { name: string; phone: string; note: string; expectedSalary: string }
  ) => boolean;
  withdrawApplication: (appId: string) => void;
  addSkillToProfile: (skill: string) => void;
  removeSkillFromProfile: (skill: string) => void;
  updateTargetRole: (role: string) => void;
  switchPersona: (profileId: string) => void;
  loginUser: (email: string) => void;
  signupUser: (profile: Partial<UserProfile>) => void;
  logoutUser: () => void;
  showNotification: (message: string, type?: 'success' | 'info' | 'error') => void;
}

const initialFilters: JobFiltersState = {
  keyword: '',
  location: '',
  category: '',
  jobType: '',
  experienceLevel: '',
  minSalary: 0,
  workMode: '',
  onlyHighMatch: false,
  sortBy: 'relevance',
};

const JobContext = createContext<JobContextType | undefined>(undefined);

const STORAGE_KEYS = {
  CURRENT_USER: 'kaushalsetu_current_user_v1',
  SAVED_JOBS: 'kaushalsetu_saved_jobs_v1',
  APPLICATIONS: 'kaushalsetu_applications_v1',
};

export const JobProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [jobs] = useState<Job[]>(SAMPLE_JOBS);
  const [activeView, setActiveView] = useState<'home' | 'jobs' | 'dashboard' | 'about'>('home');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [applyJobModal, setApplyJobModal] = useState<Job | null>(null);
  const [authModalOpen, setAuthModalOpenState] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('login');
  const [filters, setFilters] = useState<JobFiltersState>(initialFilters);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  // Load from localStorage or defaults
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
      return saved ? JSON.parse(saved) : DEMO_PROFILES[0]; // Default to Ramesh Kumar
    } catch {
      return DEMO_PROFILES[0];
    }
  });

  const [savedJobIds, setSavedJobIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SAVED_JOBS);
      return saved ? JSON.parse(saved) : ['job-ks-01', 'job-ks-05'];
    } catch {
      return ['job-ks-01', 'job-ks-05'];
    }
  });

  const [applications, setApplications] = useState<Application[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
      return saved ? JSON.parse(saved) : INITIAL_APPLICATIONS;
    } catch {
      return INITIAL_APPLICATIONS;
    }
  });

  // Sync to localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SAVED_JOBS, JSON.stringify(savedJobIds));
  }, [savedJobIds]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(applications));
  }, [applications]);

  const showNotification = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification((curr) => (curr?.message === message ? null : curr));
    }, 3500);
  };

  const setAuthModalOpen = (open: boolean, mode: 'login' | 'signup' = 'login') => {
    setAuthModalMode(mode);
    setAuthModalOpenState(open);
  };

  const updateFilters = (partial: Partial<JobFiltersState>) => {
    setFilters((prev) => ({ ...prev, ...partial }));
  };

  const resetFilters = () => {
    setFilters(initialFilters);
  };

  const toggleSaveJob = (jobId: string) => {
    setSavedJobIds((prev) => {
      const exists = prev.includes(jobId);
      if (exists) {
        showNotification('Job removed from saved list.', 'info');
        return prev.filter((id) => id !== jobId);
      } else {
        showNotification('Job saved to your dashboard.', 'success');
        return [...prev, jobId];
      }
    });
  };

  const isJobSaved = (jobId: string) => savedJobIds.includes(jobId);

  const submitApplication = (
    job: Job,
    details: { name: string; phone: string; note: string; expectedSalary: string }
  ): boolean => {
    // Check if already applied
    const alreadyApplied = applications.some((app) => app.jobId === job.id);
    if (alreadyApplied) {
      showNotification('You have already submitted an application for this position.', 'info');
      return false;
    }

    const newApp: Application = {
      id: `app-${Date.now()}`,
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
      appliedDate: 'Just now',
      status: 'Submitted',
      applicantName: details.name,
      applicantPhone: details.phone,
      coverNote: details.note,
      expectedSalary: details.expectedSalary,
    };

    setApplications((prev) => [newApp, ...prev]);
    showNotification(`Application submitted successfully to ${job.company}!`, 'success');
    return true;
  };

  const withdrawApplication = (appId: string) => {
    setApplications((prev) => prev.filter((a) => a.id !== appId));
    showNotification('Application withdrawn.', 'info');
  };

  const addSkillToProfile = (skill: string) => {
    if (!currentUser) return;
    const cleanSkill = skill.trim();
    if (!cleanSkill) return;
    if (currentUser.skills.some((s) => s.toLowerCase() === cleanSkill.toLowerCase())) {
      showNotification('Skill is already added to your profile.', 'info');
      return;
    }
    const updatedUser = {
      ...currentUser,
      skills: [...currentUser.skills, cleanSkill],
    };
    setCurrentUser(updatedUser);
    showNotification(`Added "${cleanSkill}" to your skill profile.`, 'success');
  };

  const removeSkillFromProfile = (skill: string) => {
    if (!currentUser) return;
    const updatedUser = {
      ...currentUser,
      skills: currentUser.skills.filter((s) => s !== skill),
    };
    setCurrentUser(updatedUser);
    showNotification(`Removed "${skill}" from profile.`, 'info');
  };

  const updateTargetRole = (role: string) => {
    if (!currentUser) return;
    setCurrentUser({
      ...currentUser,
      targetRole: role,
    });
    showNotification(`Target career role updated to ${role}.`, 'success');
  };

  const switchPersona = (profileId: string) => {
    const found = DEMO_PROFILES.find((p) => p.id === profileId);
    if (found) {
      setCurrentUser(found);
      showNotification(`Switched demo candidate to ${found.name}`, 'info');
    }
  };

  const loginUser = (email: string) => {
    const matched = DEMO_PROFILES.find((p) => p.email.toLowerCase() === email.toLowerCase());
    if (matched) {
      setCurrentUser(matched);
      showNotification(`Welcome back, ${matched.name}!`, 'success');
      setAuthModalOpen(false);
    } else {
      // Create guest profile with this email
      const newGuest: UserProfile = {
        id: `user-${Date.now()}`,
        name: email.split('@')[0] || 'Candidate',
        email,
        phone: '+91 98000 00000',
        district: 'Patna',
        state: 'Bihar',
        education: 'B.Tech / Graduate',
        college: 'Regional Technical Institute',
        passingYear: '2026',
        targetRole: 'Junior Web Developer',
        skills: ['HTML5 & CSS3', 'JavaScript', 'React'],
        certifications: ['Basic Computer Certification'],
        languages: ['Hindi', 'English'],
        resumeUploaded: false,
      };
      setCurrentUser(newGuest);
      showNotification(`Logged in as ${newGuest.name}!`, 'success');
      setAuthModalOpen(false);
    }
  };

  const signupUser = (profileData: Partial<UserProfile>) => {
    const newUser: UserProfile = {
      id: `user-${Date.now()}`,
      name: profileData.name || 'New Candidate',
      email: profileData.email || 'user@kaushalsetu.in',
      phone: profileData.phone || '+91 99999 00000',
      district: profileData.district || 'Gaya',
      state: profileData.state || 'Bihar',
      education: profileData.education || 'B.Tech CSE',
      college: profileData.college || 'Government Engineering College',
      passingYear: profileData.passingYear || '2026',
      targetRole: profileData.targetRole || 'Junior Web Developer',
      skills: profileData.skills && profileData.skills.length > 0 ? profileData.skills : ['HTML5 & CSS3', 'JavaScript'],
      certifications: profileData.certifications || ['Skill India Portal Registered'],
      languages: profileData.languages || ['Hindi', 'English'],
      resumeUploaded: true,
      resumeFileName: `${(profileData.name || 'Candidate').replace(/\s+/g, '_')}_Resume.pdf`,
    };

    setCurrentUser(newUser);
    showNotification(`Account created successfully! Welcome, ${newUser.name}.`, 'success');
    setAuthModalOpen(false);
  };

  const logoutUser = () => {
    setCurrentUser(null);
    showNotification('Logged out successfully.', 'info');
  };

  return (
    <JobContext.Provider
      value={{
        jobs,
        currentUser,
        savedJobIds,
        applications,
        filters,
        activeView,
        selectedJob,
        applyJobModal,
        authModalOpen,
        authModalMode,
        notification,
        setActiveView,
        setSelectedJob,
        setApplyJobModal,
        setAuthModalOpen,
        updateFilters,
        resetFilters,
        toggleSaveJob,
        isJobSaved,
        submitApplication,
        withdrawApplication,
        addSkillToProfile,
        removeSkillFromProfile,
        updateTargetRole,
        switchPersona,
        loginUser,
        signupUser,
        logoutUser,
        showNotification,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};

export const useJobContext = () => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error('useJobContext must be used within a JobProvider');
  }
  return context;
};
