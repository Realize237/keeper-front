import { FaArrowRight, FaBell, FaGlobe, FaStar } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { LuSparkles } from 'react-icons/lu';
import { IMAGES } from '../../assets';
import HomeNavbar from './HomeNavbar';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '../../routes/paths';

const Hero = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <section
      id="hero"
      data-nav="hero"
      className="relative overflow-hidden bg-linear-to-br from-gray-50 via-white to-red-50/30"
    >
      <HomeNavbar />

      <div className="container mx-auto px-6 py-12 md:py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 lg:pr-8">
            <div className="inline-flex items-center gap-2.5 px-5 py-3 bg-white border-2 border-[#990800]/20 rounded-2xl shadow-sm hover:shadow-lg hover:border-[#990800]/40 transition-all group cursor-pointer">
              <div className="w-2 h-2 bg-[#008B82] rounded-full animate-pulse"></div>
              <LuSparkles className="w-4 h-4 text-[#990800]" />
              <span className="text-sm font-semibold text-gray-800">
                {t('hero.badge')}
              </span>
              <span className="px-2.5 py-1 bg-linear-to-r from-[#990800] to-[#C41E14] text-white rounded-lg text-xs font-bold shadow-sm">
                {t('hero.badge_new')}
              </span>
            </div>

            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight">
                <span className="block text-gray-900">{t('hero.title_1')}</span>
                <span className="block bg-linear-to-r from-[#990800] via-[#C41E14] to-[#FF6B5B] bg-clip-text text-transparent py-2">
                  {t('hero.title_2')}
                </span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed max-w-xl font-medium">
                {t('hero.description')}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={() => navigate(PATHS.APP.SUBSCRIPTIONS)}
                className="group px-8 py-4 bg-linear-to-r from-[#990800] to-[#C41E14] text-white rounded-2xl hover:shadow-2xl hover:shadow-red-900/40 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-3 font-bold"
              >
                <FaGlobe className="w-5 h-5" />
                <span>{t('hero.sync_account')}</span>
                <FaArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => navigate(PATHS.APP.SUBSCRIPTIONS)}
                className="px-8 py-4 bg-white border-2 border-gray-300 text-gray-900 rounded-2xl hover:border-[#990800] hover:bg-red-50 transition-all font-bold shadow-sm"
              >
                {t('hero.try_web_app')}
              </button>
            </div>

            <div className="flex flex-col md:flex-row  items-center gap-8 pt-6">
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  <div className="w-11 h-11 rounded-full bg-linear-to-br from-[#FF6B5B] to-[#C41E14] border-3 border-white shadow-md"></div>
                  <div className="w-11 h-11 rounded-full bg-linear-to-br from-[#990800] to-[#6B0500] border-3 border-white shadow-md"></div>
                  <div className="w-11 h-11 rounded-full bg-linear-to-br from-[#008B82] to-[#006B66] border-3 border-white shadow-md"></div>
                  <div className="w-11 h-11 rounded-full bg-linear-to-br from-gray-700 to-gray-900 border-3 border-white shadow-md flex items-center justify-center text-white text-xs font-bold">
                    +10K
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className="w-4 h-4 text-yellow-500 fill-yellow-500"
                      />
                    ))}
                    <span className="font-bold text-gray-900 ml-1">4.9</span>
                  </div>
                  <p className="text-sm text-gray-600 font-medium">
                    {t('hero.trusted_by')}
                  </p>
                </div>
              </div>
              <div className="w-24 h-px md:w-px md:h-14 bg-gray-300"></div>
              <div>
                <div className="font-bold text-3xl bg-linear-to-r from-[#990800] to-[#C41E14] bg-clip-text text-transparent">
                  $2M+
                </div>
                <p className="text-sm text-gray-600 font-medium">
                  {t('hero.tracked_saved')}
                </p>
              </div>
            </div>
          </div>

          <div className="relative lg:scale-105 lg:translate-x-4">
            <div className="hidden lg:block absolute -left-12 top-20 bg-white rounded-3xl shadow-2xl p-5 border-2 border-gray-100 transform hover:scale-105 transition-all z-10 max-w-60">
              <div className="flex items-start gap-3">
                <div className="w-14 h-14 bg-linear-to-br from-[#008B82] to-[#006B66] rounded-2xl flex items-center justify-center shrink-0 shadow-lg">
                  <FaBell className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-900 mb-1">
                    Netflix
                  </p>
                  <p className="text-xs text-gray-500 mb-2">
                    {t('hero.renewal_in')}
                  </p>
                  <div className="inline-flex items-center gap-1 px-2 py-1 bg-red-50 rounded-lg">
                    <span className="text-sm font-bold text-[#990800]">
                      €12.99
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden lg:block absolute -right-8 bottom-28 bg-white rounded-3xl shadow-2xl p-5 border-2 border-gray-100 transform hover:scale-105 transition-all z-10">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-linear-to-br from-[#990800] to-[#C41E14] rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  €245
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">
                    {t('hero.monthly_total')}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-[#008B82] font-semibold mt-1">
                    <span>↓ 12%</span>
                    <span className="text-gray-400">
                      {t('hero.vs_last_month')}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative mx-auto max-w-md">
              <div className="absolute inset-0 bg-linear-to-br from-[#990800] via-[#C41E14] to-[#FF6B5B] rounded-[4rem] blur-3xl opacity-20 scale-110"></div>

              <div className="relative transform hover:scale-[1.02] transition-transform duration-500 cursor-pointer">
                <img
                  src={IMAGES.KeepayNoBg}
                  alt="Keepay App Interface showing subscription tracking dashboard"
                  className="w-full h-auto drop-shadow-2xl"
                />
              </div>

              <div
                className="absolute -top-4 right-8 w-4 h-4 bg-[#008B82] rounded-full shadow-lg animate-bounce"
                style={{ animationDuration: '3s' }}
              ></div>
              <div
                className="absolute top-1/3 -left-6 w-3 h-3 bg-[#FF6B5B] rounded-full shadow-lg animate-bounce"
                style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}
              ></div>
              <div
                className="absolute bottom-20 -right-4 w-5 h-5 bg-[#990800] rounded-full shadow-lg animate-bounce"
                style={{ animationDuration: '3.5s', animationDelay: '1s' }}
              ></div>
            </div>

            <div className="absolute top-0 right-16 w-24 h-24 bg-linear-to-br from-[#FF6B5B] to-[#C41E14] rounded-full blur-2xl opacity-30 animate-pulse"></div>
            <div
              className="absolute bottom-16 left-12 w-20 h-20 bg-linear-to-br from-[#008B82] to-[#006B66] rounded-full blur-2xl opacity-30 animate-pulse"
              style={{ animationDelay: '1.5s' }}
            ></div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-white to-transparent pointer-events-none"></div>
    </section>
  );
};

export default Hero;
