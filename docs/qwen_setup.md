# 通义千问配置指南

本项目已默认配置为使用通义千问（Qwen）大语言模型。

## 获取API密钥

1. **访问 DashScope 控制台**
   - 网址：https://dashscope.console.aliyun.com/
   - 使用阿里云账号登录

2. **开通服务**
   - 在控制台中开通 DashScope 服务
   - 首次使用可能需要实名认证

3. **获取 API Key**
   - 进入"API-KEY管理"页面
   - 创建新的 API Key 或使用现有密钥
   - 复制 API Key（格式类似：sk-xxxxxxxxxxxxx）

## 配置项目

### 1. 创建环境变量文件

在 `backend` 目录下创建 `.env` 文件：

```bash
cd backend
copy .env.example .env  # Windows
# cp .env.example .env  # Linux/Mac
```

### 2. 编辑 .env 文件

```env
# 通义千问配置
OPENAI_API_KEY=sk-your-dashscope-api-key-here
OPENAI_BASE_URL=https://dashscope.aliyuncs.com/compatible-mode/v1
MODEL_NAME=qwen-turbo
TEMPERATURE=0.7
```

### 3. 模型选择

通义千问提供多个模型版本：

- **qwen-turbo**: 快速响应，适合实时对话
- **qwen-plus**: 平衡性能和速度
- **qwen-max**: 最强性能，适合复杂任务

根据需求在 `.env` 中修改 `MODEL_NAME`。

## 验证配置

启动后端服务后，访问 http://localhost:8000/docs 测试 API。

发送测试请求：

```bash
curl -X POST "http://localhost:8000/api/chat/" \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {"role": "user", "content": "你好"}
    ]
  }'
```

如果返回正常回复，说明配置成功！

## 常见问题

### Q: API Key 无效？
A: 检查 API Key 是否正确复制，确保没有多余空格。

### Q: 请求超时？
A: 检查网络连接，确保可以访问 dashscope.aliyuncs.com。

### Q: 如何查看使用量和费用？
A: 在 DashScope 控制台的"用量统计"页面查看。

### Q: 可以切换到其他模型吗？
A: 可以，修改 `.env` 文件中的 `OPENAI_BASE_URL` 和 `MODEL_NAME` 即可切换到其他兼容 OpenAI API 的模型服务。

## 费用说明

通义千问按调用次数和 token 数量计费，具体价格请查看：
https://help.aliyun.com/zh/model-studio/product-overview/billing-overview

