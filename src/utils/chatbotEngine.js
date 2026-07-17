import knowledgeBase from "../data/knowledgeBase";
import { askGemini } from "../services/geminiService";
import supportKeywords from "../data/supportKeywords";

export const getBotReply = async (message) => {
  const userMessage = message.toLowerCase();

  for (const word of supportKeywords) {
  if (userMessage.includes(word)) {
    return "__SUPPORT__";
  }
}

  for (const item of knowledgeBase) {
    for (const keyword of item.keywords) {
      if (userMessage.includes(keyword.toLowerCase())) {
        return item.answer;
      }
    }
  }
  for (const word of supportKeywords) {
  if (userMessage.includes(word)) {
    return "__SUPPORT__";
  }
}

  // If no project-related answer is found, ask Gemini
const geminiReply = await askGemini(message);
return geminiReply;
};