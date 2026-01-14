import { createContext, useMemo, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

export interface LanguageContextType {
  currentLanguage: string;
  changeLanguage: (lng: string) => void;
  isFrench: boolean;
  isEnglish: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

function LanguageProvider({ children }: { children: ReactNode }) {
  const { i18n } = useTranslation();

  const value = useMemo(
    () => ({
      currentLanguage: i18n.language,
      changeLanguage: (lng: string) => {
        i18n.changeLanguage(lng);
      },
      isFrench: i18n.language.startsWith('fr'),
      isEnglish: i18n.language.startsWith('en'),
    }),
    [i18n]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export { LanguageContext, LanguageProvider };
