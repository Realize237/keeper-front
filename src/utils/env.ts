function getEnv(key: string, defaultValue?: string): string {
  // Vite prefixes public env vars with VITE_
  const vitKey = `VITE_${key}`;
  const value = import.meta.env[vitKey as keyof ImportMetaEnv];

  if (value === undefined || value === null || value === '') {
    if (defaultValue !== undefined) {
      return defaultValue;
    }
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
}

export const env = {
  NODE_ENV: (import.meta.env.MODE || 'development') as string,
  API_URL: getEnv('API_URL', 'http://localhost:7000'),
  API_DOC_VERSION: getEnv('API_DOC_VERSION', '1.0'),
  FRONT_END_URL: getEnv('FRONT_END_URL', 'http://localhost:5173'),
  GOOGLE_CALLBACK_URL: getEnv('GOOGLE_CALLBACK_URL'),
  ROWS_PER_PAGE: getEnv('ROWS_PER_PAGE', '3'),
  VISIBLE_PAGE_COUNT: getEnv('VISIBLE_PAGE_COUNT', '5'),
  USER_INFO_CACHE_TIME: getEnv('USER_INFO_CACHE_TIME', '5'),
  REMEMBER_ME_COOKIE_EXPIRATION: getEnv('REMEMBER_ME_COOKIE_EXPIRATION', '480'),
  ACTIVE_MENU_ITEMS: getEnv('ACTIVE_MENU_ITEMS'),
};
