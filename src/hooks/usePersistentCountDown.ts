import { useState, useEffect, useCallback } from 'react';
import { storage } from '../utils/storage';

export const usePersistentCountdown = (key: string, duration: number) => {
  const [expiry, setExpiry] = useState<number>(() => {
    const stored = storage.get(key);
    if (stored) {
      const parsed = parseInt(stored as string, 10);
      if (!isNaN(parsed)) return parsed;
    }

    const newExpiry = Date.now() + duration * 1000;
    storage.set(key, newExpiry.toString());
    return newExpiry;
  });

  const [secondsLeft, setSecondsLeft] = useState<number>(() =>
    Math.max(0, Math.floor((expiry - Date.now()) / 1000))
  );

  useEffect(() => {
    const tick = () => {
      setSecondsLeft(Math.max(0, Math.floor((expiry - Date.now()) / 1000)));
    };

    tick();

    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [expiry]);

  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === key && e.newValue) {
        const newExpiry = parseInt(e.newValue, 10);
        if (!isNaN(newExpiry) && newExpiry !== expiry) {
          setExpiry(newExpiry);
          setSecondsLeft(
            Math.max(0, Math.floor((newExpiry - Date.now()) / 1000))
          );
        }
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [expiry, key]);

  const reset = useCallback(() => {
    const newExpiry = Date.now() + duration * 1000;
    storage.set(key, newExpiry.toString());
    setExpiry(newExpiry);
    setSecondsLeft(duration);
  }, [duration, key]);

  const expired = secondsLeft <= 0;

  return { secondsLeft, reset, expired };
};
