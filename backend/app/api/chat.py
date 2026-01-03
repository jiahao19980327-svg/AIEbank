"""
对话API接口
"""
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from app.agents.bank_agent import BankAgent

router = APIRouter()

class ChatMessage(BaseModel):
    role: str  # user, assistant, system
    content: str

class ChatRequest(BaseModel):
    messages: List[ChatMessage]
    session_id: Optional[str] = None

class ChatResponse(BaseModel):
    message: str
    session_id: str
    suggestions: Optional[List[str]] = None

# 初始化智能体
agent = BankAgent()

@router.post("/", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """
    处理用户对话请求
    """
    try:
        # 转换消息格式
        conversation = [
            {"role": msg.role, "content": msg.content} 
            for msg in request.messages
        ]
        
        # 调用智能体
        response = await agent.process_message(
            conversation=conversation,
            session_id=request.session_id
        )
        
        return ChatResponse(
            message=response["message"],
            session_id=response["session_id"],
            suggestions=response.get("suggestions", [])
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

