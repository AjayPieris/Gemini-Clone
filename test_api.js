import { GoogleGenAI } from "@google/genai";

const apiKey = "AIzaSyCcRPsjVfl1oiw-SpfUivztTvxZdZMKGgk";
const ai = new GoogleGenAI({ apiKey });

async function main() {
  const model = "gemini-2.0-flash";
  const contents = [
    {
      role: "user",
      parts: [
        {
          text: "Please provide a clear, structured, and point-by-point response to the following query. Use bullet points and bold text for emphasis where appropriate:\n\nExplain quantum computing",
        },
      ],
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
