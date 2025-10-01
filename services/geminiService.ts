
import { GoogleGenAI, Type, Chat } from "@google/genai";
import type { GeneratedResume } from '../types';

if (!process.env.API_KEY) {
  // In a real app, you'd want to handle this more gracefully,
  // perhaps by disabling AI features or showing an error message.
  // For this project, we assume it's set in the environment.
  console.warn("API_KEY environment variable not set. AI features will not work.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const GREG_DUKES_PROFILE = `
  Greg L. Dukes (BLKDMND) is a full-stack AI architect and React engineer with deep expertise in UI/UX design. 
  His core skills include: React, TypeScript, Node.js, Python, Tailwind CSS, Next.js, Serverless Architecture (AWS Lambda),
  AI/ML integration (Google Gemini API, Hugging Face), and building scalable, user-centric applications.
  He excels at translating complex ideas into functional and beautiful digital experiences.
`;

export const generateResumeContent = async (jobTitle: string): Promise<GeneratedResume> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Based on the following profile of Greg L. Dukes, generate a professional resume summary and 5-7 prioritized, quantifiable bullet points tailored for a "${jobTitle}" position. Profile: ${GREG_DUKES_PROFILE}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: {
              type: Type.STRING,
              description: "A professional summary of 2-3 sentences."
            },
            bulletPoints: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "A list of 5 to 7 achievement-oriented bullet points."
            }
          },
          required: ["summary", "bulletPoints"]
        }
      }
    });
    
    const jsonText = response.text.trim();
    const parsedJson = JSON.parse(jsonText);

    // Basic validation
    if (parsedJson && typeof parsedJson.summary === 'string' && Array.isArray(parsedJson.bulletPoints)) {
        return parsedJson as GeneratedResume;
    } else {
        throw new Error("Invalid JSON structure received from API.");
    }

  } catch (error) {
    console.error("Error generating resume content:", error);
    throw new Error("Failed to generate AI-powered resume. Please try again.");
  }
};

let chatInstance: Chat | null = null;

export const getChatInstance = (): Chat => {
    if (!chatInstance) {
        chatInstance = ai.chats.create({
            model: 'gemini-2.5-flash',
            config: {
                systemInstruction: `You are a helpful and professional AI assistant for Greg L. Dukes' (BLKDMND) portfolio website. Your knowledge base is the following profile: ${GREG_DUKES_PROFILE}. Answer questions about his skills, projects, and professional experience based ONLY on this profile. Keep your answers concise and friendly. If a question is outside this scope, politely decline to answer.`,
            },
        });
    }
    return chatInstance;
};
