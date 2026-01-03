import axios from 'axios'
import type { ChatRequest, ChatResponse } from '../types'

const api = axios.create({
  baseURL: '/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
api.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    const message =
      error.response?.data?.detail ||
      error.message ||
      '请求失败，请稍后重试'
    return Promise.reject(new Error(message))
  }
)

export const chatApi = {
  /**
   * 发送消息
   */
  sendMessage: async (
    messages: Array<{ role: string; content: string }>,
    sessionId?: string
  ): Promise<ChatResponse> => {
    const request: ChatRequest = {
      messages,
      session_id: sessionId,
    }
    return api.post<ChatResponse>('/chat/', request)
  },

  /**
   * 健康检查
   */
  healthCheck: async () => {
    return api.get('/health')
  },
}

export default api

