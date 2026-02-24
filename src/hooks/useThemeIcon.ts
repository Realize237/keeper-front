import { useMemo, useEffect, useState } from 'react';
import { useTheme } from './useTheme';
import { THEME_ICONS } from '../assets/icons';

export const useThemeIcon = (
  iconName: keyof typeof THEME_ICONS,
  state: 'active' | 'default' = 'default'
) => {
  const { theme } = useTheme();

  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>(() => {
    const isDark = document.documentElement.classList.contains('dark');
    return isDark ? 'dark' : 'light';
  });

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const isDark = document.documentElement.classList.contains('dark');
          setResolvedTheme(isDark ? 'dark' : 'light');
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    if (theme === 'system') {
      const media = window.matchMedia('(prefers-color-scheme: dark)');
      const updateTheme = () => {
        const isDark = document.documentElement.classList.contains('dark');
        setResolvedTheme(isDark ? 'dark' : 'light');
      };

      media.addEventListener('change', updateTheme);
      return () => {
        media.removeEventListener('change', updateTheme);
        observer.disconnect();
      };
    }

    return () => observer.disconnect();
  }, [theme]);

  const icon = useMemo(() => {
    const iconConfig = THEME_ICONS[iconName];

    if (state === 'active') {
      return iconConfig.active;
    }

    if ('default' in iconConfig && typeof iconConfig.default === 'object') {
      return iconConfig.default[resolvedTheme];
    }

    return iconConfig.active;
  }, [iconName, state, resolvedTheme]);

  return icon;
};
