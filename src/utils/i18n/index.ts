import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enLang from './locales/en/en.json';
import frLang from './locales/fr/fr.json';
import enCookies from './locales/en/cookies.json';
import frCookies from './locales/fr/cookies.json';
import enGDPR from './locales/en/gdpr.json';
import frGDPR from './locales/fr/gdpr.json';
import enTerms from './locales/en/terms.json';
import frTerms from './locales/fr/terms.json';
import enPrivacy from './locales/en/privacy.json';
import frPrivacy from './locales/fr/privacy.json';
const resources = {
  en: {
    translation: enLang,
    cookies: enCookies,
    gdpr: enGDPR,
    terms: enTerms,
    privacy: enPrivacy,
  },
  fr: {
    translation: frLang,
    cookies: frCookies,
    gdpr: frGDPR,
    terms: frTerms,
    privacy: frPrivacy,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'fr',
    supportedLngs: ['en', 'fr'],
    ns: ['translation', 'cookies', 'gdpr', 'terms', 'privacy'],
    defaultNS: 'translation',
    interpolation: {
      escapeValue: false,
    },

    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage', 'cookie'],
    },
  });

export default i18n;
