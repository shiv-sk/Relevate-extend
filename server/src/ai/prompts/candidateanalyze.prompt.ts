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
  };
}
export const analyzeCandidatePrompt = ({
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
  return `You are helping a Employer to make a decision on candidate selection.

Rules:
- If experience or projects are missing, do NOT assume they exist.
- Base the match primarily on available skills.
- If important information is missing, mention it clearly in the output.
- Reduce match percentage in the match score when data is missing.
- Give candidate pros, cons by comparing candidate skills, projects, experience and job decription, job required skills.

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
- Candidate match percentage (0 - 100)
- Candidate pros
- Candidate cons
- Short Verdict
- Short Explanation
- Recommendation (Proceed to Interview / Consider After Clarification / Low Priority for This Role)`;
};
