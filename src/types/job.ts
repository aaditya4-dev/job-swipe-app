export type Job = {
  id: number;
  title: string;
  company: string;
  tags: string[];
  description: string;
  eligibility: {
    cgpa: string;
    branch: string; 
    

  };
  keywords: string[];
  formLink: string;
};
