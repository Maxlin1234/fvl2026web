# 快速修复指南

## 当前情况

✅ **已添加到 .gitignore**：
- `public/test/model/dome.glb` (244MB)
- `public/test/model/domeg-ktx.glb` (98MB)

⚠️ **注意**：`domeg-ktx.glb` 已经在 Git 历史中，需要处理

## 立即执行的步骤

### 选项 1: 使用 Git LFS（推荐）

如果文件已经在仓库中，需要迁移到 Git LFS：

```bash
# 1. 安装 Git LFS
brew install git-lfs  # macOS
# 或访问 https://git-lfs.github.com/ 下载

# 2. 初始化
git lfs install

# 3. 追踪大文件
git lfs track "public/test/model/dome.glb"
git lfs track "public/test/model/domeg-ktx.glb"

# 4. 如果文件已在历史中，迁移
git lfs migrate import --include="public/test/model/domeg-ktx.glb" --everything

# 5. 提交
git add .gitattributes
git commit -m "Add Git LFS tracking for large models"
git push
```

### 选项 2: 从 Git 历史中移除（如果不需要版本控制）

```bash
# 从 Git 中移除但保留本地文件
git rm --cached public/test/model/domeg-ktx.glb

# 提交更改
git commit -m "Remove large model file from Git"

# 推送到远程
git push
```

### 选项 3: 使用外部存储（生产环境最佳）

1. 上传文件到 CDN/云存储
2. 更新代码中的路径为 URL

## 推荐方案

- **开发环境**：使用 Git LFS（选项 1）
- **生产环境**：使用 CDN（选项 3）

## 验证

运行以下命令检查是否还有大文件：
```bash
find . -type f -size +50M -not -path "./node_modules/*" -not -path "./.git/*"
```

## 注意事项

- ⚠️ Git LFS 在 GitHub 免费账户有配额限制（1GB 存储，1GB 带宽/月）
- ⚠️ 如果文件已经在远程仓库，需要强制推送（谨慎使用）
- ⚠️ 迁移 Git LFS 会重写 Git 历史，团队需要重新克隆仓库





