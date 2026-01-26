import { useState, useEffect, useCallback } from 'react';
import { storage } from '../utils/storage';

type CountdownDuration = {
  minutes?: number;
  seconds?: number;
};

const toMs = ({ minutes = 0, seconds = 0 }: CountdownDuration) =>
  (minutes * 60 + seconds) * 1000;

export const usePersistentCountdown = (
  key: string,
  duration: CountdownDuration
) => {
  const durationMs = toMs(duration);

  const [expiry, setExpiry] = useState<number>(() => {
    const stored = storage.get(key);

    if (stored) {
      const parsed = Number(stored);
      if (!Number.isNaN(parsed)) return parsed;
    }

    const newExpiry = Date.now() + durationMs;
    storage.set(key, newExpiry.toString());
    return newExpiry;
  });

  const getSecondsLeft = (exp: number) =>
    Math.max(0, Math.floor((exp - Date.now()) / 1000));

  const [secondsLeft, setSecondsLeft] = useState<number>(() =>
    getSecondsLeft(expiry)
  );

  useEffect(() => {
    const tick = () => {
      setSecondsLeft(getSecondsLeft(expiry));
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [expiry]);

  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === key && e.newValue) {
        const newExpiry = Number(e.newValue);
        if (!Number.isNaN(newExpiry) && newExpiry !== expiry) {
          setExpiry(newExpiry);
          setSecondsLeft(getSecondsLeft(newExpiry));
        }
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [expiry, key]);

  const reset = useCallback(() => {
    const newExpiry = Date.now() + durationMs;
    storage.set(key, newExpiry.toString());
    setExpiry(newExpiry);
    setSecondsLeft(Math.floor(durationMs / 1000));
  }, [durationMs, key]);

  const expired = secondsLeft <= 0;

  const minutesLeft = Math.floor(secondsLeft / 60);
  const remainingSeconds = secondsLeft % 60;

  return {
    secondsLeft,
    minutesLeft,
    remainingSeconds,
    reset,
    expired,
  };
};
