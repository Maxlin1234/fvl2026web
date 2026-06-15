# fvl2026web

## 開啟專案前（必要）

本專案需使用 Node.js 14，請先切換版本：

```bash
nvm use 14
```

## 啟動專案

```bash
npm install
npm run serve
```

網站內容來自 `src/static-data/` 的 JSON。**`npm run build` 會先向 CLAB API 抓取一次並寫入 JSON**，打包後瀏覽器只讀這些靜態資料，不再呼叫 API。

| 檔案 | 內容 |
|------|------|
| `src/static-data/works.json` | 作品列表與詳情 |
| `src/static-data/project.json` | 首頁關於區塊 |
| `src/static-data/work-proposals.json` | 部分作品的入場說明 |

`npm run serve` 使用 repo 內現有 JSON，不會抓 API。若要略過抓取直接打包（沿用現有 JSON）：

```bash
npm run build:skip-fetch
```

### 預覽 build 結果

`npm run serve` 是**開發模式**，無法等同於 `npm run build` 的產物。要先 build，再預覽 `dist/`：

```bash
npm run build      # 建置
npm run preview    # 本地預覽 dist（與上線相同）
```

或一次完成：

```bash
npm run build:preview
```

手動更新靜態資料：

```bash
npm run fetch-data
```

## 其他指令

```bash
npm run build
npm run lint
```
