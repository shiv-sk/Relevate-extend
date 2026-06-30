import { GoogleGenAI } from '@google/genai';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
export async function generateAIContent(
  contents: string,
  systemInstruction: string,
): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
      },
    });
    return response.text as string;
  } catch (error) {
    console.error('Error generating content:', error);
    throw error;
  }
}
