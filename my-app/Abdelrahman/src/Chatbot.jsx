import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { MessageSquare, X, Send, StopCircle, Bot } from "lucide-react";
import "./Chatbot.css";

const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY;

const Chatbot = () => {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [displayedMessage, setDisplayedMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const typingIntervalRef = useRef(null);
  const fullMessageRef = useRef("");

  const askGemini = async (userQuery) => {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: userQuery }] }],
          }),
        }
      );
      const data = await response.json();
      if (!response.ok) return "Error fetching response.";
      return data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response.";
    } catch {
      return "Connection error.";
    }
  };

  const stopTypingEffect = () => {
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
      typingIntervalRef.current = null;
      setDisplayedMessage(fullMessageRef.current);
      setMessages((prev) =>
        prev.map((msg, i) =>
          i === prev.length - 1
            ? { ...msg, content: fullMessageRef.current }
            : msg
        )
      );
      setIsTyping(false);
    }
  };

  const startTypingEffect = (fullText) => {
    setIsTyping(true);
    setDisplayedMessage("");
    fullMessageRef.current = fullText;
    let index = 0;
    let text = "";

    if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);

    typingIntervalRef.current = setInterval(() => {
      if (index < fullText.length) {
        text += fullText[index];
        setDisplayedMessage(text);
        index++;
      } else {
        clearInterval(typingIntervalRef.current);
        typingIntervalRef.current = null;
        setIsTyping(false);
        setMessages((prev) =>
          prev.map((msg, i) =>
            i === prev.length - 1 ? { ...msg, content: fullText } : msg
          )
        );
      }
    }, 15);
  };

  useEffect(() => {
    if (isOpen) {
      setMessages([{ role: "assistant", content: "..." }]);
      setTimeout(() => {
        startTypingEffect(
          "Hello! I'm your AI Assistant powered by Gemini. How can I help you today?"
        );
      }, 800);
    }
    return () => typingIntervalRef.current && clearInterval(typingIntervalRef.current);
  }, [isOpen]);

  const handleAsk = async () => {
    if (!query.trim()) return;
    stopTypingEffect();
    setLoading(true);

    const newMessages = [...messages, { role: "user", content: query }];
    setMessages([...newMessages, { role: "assistant", content: "Thinking..." }]);
    const userQuery = query;
    setQuery("");

    const geminiResponse = await askGemini(userQuery);
    await new Promise((res) => setTimeout(res, 300));

    startTypingEffect(geminiResponse);
    setMessages([...newMessages, { role: "assistant", content: "..." }]);
    setLoading(false);
  };

  return (
    <div className="chatbot-container">
      {!isOpen && (
        <motion.button
          onClick={() => setIsOpen(true)}
          className="chatbot-toggle"
          whileHover={{ scale: 1.1 }}
        >
          <MessageSquare size={24} />
        </motion.button>
      )}

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="chatbot-window"
        >
          <div className="chatbot-header">
            <h3 className="chatbot-title">
              <Bot className="icon" /> WELLSY Assistant
            </h3>
            <button onClick={() => setIsOpen(false)} className="close-btn">
              <X size={20} />
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${msg.role === "user" ? "user" : "assistant"}`}
              >
                {msg.role === "assistant" &&
                isTyping &&
                index === messages.length - 1
                  ? displayedMessage
                  : msg.content}
              </div>
            ))}
            {loading && <p className="thinking"></p>}
          </div>

          <div className="chatbot-input">
            <input
              type="text"
              placeholder="Ask me anything..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAsk()}
            />
            <motion.button
              onClick={handleAsk}
              className="send-btn"
              whileTap={{ scale: 0.9 }}
              disabled={loading}
            >
              <Send size={20} /> Send
            </motion.button>
          </div>

          {isTyping && (
            <div className="skip-typing">
              <button onClick={stopTypingEffect}>
                <StopCircle size={14} /> Skip Typing
              </button>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default Chatbot;
