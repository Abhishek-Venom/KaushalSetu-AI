import { Job, SkillGapAnalysis, SkillMatchResult, RecommendedCourse } from '../types';

export const ROLE_SKILL_REQUIREMENTS: Record<string, string[]> = {
  'Junior Web Developer': [
    'HTML5 & CSS3',
    'JavaScript',
    'React',
    'Git & GitHub',
    'Responsive Design',
    'REST APIs',
    'Basic SQL',
  ],
  'Python & AI Trainee': [
    'Python',
    'Data Structures',
    'NumPy & Pandas',
    'SQL',
    'Machine Learning Basics',
    'Git',
    'Problem Solving',
  ],
  'CSC & Digital Seva Executive': [
    'Basic Computer Operations',
    'MS Office / Excel',
    'Internet Navigation',
    'Online Form Filling & Documentation',
    'Regional Language Communication',
    'Customer Grievance Handling',
  ],
  'AgriTech Field Operations Trainee': [
    'Smartphone & App Literacy',
    'Basic GPS & GIS Mapping',
    'Agricultural Basics',
    'Farmer Communication',
    'Data Entry & Reporting',
    'Field Surveying',
  ],
  'Rural Micro-Banking Executive': [
    'Financial Literacy',
    'MS Excel',
    'Customer Relations',
    'KYC Documentation',
    'Mobile Banking Apps',
    'Regional Language Fluency',
  ],
  'Solar & Renewable Energy Technician': [
    'Basic Electrical Circuitry',
    'Solar Panel Installation Basics',
    'Multimeter Usage',
    'Preventive Maintenance',
    'Safety Standards',
    'Troubleshooting',
  ],
  'Quality Assurance & Software Tester': [
    'Manual Testing Concepts',
    'Bug Tracking (Jira/Excel)',
    'Test Case Creation',
    'SQL Basics',
    'Web Application Fundamentals',
    'Attention to Detail',
  ],
};

export const COURSE_RECOMMENDATIONS_DATABASE: Record<string, RecommendedCourse[]> = {
  'React': [
    {
      title: 'React for Beginners (Hindi & English)',
      provider: 'freeCodeCamp / YouTube',
      duration: '12 Hours',
      skill: 'React',
      linkText: 'Start Learning',
      isFreeGovtCourse: false,
    },
    {
      title: 'Frontend Web Development Certification',
      provider: 'Skill India Digital / NSDC',
      duration: '40 Hours',
      skill: 'React',
      linkText: 'Skill India Portal',
      isFreeGovtCourse: true,
    },
  ],
  'Git & GitHub': [
    {
      title: 'Git & Version Control Essentials',
      provider: 'SWAYAM (NPTEL)',
      duration: '4 Weeks',
      skill: 'Git & GitHub',
      linkText: 'Access on SWAYAM',
      isFreeGovtCourse: true,
    },
  ],
  'Python': [
    {
      title: 'Python for Everyone with Hindi Explanations',
      provider: 'Skill India / IIT Spoken Tutorial',
      duration: '20 Hours',
      skill: 'Python',
      linkText: 'IIT Spoken Tutorial',
      isFreeGovtCourse: true,
    },
  ],
  'SQL': [
    {
      title: 'Relational Database & SQL Fundamentals',
      provider: 'SWAYAM / CEC India',
      duration: '6 Weeks',
      skill: 'SQL',
      linkText: 'Join Free Batch',
      isFreeGovtCourse: true,
    },
  ],
  'Basic SQL': [
    {
      title: 'Relational Database & SQL Fundamentals',
      provider: 'SWAYAM / CEC India',
      duration: '6 Weeks',
      skill: 'Basic SQL',
      linkText: 'Join Free Batch',
      isFreeGovtCourse: true,
    },
  ],
  'MS Office / Excel': [
    {
      title: 'Advanced Excel for Rural BPO & Accounting',
      provider: 'PMKVY / NSDC Skill Center',
      duration: '15 Days',
      skill: 'MS Office / Excel',
      linkText: 'Locate PMKVY Center',
      isFreeGovtCourse: true,
    },
  ],
  'KYC Documentation': [
    {
      title: 'Banking Correspondent & Facilitator Certification',
      provider: 'Indian Institute of Banking & Finance (IIBF)',
      duration: '2 Weeks',
      skill: 'KYC Documentation',
      linkText: 'View Module',
      isFreeGovtCourse: true,
    },
  ],
  'Solar Panel Installation Basics': [
    {
      title: 'Suryamitra Solar Skill Development Programme',
      provider: 'National Institute of Solar Energy (NISE)',
      duration: '3 Months (Stipend Provided)',
      skill: 'Solar Panel Installation Basics',
      linkText: 'Apply on NISE',
      isFreeGovtCourse: true,
    },
  ],
};

/**
 * Normalizes a skill string for fuzzy matching (lowercased, alphanumeric only)
 */
export function normalizeSkill(skill: string): string {
  return skill
    .toLowerCase()
    .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Checks if a candidate skill matches a required skill
 */
export function doesSkillMatch(userSkill: string, targetSkill: string): boolean {
  const normUser = normalizeSkill(userSkill);
  const normTarget = normalizeSkill(targetSkill);

  if (normUser === normTarget) return true;
  if (normUser.length >= 3 && normTarget.includes(normUser)) return true;
  if (normTarget.length >= 3 && normUser.includes(normTarget)) return true;

  // Specific equivalencies
  const equivalencies: Record<string, string[]> = {
    'react': ['reactjs', 'react js', 'frontend'],
    'javascript': ['js', 'es6', 'vanilla js'],
    'python': ['python3', 'python programming'],
    'sql': ['mysql', 'postgresql', 'sqlite', 'database', 'basic sql'],
    'ms office': ['excel', 'ms excel', 'spreadsheets', 'word'],
    'html5': ['html', 'html css', 'html5 css3'],
    'git': ['github', 'git github', 'version control'],
  };

  for (const [key, aliases] of Object.entries(equivalencies)) {
    const isTargetInFamily = normTarget.includes(key) || aliases.some((a) => normTarget.includes(a));
    const isUserInFamily = normUser.includes(key) || aliases.some((a) => normUser.includes(a));
    if (isTargetInFamily && isUserInFamily) return true;
  }

  return false;
}

/**
 * Calculates skill match percentage between candidate's skills and a job's requirements
 */
export function calculateSkillMatch(
  userSkills: string[],
  requiredSkills: string[],
  preferredSkills: string[] = []
): SkillMatchResult {
  if (!requiredSkills || requiredSkills.length === 0) {
    return { score: 100, matchedSkills: [], missingSkills: [] };
  }

  if (!userSkills || userSkills.length === 0) {
    return { score: 0, matchedSkills: [], missingSkills: [...requiredSkills] };
  }

  const matchedSkills: string[] = [];
  const missingSkills: string[] = [];

  for (const reqSkill of requiredSkills) {
    const matched = userSkills.some((uSkill) => doesSkillMatch(uSkill, reqSkill));
    if (matched) {
      matchedSkills.push(reqSkill);
    } else {
      missingSkills.push(reqSkill);
    }
  }

  // Weight: 85% for required skills, 15% bonus for preferred skills
  const requiredWeight = (matchedSkills.length / requiredSkills.length) * 85;

  let preferredBonus = 0;
  if (preferredSkills.length > 0) {
    const matchedPreferred = preferredSkills.filter((pref) =>
      userSkills.some((uSkill) => doesSkillMatch(uSkill, pref))
    );
    preferredBonus = (matchedPreferred.length / preferredSkills.length) * 15;
  } else {
    // If no preferred skills are listed, scale required skills to 100%
    return {
      score: Math.round((matchedSkills.length / requiredSkills.length) * 100),
      matchedSkills,
      missingSkills,
    };
  }

  const totalScore = Math.min(100, Math.round(requiredWeight + preferredBonus));

  return {
    score: totalScore,
    matchedSkills,
    missingSkills,
  };
}

/**
 * Performs a comprehensive skill-gap analysis for a specific target role
 */
export function calculateSkillGap(userSkills: string[], targetRole: string): SkillGapAnalysis {
  const roleSkills = ROLE_SKILL_REQUIREMENTS[targetRole] || ROLE_SKILL_REQUIREMENTS['Junior Web Developer'];

  const match = calculateSkillMatch(userSkills, roleSkills);

  const recommendedCourses: RecommendedCourse[] = [];
  for (const missing of match.missingSkills) {
    // Check direct match or partial match in course DB
    const matchingKey = Object.keys(COURSE_RECOMMENDATIONS_DATABASE).find(
      (k) => doesSkillMatch(missing, k) || missing.toLowerCase().includes(k.toLowerCase())
    );

    if (matchingKey && COURSE_RECOMMENDATIONS_DATABASE[matchingKey]) {
      recommendedCourses.push(...COURSE_RECOMMENDATIONS_DATABASE[matchingKey]);
    } else {
      // Default government skill portal fallback
      recommendedCourses.push({
        title: `${missing} Skill Certification`,
        provider: 'SWAYAM / National Skill Development Corp',
        duration: 'Self-paced (2-4 Weeks)',
        skill: missing,
        linkText: 'Explore on Skill India',
        isFreeGovtCourse: true,
      });
    }
  }

  const actionPlan: string[] = [];
  if (match.missingSkills.length === 0) {
    actionPlan.push('Your profile is a 100% match! Apply directly to open positions.');
    actionPlan.push('Prepare for technical interviews by reviewing projects on GitHub.');
  } else {
    actionPlan.push(`Priority 1: Complete training in ${match.missingSkills[0]} to raise match score above 70%.`);
    if (match.missingSkills[1]) {
      actionPlan.push(`Priority 2: Build a hands-on project demonstrating ${match.missingSkills[1]}.`);
    }
    actionPlan.push('Leverage free PMKVY or SWAYAM certifications to verify your qualifications.');
  }

  return {
    targetRole,
    matchScore: match.score,
    acquiredSkills: match.matchedSkills,
    missingSkills: match.missingSkills,
    recommendedCourses: recommendedCourses.slice(0, 5),
    actionPlan,
  };
}

/**
 * Sorts and tags jobs by how well they match a candidate's skills
 */
export function rankJobsByMatch(
  jobs: Job[],
  userSkills: string[]
): (Job & { matchScore: number; matchedSkills: string[]; missingSkills: string[] })[] {
  return jobs
    .map((job) => {
      const match = calculateSkillMatch(userSkills, job.requiredSkills, job.preferredSkills);
      return {
        ...job,
        matchScore: match.score,
        matchedSkills: match.matchedSkills,
        missingSkills: match.missingSkills,
      };
    })
    .sort((a, b) => b.matchScore - a.matchScore);
}
