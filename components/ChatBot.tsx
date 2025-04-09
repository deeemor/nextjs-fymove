"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Send, X, Minimize2, Maximize2, Bot, User } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: "1",
    text: "Hello! I'm your FyMove assistant. How can I help you with your rehabilitation journey today?",
    sender: "bot",
    timestamp: new Date(),
  },
];

const suggestedQuestions = [
  "How do I track my progress?",
  "Can I schedule an appointment?",
  "What exercises are recommended for knee pain?",
  "How often should I do my exercises?",
];

const contactInfo = {
  email: "support@fymove.com",
  phone: "+1 (555) 123-4567",
  pricing: {
    basic: "$99/month (3 sessions)",
    premium: "$199/month (unlimited)"
  }
};

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
      inputRef.current?.focus();
    }
  }, [messages, isOpen, isMinimized]);

  const handleSendMessage = async (text: string = inputValue) => {
    if (!text.trim()) return;

    // Add user message immediately
    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: "user",
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Handle contact/pricing queries instantly
    const lowerText = text.toLowerCase();
    if (lowerText.includes("email") || lowerText.includes("contact") || lowerText.includes("number")) {
      const contactMessage: Message = {
        id: Date.now().toString() + 1,
        text: `Contact our team:\n✉️ ${contactInfo.email}\n📞 ${contactInfo.phone}\n🌐 fymove.com/contact`,
        sender: "bot",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, contactMessage]);
      setIsTyping(false);
      return;
    }

    if (lowerText.includes("pricing") || lowerText.includes("price") || lowerText.includes("cost")) {
      const pricingMessage: Message = {
        id: Date.now().toString() + 1,
        text: `Our plans:\n🟢 Basic: ${contactInfo.pricing.basic}\n🔴 Premium: ${contactInfo.pricing.premium}\n💡 Book free consult: fymove.com/trial`,
        sender: "bot",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, pricingMessage]);
      setIsTyping(false);
      return;
    }

    // Handle medical questions via API
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text.trim() }),
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (!response.ok) throw new Error(await response.text());

      const data = await response.json();
      
      const botMessage: Message = {
        id: Date.now().toString() + 1,
        text: data.response,
        sender: "bot",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Request failed";
      setMessages(prev => [...prev, {
        id: Date.now().toString() + 1,
        text: "For immediate help, call " + contactInfo.phone,
        sender: "bot",
        timestamp: new Date()
      }]);
    } finally {
      setIsTyping(false);
    }
  };

    const suggestedQuestions = [
    "How do I track progress?",
    "What's your email?",
    "See pricing plans", 
    "Exercises for knee pain?"
  ];

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white p-4 rounded-full shadow-lg z-40 transition-all"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <MessageSquare className="w-6 h-6" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? "auto" : "500px",
              width: isMinimized ? "300px" : "380px"
            }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed bottom-20 right-6 bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden z-40 flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5" />
                <h3 className="font-semibold">FyMove Assistant</h3>
              </div>
              <div className="flex items-center gap-2">
                {isMinimized ? (
                  <button onClick={toggleMinimize} className="hover:bg-white/10 p-1 rounded transition-colors">
                    <Maximize2 className="w-4 h-4" />
                  </button>
                ) : (
                  <button onClick={toggleMinimize} className="hover:bg-white/10 p-1 rounded transition-colors">
                    <Minimize2 className="w-4 h-4" />
                  </button>
                )}
                <button onClick={toggleChat} className="hover:bg-white/10 p-1 rounded transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Content */}
            <AnimatePresence>
              {!isMinimized && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  className="flex-grow flex flex-col"
                >
                  {/* Messages */}
                  <div 
                    ref={chatContainerRef}
                    className="flex-grow p-4 overflow-y-auto"
                    style={{ maxHeight: "calc(500px - 160px)" }}
                  >
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <motion.div
                          key={message.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-[80%] rounded-lg p-3 ${
                              message.sender === "user"
                                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-tr-none"
                                : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-tl-none"
                            }`}
                          >
                            <div className="flex items-center gap-2 mb-1">
                              {message.sender === "bot" ? (
                                <Bot className="w-4 h-4" />
                              ) : (
                                <User className="w-4 h-4" />
                              )}
                              <span className="text-xs opacity-75">
                                {message.sender === "bot" ? "FyMove Assistant" : "You"} • {formatTime(message.timestamp)}
                              </span>
                            </div>
                            <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                          </div>
                        </motion.div>
                      ))}
                      {isTyping && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex justify-start"
                        >
                          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 rounded-tl-none">
                            <div className="flex items-center gap-2 mb-1">
                              <Bot className="w-4 h-4" />
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                FyMove Assistant • Typing...
                              </span>
                            </div>
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                              <div className="w-2 h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                              <div className="w-2 h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                      {error && (
                        <div className="text-xs text-red-500 dark:text-red-400 text-center py-2">
                          {error}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Suggested Questions */}
                  {messages.length < 3 && (
                    <div className="px-4 pb-2">
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Suggested questions:</p>
                      <div className="flex flex-wrap gap-2">
                        {suggestedQuestions.map((question, index) => (
                          <motion.button
                            key={index}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className="text-xs bg-gradient-to-r from-blue-600/10 to-purple-600/10 hover:from-blue-600/20 hover:to-purple-600/20 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full transition-colors"
                            onClick={() => handleSendMessage(question)}
                          >
                            {question}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Input */}
                  <div className="p-4 border-t dark:border-gray-700">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleSendMessage();
                      }}
                      className="flex items-center gap-2"
                    >
                      <input
                        ref={inputRef}
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-grow p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white p-2 rounded-lg transition-all disabled:opacity-50"
                        disabled={!inputValue.trim() || isTyping}
                      >
                        <Send className="w-5 h-5" />
                      </motion.button>
                    </form>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}