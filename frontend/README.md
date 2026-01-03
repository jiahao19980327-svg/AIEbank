# 前端应用

银行服务智能体的前端界面，基于 React + TypeScript + Vite + Ant Design 构建。

## 技术栈

- **React 18**: UI框架
- **TypeScript**: 类型安全
- **Vite**: 构建工具
- **Ant Design**: UI组件库
- **Axios**: HTTP客户端

## 功能特性

- ✅ 现代化聊天界面
- ✅ 实时消息展示
- ✅ 建议问题快速输入
- ✅ 会话管理
- ✅ 响应式设计
- ✅ 消息时间戳
- ✅ 加载状态提示

## 安装和运行

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

应用将在 http://localhost:3000 启动

### 构建生产版本

```bash
npm run build
```

### 预览生产构建

```bash
npm run preview
```

## 项目结构

```
frontend/
├── src/
│   ├── components/      # React组件
│   │   ├── ChatContainer.tsx    # 主聊天容器
│   │   ├── MessageList.tsx      # 消息列表
│   │   ├── MessageItem.tsx      # 单条消息
│   │   └── SuggestionButtons.tsx # 建议按钮
│   ├── services/        # API服务
│   │   └── api.ts      # 后端API调用
│   ├── types/          # TypeScript类型定义
│   │   └── index.ts
│   ├── App.tsx         # 根组件
│   └── main.tsx        # 入口文件
├── index.html          # HTML模板
├── vite.config.ts      # Vite配置
└── package.json        # 依赖配置
```

## 配置

### API代理

在 `vite.config.ts` 中配置了API代理，开发环境下会自动将 `/api` 请求代理到后端服务器 `http://localhost:8000`。

如需修改后端地址，请编辑 `vite.config.ts`：

```typescript
proxy: {
  '/api': {
    target: 'http://localhost:8000',  // 修改为你的后端地址
    changeOrigin: true,
  },
}
```

## 主要组件说明

### ChatContainer
主聊天容器组件，负责：
- 管理对话状态
- 处理消息发送
- 管理会话ID
- 显示建议问题

### MessageList
消息列表组件，展示所有对话消息。

### MessageItem
单条消息组件，支持：
- 用户消息（右侧，紫色渐变）
- 助手消息（左侧，白色卡片）
- 时间戳显示

### SuggestionButtons
建议问题按钮组件，显示智能体推荐的问题，点击可快速输入。

## 样式说明

- 使用CSS模块化，每个组件有独立的CSS文件
- 采用现代化设计，渐变色彩方案
- 响应式布局，适配不同屏幕尺寸
- 流畅的动画效果

## 开发建议

1. **添加新功能**: 在 `src/components` 中创建新组件
2. **API调用**: 在 `src/services/api.ts` 中添加新的API方法
3. **类型定义**: 在 `src/types/index.ts` 中添加类型
4. **样式修改**: 修改对应组件的CSS文件

