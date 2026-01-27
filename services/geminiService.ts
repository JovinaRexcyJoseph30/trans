
import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

// Following @google/genai guidelines: Initialize the client inside the function 
// and use the recommended model for text tasks.
export const sendMessageToGemini = async (message: string, history: { role: string, parts: { text: string }[] }[] = []) => {
  // Always initialize GoogleGenAI with a named parameter
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    // Basic Text Tasks should use 'gemini-3-flash-preview'
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      history: history.map(h => ({
        role: h.role,
        parts: h.parts
      })),
    });

    const result = await chat.sendMessage({ message });
    // result.text is a property, not a method
    return result.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
