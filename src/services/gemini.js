import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export const analyzeStudyMaterial = async (text) => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
  const prompt = `
    أنت مساعد تعليمي ذكي اسمك Kozmo.
    حلّل المادة الدراسية التالية وأعطني:
    
    1. **ملخص سريع**: 3-4 جمل عن أهم ما في المادة
    2. **المفاهيم الأساسية**: قائمة بأهم 5 مفاهيم
    3. **أسئلة للمراجعة**: 3 أسئلة تساعد على الفهم
    
    المادة:
    ${text.slice(0, 10000)}
  `;
  
  const result = await model.generateContent(prompt);
  return result.response.text();
};