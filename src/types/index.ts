export type JobType = 'Full-time' | 'Internship' | 'Apprenticeship';
export type ExperienceLevel = 'Fresher (0-1 yrs)' | 'Internship' | '1-2 Years';

export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogoText: string;
  logoBgColor: string;
  category: string;
  location: string;
  district: string;
  state: string;
  isRuralFriendly: boolean;
  jobType: JobType;
  experienceLevel: ExperienceLevel;
  salary: string;
  salaryMinNum: number; // for numeric sorting/filtering in INR
  vacancies: number;
  postedDaysAgo: number;
  requiredSkills: string[];
  preferredSkills: string[];
  education: string;
  description: string;
  responsibilities: string[];
  perks: string[];
  aboutCompany: string;
  workMode: 'On-site' | 'Hybrid' | 'Remote';
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  district: string;
  state: string;
  education: string;
  college: string;
  passingYear: string;
  targetRole: string;
  skills: string[];
  certifications: string[];
  languages: string[];
  resumeUploaded: boolean;
  resumeFileName?: string;
}

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  appliedDate: string;
  status: 'Submitted' | 'Under Review' | 'Interview Shortlisted' | 'Assessment Pending' | 'Offer Extended';
  applicantName: string;
  applicantPhone: string;
  coverNote?: string;
  expectedSalary?: string;
}

export interface SkillMatchResult {
  score: number; // 0 to 100
  matchedSkills: string[];
  missingSkills: string[];
}

export interface RecommendedCourse {
  title: string;
  provider: string;
  duration: string;
  skill: string;
  linkText: string;
  isFreeGovtCourse: boolean;
}

export interface SkillGapAnalysis {
  targetRole: string;
  matchScore: number;
  acquiredSkills: string[];
  missingSkills: string[];
  recommendedCourses: RecommendedCourse[];
  actionPlan: string[];
}
