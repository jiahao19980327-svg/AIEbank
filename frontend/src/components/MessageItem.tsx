import { Avatar } from 'antd'
import { UserOutlined, RobotOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import type { ChatMessage } from '../types'
import './MessageItem.css'

interface MessageItemProps {
  message: ChatMessage
}

const MessageItem = ({ message }: MessageItemProps) => {
  const isUser = message.role === 'user'

  return (
    <div className={`message-item ${isUser ? 'user' : 'assistant'}`}>
      {!isUser && (
        <Avatar icon={<RobotOutlined />} className="avatar" size="large" />
      )}
      <div className="message-content">
        <div className={`message-bubble ${message.role}`}>
          <div className="message-text">{message.content}</div>
          <div className="message-time">
            {dayjs(message.timestamp).format('HH:mm')}
          </div>
        </div>
      </div>
      {isUser && (
        <Avatar icon={<UserOutlined />} className="avatar" size="large" />
      )}
    </div>
  )
}

export default MessageItem

