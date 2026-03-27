# GitHub 大文件解决方案

## 问题
GitHub 文件大小限制：
- **单个文件超过 50MB**：会被拒绝推送
- **单个文件超过 100MB**：会有警告
- **仓库总大小**：建议不超过 1GB

当前项目中的大文件：
- `public/test/model/dome.glb`: **244MB** ❌
- `public/test/model/domeg-ktx.glb`: **98MB** ❌

## 解决方案

### 方案 1: 使用 Git LFS (推荐用于已存在的仓库)

Git LFS 可以管理大文件，但需要：
- 安装 Git LFS
- 在仓库中启用 LFS
- 重新提交文件

**步骤**：
```bash
# 1. 安装 Git LFS
brew install git-lfs  # macOS
# 或访问 https://git-lfs.github.com/

# 2. 初始化 Git LFS
git lfs install

# 3. 追踪大文件
git lfs track "*.glb"
git lfs track "public/test/model/dome.glb"
git lfs track "public/test/model/domeg-ktx.glb"

# 4. 添加 .gitattributes
git add .gitattributes

# 5. 提交大文件
git add public/test/model/*.glb
git commit -m "Add 3D models using Git LFS"
git push
```

**注意**：如果文件已经在 Git 历史中，需要迁移：
```bash
git lfs migrate import --include="*.glb" --everything
```

### 方案 2: 使用外部存储/CDN (推荐用于新项目)

将大文件存储到 CDN 或云存储服务，然后在代码中引用 URL。

**优点**：
- 不占用 Git 仓库空间
- 加快克隆速度
- 更好的加载性能

**步骤**：

1. **上传到 CDN/云存储**（如 AWS S3, Cloudflare R2, 或其他 CDN）
2. **更新代码中的引用**：

```javascript
// 之前
const modelUrl = './test/model/dome.glb';

// 之后
const modelUrl = 'https://your-cdn.com/models/dome.glb';
```

3. **添加到 .gitignore**：
```gitignore
# 大模型文件
public/test/model/dome.glb
public/test/model/domeg-ktx.glb
# 或全部模型文件
public/test/model/*.glb
```

### 方案 3: 优化模型文件

尝试压缩或优化模型文件：

1. **使用 gltf-transform 优化**：
```bash
npm install -g @gltf-transform/cli

# 压缩 GLB 文件
gltf-transform optimize input.glb output.glb --texture-compress webp
```

2. **使用 Draco 压缩**：
```bash
gltf-transform draco input.glb output.glb
```

3. **降低纹理分辨率**：
使用图像编辑工具降低纹理分辨率

### 方案 4: 使用 .gitignore 排除（临时方案）

如果暂时不需要在 Git 中管理这些文件：

```gitignore
# 大模型文件
public/test/model/dome.glb
public/test/model/domeg-ktx.glb
```

然后创建一个 `models-config.json` 文件，说明如何获取这些文件：
```json
{
  "models": {
    "dome": {
      "url": "https://cdn.example.com/models/dome.glb",
      "size": "244MB",
      "note": "从 CDN 加载"
    }
  }
}
```

## 推荐方案

对于生产环境，建议使用 **方案 2（外部存储/CDN）**：
- ✅ 性能更好（CDN 加速）
- ✅ 不占用 Git 仓库空间
- ✅ 易于管理
- ✅ 可以独立更新模型而不影响代码

对于开发环境，可以使用 **方案 1（Git LFS）**：
- ✅ 保持文件在仓库中
- ✅ 版本控制完整
- ⚠️ 需要团队成员安装 Git LFS
- ⚠️ GitHub 免费账户 LFS 有配额限制（1GB 存储，1GB 带宽/月）

## 立即执行的步骤

1. **检查当前 Git 状态**：
```bash
git status
```

2. **如果文件还未提交，添加到 .gitignore**：
```bash
echo "public/test/model/dome.glb" >> .gitignore
echo "public/test/model/domeg-ktx.glb" >> .gitignore
```

3. **选择方案并执行**

## 注意事项

- ⚠️ 如果文件已经在 Git 历史中，即使添加到 .gitignore 也不会自动删除
- ⚠️ 需要使用 `git rm --cached` 从 Git 中移除但保留本地文件
- ⚠️ Git LFS 在 GitHub 免费账户有配额限制
- ⚠️ 使用外部存储需要确保 CDN 链接稳定可用





