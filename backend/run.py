"""
启动脚本 - 确保从正确的目录启动服务
"""
import sys
import os
from pathlib import Path

# 获取 backend 目录的绝对路径
backend_dir = Path(__file__).parent.absolute()

# 将 backend 目录添加到 Python 路径
if str(backend_dir) not in sys.path:
    sys.path.insert(0, str(backend_dir))

if __name__ == "__main__":
    import uvicorn
    
    # 切换到 backend 目录
    os.chdir(backend_dir)
    
    # 启动服务器
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        reload_dirs=[str(backend_dir / "app")],
    )

