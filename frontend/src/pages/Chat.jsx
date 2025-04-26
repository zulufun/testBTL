import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const Chat = () => {
  const location = useLocation();
  const { alertMessage, aiResponse } = location.state || {};

  const [messages, setMessages] = useState([
    { sender: "user", text: alertMessage || "Hello, how are you?" },
    { sender: "ai", text: aiResponse || "I'm here to assist you!" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const fakeResponses = [
    "That sounds interesting. Tell me more!",
    "I'm here to help. What else can I do for you?",
    "Could you elaborate on that?",
    "I'm not sure I understand. Could you explain further?",
    "Thanks for sharing! Anything else you'd like to know?",
  ];

  const handleSend = async () => {
    if (input.trim() === "") return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput(""); // Reset input field

    // Simulate AI response
    setIsTyping(true);
    setTimeout(() => {
      const aiMessage = {
        sender: "ai",
        text: fakeResponses[Math.floor(Math.random() * fakeResponses.length)],
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1000); // Simulate a delay in response
  };

  return (
    <div className="flex flex-col h-screen p-4 bg-gray-50 dark:bg-gray-900">
      <div className="flex-grow overflow-y-auto bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex items-start mb-4 ${
              message.sender === "user" ? "flex-row-reverse" : "flex-row"
            }`}
          >
            {/* Icon */}
            <div className="w-10 h-10 rounded-full flex-shrink-0 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              {message.sender === "user" ? (
                <img
                  src="https://via.placeholder.com/40x40?text=U"
                  alt="User Icon"
                  className="rounded-full"
                />
              ) : (
                <img
                  src="https://via.placeholder.com/40x40?text=AI"
                  alt="AI Icon"
                  className="rounded-full"
                />
              )}
            </div>

            {/* Message Bubble */}
            <div
              className={`max-w-xs px-4 py-2 rounded-lg shadow-md ${
                message.sender === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-white"
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <img
                src="https://via.placeholder.com/40x40?text=AI"
                alt="AI Icon"
                className="rounded-full"
              />
            </div>
            <div className="ml-4">
              <span className="px-4 py-2 rounded-lg shadow-md bg-gray-100 dark:bg-gray-700 dark:text-white">
                Typing...
              </span>
            </div>
          </div>
        )}
      </div>

      {/* User Input Section */}
      <div className="mt-4 flex items-center p-3 bg-white dark:bg-gray-800 shadow-md rounded-lg">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
          placeholder="Type your message..."
        />
        <button
          onClick={handleSend}
          className="ml-2 p-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
