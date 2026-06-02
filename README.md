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

網站內容來自 repo 內的靜態 JSON（`src/static-data/`），**不會**在 `serve` / `build` 時呼叫 CLAB API。部署後的瀏覽器端也不會請求 API。

| 檔案 | 內容 |
|------|------|
| `src/static-data/works.json` | 作品列表與詳情（`title` / `note` 等） |
| `src/static-data/project.json` | 首頁關於區塊 |
| `src/static-data/work-proposals.json` | 部分作品的入場說明 |

若要從後台重新拉資料並覆寫上述 JSON（可選）：

```bash
npm run fetch-data
```

## 其他指令

```bash
npm run build
npm run lint
```
