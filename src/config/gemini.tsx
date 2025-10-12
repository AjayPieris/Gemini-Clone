import { GoogleGenAI } from "@google/genai";

async function main(prompt: string) {
  const ai = new GoogleGenAI({
    apiKey: "AIzaSyCcRPsjVfl1oiw-SpfUivztTvxZdZMKGgk",
  });

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

  for await (const chunk of response) {
    if (chunk.text) {
      console.log(chunk.text);
    }
  }
}

// Call the function with a prompt
main("").catch(console.error);

export default main;
