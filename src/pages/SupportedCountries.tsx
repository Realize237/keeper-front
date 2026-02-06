import { JSX, useState } from 'react';
import ReactCountryFlag from 'react-country-flag';
import { FaSearch } from 'react-icons/fa';
import { IoSparklesOutline } from 'react-icons/io5';
import { useTranslation } from 'react-i18next';
import { countries } from '../constants/countries';

type TabType = 'Europe' | 'America' | 'Africa' | 'Asia';

const tabs: { key: TabType; labelKey: string; comingSoon: boolean }[] = [
  {
    key: 'Europe',
    labelKey: 'supported_countries.tabs.europe',
    comingSoon: false,
  },
  {
    key: 'America',
    labelKey: 'supported_countries.tabs.america',
    comingSoon: false,
  },
  {
    key: 'Africa',
    labelKey: 'supported_countries.tabs.africa',
    comingSoon: true,
  },
  {
    key: 'Asia',
    labelKey: 'supported_countries.tabs.asia',
    comingSoon: true,
  },
];

export function SupportedCountries() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<TabType>('Europe');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCountries = countries.filter(
    (country) =>
      country.continent === activeTab &&
      country.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getRegionTranslationKey = (region: TabType): string => {
    const regionMap: Record<TabType, string> = {
      Europe: 'supported_countries.tabs.europe',
      America: 'supported_countries.tabs.america',
      Africa: 'supported_countries.tabs.africa',
      Asia: 'supported_countries.tabs.asia',
    };
    return regionMap[region];
  };

  const isComingSoon = activeTab === 'Africa' || activeTab === 'Asia';

  return (
    <div className="min-h-screen bg-neutral-50/50 text-neutral-900 relative overflow-hidden selection:bg-[#FF6B5B]/20 selection:text-[#990800]">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'radial-gradient(#990800 1.5px, transparent 1.5px)',
            backgroundSize: '24px 24px',
          }}
        />

        <div
          className="absolute top-[-10%] left-[-10%] w-160 h-160 bg-[#FF6B5B]/10 rounded-full blur-[100px] mix-blend-multiply animate-pulse"
          style={{ animationDuration: '4s' }}
        />
        <div
          className="absolute bottom-[-10%] right-[-10%] w-160 h-160 bg-[#008B82]/10 rounded-full blur-[100px] mix-blend-multiply animate-pulse"
          style={{ animationDuration: '6s' }}
        />
        <div className="absolute top-[20%] right-[20%] w-[20rem] h-80 bg-[#C41E14]/5 rounded-full blur-[80px] mix-blend-multiply" />
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 relative z-10">
        <div className="text-center mb-12 relative pt-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-neutral-900 tracking-tight">
            {t('supported_countries.title')}
          </h1>
          <p className="text-neutral-500 text-lg max-w-xl mx-auto leading-relaxed">
            {t('supported_countries.subtitle')}
          </p>
        </div>

        <div className="max-w-2xl mx-auto mb-6 w-full">
          <div className="relative group">
            <div className="absolute inset-0 bg-linear-to-r from-[#990800]/20 to-[#FF6B5B]/20 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
            <div className="relative bg-white rounded-2xl shadow-sm border border-neutral-200 group-focus-within:border-[#990800]/30 group-focus-within:shadow-xl group-focus-within:shadow-[#990800]/5 transition-all duration-300">
              <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 group-focus-within:text-[#990800] transition-colors" />
              <input
                type="text"
                placeholder={t('supported_countries.search_placeholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-6 py-4 bg-transparent rounded-2xl text-neutral-900 placeholder:text-neutral-400 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto mb-12 w-full">
          <div className="flex w-full bg-white/80 backdrop-blur-sm rounded-2xl p-1.5 border border-neutral-200/60 shadow-sm">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => {
                  setActiveTab(tab.key);
                  setSearchQuery('');
                }}
                className={`flex-1 px-4 py-2.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 font-medium relative overflow-hidden ${
                  activeTab === tab.key
                    ? 'text-[#990800] shadow-sm ring-1 ring-black/5'
                    : 'text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100/50'
                }`}
              >
                {activeTab === tab.key && (
                  <div className="absolute inset-0 bg-linear-to-tr from-white to-[#FFF0EF] z-0" />
                )}
                <span className="relative z-10">{t(tab.labelKey)}</span>
                {tab.comingSoon && (
                  <span className="hidden sm:inline-block relative z-10 px-2 py-0.5 rounded-full bg-linear-to-r from-[#FF6B5B] to-[#C41E14] text-white text-[10px] font-bold tracking-wider uppercase shadow-md shadow-[#990800]/20 ml-1">
                    {t('supported_countries.soon')}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {isComingSoon ? (
          <div className="flex flex-col items-center justify-center py-24 bg-white/60 backdrop-blur-md rounded-3xl border border-neutral-200/60 mx-auto max-w-2xl text-center shadow-xl shadow-[#990800]/5 relative overflow-hidden group">
            <div className="absolute inset-0 bg-linear-to-br from-[#990800]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="w-24 h-24 rounded-full bg-white border border-neutral-100 flex items-center justify-center mb-6 shadow-lg shadow-[#FF6B5B]/10 relative z-10 group-hover:scale-110 transition-transform duration-500">
              <IoSparklesOutline className="w-10 h-10 text-[#FF6B5B]" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-neutral-900 relative z-10">
              {t('supported_countries.coming_soon_title', {
                region: t(getRegionTranslationKey(activeTab)),
              })}
            </h3>
            <p className="text-neutral-500 max-w-md relative z-10 leading-relaxed">
              {t('supported_countries.coming_soon_description', {
                region: t(getRegionTranslationKey(activeTab)),
              })}
            </p>
          </div>
        ) : (
          <>
            {searchQuery && filteredCountries.length === 0 ? (
              <div className="text-center py-20 bg-white/60 backdrop-blur-md rounded-3xl border border-neutral-200/60">
                <p className="text-neutral-500">
                  {t('supported_countries.no_results', { query: searchQuery })}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredCountries.map((country, index) => (
                  <button
                    key={country.code}
                    className="flex items-center justify-between p-5 bg-white/80 backdrop-blur-sm border border-neutral-200/80 rounded-2xl hover:border-[#990800]/30 hover:bg-white hover:shadow-xl hover:shadow-[#990800]/10 transition-all duration-300 group relative overflow-hidden"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="absolute inset-0 bg-linear-to-r from-[#990800]/0 via-[#990800]/0 to-[#990800]/5 -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />

                    <div className="flex items-center gap-4 relative z-10">
                      <div className="w-12 h-12 rounded-xl bg-[#990800]/10 border border-[#990800]/20 flex items-center justify-center text-2xl group-hover:scale-110 group-hover:shadow-md transition-all duration-300">
                        {getFlagEmoji(country.code)}
                      </div>
                      <span className="text-neutral-700 font-medium group-hover:text-neutral-900 transition-colors text-lg">
                        {country.name}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {!searchQuery && (
              <div className="mt-12 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 border border-neutral-200/50 backdrop-blur-sm">
                  <span className="w-2 h-2 rounded-full bg-[#008B82] animate-pulse"></span>
                  <p className="text-sm text-neutral-500 font-medium">
                    {t('supported_countries.region_count', {
                      count: filteredCountries.length,
                      region: t(getRegionTranslationKey(activeTab)),
                    })}
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function getFlagEmoji(countryCode: string): JSX.Element {
  return <ReactCountryFlag svg countryCode={countryCode} />;
}
