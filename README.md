# VR7.5 Racing - 官方形象暨 AI 數據分析平台

這是一個為 VR7.5 學生方程式賽車團隊量身打造的官方形象網站與 AI 遙測數據分析平台。網站旨在向潛在贊助商、合作夥伴及賽事評審，專業地展示團隊的技術實力、車輛規格與創新的商業潛力。

**[➡️ 線上預覽 (Live Demo)](https://demo.vulpesracing.tw)**

---

## ✨ 核心功能

*   **沉浸式 3D 首頁**: 使用 `React Three Fiber` 與 `Drei` 打造具備滾動視差效果的 3D 賽車模型展示，提供極具科技感的視覺體驗。
*   **多國語言支援 (i18n)**: 內建完整繁體中文、英文雙語系，可透過導覽列即時切換，所有內容皆已完成國際化。
*   **響應式設計 (RWD)**: 所有頁面皆針對桌面、平板與手機裝置進行優化，確保在任何裝置上都有一致且美觀的瀏覽體驗。
*   **AI 遙測數據儀表板**:
    *   一個受密碼保護的後台儀表板 (`/dashboard`)，提供模擬登入機制。
    *   使用 `Recharts` 進行動態數據視覺化，展示速度、G力、油門等多維度數據。
    *   根據不同賽道（麗寶 G2、鈴鹿東賽道等）動態生成獨特性能特性的模擬遙測數據，提升真實感。
    *   整合三種不同等級的商業方案 (Free, Silver, Gold)，解鎖不同層級的 AI 分析功能。
    *   黃金方案獨有的「AI 戰術賽道地圖」，將數據分析視覺化，呈現最佳路線與理想煞車點。
*   **前端路由與部署優化**: 解決了 Vite + React 單頁應用 (SPA) 在 GitHub Pages 上使用自訂網域時，直接訪問子路由會重新導向失敗或顯示空白頁面的經典問題。
*   **使用者體驗優化**:
    *   每次切換頁面時，自動將畫面捲動至頂端。
    *   符合網站風格的客製化載入動畫。

## 🛠️ 技術棧

*   **前端框架**: [React](https://reactjs.org/) (with [Vite](https://vitejs.dev/))
*   **UI/樣式**: [Tailwind CSS](https://tailwindcss.com/)
*   **3D 渲染**: [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction), [Drei](https://github.com/pmndrs/drei)
*   **路由管理**: [React Router DOM](https://reactrouter.com/en/main)
*   **動畫效果**: [Framer Motion](https://www.framer.com/motion/), [Swiper.js](https://swiperjs.com/)
*   **圖表**: [Recharts](https://recharts.org/en-US/)
*   **國際化**: [i18next](https://www.i18next.com/), [react-i18next](https://react.i18next.com/)
*   **部署**: [GitHub Pages](https://pages.github.com/)

## 🚀 本地端啟動

請遵循以下步驟在您的本地端環境中啟動此專案：

1.  **複製專案倉庫**
    ```bash
    git clone https://github.com/你的使用者名稱/你的倉庫名稱.git
    ```

2.  **進入專案目錄**
    ```bash
    cd BOM-Website
    ```

3.  **安裝依賴套件**
    ```bash
    npm install
    ```

4.  **啟動開發伺服器**
    ```bash
    npm run dev
    ```
    應用程式將會運行在 `http://localhost:5173`。

## 🔑 儀表板測試帳號

為了方便測試受保護的儀表板功能，您可以使用以下模擬登入帳號：

*   **帳號**: `admin@vr75.com`
*   **密碼**: `password`

---
