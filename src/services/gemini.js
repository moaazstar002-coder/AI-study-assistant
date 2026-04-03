import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export const summarizePDF = async (text) => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const prompt = `أنت مساعد تعليمي ذكي اسمك Kozmo. قم بتلخيص النص التالي بأسلوب نقاط واضحة: ${text}`;
  
  const result = await model.generateContent(prompt);
  return result.response.text();
};