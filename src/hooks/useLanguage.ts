import { useContext, useMemo } from 'react';
import {
  LanguageContext,
  LanguageContextType,
} from '../context/LanguageContext';
import { useTranslation } from 'react-i18next';

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }

  return context;
};

export function useTranslatedArray<T = string>(
  key: string,
  fallback: T[] = [] as T[],
  ns?: string
): T[] {
  const { t } = useTranslation(ns);

  return useMemo(() => {
    const result = t(key, {
      returnObjects: true,
      defaultValue: fallback,
    });

    if (Array.isArray(result)) {
      return result as T[];
    }

    console.warn(
      `Translation key "${key}" did not return an array. Using fallback.`
    );
    return fallback;
  }, [t, key, fallback]);
}
