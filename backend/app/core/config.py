"""
应用配置
"""
from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    # API配置
    API_V1_STR: str = "/api"
    PROJECT_NAME: str = "银行服务智能体"
    
    # CORS配置
    CORS_ORIGINS: List[str] = ["http://localhost:3000", "http://localhost:5173"]
    
    # LLM配置（通义千问）
    OPENAI_API_KEY: str = "sk-1ebb6be34a5f47e2b6da596a54d21d3e"
    OPENAI_BASE_URL: str = "https://dashscope.aliyuncs.com/compatible-mode/v1"
    MODEL_NAME: str = "qwen-turbo"  # 可选: qwen-turbo, qwen-plus, qwen-max
    TEMPERATURE: float = 0.7
    
    # 向量数据库
    CHROMA_PERSIST_DIR: str = "./chroma_db"
    
    # 关系数据库
    DATABASE_URL: str = "postgresql://user:password@localhost/bankdb"
    
    # Redis
    REDIS_URL: str = "redis://localhost:6379"
    
    # 安全
    SECRET_KEY: str = "your-secret-key-change-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()

