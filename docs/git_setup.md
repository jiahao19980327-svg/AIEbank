# Git 配置指南

## 配置用户信息

Git 需要配置用户信息才能进行提交。您可以选择全局配置（适用于所有仓库）或本地配置（仅适用于当前仓库）。

### 全局配置（推荐）

配置后，所有 Git 仓库都会使用这些信息：

```bash
git config --global user.name "您的姓名"
git config --global user.email "your.email@example.com"
```

### 本地配置（仅当前仓库）

如果只想为当前项目配置：

```bash
git config user.name "您的姓名"
git config user.email "your.email@example.com"
```

### 查看当前配置

```bash
# 查看全局配置
git config --global --list

# 查看本地配置
git config --local --list

# 查看所有配置（包括系统配置）
git config --list
```

## 常用 Git 命令

### 基本操作

```bash
# 查看状态
git status

# 添加文件到暂存区
git add <文件名>
git add .  # 添加所有文件

# 提交更改
git commit -m "提交信息"

# 查看提交历史
git log

# 查看差异
git diff
```

### 分支操作

```bash
# 创建新分支
git branch <分支名>

# 切换分支
git checkout <分支名>

# 创建并切换分支
git checkout -b <分支名>

# 查看所有分支
git branch
```

### 远程仓库

```bash
# 添加远程仓库
git remote add origin <仓库URL>

# 查看远程仓库
git remote -v

# 推送到远程仓库
git push -u origin master

# 从远程仓库拉取
git pull origin master
```

## 注意事项

1. **首次提交前必须配置用户信息**
2. **提交信息应该清晰描述更改内容**
3. **定期提交，保持提交历史清晰**
4. **使用 .gitignore 忽略不需要版本控制的文件**

