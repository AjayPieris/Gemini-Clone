import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  console.error(
    "Error: VITE_GEMINI_API_KEY is not set. Run with: node --env-file=.env test_api.js"
  );
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey });

async function main() {
  const model = "gemini-2.0-flash";
  const contents = [
    {
      role: "user",
      parts: [{ text: "Hi, how are you?" }],
    },
  ];

  try {
    console.log("Sending request...");
    const response = await ai.models.generateContentStream({
      model,
      contents,
    });

    console.log("Response received. Iterating...");
    let result = "";
    for await (const chunk of response) {
      // console.log("Chunk:", chunk);
      if (chunk.text) {
        result += chunk.text;
      } else if (typeof chunk.text === "function") {
        result += chunk.text();
      }
    }
    console.log("Result:", result);
  } catch (error) {
    console.error("Error:", error);
  }
}

main();
