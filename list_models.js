import { GoogleGenAI } from "@google/genai";

const apiKey = "AIzaSyCcRPsjVfl1oiw-SpfUivztTvxZdZMKGgk";
const ai = new GoogleGenAI({ apiKey });

async function listModels() {
  try {
    const response = await ai.models.list();
    console.log("Available models:");
    for await (const model of response) {
      console.log(model.name);
    }
  } catch (error) {
    console.error("Error listing models:", error);
  }
}

listModels();
