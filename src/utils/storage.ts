type StorageValue = string | number | boolean | object | null;

export const storage = {
  set(key: string, value: StorageValue) {
    try {
      const serialized =
        typeof value === 'string' ? value : JSON.stringify(value);
      localStorage.setItem(key, serialized);
    } catch (error) {
      console.error(`Error saving ${key} to localStorage`, error);
    }
  },

  get<T = unknown>(key: string, defaultValue: T | null = null): T | null {
    try {
      const item = localStorage.getItem(key);
      if (!item) return defaultValue;

      try {
        return JSON.parse(item) as T;
      } catch {
        return item as unknown as T;
      }
    } catch (error) {
      console.error(`Error reading ${key} from localStorage`, error);
      return defaultValue;
    }
  },

  remove(key: string) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing ${key} from localStorage`, error);
    }
  },

  clear() {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage', error);
    }
  },
};
