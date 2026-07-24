"use client";

import { useEffect, useRef } from "react";
import { Message } from "@/types/chat";

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
}

export default function MessageList({ messages, isLoading }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500">
        <div className="text-center space-y-4">
          <div className="text-6xl">🤖</div>
          <h2 className="text-2xl font-semibold text-gray-400">Chat con Groq AI</h2>
          <p className="max-w-md">
            ¡Comienza una conversación! Escribe un mensaje en el campo de abajo 
            y la IA de Groq te responderá.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
        >
          <div
            className={`max-w-[80%] rounded-2xl px-4 py-3 ${
              message.role === "user"
                ? "bg-blue-600 text-white rounded-br-md"
                : "bg-gray-800 text-gray-100 rounded-bl-md border border-gray-700"
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold opacity-80">
                {message.role === "user" ? "Tú" : "Groq AI"}
              </span>
              <span className="text-xs opacity-50">
                {new Date(message.timestamp).toLocaleTimeString()}
              </span>
            </div>
            <p className="whitespace-pre-wrap">{message.content}</p>
          </div>
        </div>
      ))}

      {isLoading && (
        <div className="flex justify-start">
          <div className="bg-gray-800 border border-gray-700 rounded-2xl rounded-bl-md px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-gray-400">Groq AI</span>
            </div>
            <div className="flex gap-1 mt-2">
              <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
}