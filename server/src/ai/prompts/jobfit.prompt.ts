interface Experience {
  company: string;
  role: string;
  years: number;
}

interface Projects {
  name: string;
  description: string;
  links?: {
    github?: string;
    live?: string;
    demo?: string;
    article?: string;
  };
}
export const jobfitPrompt = ({
  jobDescription,
  requiredSkills,
  candidateSkills,
  candidateExperience,
  candidateProjects,
}: {
  jobDescription: string;
  requiredSkills: string[];
  candidateSkills: string[];
  candidateExperience: Experience[] | string;
  candidateProjects: Projects[] | string;
}) => {
  const experienceText =
    candidateExperience === 'Not Provided'
      ? 'Not Provided'
      : JSON.stringify(candidateExperience);

  const projectsText =
    candidateProjects === 'Not Provided'
      ? 'Not Provided'
      : JSON.stringify(candidateProjects);
  return `You are helping a job-seeker by comparing their profile for a specific job.

Rules:
- If experience or projects are missing, do NOT assume they exist.
- Base the match primarily on available skills.
- If important information is missing, mention it clearly in the output.
- Reduce confidence and match percentage in the match score when data is missing.
- Do NOT penalize harshly for missing optional fields.
- Be honest and conservative.

Job Description:
${jobDescription}

Job Required Skills:
${requiredSkills.join(', ')}

Candidate Profile:
Skills: ${candidateSkills.join(', ')}

Experience:
${experienceText}

Projects:
${projectsText}

Output:
- Match Percentage (0-100)
- Matching Skills
- Missing / Unclear Skills
- Confidence Level (High / Medium / Low)
- Recommendation (Recommended to Apply / Apply with Improvements / Not Recommended Yet)
- Short Explanation`;
};
