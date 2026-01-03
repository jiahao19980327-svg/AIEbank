# 快速开始指南

## 环境要求

- Python 3.9+
- Node.js 16+ (前端开发)
- PostgreSQL (可选，用于生产环境)
- Redis (可选，用于会话缓存)

## 安装步骤

### 1. 后端设置

```bash
# 进入后端目录
cd backend

# 创建虚拟环境
python -m venv venv

# 激活虚拟环境
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# 安装依赖
pip install -r requirements.txt

# 复制环境变量模板
copy .env.example .env  # Windows
# cp .env.example .env  # Linux/Mac

# 编辑 .env 文件，填入你的API密钥
```

### 2. 配置环境变量

编辑 `backend/.env` 文件：

```env
# 通义千问配置（已默认配置）
# 获取API Key: https://dashscope.console.aliyun.com/
OPENAI_API_KEY=your_dashscope_api_key_here
OPENAI_BASE_URL=https://dashscope.aliyuncs.com/compatible-mode/v1
MODEL_NAME=qwen-turbo  # 可选: qwen-turbo, qwen-plus, qwen-max
TEMPERATURE=0.7
```

**获取通义千问API密钥**：
1. 访问 https://dashscope.console.aliyun.com/
2. 注册/登录阿里云账号
3. 开通 DashScope 服务
4. 在控制台获取 API Key

### 3. 启动后端服务

**方式一：使用启动脚本（推荐）**

```bash
# Windows:
cd backend
start.bat

# Linux/Mac:
cd backend
chmod +x start.sh
./start.sh
```

**方式二：使用 Python 启动脚本**

```bash
cd backend
python run.py
```

**方式三：直接使用 uvicorn（需要确保在 backend 目录下）**

```bash
cd backend
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

**注意**：必须在 `backend` 目录下运行命令，否则会出现 `ModuleNotFoundError: No module named 'app'` 错误。

服务将在 http://localhost:8000 启动

### 4. 测试API

访问 http://localhost:8000/docs 查看API文档

使用curl测试：

```bash
curl -X POST "http://localhost:8000/api/chat/" \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {"role": "user", "content": "我想查询账户余额"}
    ]
  }'
```

## 使用不同的大语言模型

### 使用通义千问（默认）

```env
# 在 .env 中配置
OPENAI_API_KEY=your_dashscope_api_key
OPENAI_BASE_URL=https://dashscope.aliyuncs.com/compatible-mode/v1
MODEL_NAME=qwen-turbo  # 或 qwen-plus, qwen-max
```

### 使用OpenAI GPT

```env
# 在 .env 中配置
OPENAI_API_KEY=sk-xxx
OPENAI_BASE_URL=https://api.openai.com/v1
MODEL_NAME=gpt-4
```

### 使用本地模型（Qwen/ChatGLM）

需要修改 `backend/app/agents/bank_agent.py`：

```python
from langchain_community.llms import Ollama  # 或使用其他本地LLM框架

self.llm = Ollama(model="qwen:7b")
```

### 使用通义千问/其他API

```python
# 修改 bank_agent.py
from langchain_openai import ChatOpenAI

self.llm = ChatOpenAI(
    model_name="qwen-turbo",
    openai_api_base="https://dashscope.aliyuncs.com/compatible-mode/v1",
    openai_api_key="your-api-key"
)
```

## 下一步

1. **添加知识库**: 集成ChromaDB实现RAG
2. **完善对话逻辑**: 使用LangGraph实现复杂流程
3. **添加前端**: 创建React前端界面
4. **集成数据库**: 连接PostgreSQL存储对话历史
5. **添加认证**: 实现用户登录和权限管理

## 常见问题

### Q: 如何降低API调用成本？
A: 使用本地模型（Qwen/ChatGLM）或缓存常见问题回复

### Q: 如何提高回复准确性？
A: 实现RAG知识检索，将银行产品文档向量化存储

### Q: 如何支持多轮对话？
A: 已实现基础多轮对话，可通过Redis存储会话状态增强

### Q: 如何添加业务工具调用？
A: 使用LangChain Tools，定义查询余额、产品信息等工具函数

