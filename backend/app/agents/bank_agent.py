"""
银行服务智能体核心逻辑
"""
from typing import List, Dict, Optional
from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage, AIMessage, SystemMessage
from app.core.config import settings
import uuid

class BankAgent:
    """
    银行服务引导智能体
    负责处理用户查询、意图识别、业务引导等
    """
    
    def __init__(self):
        self.llm = ChatOpenAI(
            model=settings.MODEL_NAME,
            temperature=settings.TEMPERATURE,
            api_key=settings.OPENAI_API_KEY,
            base_url=settings.OPENAI_BASE_URL
        )
        
        self.system_prompt = """你是一个专业的银行服务助手，负责帮助客户：
1. 查询账户信息
2. 了解银行产品和服务
3. 引导业务办理流程
4. 解答常见问题

请用友好、专业、准确的方式回答客户问题。如果涉及敏感操作，请引导客户到柜台或使用官方渠道。
"""
    
    async def process_message(
        self, 
        conversation: List[Dict], 
        session_id: Optional[str] = None
    ) -> Dict:
        """
        处理用户消息并生成回复
        
        Args:
            conversation: 对话历史
            session_id: 会话ID
            
        Returns:
            包含回复消息和会话ID的字典
        """
        if not session_id:
            session_id = str(uuid.uuid4())
        
        # 构建消息列表
        messages = [SystemMessage(content=self.system_prompt)]
        
        for msg in conversation:
            if msg["role"] == "user":
                messages.append(HumanMessage(content=msg["content"]))
            elif msg["role"] == "assistant":
                messages.append(AIMessage(content=msg["content"]))
        
        # 调用LLM生成回复
        response = await self.llm.ainvoke(messages)
        
        # 生成建议问题
        suggestions = self._generate_suggestions(conversation)
        
        return {
            "message": response.content,
            "session_id": session_id,
            "suggestions": suggestions
        }
    
    def _generate_suggestions(self, conversation: List[Dict]) -> List[str]:
        """
        根据对话上下文生成建议问题
        """
        # 这里可以根据对话内容智能生成建议
        # 简化版本：返回通用建议
        common_suggestions = [
            "如何查询账户余额？",
            "有哪些理财产品？",
            "如何办理信用卡？",
            "贷款利率是多少？"
        ]
        return common_suggestions[:3]

