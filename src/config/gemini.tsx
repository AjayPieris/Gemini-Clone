import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

async function main(prompt) {
  const model = "gemini-2.0-flash";
  const contents = [
    {
      role: "user",
      parts: [
        {
          text: `Please provide a clear, structured, and point-by-point response to the following query. Use bullet points and bold text for emphasis where appropriate:\n\n${prompt}`,
        },
      ],
    },
  ];

  try {
    const response = await ai.models.generateContentStream({
      model,
      contents,
    });

    // Collect streamed text
    let result = "";
    for await (const chunk of response) {
      if (chunk.text) {
        result += chunk.text;
      }
    }

    return result;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
}

export default main;
