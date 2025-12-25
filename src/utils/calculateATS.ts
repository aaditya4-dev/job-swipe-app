import type { Job } from "../types/job";

type UserProfile = {
  skills: string[];
  cgpa: number;
  branch: string;
};

const synonyms: Record<string, string[]> = {
  react: ["javascript", "jsx"],
  ui: ["css", "design"],
  backend: ["node", "api"],
};

export function calculateATS(job: Job, user: UserProfile) {
  let score = 0;

  // 1. Skill match (60)
  const matchedSkills = job.keywords.filter((k) =>
    user.skills.includes(k.toLowerCase())
  );
  const skillScore = (matchedSkills.length / job.keywords.length) * 60;
  score += skillScore;

  // 2. Eligibility (25)
  const requiredCgpa = parseFloat(job.eligibility.cgpa);
  let eligibilityScore = 0;
  if (user.cgpa >= requiredCgpa) eligibilityScore += 15;
  if (
    job.eligibility.branch === "Any" ||
    job.eligibility.branch === user.branch
  ) {
    eligibilityScore += 10;
  }
  score += eligibilityScore;

  // 3. Keyword relevance (15)
  let relevanceScore = 0;
  Object.entries(synonyms).forEach(([key, values]) => {
    if (
      job.keywords.includes(key) &&
      values.some((v) => user.skills.includes(v))
    ) {
      relevanceScore += 5;
    }
  });
  relevanceScore = Math.min(relevanceScore, 15);
  score += relevanceScore;

  return {
    total: Math.round(Math.min(score, 100)),
    breakdown: {
      skillScore: Math.round(skillScore),
      eligibilityScore,
      relevanceScore,
    },
    matchedSkills,
  };
}
