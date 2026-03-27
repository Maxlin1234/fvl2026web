# 代码清理计划

## 可删除的文件清单

### 1. 备份文件（确认未使用）
- ✅ `src/views/Home copy.vue` (1109行) - 备份文件
- ✅ `src/components/NavBar copy.vue` - 备份文件
- ✅ `src/views/Aboutwork copy.vue` (1012行) - 备份文件
- ✅ `src/views/About_test.vue` (702行) - 测试文件
- ✅ `src/views/News_origin.vue` - 原始版本备份
- ✅ `src/components/BackGround origin.vue` - 原始版本备份
- ✅ `src/views/Fvlhome_en._testvue` - 测试文件

### 2. 未使用的路由文件
- ✅ `src/views/Comingsoon.vue` (1456行) - 路由中已注释，未使用
- ⚠️ `src/views/Collection字卡.vue` - 需要确认是否使用

### 3. 临时/占位文件
- ✅ `src/css/closedhand.txt`
- ✅ `src/css/openhand.txt`
- ✅ `src/closedhand.txt`
- ✅ `src/openhand.txt`
- ✅ `src/fonts/revicons/index.php` - 占位文件
- ✅ `src/assets/js/extensions/index.php` - 占位文件
- ✅ `src/assets/js/extensions/source/index.php` - 占位文件
- ✅ `src/fonts/revicons.rar` - 压缩文件

## 预计节省空间

- 备份文件：约 3500+ 行代码
- 未使用文件：约 1456 行代码
- 总计：约 5000+ 行代码可删除

## 执行清理

执行以下命令删除文件：

```bash
# 备份文件
rm src/views/"Home copy.vue"
rm src/components/"NavBar copy.vue"
rm src/views/"Aboutwork copy.vue"
rm src/views/About_test.vue
rm src/views/News_origin.vue
rm src/components/"BackGround origin.vue"
rm src/views/Fvlhome_en._testvue

# 未使用的路由文件
rm src/views/Comingsoon.vue
# rm src/views/Collection字卡.vue  # 需要确认

# 临时文件
rm src/css/closedhand.txt
rm src/css/openhand.txt
rm src/closedhand.txt
rm src/openhand.txt
rm src/fonts/revicons/index.php
rm src/assets/js/extensions/index.php
rm src/assets/js/extensions/source/index.php
rm src/fonts/revicons.rar
```





