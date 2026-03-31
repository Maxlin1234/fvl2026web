# 3D 模型文件说明

## 大文件说明

由于 GitHub 文件大小限制（单个文件超过 50MB 会被拒绝），以下文件已从 Git 仓库中排除：

- `dome.glb` (244MB) - 超过 GitHub 限制
- `domeg-ktx.glb` (98MB) - 超过 GitHub 限制

## 解决方案

### 方案 1: 使用 Git LFS（推荐）

如果需要在 Git 中管理这些文件，请使用 Git LFS：

```bash
# 安装 Git LFS
brew install git-lfs  # macOS
# 或访问 https://git-lfs.github.com/

# 初始化
git lfs install

# 追踪大文件
git lfs track "public/test/model/dome.glb"
git lfs track "public/test/model/domeg-ktx.glb"

# 添加并提交
git add .gitattributes
git add public/test/model/dome.glb public/test/model/domeg-ktx.glb
git commit -m "Add large 3D models using Git LFS"
```

### 方案 2: 使用 CDN/外部存储（生产环境推荐）

1. 将文件上传到 CDN 或云存储（AWS S3, Cloudflare R2 等）
2. 更新 `src/components/ThreeJs.vue` 中的路径：

```javascript
// 之前
const loader = new GLTFLoader().setPath('test/model/');
loader.load('domeg-ktx.glb', ...)

// 之后 - 使用 CDN URL
const loader = new GLTFLoader();
loader.load('https://your-cdn.com/models/domeg-ktx.glb', ...)
```

### 方案 3: 本地开发

对于本地开发，文件应该放在 `public/test/model/` 目录下，但不会被 Git 追踪。

团队成员需要：
1. 从其他来源获取这些文件（如共享文件夹、云盘等）
2. 或使用 Git LFS 克隆仓库

## 当前使用的模型

- `domeg-ktx.glb` (98MB) - 在 `src/components/ThreeJs.vue` 中使用
- `dome.glb` (244MB) - 可能在其他地方使用

## 文件大小

- ✅ `collection.glb`: 220KB - 可以正常提交
- ✅ `fvlogo.gltf`: 348KB - 可以正常提交
- ✅ `logo.glb`: 4.8MB - 可以正常提交
- ✅ `fvl_logo.glb`: 6.1MB - 可以正常提交
- ✅ `fvl_logo3.glb`: 8.4MB - 可以正常提交
- ✅ `fvl_logo2.glb`: 11MB - 可以正常提交
- ❌ `domeg-ktx.glb`: 98MB - **需要处理**
- ❌ `dome.glb`: 244MB - **需要处理**





