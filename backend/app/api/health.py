"""
健康检查接口
"""
from fastapi import APIRouter

router = APIRouter()

@router.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "service": "银行服务智能体"
    }

