# 專案開發挑戰與解決方案紀錄

這份文件記錄了在「VR7.5 官方形象暨 AI 數據分析平台」開發過程中遇到的主要技術挑戰、除錯過程以及最終採用的解決方案。

---

## 1. 環境設定與模組系統衝突

### 1.1. Tailwind CSS v4 插件錯誤

*   **問題描述**: 在使用 Vite 初始化 React 專案並加入 Tailwind CSS 後，執行 `npm run dev` 時，開發伺服器立即崩潰。
*   **根本原因**: 新版本的 Tailwind CSS v4 將其 PostCSS 插件分離成一個獨立的套件 `@tailwindcss/postcss`。僅僅初始化設定檔並不足以讓 PostCSS 正確處理 Tailwind 的語法。
*   **解決方案**:
    1.  手動安裝所需的 PostCSS 插件：`npm install -D @tailwindcss/postcss`。
    2.  更新 `tailwind.config.js`，明確指定 `content` 屬性，告知 Tailwind 需要掃描哪些檔案以生成對應的 CSS。

### 1.2. PostCSS 設定檔模組錯誤 (`ReferenceError: module is not defined`)

*   **問題描述**: 解決了插件問題後，開發伺服器再次因 `postcss.config.js` 檔案中的 `module.exports` 語法而崩潰。
*   **根本原因**: Vite 預設採用 ES 模組（ESM）系統，使用 `import`/`export` 語法。而 `npx tailwindcss init -p` 指令自動產生的 `postcss.config.js` 預設使用了 CommonJS（CJS）的 `module.exports` 語法，兩者產生衝突。
*   **解決方案**: 將設定檔 `postcss.config.js` 重新命名為 `postcss.config.cjs`。`.cjs` 副檔名明確告知 Node.js 將此檔案作為 CommonJS 模組來解析，從而解決了與 Vite 的 ESM 環境之間的衝突。

---

## 2. 前端路由在 GitHub Pages 上的部署問題

*   **問題描述**: 專案部署到 GitHub Pages 並綁定自訂網域後，雖然首頁可以正常訪問，但任何嘗試直接透過 URL 訪問子頁面（例如 `https://demo.vulpesracing.tw/about`）的行為都會導致 404 錯誤。
*   **根本原因**: 這是一個單頁應用（SPA）的普遍問題。GitHub Pages 伺服器會試圖在你的檔案系統中尋找 `/about` 這個目錄或檔案，但它並不存在，因為所有的路由都是由客戶端的 React Router 在 `index.html` 載入後才接管的。
*   **解決方案**: 我們採用了社群公認的最佳實踐 "SPA Fallback" 策略來解決此問題：
    1.  **建立 `public/404.html`**: 複製一份 `index.html` 的內容，並將其命名為 `404.html` 放在 `public` 資料夾下。這樣一來，GitHub Pages 伺服器在找不到任何路徑時，都會回退到這個檔案。
    2.  **在 `404.html` 中加入腳本**: 在 `404.html` 的 `<head>` 中加入一小段 JavaScript，它會從當前的 URL (`location.href`) 中解析出使用者原本想訪問的路徑，並將其儲存在 `sessionStorage` 中，然後立即將頁面重新導向到根目錄。
    3.  **在 `index.html` 中加入還原腳本**: 在 `index.html` 的 `<head>` 中也加入一段腳本，它會在頁面載入時檢查 `sessionStorage` 中是否存在先前儲存的路徑。如果存在，它會使用 `history.replaceState` 將瀏覽器的 URL 從根目錄悄悄地修改回使用者原本想訪問的子路徑。
    4.  **結果**: 這個過程對使用者來說是無縫的。瀏覽器實際上載入的是 `index.html`，但 URL 已經被修正，此時 React Router 便能成功匹配到正確的路由並渲染對應的元件。

---

## 3. 多國語言 (i18n) 系統載入失敗

*   **問題描述**: 導入 `i18next` 和 `i18next-http-backend` 來實現多國語言功能後，整個網站的文字都顯示為翻譯鍵的名稱（例如 `nav.home`），而不是對應的翻譯內容。
*   **根本原因**:
    1.  **檔案路徑問題**: 我們最初將 `locales` 資料夾（包含 `en` 和 `zh-TW` 的 JSON 翻譯檔）放置在 `src` 目錄下。`i18next-http-backend` 插件是透過發起 HTTP 請求來非同步載入這些 JSON 檔案的。Vite 在建構時會處理 `src` 內的檔案，但並不會預設將它們原封不動地暴露在可以被 HTTP 直接訪問的根目錄下。因此，瀏覽器在請求 `.../locales/en/translation.json` 時收到了 404 錯誤。
    2.  **JSON 語法錯誤**: 在解決路徑問題後，我們仍然遇到載入失敗。經過仔細檢查，發現其中一個 JSON 檔案中存在語法錯誤（例如多了一個結尾的逗號），導致瀏覽器的 JSON 解析器失敗。
*   **解決方案**:
    1.  將整個 `locales` 資料夾從 `src/` 移動到 `public/` 目錄下。`public` 資料夾中的所有內容都會被 Vite 直接複製到建構產物的根目錄，確保它們可以透過 `/locales/...` 的路徑被 HTTP 請求正確訪問。
    2.  使用線上 JSON 驗證工具或 IDE 的語法檢查功能，徹底修正了 JSON 檔案中的所有語法錯誤。透過「完整檔案覆蓋」的方式確保了檔案的正確性。

---

## 4. 行動裝置響應式佈局 (RWD) 問題

### 4.1. 首頁 3D 模型在手機上顯示過大

*   **問題描述**: 首頁的 3D 賽車模型在桌面版上顯示正常，但在手機等窄螢幕上，攝影機視角過於靠近，導致模型主體被裁切，無法看到全貌。
*   **根本原因**: 3D 場景中的攝影機位置是固定的，沒有根據螢幕寬度的變化而調整。
*   **解決方案**: 建立了一個名為 `ResponsiveCamera` 的自訂元件。該元件會監聽螢幕的寬度變化，並透過一個函式（例如線性插值）來動態調整 `PerspectiveCamera` 的 `zoom` 或 `position` 屬性。當螢幕變窄時，攝影機會自動拉遠，確保整個模型始終在視野範圍內。

### 4.2. 手機版首頁內容溢出且無法捲動

*   **問題描述**: 在手機上瀏覽首頁時，右側內容被裁切，且無法向下捲動瀏覽所有區塊。
*   **根本原因**: 在多個容器上使用了 `w-screen` 這個 Tailwind CSS class。`w-screen` 會強制元素的寬度等於視窗的寬度，但如果頁面出現了垂直捲動軸，捲動軸本身也會佔用幾像素的寬度，這就導致了 `w-screen` 的內容實際上比可視區域要寬一點點，從而產生水平溢出。
*   **解決方案**:
    1.  將所有 `w-screen` 替換為 `w-full`。`w-full` 會讓元素的寬度等於其父容器的寬度，這是更安全、更可預測的行為。
    2.  檢查了滾動容器的 CSS，確保其 `overflow-y` 屬性被設為 `auto` 或 `scroll`，並為其動態設定了足夠的 `height` 來容納所有內容，從而修復了無法捲動的問題。

### 4.3. 「車輛規格」頁面在手機上的可用性不佳

*   **問題描述**: 桌面版的「車輛規格」頁面採用了在車輛圖片上標示互動熱點的設計，這種設計在手機的小螢幕上難以精準點擊。
*   **解決方案**: 採用了條件渲染（Conditional Rendering）策略。透過一個判斷螢幕寬度的自訂 Hook (`useMediaQuery`)，我們讓該頁面在不同的裝置上渲染完全不同的元件：
    *   **桌面版**: 顯示互動熱點圖 (`VehicleDiagram`)。
    *   **手機版**: 顯示一個垂直的手風琴式列表 (`Accordion`)，使用者可以輕鬆地點擊標題來展開或收合規格說明，大幅提升了行動裝置的操作體驗。 