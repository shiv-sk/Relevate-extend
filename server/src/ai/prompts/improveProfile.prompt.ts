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
export const improveProfilePrompt = ({
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
  return `You are helping a job-seeker improve their profile for a specific job.

Rules:
- Focus on missing or weak areas.
- If experience or projects are missing, suggest what kind of experience/projects would help.
- Do NOT invent experience.
- Give actionable suggestions.

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
- Most Important Gaps
- What to Improve First
- Missing / Unclear Skills
- Suggested Projects or Experience Types
- Skill Priority List`;
};
