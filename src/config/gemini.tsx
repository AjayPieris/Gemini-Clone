import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: "AIzaSyCcRPsjVfl1oiw-SpfUivztTvxZdZMKGgk", // your key
});

async function main(prompt) {
  const model = "gemini-2.5-flash-lite";
  const contents = [
    {
      role: "user",
      parts: [{ text: prompt }],
    },
  ];

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

  return result; // ✅ return the full response text
}

export default main;
