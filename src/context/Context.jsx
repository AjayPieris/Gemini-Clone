import { createContext, useState } from "react";
import main from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");
  const [chatHistory, setChatHistory] = useState({}); // store prompt -> response

  const delayPara = (index, nextWord) => {
    setTimeout(() => {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };

  const newChat = () => {
    setLoading(false)
    setShowResult(false)
  }

  const onSent = async (customPrompt) => {
    const promptText = customPrompt || input.trim();
    if (!promptText) return;

    setResultData("");
    setLoading(true);
    setShowResult(true);
    setRecentPrompt(promptText);

    try {
      // ✅ Check if prompt exists before adding
      setPrevPrompts((prev) => {
        if (!prev.includes(promptText)) return [...prev, promptText];
        return prev;
      });

      // ✅ If we already have stored response, show it without calling Gemini again
      if (chatHistory[promptText]) {
        setResultData(chatHistory[promptText]);
        setLoading(false);
        return;
      }

      // 🚀 Get new response from Gemini
      const response = await main(promptText);

      // Format bolds and breaks
      let responseArray = response.split("**");
      let formatted = "";
      for (let i = 0; i < responseArray.length; i++) {
        formatted += i % 2 === 1 ? `<b>${responseArray[i]}</b>` : responseArray[i];
      }

      let withBreaks = formatted.replace(/\*/g, "<br/>");
      let words = withBreaks.split(" ");

      // Typing animation
      let finalText = "";
      words.forEach((word, i) => {
        finalText += word + " ";
        delayPara(i, word + " ");
      });

      // ✅ Save to chat history
      setChatHistory((prev) => ({ ...prev, [promptText]: withBreaks }));
    } catch (error) {
      console.error("Error from Gemini:", error);
      setResultData("⚠️ Something went wrong. Please try again.");
    }

    setLoading(false);
    setInput("");
  };

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat,
  };

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
