# 银行服务引导型智能体

一个基于大语言模型的银行服务智能助手系统，提供账户查询、产品推荐、业务办理引导等服务。

## 技术架构

### 后端
- **框架**: FastAPI
- **AI框架**: LangChain + LangGraph
- **向量数据库**: ChromaDB / Milvus
- **关系数据库**: PostgreSQL
- **缓存**: Redis

### 前端
- **框架**: React + TypeScript
- **UI库**: Ant Design / Material-UI

### AI模型
- **默认**: 通义千问（Qwen）
- **可选**: ChatGLM、GPT-4、其他兼容OpenAI API的模型
- **嵌入模型**: text-embedding-ada-002 / BGE-M3

## 项目结构

```
AIBank/
├── backend/              # 后端服务
│   ├── app/
│   │   ├── api/         # API路由
│   │   ├── core/        # 核心配置
│   │   ├── agents/      # 智能体逻辑
│   │   ├── models/      # 数据模型
│   │   └── services/    # 业务服务
│   └── requirements.txt
├── frontend/            # 前端应用
├── knowledge_base/      # 知识库文档
└── docs/               # 文档
```

## 功能特性

- ✅ 多轮对话管理
- ✅ 意图识别与槽位填充
- ✅ 知识库检索（RAG）
- ✅ 业务流程引导
- ✅ 安全认证与授权
- ✅ 对话历史记录

## 快速开始

### 后端启动
```bash
cd backend
pip install -r requirements.txt

# 方式一：使用启动脚本（推荐）
python run.py

# 方式二：直接使用 uvicorn（必须在 backend 目录下）
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

**注意**：必须在 `backend` 目录下运行，否则会出现模块导入错误。

### 前端启动
```bash
cd frontend
npm install
npm run dev
```

前端将在 http://localhost:3000 启动

## 环境变量

在 `backend` 目录下创建 `.env` 文件：

```env
# 通义千问配置（默认）
# 获取API Key: https://dashscope.console.aliyun.com/
OPENAI_API_KEY=your_dashscope_api_key
OPENAI_BASE_URL=https://dashscope.aliyuncs.com/compatible-mode/v1
MODEL_NAME=qwen-turbo

# 数据库配置（可选）
DATABASE_URL=postgresql://user:pass@localhost/dbname
REDIS_URL=redis://localhost:6379
```

详细配置说明请查看 [通义千问配置指南](docs/qwen_setup.md)

