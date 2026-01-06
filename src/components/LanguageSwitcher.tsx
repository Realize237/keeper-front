import { useState, useRef, RefObject, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactCountryFlag from 'react-country-flag';
import { FaChevronDown, FaCheck } from 'react-icons/fa';
import { useCloseOnOutsideInteraction } from '../hooks/useCloseOnOutsideInteraction';
import { useTranslation } from 'react-i18next';
import { storage } from '../utils/storage';

const languages = [
  { code: 'fr', label: 'Français', country: 'FR' },
  { code: 'en', label: 'English', country: 'GB' },
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setOpen(false);
  };

  const current = languages.find((l) => l.code === i18n.language);

  useCloseOnOutsideInteraction(
    ref as RefObject<HTMLElement>,
    () => setOpen(false),
    open
  );

  useEffect(() => {
    const savedLang = localStorage.getItem('language');
    if (savedLang && savedLang !== i18n.language) {
      i18n.changeLanguage(savedLang);
    }
  }, [i18n]);

  return (
    <div ref={ref} className="relative inline-block">
      <button
        onClick={() => setOpen(!open)}
        className="
          flex items-center gap-2 justify-center cursor-pointer
          rounded-full p-2 border border-white/15 shadow-md
          hover:bg-white/10 transition-all
        "
      >
        <ReactCountryFlag
          countryCode={current?.country || 'GB'}
          svg
          style={{ width: '1rem', height: '1rem' }}
        />
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
        >
          <FaChevronDown className="text-xs text-white" />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="
              absolute right-0 mt-3 w-48
              bg-[#171717] text-white
              rounded-2xl shadow-lg border border-white/10
              z-50 py-2
            "
          >
            {languages.map((lang) => {
              return (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className="
                    flex items-center justify-between gap-3 w-full px-4 py-2 text-sm
                    rounded-xl transition-colors
                    hover:bg-white/10 hover:text-white
                  "
                >
                  <div className="flex items-center gap-3">
                    <ReactCountryFlag
                      countryCode={lang.country}
                      svg
                      style={{ width: '1rem', height: '1rem' }}
                    />
                    <span className="font-medium">{lang.label}</span>
                  </div>
                  {lang.code === i18n.language && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FaCheck className="text-green-400 w-3 h-3" />
                    </motion.span>
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
