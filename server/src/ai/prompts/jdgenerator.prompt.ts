export const jdGeneratePrompt = ({
  jobDescription,
  requiredSkills,
  title,
}: {
  jobDescription: string;
  requiredSkills: string[];
  title: string;
}) => {
  return `You are an AI assistant helping a employer generating a better job description.

Rules:
- Use ONLY the information provided below.
- Do NOT introduce new skills, tools, or requirements.
- Do NOT change the job title meaning or seniority.
- Improve clarity, structure, and readability only.
- Keep the description realistic and concise.

Job Description:
${jobDescription}

Job Required Skills:
${requiredSkills.join(', ')}

Job Title:
${title}

Output (STRICT):
- Job Title
- Improved Job Description
- Required Skills`;
};
