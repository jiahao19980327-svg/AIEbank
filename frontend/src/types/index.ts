export interface ChatMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date
}

export interface ChatRequest {
  messages: Array<{
    role: string
    content: string
  }>
  session_id?: string
}

export interface ChatResponse {
  message: string
  session_id: string
  suggestions?: string[]
}

