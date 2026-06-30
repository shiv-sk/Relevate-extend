export type ProfileReview = {
  matchPercentage: number;
  matchingSkills: string[];
  missingSkills: string[];
  confidenceLevel: 'High' | 'Medium' | 'Low';
  verdict: string;
  explanation: string;
};
