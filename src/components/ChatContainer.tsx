"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { Message, TokenMetrics, GroqAPIResponse } from "@/types/chat";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import MetricsPanel from "./MetricsPanel";

const STORAGE_KEY_MESSAGES = "chat-groq-messages";
const STORAGE_KEY_METRICS = "chat-groq-metrics";

// Función para cargar datos de localStorage de forma segura
function loadFromStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === "undefined") return defaultValue;
  try {
    const saved = localStorage.getItem(key);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch {
    localStorage.removeItem(key);
  }
  return defaultValue;
}

export default function ChatContainer() {
  // Inicializar estado directamente desde localStorage
  const [messages, setMessages] = useState<Message[]>(() =>
    loadFromStorage<Message[]>(STORAGE_KEY_MESSAGES, [])
  );
  const [isLoading, setIsLoading] = useState(false);
  const [metrics, setMetrics] = useState<TokenMetrics>(() =>
    loadFromStorage<TokenMetrics>(STORAGE_KEY_METRICS, {
      promptTokens: 0,
      completionTokens: 0,
      totalTokens: 0,
      responseTime: 0,
      avgResponseTime: 0,
      messageCount: 0,
    })
  );
  const [error, setError] = useState<string | null>(null);
  const [isMetricsOpen, setIsMetricsOpen] = useState(false);

  // Ref para evitar guardar en localStorage en el primer render (ya se cargó al inicio)
  const isFirstRender = useRef(true);

  // Sincronizar mensajes con localStorage después del primer render
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    localStorage.setItem(STORAGE_KEY_MESSAGES, JSON.stringify(messages));
  }, [messages]);

  // Sincronizar métricas con localStorage después del primer render
  useEffect(() => {
    if (isFirstRender.current) {
      return;
    }
    localStorage.setItem(STORAGE_KEY_METRICS, JSON.stringify(metrics));
  }, [metrics]);

  const clearHistory = useCallback(() => {
    setMessages([]);
    setMetrics({
      promptTokens: 0,
      completionTokens: 0,
      totalTokens: 0,
      responseTime: 0,
      avgResponseTime: 0,
      messageCount: 0,
    });
    setError(null);
    localStorage.removeItem(STORAGE_KEY_MESSAGES);
    localStorage.removeItem(STORAGE_KEY_METRICS);
  }, []);

  const sendMessage = useCallback(async (content: string) => {
    const apiKey = process.env.NEXT_PUBLIC_GROQ_API_KEY;

    if (!apiKey) {
      setError("Error: API Key de Groq no configurada. Revisa tu archivo .env.local");
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    const startTime = Date.now();

    try {
      const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages: [
              ...messages.map((msg) => ({
                role: msg.role,
                content: msg.content,
              })),
              { role: "user", content },
            ],
            temperature: 0.7,
            max_tokens: 1024,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
      }

      const data: GroqAPIResponse = await response.json();
      const responseTime = Date.now() - startTime;

      const assistantMessage: Message = {
        id: data.id || (Date.now() + 1).toString(),
        role: "assistant",
        content: data.choices[0]?.message?.content || "Sin respuesta",
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, assistantMessage]);

      // Acumular métricas a lo largo de la sesión
      setMetrics((prev) => {
        const newMessageCount = prev.messageCount + 1;
        const newAvgResponseTime = ((prev.avgResponseTime * prev.messageCount) + responseTime) / newMessageCount;
        return {
          promptTokens: prev.promptTokens + (data.usage?.prompt_tokens || 0),
          completionTokens: prev.completionTokens + (data.usage?.completion_tokens || 0),
          totalTokens: prev.totalTokens + (data.usage?.total_tokens || 0),
          responseTime: responseTime, // Último tiempo de respuesta
          avgResponseTime: Math.round(newAvgResponseTime),
          messageCount: newMessageCount,
        };
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error desconocido";
      setError(`Error al conectar con Groq: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  }, [messages]);

  return (
    <div className="flex h-full">
      {/* Área principal del chat */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-gray-900 border-b border-gray-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-white">Chat Groq AI</h1>
              <p className="text-sm text-gray-400">
                Modelo: llama-3.3-70b-versatile
              </p>
            </div>
            <button
              onClick={clearHistory}
              className="text-sm text-red-400 hover:text-red-300 transition-colors"
            >
              Nueva conversación
            </button>
          </div>
        </header>

        {/* Mensajes */}
        <MessageList messages={messages} isLoading={isLoading} />

        {/* Error */}
        {error && (
          <div className="mx-4 mb-2 bg-red-900/50 border border-red-700 text-red-200 rounded-lg px-4 py-2 text-sm">
            {error}
          </div>
        )}

        {/* Input */}
        <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
      </div>

      {/* Panel de métricas */}
      <MetricsPanel
        metrics={metrics}
        isOpen={isMetricsOpen}
        onToggle={() => setIsMetricsOpen(!isMetricsOpen)}
      />
    </div>
  );
}