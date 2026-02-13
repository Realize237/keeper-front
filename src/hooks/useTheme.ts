import { useState, useEffect, useMemo } from 'react';
import { useUser } from './useUsers';

export type Theme = 'light' | 'dark' | 'system';

export const useTheme = () => {
  const { user } = useUser();

  const initialTheme = useMemo<Theme>(() => {
    if (user?.preferredTheme) {
      return user.preferredTheme as Theme;
    }
    return (localStorage.getItem('theme') as Theme) || 'system';
  }, [user?.preferredTheme]);

  const [theme, setTheme] = useState<Theme>(initialTheme);

  useEffect(() => {
    setTheme(initialTheme);
  }, [initialTheme]);

  useEffect(() => {
    const root = document.documentElement;

    requestAnimationFrame(() => {
      root.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    });

    return () => {
      root.style.transition = '';
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const systemDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;

    if (theme === 'dark') {
      root.classList.add('dark');
      localStorage.theme = 'dark';
    } else if (theme === 'light') {
      root.classList.remove('dark');
      localStorage.theme = 'light';
    } else {
      localStorage.removeItem('theme');
      root.classList.toggle('dark', systemDark);
    }
  }, [theme]);

  useEffect(() => {
    if (theme !== 'system') return;

    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const listener = () => {
      document.documentElement.classList.toggle('dark', media.matches);
    };

    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return { theme, setTheme, toggleTheme };
};
