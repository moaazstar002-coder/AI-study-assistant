import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export const analyzeStudyMaterial = async (text) => {
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });  
  const prompt = `
    أنت مساعد تعليمي ذكي اسمك Kozmo (كوزمو).
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

export const chatWithGemini = async (history, newMessage) => {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });
  
  // Format history for Gemini API where user is "user" and bot is "model".
  const formattedHistory = history.map((msg) => ({
    role: msg.role === "bot" ? "model" : "user",
    parts: [{ text: msg.content }],
  }));

  const chat = model.startChat({
    history: formattedHistory,
  });

  const result = await chat.sendMessage(newMessage);
  return result.response.text();
};