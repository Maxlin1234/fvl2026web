#!/bin/bash

# 修复大文件问题的脚本
# 使用方法: ./fix-large-files.sh

echo "=== GitHub 大文件修复脚本 ==="
echo ""

# 检查 Git LFS 是否安装
if ! command -v git-lfs &> /dev/null; then
    echo "❌ Git LFS 未安装"
    echo "请先安装: brew install git-lfs (macOS) 或访问 https://git-lfs.github.com/"
    exit 1
fi

echo "✅ Git LFS 已安装"
echo ""

# 初始化 Git LFS
echo "初始化 Git LFS..."
git lfs install

# 追踪大文件
echo "追踪大文件..."
git lfs track "public/test/model/dome.glb"
git lfs track "public/test/model/domeg-ktx.glb"

# 如果文件已经在 Git 历史中，需要迁移
echo ""
echo "检查文件是否已在 Git 历史中..."
if git ls-files | grep -q "public/test/model/domeg-ktx.glb"; then
    echo "⚠️  发现 domeg-ktx.glb 已在 Git 历史中"
    echo "需要迁移到 Git LFS..."
    echo ""
    read -p "是否现在迁移？(y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "迁移中..."
        git lfs migrate import --include="public/test/model/domeg-ktx.glb" --everything
        echo "✅ 迁移完成"
    else
        echo "跳过迁移"
    fi
fi

# 添加 .gitattributes
echo ""
echo "添加 .gitattributes..."
git add .gitattributes

echo ""
echo "=== 完成 ==="
echo ""
echo "下一步："
echo "1. 如果文件已迁移，运行: git push"
echo "2. 如果文件还未添加到 Git，运行:"
echo "   git add public/test/model/dome.glb"
echo "   git add public/test/model/domeg-ktx.glb"
echo "   git commit -m 'Add large 3D models using Git LFS'"
echo "   git push"





