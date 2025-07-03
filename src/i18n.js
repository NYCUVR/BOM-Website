import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

i18n
  // 將 i18n 實例傳遞給 react-i18next
  .use(initReactI18next)
  // 偵測使用者語言
  .use(LanguageDetector)
  // 從後端（或 public 資料夾）載入翻譯
  .use(HttpApi)
  .init({
    // 支援的語言
    supportedLngs: ['en', 'zh-TW'],
    // 如果使用者語言沒有對應的翻譯，則使用的備用語言
    fallbackLng: 'en',
    detection: {
      // 偵測語言的順序
      order: ['cookie', 'htmlTag', 'localStorage', 'path', 'subdomain'],
      caches: ['cookie'],
    },
    backend: {
      // 翻譯檔案的路徑模板
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    // 需要載入的命名空間
    ns: ['translation', 'vehicleSpec'],
    // 預設的命名空間
    defaultNS: 'translation',
    react: {
      // Suspense 是 Http backend 的必要設定
      useSuspense: true,
    },
  });
