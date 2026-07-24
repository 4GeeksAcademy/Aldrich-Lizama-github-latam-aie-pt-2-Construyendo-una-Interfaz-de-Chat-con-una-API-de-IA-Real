"use client";

import { useState, FormEvent, KeyboardEvent } from "react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export default function ChatInput({ onSendMessage, isLoading }: ChatInputProps) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      setInput("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-t border-gray-700 p-4">
      <div className="flex gap-3 items-end">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Escribe tu mensaje aquí..."
          disabled={isLoading}
          rows={2}
          className="flex-1 bg-gray-800 text-white rounded-lg px-4 py-3 
                     placeholder-gray-400 border border-gray-600 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 
                     focus:border-transparent resize-none disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 
                     disabled:cursor-not-allowed text-white px-6 py-3 
                     rounded-lg font-medium transition-colors duration-200"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Enviando...
            </span>
          ) : (
            "Enviar"
          )}
        </button>
      </div>
      <p className="text-xs text-gray-500 mt-2">Presiona Enter para enviar, Shift+Enter para nueva línea</p>
    </form>
  );
}