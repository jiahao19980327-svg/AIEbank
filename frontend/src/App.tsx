import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import ChatContainer from './components/ChatContainer'
import './App.css'

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <div className="app">
        <ChatContainer />
      </div>
    </ConfigProvider>
  )
}

export default App

