import { useTranslation } from 'react-i18next';
import { FaArrowRight } from 'react-icons/fa';
import { FaCheck, FaGlobe } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

export const CTA = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-linear-to-br from-[#990800] via-[#C41E14] to-[#FF6B5B] relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '1s' }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '0.5s' }}
        ></div>
      </div>

      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      ></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center text-white space-y-10">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl text-white text-sm font-bold shadow-xl">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            {t('cta.badge')}
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
            {t('cta.title')}
          </h2>

          <p className="text-xl md:text-2xl opacity-95 max-w-2xl mx-auto leading-relaxed font-medium">
            {t('cta.description')}
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center pt-6">
            <button
              onClick={() => navigate('/subscriptions')}
              className="group px-10 py-5 bg-white text-[#990800] rounded-2xl hover:shadow-2xl transition-all transform hover:-translate-y-1 flex items-center justify-center gap-3 font-bold text-lg"
            >
              <FaGlobe className="w-6 h-6" />
              {t('cta.sync_account')}
              <FaArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => navigate('/subscriptions')}
              className="px-10 py-5 border-3 border-white text-white rounded-2xl hover:bg-white hover:text-[#990800] transition-all transform hover:-translate-y-1 font-bold text-lg"
            >
              {t('cta.open_web_app')}
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button className="px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/30 text-white rounded-xl hover:bg-white/20 transition-all font-semibold">
              {t('cta.watch_demo')}
            </button>
            <button className="px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/30 text-white rounded-xl hover:bg-white/20 transition-all font-semibold">
              {t('cta.view_pricing')}
            </button>
            <button className="px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/30 text-white rounded-xl hover:bg-white/20 transition-all font-semibold">
              {t('cta.read_stories')}
            </button>
          </div>

          <div className="pt-10 flex flex-wrap items-center justify-center gap-8 text-base opacity-90">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <FaCheck className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold">{t('cta.no_card')}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <FaCheck className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold">{t('cta.free_plan')}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <FaCheck className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold">{t('cta.cancel_anytime')}</span>
            </div>
          </div>

          <div className="pt-6">
            <div className="inline-flex items-center gap-4 px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl">
              <div className="flex -space-x-3">
                <div className="w-11 h-11 rounded-full bg-linear-to-br from-[#FF6B5B] to-[#C41E14] border-3 border-white shadow-md"></div>
                <div className="w-11 h-11 rounded-full bg-linear-to-br from-[#990800] to-[#6B0500] border-3 border-white shadow-md"></div>
                <div className="w-11 h-11 rounded-full bg-linear-to-br from-[#008B82] to-[#006B66] border-3 border-white shadow-md"></div>
                <div className="w-11 h-11 rounded-full bg-linear-to-br from-gray-700 to-gray-900 border-3 border-white shadow-md flex items-center justify-center text-white text-xs font-bold">
                  +10K
                </div>
              </div>
              <div className="text-left">
                <p className="font-bold text-white">{t('cta.trusted_by')}</p>
                <p className="text-sm text-white/80 font-medium">
                  {t('cta.rating')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
