import { useState, useRef, useCallback } from 'react';
import ReactCountryFlag from 'react-country-flag';
import { useTranslation } from 'react-i18next';
import { phoneMasks, getCountriesByContinent } from '../../constants/countries';
import { Country } from '../../interfaces';

interface PhoneInputProps {
  value: string;
  onChange: (value: string, e164?: string) => void;
  selectedCountry: Country;
  onCountryChange: (country: Country) => void;
  error?: string;
  required?: boolean;
}

export function PhoneInput({
  value = '',
  onChange,
  selectedCountry,
  onCountryChange,
  error,
}: PhoneInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState<'below' | 'above'>(
    'below'
  );
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  const handleToggleDropdown = useCallback(() => {
    if (!isOpen && buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const dropdownHeight = 192;
      const viewportHeight = window.innerHeight;
      const spaceBelow = viewportHeight - buttonRect.bottom;
      const spaceAbove = buttonRect.top;

      if (spaceBelow < dropdownHeight + 8 && spaceAbove > dropdownHeight + 8) {
        setDropdownPosition('above');
      } else {
        setDropdownPosition('below');
      }
    }
    setIsOpen(!isOpen);
  }, [isOpen]);

  const formatPhoneNumber = (inputValue: string, country: Country) => {
    const cleaned = inputValue.replace(/\D/g, '');
    const mask = phoneMasks[country.code] ?? '999 999 999 999';

    let formatted = '';
    let cleanedIndex = 0;

    for (let i = 0; i < mask.length && cleanedIndex < cleaned.length; i++) {
      if (mask[i] === '9') {
        formatted += cleaned[cleanedIndex];
        cleanedIndex++;
      } else {
        formatted += mask[i];
      }
    }

    return formatted;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const formatted = formatPhoneNumber(inputValue, selectedCountry);
    onChange(formatted);
  };

  const getPlaceholder = () => {
    const mask = phoneMasks[selectedCountry.code] ?? '999 999 999 999';
    return mask.replace(/9/g, '•');
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <div className="relative">
          <button
            ref={buttonRef}
            type="button"
            onClick={handleToggleDropdown}
            className={`py-3 px-5  flex items-center justify-center gap-2 bg-surface rounded-xl transition-colors ${
              error
                ? 'border-2 border-red-500 hover:bg-red-950/20'
                : 'border-border hover:bg-surface/50'
            }`}
          >
            <ReactCountryFlag svg countryCode={selectedCountry.code} />
            <span className="text-gray-500">{selectedCountry.dialCode}</span>
          </button>

          {isOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setIsOpen(false)}
              />
              <div
                ref={dropdownRef}
                className={`absolute left-0 w-64 text-white modal-scrollbar bg-app rounded-lg border shadow-lg z-20 max-h-48 overflow-y-auto ${
                  dropdownPosition === 'above'
                    ? 'bottom-full mb-2'
                    : 'top-full mt-2'
                }`}
              >
                <div className="sticky top-0 px-3 py-1.5 bg-gray-800 text-xs font-semibold text-gray-300 uppercase tracking-wide border-b border-gray-700">
                  {t('common.continents.europe')}
                </div>
                {getCountriesByContinent('Europe').map((country) => (
                  <button
                    key={country.code}
                    type="button"
                    onClick={() => {
                      onCountryChange(country);
                      onChange('', undefined);
                      setIsOpen(false);
                    }}
                    className={`w-full px-4 py-2 flex items-center gap-3 hover:bg-surface transition-colors ${
                      selectedCountry.code === country.code ? 'bg-surface' : ''
                    }`}
                  >
                    <ReactCountryFlag svg countryCode={country.code} />
                    <span className="flex-1 text-left text-sm">
                      {country.name}
                    </span>
                    <span className="text-gray-400 text-xs">
                      {country.dialCode}
                    </span>
                  </button>
                ))}

                <div className="sticky top-0 px-3 py-1.5 bg-gray-800 text-xs font-semibold text-gray-300 uppercase tracking-wide border-t border-b border-gray-700">
                  {t('common.continents.americas')}
                </div>
                {getCountriesByContinent('Americas').map((country) => (
                  <button
                    key={country.code}
                    type="button"
                    onClick={() => {
                      onCountryChange(country);
                      onChange('', undefined);
                      setIsOpen(false);
                    }}
                    className={`w-full px-4 py-2 flex items-center gap-3 hover:bg-surface transition-colors ${
                      selectedCountry.code === country.code ? 'bg-surface' : ''
                    }`}
                  >
                    <ReactCountryFlag svg countryCode={country.code} />
                    <span className="flex-1 text-left text-sm">
                      {country.name}
                    </span>
                    <span className="text-gray-400 text-xs">
                      {country.dialCode}
                    </span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        <input
          type="tel"
          value={value}
          onChange={handleInputChange}
          placeholder={getPlaceholder()}
          className={`w-full py-3 px-5 bg-surface rounded-xl text-white placeholder-gray-500 transition-colors focus:outline-none focus:ring-2 ${
            error
              ? 'border-2 border-red-500 '
              : 'border-border focus:ring-primary'
          }`}
        />
      </div>

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
