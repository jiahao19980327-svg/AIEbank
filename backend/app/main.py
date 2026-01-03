"""
银行服务智能体 - 主应用入口
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import chat, health
from app.core.config import settings

app = FastAPI(
    title="银行服务智能体 API",
    description="基于LLM的银行服务引导系统",
    version="1.0.0"
)

# CORS配置
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 注册路由
app.include_router(health.router, prefix="/api", tags=["健康检查"])
app.include_router(chat.router, prefix="/api/chat", tags=["对话"])

@app.get("/")
async def root():
    return {
        "message": "银行服务智能体 API",
        "version": "1.0.0",
        "docs": "/docs"
    }

