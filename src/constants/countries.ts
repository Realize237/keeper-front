import { Country } from '../interfaces';

// Supported countries list - alphabetically ordered for maintainability
export const countries: Country[] = [
  // Europe (alphabetical)
  {
    code: 'AT',
    name: 'Austria',
    dialCode: '+43',
    flag: '🇦🇹',
    continent: 'Europe',
  },
  {
    code: 'BE',
    name: 'Belgium',
    dialCode: '+32',
    flag: '🇧🇪',
    continent: 'Europe',
  },
  {
    code: 'DK',
    name: 'Denmark',
    dialCode: '+45',
    flag: '🇩🇰',
    continent: 'Europe',
  },
  {
    code: 'EE',
    name: 'Estonia',
    dialCode: '+372',
    flag: '🇪🇪',
    continent: 'Europe',
  },
  {
    code: 'FI',
    name: 'Finland',
    dialCode: '+358',
    flag: '🇫🇮',
    continent: 'Europe',
  },
  {
    code: 'FR',
    name: 'France',
    dialCode: '+33',
    flag: '🇫🇷',
    continent: 'Europe',
  },
  {
    code: 'DE',
    name: 'Germany',
    dialCode: '+49',
    flag: '🇩🇪',
    continent: 'Europe',
  },
  {
    code: 'IE',
    name: 'Ireland',
    dialCode: '+353',
    flag: '🇮🇪',
    continent: 'Europe',
  },
  {
    code: 'IT',
    name: 'Italy',
    dialCode: '+39',
    flag: '🇮🇹',
    continent: 'Europe',
  },
  {
    code: 'LV',
    name: 'Latvia',
    dialCode: '+371',
    flag: '🇱🇻',
    continent: 'Europe',
  },
  {
    code: 'LT',
    name: 'Lithuania',
    dialCode: '+370',
    flag: '🇱🇹',
    continent: 'Europe',
  },
  {
    code: 'NL',
    name: 'Netherlands',
    dialCode: '+31',
    flag: '🇳🇱',
    continent: 'Europe',
  },
  {
    code: 'NO',
    name: 'Norway',
    dialCode: '+47',
    flag: '🇳🇴',
    continent: 'Europe',
  },
  {
    code: 'PL',
    name: 'Poland',
    dialCode: '+48',
    flag: '🇵🇱',
    continent: 'Europe',
  },
  {
    code: 'PT',
    name: 'Portugal',
    dialCode: '+351',
    flag: '🇵🇹',
    continent: 'Europe',
  },
  {
    code: 'ES',
    name: 'Spain',
    dialCode: '+34',
    flag: '🇪🇸',
    continent: 'Europe',
  },
  {
    code: 'SE',
    name: 'Sweden',
    dialCode: '+46',
    flag: '🇸🇪',
    continent: 'Europe',
  },
  {
    code: 'GB',
    name: 'United Kingdom',
    dialCode: '+44',
    flag: '🇬🇧',
    continent: 'Europe',
  },

  // Americas (alphabetical)
  {
    code: 'CA',
    name: 'Canada',
    dialCode: '+1',
    flag: '🇨🇦',
    continent: 'America',
  },
  {
    code: 'US',
    name: 'United States',
    dialCode: '+1',
    flag: '🇺🇸',
    continent: 'America',
  },
];

// Phone number masks for formatting - organized by country code for easy maintenance
export const phoneMasks: Record<string, string> = {
  // Europe
  AT: '999 9999999', // Austria: +43 123 4567890
  BE: '999 99 99 99', // Belgium: +32 123 45 67 89
  DK: '99 99 99 99', // Denmark: +45 12 34 56 78
  EE: '9999 9999', // Estonia: +372 1234 5678
  FI: '99 999 9999', // Finland: +358 12 345 6789
  FR: '9 99 99 99 99', // France: +33 1 23 45 67 89
  DE: '999 99999999', // Germany: +49 123 45678901
  IE: '99 999 9999', // Ireland: +353 12 345 6789
  IT: '999 999 9999', // Italy: +39 123 456 7890
  LV: '99 999 999', // Latvia: +371 12 345 678
  LT: '999 99999', // Lithuania: +370 123 45678
  NL: '9 9999 9999', // Netherlands: +31 1 2345 6789
  NO: '999 99 999', // Norway: +47 123 45 678
  PL: '999 999 999', // Poland: +48 123 456 789
  PT: '999 999 999', // Portugal: +351 123 456 789
  ES: '999 999 999', // Spain: +34 123 456 789
  SE: '99 999 99 99', // Sweden: +46 12 345 67 89
  GB: '9999 999999', // UK: +44 1234 567890

  // Americas
  CA: '(999) 999-9999', // Canada: +1 (123) 456-7890
  US: '(999) 999-9999', // USA: +1 (123) 456-7890
};

export const DEFAULT_COUNTRY = countries.find(
  (country) => country.code === 'FR'
)!;

export const getCountryByCode = (code: string): Country | undefined => {
  return countries.find((country) => country.code === code);
};

export const getCountriesByContinent = (
  continent: 'Europe' | 'Americas'
): Country[] => {
  const continentMap: Record<string, string[]> = {
    Europe: [
      'AT',
      'BE',
      'DK',
      'EE',
      'FI',
      'FR',
      'DE',
      'IE',
      'IT',
      'LV',
      'LT',
      'NL',
      'NO',
      'PL',
      'PT',
      'ES',
      'SE',
      'GB',
    ],
    Americas: ['CA', 'US'],
  };

  return countries.filter((country) =>
    continentMap[continent]?.includes(country.code)
  );
};

export const getPhoneMask = (countryCode: string): string => {
  return phoneMasks[countryCode] ?? '999 999 999 999';
};
