// import type { Job } from "../types/job";

// export const jobs: Job[] = [];

import type { Job } from "../types/job";

export const jobs: Job[] = [
  {
    id: 1,
    title: "Frontend Intern",
    company: "TechNova",
    tags: ["React", "javascript", "CSS"],
    description: "Work on building responsive UI and frontend features.",
    eligibility: {
      cgpa: "6.5+",
      branch: "CS / IT",
    },
    keywords: ["react", "javascript", "css","git","responsive"], 
    formLink:"https://docs.google.com/forms/d/e/1FAIpQLSfsiD8G0aJkhscBaoeHf4b1mpZhG4g_HEEjysp8eeSsOQ9DLA/viewform"
  },
  {
    id: 2,
    title: "UI Developer Intern",
    company: "Designify",
    tags: ["UI", "CSS", "Figma"],
    description: "Design clean and user-friendly interfaces.",
    eligibility: {
      cgpa: "6.0+",
      branch: "Any",
    },
    keywords: ["ui", "css", "figma","html","git","responsive"],
     formLink:"https://docs.google.com/forms/d/e/1FAIpQLSfsiD8G0aJkhscBaoeHf4b1mpZhG4g_HEEjysp8eeSsOQ9DLA/viewform"
  },
];
