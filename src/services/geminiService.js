const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

export async function askGemini(prompt) {
  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
         model: "google/gemma-3-4b-it",
          messages: [
            {
              role: "system",
              content: `
You are ResumeIQ AI Assistant.

Your responsibilities:
- Answer ResumeIQ project questions professionally.
- Answer programming questions.
- Answer interview questions.
- Answer AI/ML questions.
- Answer career guidance questions.
- If the question is unrelated to ResumeIQ, still answer helpfully.
- Keep answers concise and easy to understand.
`,
            },
            {
              role: "user",
              content: prompt,
            },
          ],
        }),
      }
    );

    const data = await response.json();

    console.log("Status:", response.status);
console.log("Response:", JSON.stringify(data, null, 2));

    if (data.choices && data.choices.length > 0) {
      return data.choices[0].message.content;
    }

    return "Sorry, I couldn't generate a response.";
  } catch (err) {
    console.error(err);
    return "Unable to connect to AI.";
  }
}