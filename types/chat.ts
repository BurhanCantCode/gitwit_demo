export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatMessage {
  id: string;
  message: Message;
  timestamp: number;
} 