import { useState, useRef, useEffect } from 'react'
import { Layout, Card, Input, Button, Spin, message } from 'antd'
import { SendOutlined, RobotOutlined, UserOutlined } from '@ant-design/icons'
import MessageList from './MessageList'
import SuggestionButtons from './SuggestionButtons'
import { chatApi } from '../services/api'
import type { ChatMessage } from '../types'
import './ChatContainer.css'

const { Content, Footer } = Layout
const { TextArea } = Input

const ChatContainer = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: '您好！我是银行服务智能助手，可以帮您查询账户信息、了解产品服务、引导业务办理。请问有什么可以帮您的吗？',
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<any>(null)

  // 自动滚动到底部
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // 发送消息
  const handleSend = async () => {
    if (!inputValue.trim() || loading) return

    const userMessage: ChatMessage = {
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date(),
    }

    // 添加用户消息到列表
    setMessages((prev) => [...prev, userMessage])
    setInputValue('')
    setLoading(true)
    setSuggestions([])

    try {
      const response = await chatApi.sendMessage(
        [...messages, userMessage].map((msg) => ({
          role: msg.role,
          content: msg.content,
        })),
        sessionId || undefined
      )

      // 添加助手回复
      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: response.message,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
      setSessionId(response.session_id)
      if (response.suggestions && response.suggestions.length > 0) {
        setSuggestions(response.suggestions)
      }
    } catch (error: any) {
      message.error(error.message || '发送消息失败，请稍后重试')
      console.error('发送消息错误:', error)
    } finally {
      setLoading(false)
      // 聚焦输入框
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }
  }

  // 处理建议点击
  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion)
    inputRef.current?.focus()
  }

  // 处理回车发送（Shift+Enter换行）
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <Layout className="chat-container">
      <Content className="chat-content">
        <Card className="chat-card">
          <div className="chat-header">
            <RobotOutlined className="header-icon" />
            <h2>银行服务智能助手</h2>
          </div>

          <div className="messages-wrapper">
            <MessageList messages={messages} loading={loading} />
            <div ref={messagesEndRef} />
          </div>

          {suggestions.length > 0 && (
            <SuggestionButtons
              suggestions={suggestions}
              onSuggestionClick={handleSuggestionClick}
            />
          )}

          <Footer className="chat-footer">
            <div className="input-wrapper">
              <TextArea
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="请输入您的问题..."
                autoSize={{ minRows: 1, maxRows: 4 }}
                disabled={loading}
                className="chat-input"
              />
              <Button
                type="primary"
                icon={<SendOutlined />}
                onClick={handleSend}
                loading={loading}
                disabled={!inputValue.trim()}
                className="send-button"
              >
                发送
              </Button>
            </div>
          </Footer>
        </Card>
      </Content>
    </Layout>
  )
}

export default ChatContainer

