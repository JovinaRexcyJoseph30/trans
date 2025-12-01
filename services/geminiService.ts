import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

let aiClient: GoogleGenAI | null = null;

const getAiClient = () => {
  if (!aiClient) {
    // Try to get key from Vite env or standard process env
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
    if (apiKey) {
      aiClient = new GoogleGenAI({ apiKey });
    }
  }
  return aiClient;
};

export const sendMessageToGemini = async (message: string, history: { role: string, parts: { text: string }[] }[] = []) => {
  const client = getAiClient();
  if (!client) {
    // Return null or throw error depending on desired UX. 
    // Throwing error allows the UI to handle the "not configured" state.
    console.warn("Gemini API Key not found. Please set VITE_GEMINI_API_KEY in .env");
    return null;
  }

  try {
    const chat = client.chats.create({
      model: "gemini-2.0-flash",
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      history: history.map(h => ({
        role: h.role,
        parts: h.parts
      })),
    });

    const result = await chat.sendMessage({ message });
    return result.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};