import { Avatar, Spin } from 'antd'
import { UserOutlined, RobotOutlined } from '@ant-design/icons'
import MessageItem from './MessageItem'
import type { ChatMessage } from '../types'
import './MessageList.css'

interface MessageListProps {
  messages: ChatMessage[]
  loading: boolean
}

const MessageList = ({ messages, loading }: MessageListProps) => {
  return (
    <div className="message-list">
      {messages.map((msg, index) => (
        <MessageItem key={index} message={msg} />
      ))}
      {loading && (
        <div className="loading-message">
          <Avatar icon={<RobotOutlined />} className="avatar" />
          <div className="message-bubble assistant">
            <Spin size="small" />
            <span style={{ marginLeft: 8 }}>正在思考...</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default MessageList

