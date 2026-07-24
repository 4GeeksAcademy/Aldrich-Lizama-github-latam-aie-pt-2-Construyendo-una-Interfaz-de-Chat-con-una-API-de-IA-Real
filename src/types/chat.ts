export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

export interface TokenMetrics {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  responseTime: number;
  avgResponseTime: number;
  messageCount: number;
}

export interface ChatResponse {
  message: string;
  metrics: TokenMetrics;
}

export interface GroqAPIChoice {
  index: number;
  message: {
    role: string;
    content: string;
  };
  finish_reason: string;
}

export interface GroqAPIUsage {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
}

export interface GroqAPIResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: GroqAPIChoice[];
  usage: GroqAPIUsage;
}
