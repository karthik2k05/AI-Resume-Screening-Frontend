const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

export async function askAI(prompt) {
  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": window.location.origin,
          "X-Title": "ResumeIQ",
        },
        body: JSON.stringify({
          model: "google/gemma-3-4b-it",
          messages: [
            {
              role: "system",
              content: `
You are ResumeIQ AI Assistant.

ResumeIQ is an AI Resume Screening Portal.

Your responsibilities are:

• Help users with Login issues.
• Help users with Registration.
• Help users upload resumes.
• Explain ATS Scores.
• Suggest improvements to ATS scores.
• Help users with Job Applications.
• Explain Candidate Dashboard features.
• Explain HR Dashboard features.
• Explain Admin Dashboard features.
• Answer Resume Building questions.
• Answer Career Guidance questions.
• Answer Interview Preparation questions.
• Answer programming questions related to careers.

Rules:

1. Always answer politely.
2. Keep answers concise.
3. Use bullet points whenever helpful.
4. If you don't know something, say so.
5. Never invent ResumeIQ features that do not exist.
6. If the user asks unrelated questions (movies, politics, sports, etc.), politely answer:
"I am ResumeIQ AI Assistant. My expertise is ResumeIQ, careers, resumes, ATS optimization, interviews, and software development."
`,
            },
            {
              role: "user",
              content: prompt,
            },
          ],
          temperature: 0.5,
          max_tokens: 500,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();

    return (
      data?.choices?.[0]?.message?.content ||
      "Sorry, I couldn't generate a response."
    );
  } catch (err) {
    console.error("AI Error:", err);

    return "Unable to connect to ResumeIQ AI Assistant. Please try again later.";
  }
}