import React, { useState, useRef, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Bot,
  User,
  Paperclip,
  MoreHorizontal,
  Sparkles,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import "./chat.css";

const MOCK_MESSAGES = [
  {
    id: 1,
    role: "bot",
    content:
      "Hello Moaaz! 👋 I am Kozmo your AI Study Assistant. What would you like to focus on today?",
  },
];

export default function Chat() {
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newUserMessage = {
      id: Date.now(),
      role: "user",
      content: inputValue.trim(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const newBotMessage = {
        id: Date.now() + 1,
        role: "bot",
        content:
          "I'm processing your request. Since I'm currently running offline as an interface mockup, I highly recommend expanding on this feature later by integrating a true Language Model API!",
      };
      setMessages((prev) => [...prev, newBotMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <motion.div
      className="chat-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="chat-header">
        <div className="chat-header-title">
          <Sparkles className="chat-header-icon" size={24} />
          <h2>Study Assistant</h2>
        </div>
        <button className="chat-header-action">
          <MoreHorizontal size={20} />
        </button>
      </div>

      <div className="chat-messages-area">
        <div className="chat-messages-list">
          <AnimatePresence initial={false}>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3 }}
                className={`message-wrapper ${message.role}`}
              >
                <div className="message-avatar">
                  {message.role === "bot" ? (
                    <Bot size={20} />
                  ) : (
                    <User size={20} />
                  )}
                </div>
                <div className="message-content">
                  <ReactMarkdown>{message.content}</ReactMarkdown>
                </div>
              </motion.div>
            ))}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="message-wrapper bot typing-indicator-wrapper"
              >
                <div className="message-avatar">
                  <Bot size={20} />
                </div>
                <div className="message-content typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </AnimatePresence>
        </div>
      </div>

      <form className="chat-input-area" onSubmit={handleSendMessage}>
        <div className="chat-input-container">
          <button
            type="button"
            className="chat-attach-btn"
            aria-label="Attach File"
            title="Attach File"
          >
            <Paperclip size={20} />
          </button>
          <input
            type="text"
            className="chat-input"
            placeholder="Ask anything about your studies..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            type="submit"
            className="chat-send-btn"
            disabled={!inputValue.trim()}
            aria-label="Send Message"
            title="Send"
          >
            <Send size={18} />
          </button>
        </div>
      </form>
    </motion.div>
  );
}
