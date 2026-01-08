import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enLang from './locales/en/en.json';
import frLang from './locales/fr/fr.json';

const resources = {
  en: {
    translation: enLang,
  },
  fr: {
    translation: frLang,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'fr',
    supportedLngs: ['en', 'fr'],

    interpolation: {
      escapeValue: false,
    },

    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage', 'cookie'],
    },
  });

export default i18n;
