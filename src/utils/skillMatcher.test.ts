import test from 'node:test';
import assert from 'node:assert/strict';
import {
  normalizeSkill,
  doesSkillMatch,
  calculateSkillMatch,
  calculateSkillGap,
  rankJobsByMatch,
} from './skillMatcher';
import { Job } from '../types';

test('normalizeSkill handles punctuation and excess whitespace', () => {
  assert.equal(normalizeSkill('  HTML5 & CSS3  '), 'html5 css3');
  assert.equal(normalizeSkill('React.js'), 'react js');
});

test('doesSkillMatch recognizes direct matches and aliases', () => {
  assert.equal(doesSkillMatch('React', 'React'), true);
  assert.equal(doesSkillMatch('ReactJS', 'React'), true);
  assert.equal(doesSkillMatch('JavaScript', 'JS'), true);
  assert.equal(doesSkillMatch('MS Excel', 'MS Office / Excel'), true);
  assert.equal(doesSkillMatch('Kotlin', 'Python'), false);
});

test('calculateSkillMatch calculates percentages accurately', () => {
  const userSkills = ['HTML5 & CSS3', 'JavaScript', 'React', 'Git'];
  const requiredSkills = ['HTML5 & CSS3', 'JavaScript', 'React', 'Git & GitHub', 'REST APIs'];

  const result = calculateSkillMatch(userSkills, requiredSkills);
  // 4 out of 5 required skills match -> 80%
  assert.equal(result.score, 80);
  assert.equal(result.matchedSkills.length, 4);
  assert.equal(result.missingSkills.length, 1);
  assert.equal(result.missingSkills[0], 'REST APIs');
});

test('calculateSkillMatch returns 0 when candidate has no matching skills', () => {
  const result = calculateSkillMatch(['Carpentry'], ['Python', 'SQL']);
  assert.equal(result.score, 0);
  assert.equal(result.missingSkills.length, 2);
});

test('calculateSkillGap returns structured analysis and recommended courses', () => {
  const userSkills = ['HTML5 & CSS3', 'JavaScript'];
  const analysis = calculateSkillGap(userSkills, 'Junior Web Developer');

  assert.equal(analysis.targetRole, 'Junior Web Developer');
  assert.ok(analysis.matchScore > 0 && analysis.matchScore < 100);
  assert.ok(analysis.missingSkills.includes('React'));
  assert.ok(analysis.recommendedCourses.length > 0);
  assert.ok(analysis.actionPlan.length > 0);
});

test('rankJobsByMatch orders jobs by highest match score first', () => {
  const mockJobs: Job[] = [
    {
      id: 'job-1',
      title: 'Python Trainee',
      company: 'Test Corp',
      companyLogoText: 'TC',
      logoBgColor: '#0f2744',
      category: 'IT & Software',
      location: 'Patna, Bihar',
      district: 'Patna',
      state: 'Bihar',
      isRuralFriendly: true,
      jobType: 'Full-time',
      experienceLevel: 'Fresher (0-1 yrs)',
      salary: '₹3.0 LPA',
      salaryMinNum: 300000,
      vacancies: 5,
      postedDaysAgo: 1,
      requiredSkills: ['Python', 'Machine Learning Basics'],
      preferredSkills: [],
      education: 'B.Tech',
      description: 'Test',
      responsibilities: ['Code in Python'],
      perks: ['Training'],
      aboutCompany: 'Good company',
      workMode: 'On-site',
    },
    {
      id: 'job-2',
      title: 'Frontend Intern',
      company: 'Web Solutions',
      companyLogoText: 'WS',
      logoBgColor: '#0d9488',
      category: 'IT & Software',
      location: 'Ranchi, Jharkhand',
      district: 'Ranchi',
      state: 'Jharkhand',
      isRuralFriendly: true,
      jobType: 'Internship',
      experienceLevel: 'Internship',
      salary: '₹15,000 / mo',
      salaryMinNum: 180000,
      vacancies: 2,
      postedDaysAgo: 2,
      requiredSkills: ['React', 'JavaScript'],
      preferredSkills: [],
      education: 'BCA / B.Tech',
      description: 'Test',
      responsibilities: ['Build UI'],
      perks: ['Certificate'],
      aboutCompany: 'Web company',
      workMode: 'Remote',
    },
  ];

  const candidateSkills = ['React', 'JavaScript', 'HTML'];
  const ranked = rankJobsByMatch(mockJobs, candidateSkills);

  assert.equal(ranked[0].id, 'job-2');
  assert.equal(ranked[0].matchScore, 100);
  assert.equal(ranked[1].id, 'job-1');
  assert.equal(ranked[1].matchScore, 0);
});
